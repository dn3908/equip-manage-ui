<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="课程名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入课程名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="训练级别" prop="level">
        <el-select
          v-model="queryParams.level"
          placeholder="请选择训练级别"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in levelOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="运动类型" prop="sportType">
        <el-select
          v-model="queryParams.sportType"
          placeholder="请选择运动类型"
          clearable
          size="small"
        >
          <el-option 
            v-for="dict in sportTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否上架" prop="enabled">
        <el-select v-model="queryParams.enabled" placeholder="请选择是否上架" clearable size="small">
          <el-option
            v-for="dict in enabledOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
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
          v-hasPermi="['spc:vipCourse:add']"
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
          v-hasPermi="['spc:vipCourse:edit']"
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
          v-hasPermi="['spc:vipCourse:remove']"
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
          v-hasPermi="['spc:vipCourse:export']"
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
      :data="vipCourseList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="课程名称" align="center" prop="name" />
      <el-table-column label="级别" align="center" prop="level" :formatter="levelFormat" />
      <el-table-column label="运动类型" align="center" prop="sportType" :formatter="sportTypeFormat" />
      <el-table-column label="课长" align="center" prop="classPeriod" />
      <el-table-column label="售价" align="center" prop="salePrice" />
      <el-table-column label="销量" align="center" prop="salesVolume" />
      <el-table-column label="章节数" align="center" prop="chapters">
        <template slot-scope="scope">
          {{scope.row.chapters}}
          <a @click="showChapters(scope.row)" style="color: #1890ff" >
            <svg-icon icon-class="edit"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="是否上架" align="center" prop="enabled" >
        <template slot-scope="scope">
          {{selectDictLabel(enabledOptions, scope.row.enabled)}}
          <a @click="toUpOrDown(scope.row)" style="color: #1890ff" >
            {{scope.row.enabled==="Y"? "下架":"上架"}}
          </a>
        </template>
      </el-table-column>
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
            @click="handleUpdate(scope.row)"
            v-hasPermi="['spc:vipCourse:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['spc:vipCourse:remove']"
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

    <!-- 添加或修改冲刺课对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入课程名称" />
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
              v-for="(item, index) in sportTypeSelect"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课时" prop="classPeriod">
          <el-input v-model.number="form.classPeriod" placeholder="请输入课时" />
        </el-form-item>
        <el-form-item label="周数" prop="week">
          <el-input v-model.number="form.week" placeholder="请输入周数" />
        </el-form-item>
        <el-form-item label="天数" prop="day">
          <el-input v-model.number="form.day" placeholder="请输入天数" />
        </el-form-item>
        <el-form-item label="课程价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入课程价格" />
        </el-form-item>
        <el-form-item label="促销价" prop="salePrice">
          <el-input v-model="form.salePrice" placeholder="请输入促销价" />
        </el-form-item>
        <el-form-item label="封面图片" prop="picture">
          <imageUpload v-model="form.picture"/>
        </el-form-item>
        <el-form-item label="销售量" prop="salesVolume">
          <el-input v-model.number="form.salesVolume" placeholder="请输入销售量" />
        </el-form-item>
        <el-form-item label="课程介绍" prop="descript">
          <editor v-model="form.descript" :min-height="192"/>
        </el-form-item>
        <el-form-item label="是否上架" prop="enabled">
          <el-radio-group v-model="form.enabled">
            <el-radio
              v-for="dict in enabledOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 章节抽屉 -->
    <el-drawer
      :drawerTitle="drawerTitle"
      :visible.sync="chaptersDrawer"
      direction="ttb"
      size="50%"
      :before-close="handleClose">
      <Chapters  :courseId="courseId" :isVip="isVip" ref="childRef" />
    </el-drawer>
  </div>
</template>

<script>
import {
  listVipCourse,
  getVipCourse,
  delVipCourse,
  addVipCourse,
  updateVipCourse,
  exportVipCourse,
  upOrDownVipCourse
} from "@/api/spc/vipCourse";
import ImageUpload from '@/components/ImageUpload';
import Editor from '@/components/Editor';
import Chapters from '@/views/spc/chapters';

import { sportTypeMap, map2Select } from "@/types";

export default {
  name: "VipCourse",
  components: {
    ImageUpload,
    Editor,
    Chapters,
  },
  data() {
    // 价格校验规则
    const validatePrice = (rule,value,callback) =>{
        let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/
        if(!value){
            callback(new Error('课程售价不能为空'))
         }else if(!reg.test(value)){
            callback(new Error('请输入正确格式的课程售价'))
             this.$set(this.ruleForm, "price", '');
         }else if(value.length > 10){
            callback(new Error('最多可输入10个字符'))
             this.$set(this.ruleForm, "price", '');
         }else{
          callback();
        }
      };
    // 价格校验规则
    const validateSalePrice = (rule,value,callback) =>{
        let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/
        if(!value){
            callback(new Error('促销价不能为空'))
         }else if(!reg.test(value)){
            callback(new Error('请输入正确格式的促销价'))
             this.$set(this.ruleForm, "salePrice", '');
         }else if(value.length > 10){
            callback(new Error('最多可输入10个字符'))
             this.$set(this.ruleForm, "salePrice", '');
         }else{
          callback();
        }
      };
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
      // 冲刺课表格数据
      vipCourseList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 级别字典
      levelOptions: [],
      // 运动类型字典
      sportTypeOptions: [],
      // 是否上架字典
      enabledOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        level: null,
        price: null,
        sportType: null,
        salePrice: null,
        salesVolume: null,
        enabled: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "课程名称不能为空", trigger: "blur" }
        ],
        classPeriod: [
          { required: true, message: "课时不能为空", trigger: "blur" },
          { type: 'number', message: '课时必须为数字值'}
        ],
        level: [{ required: true, message: "级别不能为空", trigger: "blur" }],
        price: [
          { required: true, message: "课程价格不能为空", trigger: "blur", validator: validatePrice }
        ],
        sportType: [
          { required: true, message: "运动类型不能为空", trigger: "change" }
        ],
        week: [
          { required: true, message: "周数不能为空", trigger: "blur" },
          { type: 'number', message: '周数必须为数字值'}
        ],
        day: [
          { required: true, message: "天数不能为空", trigger: "blur" },
          { type: 'number', message: '天数必须为数字值'}
          ],
        salePrice: [
          { required: true, message: "促销价不能为空", trigger: "blur", validator: validateSalePrice }
        ],
        picture: [
          { required: true, message: "封面图片不能为空", trigger: "blur" }
        ],
        salesVolume: [
          { required: false, message: "销售量不能为空", trigger: "blur" },
          { type: 'number', message: '销售量必须为数字值'}
        ],
        enabled: [
          { required: true, message: "是否上架不能为空", trigger: "blur" }
        ],
        descript: [
          { required: true, message: "课程介绍不能为空", trigger: "blur" }
        ]
      },

      sportTypeMap,
      sportTypeSelect: map2Select(sportTypeMap),

      // 章节抽屉
      chaptersDrawer: false,
      // 抽屉标题
      drawerTitle: "抽屉初始化标题",
      // 课程id
      courseId: 0,
      // 标记此模块是冲刺课
      isVip: true
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
    this.getDicts("sys_yes_no").then(response => {
      this.enabledOptions = response.data;
    });
  },
  methods: {
    /** 查询冲刺课列表 */
    getList() {
      this.loading = true;
      listVipCourse(this.queryParams).then(response => {
        this.vipCourseList = response.rows;
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
    // 是否上架字典翻译
    enabledFormat(row, column) {
      return this.selectDictLabel(this.enabledOptions, row.enabled);
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
        price: null,
        sportType: null,
        week: null,
        day: null,
        salePrice: null,
        picture: null,
        salesVolume: null,
        enabled: null,
        descript: null,
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
      this.title = "添加冲刺课";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getVipCourse(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改冲刺课";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateVipCourse(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVipCourse(this.form).then(response => {
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
      this.$confirm('是否确认删除冲刺课编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delVipCourse(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有冲刺课数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportVipCourse(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        });
    },

    // 反向上下架
    toUpOrDown({ id, enabled }) {
      let tips = "上架";
      if(enabled == "Y"){
        tips = "下架"
      }
      this.$confirm('是否确认'+tips+'冲刺课编号为"' + id + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return upOrDownVipCourse(id)
        })
        .then(() => {
          this.getList();
          this.msgSuccess(tips+"成功");
        });
    },
    // 跳转课程章节
    showChapters({ id, name}) {
      // 改变抽屉标题
      this.drawerTitle = name + " 章节管理";
      console.log(this.drawerTitle);
      // 显示抽屉
      this.chaptersDrawer = true;
      // 课程ID传入子组件，调用子组件的数据刷新方法
      this.courseId = id;
      console.log(this.$refs.childRef);
      // this.$refs.chapters.getList();
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
