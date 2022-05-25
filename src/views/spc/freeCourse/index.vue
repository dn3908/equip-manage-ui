<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="课程名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入课程名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="课时" prop="classPeriod">
        <el-input
          v-model="queryParams.classPeriod"
          placeholder="请输入课时"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="级别" prop="level">
        <el-select v-model="queryParams.level" placeholder="请选择级别" clearable size="small">
          <el-option
            v-for="dict in levelOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="运动类型" prop="sportType">
        <el-select v-model="queryParams.sportType" placeholder="请选择运动类型" clearable size="small">
          <el-option
            v-for="dict in sportTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="视频编号" prop="videoId">
        <el-input
          v-model="queryParams.videoId"
          placeholder="请输入视频编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['spc:freeCourse:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['spc:freeCourse:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['spc:freeCourse:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['spc:freeCourse:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="freeCourseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="课程名称" align="center" prop="name" />
      <el-table-column label="课时" align="center" prop="classPeriod" />
      <el-table-column label="级别" align="center" prop="level" :formatter="levelFormat" />
      <el-table-column label="运动类型" align="center" prop="sportType" :formatter="sportTypeFormat" />
      <el-table-column label="课程介绍" align="center" prop="descript" />
      <el-table-column label="视频编号" align="center" prop="videoId" />
      <el-table-column label="封页照片" align="center" prop="picture" />
      <el-table-column label="学习人数" align="center" prop="getPeople" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['spc:freeCourse:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['spc:freeCourse:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改公开课对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="课时" prop="classPeriod">
          <el-input v-model="form.classPeriod" placeholder="请输入课时" />
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-select v-model="form.level" placeholder="请选择级别">
            <el-option
              v-for="dict in levelOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运动类型" prop="sportType">
          <el-select v-model="form.sportType" placeholder="请选择运动类型">
            <el-option
              v-for="dict in sportTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程介绍">
          <editor v-model="form.descript" :min-height="192"/>
        </el-form-item>
        <el-form-item label="视频编号" prop="videoId">
          
          <el-button  type="primary" @click="openVideoDialog()">请选择视频</el-button>
          <el-input  v-model="form.videoId" placeholder="请输入视频编号" disabled/>
          
        </el-form-item>
        <el-form-item label="封页照片" prop="picture">
          <imageUpload :value.sync="form.picture" @input="updateUrl"></imageUpload>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="openVideo" title="视频选择" :visible.sync="openVideo" width="1200px" append-to-body>
        <selectVideo @updateVideoId="updateVideoId" :videoId="form.videoId"></selectVideo>
    </el-dialog>
  </div>
</template>

<script>
import { listFreeCourse, getFreeCourse, delFreeCourse, addFreeCourse, updateFreeCourse, exportFreeCourse } from "@/api/spc/freeCourse";
import Editor from '@/components/Editor';
import ImageUpload from '@/components/ImageUpload';
import { upload } from "@/api/spc/common";
import selectVideo from "@/components/selectVideo"

export default {
  name: "FreeCourse",
  components: {
    Editor,
    ImageUpload,
    selectVideo
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
      // 公开课表格数据
      freeCourseList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //是否显示视频选择弹出层
      openVideo:false,
      // 级别字典
      levelOptions: [],
      // 运动类型字典
      sportTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        classPeriod: null,
        level: null,
        sportType: null,
        descript: null,
        videoId: null,
        picture: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "课程名称不能为空", trigger: "blur" }
        ],
        classPeriod: [
          { required: true, message: "课时不能为空", trigger: "blur" }
        ],
        level: [
          { required: true, message: "级别不能为空", trigger: "change" }
        ],
        sportType: [
          { required: true, message: "运动类型不能为空", trigger: "change" }
        ],
        descript: [
          { required: true, message: "课程介绍不能为空", trigger: "blur" }
        ],
        videoId: [
          { required: true, message: "视频编号不能为空", trigger: "blur" }
        ],
        picture: [
          { required: true, message: "封页照片不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("spc_level").then(response => {
      this.levelOptions = response.data;
    });
    this.getDicts("spc_sport_type").then(response => {
      this.sportTypeOptions = response.data;
    });
  },
  methods: {
    //更新视频id
    updateVideoId(videoId){
      this.form.videoId=videoId
      this.openVideo=false
    },
    openVideoDialog(){
      this.openVideo=true
    },
    updateUrl(url){
      this.form.picture=url
    },
    /** 查询公开课列表 */
    getList() {
      this.loading = true;
      listFreeCourse(this.queryParams).then(response => {
        this.freeCourseList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 级别字典翻译
    levelFormat(row, column) {
      return this.selectDictLabel(this.levelOptions, row.level);
    },
    // 运动类型字典翻译
    sportTypeFormat(row, column) {
      return this.selectDictLabel(this.sportTypeOptions, row.sportType);
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
        name: null,
        classPeriod: null,
        level: null,
        sportType: null,
        descript: null,
        videoId: null,
        picture: null,
        getPeople: null,
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公开课";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFreeCourse(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公开课";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFreeCourse(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFreeCourse(this.form).then(response => {
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
      this.$confirm('是否确认删除公开课编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFreeCourse(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有公开课数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportFreeCourse(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>