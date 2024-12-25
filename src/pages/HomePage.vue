<template>
  <div class="w-full h-screen">
    <VScaleScreen
      width="1920"
      height="1167"
    >
      <div class="relative overflow-auto w-[1920px] h-[1167px] bg-[#9f76a4] text-white bg-auto">
        <MapContainer />
      </div>
    </VScaleScreen>
  </div>
</template>

<script lang="ts" setup>
import VScaleScreen from 'v-scale-screen'
</script>

<style lang="scss" scoped></style>
