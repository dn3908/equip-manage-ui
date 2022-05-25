<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员编号" prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入会员编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运动类型键值" prop="sportTypeVal">
        <el-select v-model="queryParams.sportTypeVal" placeholder="请选择运动类型键值" clearable size="small">
          <el-option
            v-for="dict in sportTypeValOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="训练等级" prop="levelVal">
        <el-select v-model="queryParams.levelVal" placeholder="请选择训练等级" clearable size="small">
          <el-option
            v-for="dict in levelValOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          v-hasPermi="['spc:memberSportType:add']"
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
          v-hasPermi="['spc:memberSportType:edit']"
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
          v-hasPermi="['spc:memberSportType:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['spc:memberSportType:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="memberSportTypeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="训练等级" align="center" prop="id" />
      <el-table-column label="会员编号" align="center" prop="memberId" />
      <el-table-column label="运动类型键值" align="center" prop="sportTypeVal" :formatter="sportTypeValFormat" />
      <el-table-column label="训练等级" align="center" prop="levelVal" :formatter="levelValFormat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['spc:memberSportType:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['spc:memberSportType:remove']"
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

    <!-- 添加或修改会员运动类型数据关联对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员编号" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员编号" />
        </el-form-item>
        <el-form-item label="运动类型键值" prop="sportTypeVal">
          <el-select v-model="form.sportTypeVal" placeholder="请选择运动类型键值">
            <el-option
              v-for="dict in sportTypeValOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="训练等级" prop="levelVal">
          <el-select v-model="form.levelVal" placeholder="请选择训练等级">
            <el-option
              v-for="dict in levelValOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMemberSportType, getMemberSportType, delMemberSportType, addMemberSportType, updateMemberSportType, exportMemberSportType } from "@/api/spc/memberSportType";

export default {
  name: "MemberSportType",
  components: {
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
      // 会员运动类型数据关联表格数据
      memberSportTypeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 运动类型键值字典
      sportTypeValOptions: [],
      // 训练等级字典
      levelValOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        memberId: null,
        sportTypeVal: null,
        levelVal: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        memberId: [
          { required: true, message: "会员编号不能为空", trigger: "blur" }
        ],
        sportTypeVal: [
          { required: true, message: "运动类型键值不能为空", trigger: "change" }
        ],
        levelVal: [
          { required: true, message: "训练等级不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("spc_sport_type").then(response => {
      this.sportTypeValOptions = response.data;
    });
    this.getDicts("spc_level").then(response => {
      this.levelValOptions = response.data;
    });
  },
  methods: {
    /** 查询会员运动类型数据关联列表 */
    getList() {
      this.loading = true;
      listMemberSportType(this.queryParams).then(response => {
        this.memberSportTypeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 运动类型键值字典翻译
    sportTypeValFormat(row, column) {
      return this.selectDictLabel(this.sportTypeValOptions, row.sportTypeVal);
    },
    // 训练等级字典翻译
    levelValFormat(row, column) {
      return this.selectDictLabel(this.levelValOptions, row.levelVal);
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
        memberId: null,
        sportTypeVal: null,
        levelVal: null,
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
      this.title = "添加会员运动类型数据关联";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMemberSportType(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改会员运动类型数据关联";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMemberSportType(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMemberSportType(this.form).then(response => {
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
      this.$confirm('是否确认删除会员运动类型数据关联编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMemberSportType(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有会员运动类型数据关联数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportMemberSportType(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>