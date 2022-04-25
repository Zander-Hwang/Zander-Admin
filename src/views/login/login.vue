<template>
  <!--  <img src="bg" class="wave" />-->
  1213
</template>

<script setup lang="ts">
  import { getRoutersApi } from '/@/api/routers';

  function getRouters() {
    getRoutersApi().then(res => {
      console.log(res);
    });
  }

  getRouters();
</script>

<style scoped lang="less"></style>
