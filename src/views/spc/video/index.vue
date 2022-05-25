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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['spc:video:add']"
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
          v-hasPermi="['spc:video:edit']"
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
          v-hasPermi="['spc:video:remove']"
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
          v-hasPermi="['spc:video:export']"
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
      :data="videoList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="视频名称" align="center" prop="videoName" />
      <el-table-column label="视频存放路径" align="center" prop="videoUrl">
        <template v-if="scope.row.videoUrl" slot-scope="scope">
          <el-button type="text" @click="showVideoDialog(scope.row.videoUrl)">
            查看视频
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="视频时长" align="center" prop="videoDuration" />
      <el-table-column
        label="运动类型"
        align="center"
        prop="dicSportTypeId"
        :formatter="dicSportTypeIdFormat"
      />
      <el-table-column
        label="训练难度"
        align="center"
        prop="dicLevelId"
        :formatter="dicLevelIdFormat"
      />
      <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
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
            v-hasPermi="['spc:video:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['spc:video:remove']"
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

    <!-- 添加或修改视频素材对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="视频名称" prop="videoName">
          <el-input v-model="form.videoName" placeholder="请输入视频名称" />
        </el-form-item>
        <el-form-item label="视频存放路径" prop="videoUrl">
          <el-button
            v-show="form.videoUrl"
            type="text"
            @click="showVideoDialog(form.videoUrl)"
          >
            查看视频
          </el-button>

          <el-upload
            action="/common/upload"
            :show-file-list="false"
            :before-upload="beforeBottleUpload"
            :http-request="httpRequestBottle"
          >
            点击上传视频
          </el-upload>
        </el-form-item>
        <el-form-item label="视频时长" prop="videoDuration">
          <el-input v-model="form.videoDuration" placeholder="请输入视频时长" />
        </el-form-item>
        <el-form-item label="运动类型" prop="dicSportTypeId">
          <el-select v-model="form.dicSportTypeId" placeholder="请选择运动类型">
            <el-option
              v-for="dict in dicSportTypeIdOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="训练难度" prop="dicLevelId">
          <el-select v-model="form.dicLevelId" placeholder="请选择训练难度">
            <el-option
              v-for="dict in dicLevelIdOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
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

    <el-dialog :visible.sync="videoDialogVisible">
      <video-player
        v-if="videoDialogVisible"
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      >
      </video-player>
    </el-dialog>
  </div>
</template>

<script>
import {
  listVideo,
  getVideo,
  delVideo,
  addVideo,
  updateVideo,
  exportVideo
} from "@/api/spc/video";
import { upload } from "@/api/spc/common";
import { videoPlayer } from "vue-video-player";

export default {
  name: "Video",
  components: { videoPlayer },
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
      // 视频素材表格数据
      videoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 运动类型字典
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
      // 表单校验
      rules: {
        videoName: [
          { required: true, message: "视频名称不能为空", trigger: "blur" }
        ],
        videoUrl: [
          { required: true, message: "视频存放路径不能为空", trigger: "blur" }
        ],
        videoDuration: [
          { required: true, message: "视频时长不能为空", trigger: "blur" }
        ],
        dicSportTypeId: [
          { required: true, message: "运动类型不能为空", trigger: "change" }
        ],
        dicLevelId: [
          { required: true, message: "训练难度不能为空", trigger: "change" }
        ]
      },
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "" // url地址
          }
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      },
      videoDialogVisible: false
    };
  },
  created() {
    this.getList();
    this.getDicts("spc_sport_type").then(response => {
      this.dicSportTypeIdOptions = response.data;
    });
    this.getDicts("spc_level").then(response => {
      this.dicLevelIdOptions = response.data;
    });
  },
  methods: {
    /** 查询视频素材列表 */
    getList() {
      this.loading = true;
      listVideo(this.queryParams).then(response => {
        this.videoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 运动类型字典翻译
    dicSportTypeIdFormat(row, column) {
      return this.selectDictLabel(
        this.dicSportTypeIdOptions,
        row.dicSportTypeId
      );
    },
    // 训练难度字典翻译
    dicLevelIdFormat(row, column) {
      return this.selectDictLabel(this.dicLevelIdOptions, row.dicLevelId);
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
        videoName: null,
        videoUrl: null,
        videoDuration: null,
        dicSportTypeId: null,
        dicLevelId: null,
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
      this.title = "添加视频素材";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getVideo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改视频素材";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateVideo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVideo(this.form).then(response => {
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
        '是否确认删除视频素材编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delVideo(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有视频素材数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportVideo(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        });
    },
    beforeBottleUpload({ type, size }) {
      const isVideo = type.indexOf("video") > -1;

      if (!isVideo) {
        this.$message({
          message: "请选择视频格式文件",
          type: "warning"
        });
      }

      return isVideo;
    },

    httpRequestBottle({ file }) {
      const formData = new FormData();
      formData.append("file", file);
      upload(formData).then(({ url }) => {
        this.form.videoUrl = url;
      });
    },

    showVideoDialog(url) {
      this.playerOptions.sources = [
        {
          type: "video/mp4", // 类型
          src: url // url地址
        }
      ];

      this.videoDialogVisible = true;
    }
  }
};
</script>
