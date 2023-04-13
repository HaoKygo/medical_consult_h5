import McNavBar from '@/components/McNavBar.vue'
import McIcon from '@/components/McIcon.vue'
import McRadioBtn from '@/components/McRadioBtn.vue'
import McPaySheet from '@/components/McPaySheet.vue'

declare module 'vue' {
  interface GlobalComponents {
    McNavBar: typeof McNavBar
    McIcon: typeof McIcon
    McRadioBtn: typeof McRadioBtn
    McPaySheet: typeof McPaySheet
  }
}

// McRadiobtn 相关类型
export type McRadiobtnOptionValue = number | string
export type McRadiobtnOptions = { label: string; value: McRadiobtnOptionValue }[]
