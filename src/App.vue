<script setup lang="ts">
  import { testApi } from '/@/api/test';

  function test() {
    console.log('测试接口');
    testApi().then(res => {
      console.log(res);
    });
  }

  test();
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <IconSvg icon="zander-icon-chrome" svg />
  <IconSvg icon="zander-icon-ios" />
  <IconSvg icon="close" svg />
</template>

<style></style>
