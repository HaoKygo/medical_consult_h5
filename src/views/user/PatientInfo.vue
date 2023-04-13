<script setup lang="ts">
import type { McRadiobtnOptions } from '@/types/components'
import type { Patient, PatientList, NewPatient } from '@/types/user'
import { getPatientList, addNewPatient, editPatient, delPatient } from '@/api/user'
import {
  idCardDesensitization,
  isIdCardValid,
  extractGenderFromIdCard
} from '@/utils/idCardFunction'
import { ref, onMounted, computed } from 'vue'
import { showConfirmDialog, showFailToast, showSuccessToast } from 'vant'
import { idCardRules } from '@/utils/formRules'
import { useRoute, useRouter } from 'vue-router'
import { useConsultStore } from '@/stores'

// 根据路由链接参数isChange判断是否为选择患者功能
// 如果isChange的值为'1'则是选择患者，否则是家庭档案
const route = useRoute()
const isChange = computed(() => route.query.isChange === '1')

// 存储点击选中患者的id
const selectedPatientId = ref<string>()
const selectedPatient = (patient: Patient) => {
  if (isChange.value) {
    selectedPatientId.value = patient.id
  }
}

// 下一步操作在pinia中记录患者id并跳转到待支付页面
const consultStore = useConsultStore()
const router = useRouter()
const goToNext = async () => {
  if (!selectedPatientId.value) {
    return showFailToast('请选择问诊患者')
  }
  consultStore.setPatient(selectedPatientId.value)
  router.push('/consult/pay')
}

// 获取患者信息列表
const patientList = ref<PatientList>()
const loadPatientList = async () => {
  const res = await getPatientList()
  patientList.value = res
  // 当在选择患者并且有患者信息时，设置默认患者的id为选中id
  // 没有默认患者时，设置第一个患者id为选中id
  if (isChange.value && patientList.value.length) {
    const defaultPatient = patientList.value.find((patient) => patient.defaultFlag === 1)
    if (defaultPatient) {
      selectedPatientId.value = defaultPatient.id
    } else {
      selectedPatientId.value = patientList.value[0].id
    }
  }
}
onMounted(() => {
  loadPatientList()
})

// 新增患者默认值
const initPatient: NewPatient = {
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: undefined
}
// 新增患者
const newPatient = ref<NewPatient>({ ...initPatient })
// 转换默认患者项的值
const defaultFlag = computed({
  get() {
    return newPatient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    newPatient.value.defaultFlag = value ? 1 : 0
  }
})
// 提交保存新增患者或者编辑患者操作
const submit = async () => {
  if (!newPatient.value.name) {
    return showFailToast('请输入真实姓名')
  }
  if (!newPatient.value.idCard) {
    return showFailToast('请输入身份证号')
  }
  if (newPatient.value.gender === undefined) {
    return showFailToast('请选择性别')
  }
  // 身份证校验
  if (!isIdCardValid(newPatient.value.idCard)) {
    return showFailToast('身份证格式错误')
  }
  const gender = extractGenderFromIdCard(newPatient.value.idCard)
  if (newPatient.value.gender !== gender) {
    return showFailToast('性别与身份证不符')
  }
  // 开始请求添加新患者或者编辑患者
  newPatient.value.id
    ? await editPatient(newPatient.value)
    : await addNewPatient(newPatient.value)
  isShowPopup.value = false
  await loadPatientList()
  showSuccessToast(newPatient.value.id ? '编辑成功' : '添加成功')
}
// 删除患者
const removePatient = async () => {
  if (newPatient.value.id) {
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认要删除 ${newPatient.value.name} 患者信息吗？`
    })
    await delPatient(newPatient.value.id)
    isShowPopup.value = false
    await loadPatientList()
    showSuccessToast('删除成功')
  }
}

// 弹出栏控制
const isShowPopup = ref(false)
const showPopup = (patient?: Patient) => {
  // 如果传了patient值，也就是编辑操作，则用传进来的值填充表单
  if (patient) {
    const { id, name, idCard, defaultFlag, gender } = patient
    newPatient.value = { id, name, idCard, defaultFlag, gender }
  } else {
    newPatient.value = { ...initPatient }
  }
  // 弹出栏表单恢复默认值
  isShowPopup.value = true
}
// 弹出栏表单性别选项列表
const genderOptions: McRadiobtnOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
</script>

<template>
  <div class="patient-page">
    <McNavBar :middleTitle="isChange ? '选择患者' : '家庭档案'"></McNavBar>
    <!-- 头部选择提示 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <!-- 患者信息列表 -->
    <div class="patient-list" v-if="patientList">
      <div
        class="patient-item"
        v-for="patient in patientList"
        :key="patient.id"
        @click="selectedPatient(patient)"
        :class="{ selected: selectedPatientId === patient.id }"
      >
        <!-- 基本信息 -->
        <div class="info">
          <span class="name">{{ patient.name }}</span>
          <span class="id">{{ idCardDesensitization(patient.idCard) }}</span>
          <span class="gender">{{ patient.genderValue }}</span>
          <span class="age">{{ patient.age ? `${patient.age}岁` : '' }}</span>
        </div>
        <!-- 编辑按钮 -->
        <div @click="showPopup(patient)" class="icon">
          <McIcon name="user-edit"></McIcon>
        </div>
        <!-- 默认标识 -->
        <div v-if="patient.defaultFlag === 1" class="default-tag">默认</div>
      </div>
    </div>
    <!-- 添加患者 -->
    <div
      class="patient-add"
      v-if="!patientList || (patientList && patientList.length < 6)"
      @click="showPopup()"
    >
      <McIcon name="user-add"></McIcon>
      <p>添加患者</p>
    </div>
    <!-- 添加提示 -->
    <div class="patient-tip">最多可添加 6 人</div>
    <!-- 患者选择下一步 -->
    <div class="patient-next" v-if="isChange">
      <van-button @click="goToNext" type="primary" round block>下一步</van-button>
    </div>
    <!-- 弹出栏 -->
    <van-popup v-model:show="isShowPopup" position="right">
      <McNavBar
        :back="() => (isShowPopup = false)"
        :middleTitle="newPatient.id ? '编辑患者' : '添加患者'"
        rightText="保存"
        @click-right="submit"
      ></McNavBar>
      <van-form autocomplete="off">
        <!-- 真实姓名 -->
        <van-field
          v-model="newPatient.name"
          label="真实姓名"
          placeholder="请输入真实姓名"
        ></van-field>
        <!-- 身份证号 -->
        <van-field
          v-model="newPatient.idCard"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="idCardRules"
        ></van-field>
        <!-- 性别 -->
        <van-field label="性别">
          <!-- 单选按钮组件 -->
          <template #input>
            <McRadioBtn v-model="newPatient.gender" :options="genderOptions"></McRadioBtn>
          </template>
        </van-field>
        <!-- 默认就诊人 -->
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag" round></van-checkbox>
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="newPatient.id">
        <van-action-bar-button
          @click="removePatient"
          type="danger"
          text="删除"
        ></van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  ::v-deep() {
    .van-popup {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding-top: 44px;
    }
  }
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--mc-text3);
  }
}
.patient-next {
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
}
.patient-list {
  padding: 15px;
  padding-bottom: 0;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--mc-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--mc-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    align-items: center;
    row-gap: 10px;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--mc-tip);
      margin-right: 20px;
      &.name {
        font-size: 16px;
        color: var(--mc-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--mc-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--mc-tag);
    width: 20px;
    text-align: center;
  }
  .default-tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--mc-primary);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.selected {
    border-color: var(--mc-primary);
    background-color: var(--mc-plain);
    .icon {
      color: var(--mc-primary);
    }
  }
}
.patient-add {
  background-color: var(--mc-bg);
  color: var(--mc-primary);
  text-align: center;
  margin: 0 15px;
  padding: 15px 0;
  border-radius: 8px;
  .mc-icon {
    font-size: 28px;
  }
}
.patient-tip {
  color: var(--mc-tag);
  padding: 15px;
}
</style>
