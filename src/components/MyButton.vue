<template>
  <button :disabled="buttonLoading" class="w-btn">
    <SvgIcon
      v-show="buttonLoading"
      class="mr-3 animate-1s animate-spin"
      name="loading"
    />
    {{ buttonName }}
  </button>
</template>

<script lang="ts" setup>
type Props = {
  buttonName?: string
  buttonLoading?: boolean
}
withDefaults(defineProps<Props>(), {
  buttonName: '登录',
  buttonLoading: false,
})
</script>

<style lang="scss" scoped></style>
