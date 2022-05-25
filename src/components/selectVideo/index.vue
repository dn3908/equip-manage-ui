<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="视频名称" prop="videoName">
        <el-input
          v-model="queryParams.videoName"
          placeholder="请输入视频名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运动类型" prop="dicSportTypeId">
        <el-select
          v-model="queryParams.dicSportTypeId"
          placeholder="请选择运动类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in dicSportTypeIdOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="训练难度" prop="dicLevelId">
        <el-select
          v-model="queryParams.dicLevelId"
          placeholder="请选择训练难度"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in dicLevelIdOptions"
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
    <el-row>
       <el-radio-group v-model="selectId">
        <el-radio v-for="(item,index) in videoList" :label="item.id" :key="index">视频名称：{{item.videoName}} 运动类型：{{item.dicSportTypeName}}</el-radio>
      </el-radio-group>
     
    </el-row>
    <el-row>
       <el-button type="primary" size="mini" @click="updateDate()">确定</el-button>
    </el-row>
     <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  listVideo,
  getVideo,
} from "@/api/spc/video";
export default {
  name: "Video",
  props: {
    videoId: {
      type: [String,Number],
      default: "",
    },
  },
  data() {
    return {
      showSearch:true,
      dicSportTypeIdOptions: [],
      // 训练难度字典
      dicLevelIdOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        videoName: null,
        dicSportTypeId: null,
        dicLevelId: null
      },
      // 表单参数
      form: {},
      selectId:this.videoId,
      // 表单校验,
      videoList:[],
      total:0
    };
  },
  created() {
    this.getDicts("spc_sport_type").then(response => {
      this.dicSportTypeIdOptions = response.data;
    });
    this.getDicts("spc_level").then(response => {
      this.dicLevelIdOptions = response.data;
       this.getList();
    });
   
    
  },
  methods: {
    updateDate(){
      this.$emit('updateVideoId',this.selectId)
    },
    /** 查询视频素材列表 */
    getList() {
      this.loading = true;
      listVideo(this.queryParams).then(response => {
        this.videoList = response.rows;
        for(const item of  this.videoList){
          item.dicSportTypeName=this.dicSportTypeIdFormat(item)
          item. dicLevelName=this.dicLevelIdFormat(item)
        }
        this.total = response.total;
        this.loading = false;
      });
    },
    // 运动类型字典翻译
    dicSportTypeIdFormat(row) {
      const data=this.selectDictLabel(
        this.dicSportTypeIdOptions,
        row.dicSportTypeId
      );
      return this.selectDictLabel(
        this.dicSportTypeIdOptions,
        row.dicSportTypeId
      );
    },
    // 训练难度字典翻译
    dicLevelIdFormat(row) {
      return this.selectDictLabel(this.dicLevelIdOptions, row.dicLevelId);
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
  }
};
</script>
