<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员生日" prop="birthDay">
        <el-date-picker clearable size="small"
          v-model="queryParams.birthDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择会员生日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="运动偏好" prop="sportPref">
        <el-input
          v-model="queryParams.sportPref"
          placeholder="请输入运动偏好"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标偏好" prop="goal">
        <el-input
          v-model="queryParams.goal"
          placeholder="请输入目标偏好"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="强度偏好" prop="level">
        <el-input
          v-model="queryParams.level"
          placeholder="请输入强度偏好"
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
          v-hasPermi="['spc:member:add']"
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
          v-hasPermi="['spc:member:edit']"
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
          v-hasPermi="['spc:member:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['spc:member:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="memberList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="userId" />
      <el-table-column label="会员生日" align="center" prop="birthDay" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.birthDay, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前身高" align="center" prop="height" />
      <el-table-column label="当前体重" align="center" prop="weight" />
      <el-table-column label="目标身高" align="center" prop="heightTarget" />
      <el-table-column label="目标体重" align="center" prop="weightTarget" />
      <el-table-column label="运动偏好" align="center" prop="sportPref" />
      <el-table-column label="目标偏好" align="center" prop="goal" />
      <el-table-column label="强度偏好" align="center" prop="level" />
      <el-table-column label="运动细胞" align="center" prop="score" />
      <el-table-column label="今日运动细胞数" align="center" prop="scoreToday" />
      <el-table-column label="当前运动排名" align="center" prop="scoreRank" />
      <el-table-column label="持续运动天数" align="center" prop="days" />
      <el-table-column label="运动分钟数" align="center" prop="minutes" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['spc:member:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['spc:member:remove']"
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

    <!-- 添加或修改会员训练信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员生日" prop="birthDay">
          <el-date-picker clearable size="small"
            v-model="form.birthDay"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择会员生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="当前身高" prop="height">
          <el-input v-model="form.height" placeholder="请输入当前身高" />
        </el-form-item>
        <el-form-item label="当前体重" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入当前体重" />
        </el-form-item>
        <el-form-item label="目标身高" prop="heightTarget">
          <el-input v-model="form.heightTarget" placeholder="请输入目标身高" />
        </el-form-item>
        <el-form-item label="目标体重" prop="weightTarget">
          <el-input v-model="form.weightTarget" placeholder="请输入目标体重" />
        </el-form-item>
        <el-form-item label="运动偏好" prop="sportPref">
          <el-input v-model="form.sportPref" placeholder="请输入运动偏好" />
        </el-form-item>
        <el-form-item label="目标偏好" prop="goal">
          <el-input v-model="form.goal" placeholder="请输入目标偏好" />
        </el-form-item>
        <el-form-item label="强度偏好" prop="level">
          <el-input v-model="form.level" placeholder="请输入强度偏好" />
        </el-form-item>
        <el-form-item label="运动细胞" prop="score">
          <el-input v-model="form.score" placeholder="请输入运动细胞" />
        </el-form-item>
        <el-form-item label="今日运动细胞数" prop="scoreToday">
          <el-input v-model="form.scoreToday" placeholder="请输入今日运动细胞数" />
        </el-form-item>
        <el-form-item label="当前运动排名" prop="scoreRank">
          <el-input v-model="form.scoreRank" placeholder="请输入当前运动排名" />
        </el-form-item>
        <el-form-item label="持续运动天数" prop="days">
          <el-input v-model="form.days" placeholder="请输入持续运动天数" />
        </el-form-item>
        <el-form-item label="运动分钟数" prop="minutes">
          <el-input v-model="form.minutes" placeholder="请输入运动分钟数" />
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
  </div>
</template>

<script>
import { listMember, getMember, delMember, addMember, updateMember, exportMember } from "@/api/spc/member";

export default {
  name: "Member",
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
      // 会员训练信息表格数据
      memberList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        birthDay: null,
        sportPref: null,
        goal: null,
        level: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询会员训练信息列表 */
    getList() {
      this.loading = true;
      listMember(this.queryParams).then(response => {
        this.memberList = response.rows;
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
        userId: null,
        birthDay: null,
        height: null,
        weight: null,
        heightTarget: null,
        weightTarget: null,
        sportPref: null,
        goal: null,
        level: null,
        score: null,
        scoreToday: null,
        scoreRank: null,
        days: null,
        minutes: null,
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
      this.ids = selection.map(item => item.userId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加会员训练信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const userId = row.userId || this.ids
      getMember(userId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改会员训练信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.userId != null) {
            updateMember(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMember(this.form).then(response => {
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
      const userIds = row.userId || this.ids;
      this.$confirm('是否确认删除会员训练信息编号为"' + userIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMember(userIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有会员训练信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportMember(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>