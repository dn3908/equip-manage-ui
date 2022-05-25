<template>
  <div class="app-container">
   
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['spc:chapters:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['spc:chapters:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['spc:chapters:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['spc:chapters:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="chaptersList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="课程名称" align="center" prop="cname" />
      <el-table-column label="章节名称" align="center" prop="name" />
      <el-table-column label="排序" align="center" prop="sort" />
      <el-table-column label="小节" align="center" prop="lessions" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="lessionDrawer=true"
            v-hasPermi="['spc:chapters:edit']"
            >查看小节</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['spc:chapters:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['spc:chapters:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改课程章节对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="课程编号" prop="courseId">
          <el-input
            readonly
            v-model="form.courseId"
            placeholder="请输入课程编号"
          />
        </el-form-item>
        <el-form-item label="课程分类" prop="courseType">
          <el-select
            disabled
            v-model="form.courseType"
            placeholder="请选择课程分类"
          >
            <el-option
              v-for="(item, index) in courseTypeSelect"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="章节名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入章节名称" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-drawer
      title="我是小节抽屉"
      :visible.sync="lessionDrawer"
      direction="rtl"
      size="60%"
      :append-to-body="true"
      :before-close="handleClose">

    </el-drawer>
  </div>
</template>

<script>
import {
  listChapters,
  getChapters,
  delChapters,
  addChapters,
  updateChapters,
  exportChapters
} from "@/api/spc/chapters";
import { levelMap, sportTypeMap, map2Select, courseTypeMap } from "@/types";
export default {
  name: "Chapters",
  components: {},
  props: {
    // 课程编号
    courseId: {
      type: String,
      default: "0"
    },
    isVip: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 课程章节表格数据
      chaptersList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        courseId: null,
        courseType: null,
        name: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        courseId: [
          { required: true, message: "课程编号不能为空", trigger: "blur" }
        ],
        courseType: [
          { required: true, message: "课程分类不能为空", trigger: "change" }
        ],
        name: [{ required: true, message: "章节名称不能为空", trigger: "blur" }]
      },

      levelMap,
      levelSelect: map2Select(levelMap),
      sportTypeMap,
      sportTypeSelect: map2Select(sportTypeMap),
      courseTypeMap,
      courseTypeSelect: map2Select(courseTypeMap),


      // 小节抽屉显示
      lessionDrawer: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询课程章节列表 */
    getList() {
      const { courseId, isVip, queryParams } = this;

      this.loading = true;

      queryParams.courseId = courseId;
      queryParams.courseType = isVip=='1' ? "3" : "2";

      listChapters(queryParams).then(response => {
        this.chaptersList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        courseId: this.courseId,
        courseType: this.isVip ? "3" : "2",
        name: null,
        sort: null,
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加课程章节";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getChapters(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改课程章节";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChapters(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addChapters(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除课程章节编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delChapters(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有课程章节数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportChapters(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        });
    },
     // 抽屉统一关闭方法
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
};
</script>
