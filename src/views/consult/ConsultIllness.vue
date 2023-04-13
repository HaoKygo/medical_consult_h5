<script setup lang="ts">
import type { McRadiobtnOptions } from '@/types/components'
import type { ConsultIllness, Image } from '@/types/consult'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'
import { ConsultTime } from '@/enums'
import { ref, computed, onMounted } from 'vue'
import { uploadImage } from '@/api/consult'
import { useConsultStore } from '@/stores'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'

// 患病时间选项
const timeOptions = ref<McRadiobtnOptions>([
  { label: '一周内', value: ConsultTime.Week },
  { label: '一月内', value: ConsultTime.Month },
  { label: '半年内', value: ConsultTime.HalfYear },
  { label: '大于半年', value: ConsultTime.AfterHalfYear }
])
// 是否就诊过选项
const consultOptions = ref<McRadiobtnOptions>([
  { label: '就诊过', value: 1 },
  { label: '未就诊过', value: 0 }
])

// 表单数据变量
const consultFormData = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

// 图片预览数组
const fileList = ref<Image[]>([])
// 上传图片 调用后台上传api接口上传图片
const onAfterRead: UploaderAfterRead = (item) => {
  //排除多图数组上传
  if (Array.isArray(item)) {
    return
  }
  // 非空判断
  if (!item.file) {
    return
  }
  item.status = 'uploading'
  item.message = '上传中...'
  uploadImage(item.file)
    .then((res) => {
      item.status = 'done'
      item.message = undefined
      // 给 item 加上 url 是为了删除可以根据 url 进行删除
      item.url = res.url
      // 存储上传成功图片url
      consultFormData.value.pictures?.push(res)
    })
    .catch(() => {
      item.status = 'failed'
      item.message = '上传失败'
    })
}
// 删除已经上传图片
const onDeleteImg = (item: UploaderFileListItem) => {
  consultFormData.value.pictures = consultFormData.value.pictures?.filter(
    (pic) => pic.url !== item.url
  )
}

// 控制是否可以下一步
const nextDisabled = computed(() => {
  return (
    !consultFormData.value.illnessDesc ||
    !consultFormData.value.illnessTime ||
    consultFormData.value.consultFlag === undefined
  )
})
// 下一步
const consultStore = useConsultStore()
const router = useRouter()
const goToNext = () => {
  // 存储病情描述
  consultStore.setIllness(consultFormData.value)
  // 跳转档案管理：选择患者，需要根据 isChange 实现选择功能
  router.push('/user/patient?isChange=1')
}

// 返回时显示之前填写的数据
onMounted(() => {
  if (consultStore.consult.illnessDesc) {
    showConfirmDialog({
      title: '提示',
      message: '您之前有填写病情描述的记录，需要回现吗？',
      // 是否在页面回退时自动关闭,注意默认值为true
      closeOnPopstate: false
    }).then(() => {
      // 确认
      const { illnessDesc, illnessTime, consultFlag, pictures } = consultStore.consult
      consultFormData.value = { illnessDesc, illnessTime, consultFlag }
      consultFormData.value.pictures = pictures || []
      // 图片回显预览
      fileList.value = pictures || []
    })
  }
})
</script>

<template>
  <div class="consult-illness-page">
    <McNavBar middleTitle="图文问诊"></McNavBar>
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" alt="doctor img" />
      <div class="info">
        <p class="title">在线医生</p>
        <p class="tip">
          请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
        </p>
        <p class="safe">
          <McIcon name="consult-safe"></McIcon><span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 病情描述 - 表单 -->
    <div class="illness-form">
      <!-- 基本情况 -->
      <van-field
        v-model="consultFormData.illnessDesc"
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
      ></van-field>
      <div class="question">
        <p>本次患病多久了？</p>
        <McRadioBtn
          v-model="consultFormData.illnessTime"
          :options="timeOptions"
        ></McRadioBtn>
      </div>
      <div class="question">
        <p>此次病情是否去医院就诊过？</p>
        <McRadioBtn
          v-model="consultFormData.consultFlag"
          :options="consultOptions"
        ></McRadioBtn>
      </div>
      <!-- 补充图片上传 -->
      <div class="illness-img">
        <van-uploader
          v-model="fileList"
          @delete="onDeleteImg"
          :afterRead="onAfterRead"
          maxCount="9"
          maxSize="5 * 1024 * 1024"
          uploadIcon="photo-o"
          uploadText="上传图片"
        ></van-uploader>
        <p v-if="!(fileList && fileList.length > 0)" class="tip">
          上传内容仅医生可见,最多9张图,最大5MB
        </p>
      </div>
      <van-button :disabled="nextDisabled" @click="goToNext" block round type="primary">
        下一步
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 44px;
  .illness-tip {
    display: flex;
    padding: 15px;
    .img {
      width: 52px;
      height: 52px;
      border-radius: 4px;
      margin-top: 10px;
    }
    .info {
      flex: 1;
      padding-left: 12px;
      .title {
        font-size: 16px;
        margin-bottom: 5px;
      }
      .tip {
        padding: 12px;
        margin-bottom: 10px;
        background: var(--mc-bg);
        font-size: 13px;
        color: var(--mc-text3);
      }
      .safe {
        display: flex;
        align-items: center;
        font-size: 10px;
        color: var(--mc-text3);
        .mc-icon {
          font-size: 12px;
          margin-right: 2px;
        }
      }
    }
  }
  .illness-form {
    padding: 15px;
    .van-field {
      padding: 0;
      &::after {
        border-bottom: none;
      }
    }
    .question {
      > p {
        color: var(--mc-text3);
        padding: 15px 0;
      }
    }
    .illness-img {
      padding-top: 16px;
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      .tip {
        font-size: 12px;
        color: var(--mc-tip);
      }
      .van-uploader {
        ::v-deep() {
          .van-uploader {
            &__preview {
              &-delete {
                left: -6px;
                top: -6px;
                border-radius: 50%;
                background-color: var(--mc-primary);
                width: 20px;
                height: 20px;
                &-icon {
                  transform: scale(0.9) translate(-22%, 22%);
                }
              }
              &-image {
                border-radius: 8px;
                overflow: hidden;
              }
            }
            &__upload {
              border-radius: 8px;
            }
            &__upload-icon {
              color: (--mc-text3);
            }
          }
        }
      }
    }
    .van-button {
      font-size: 16px;
      margin-bottom: 30px;
      &.disabled {
        opacity: 1;
        background: #fafafa;
        color: #d9dbde;
        border: #fafafa;
      }
    }
  }
}
</style>
