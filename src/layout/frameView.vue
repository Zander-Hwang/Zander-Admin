<!--
 * @Description: iFrame组件
 * @Author: Zander
 * @Date: 2022/4/24 13:48
 * @LastEditors: Zander
 * @LastEditTime: 2022/4/24 13:48
 -->
<template>
  <div class="frame" v-loading="loading">
    <iframe class="frame-iframe" ref="refFrameElement" :src="frameSrc" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { ref, nextTick, unref, onMounted } from 'vue';

  const loading = ref(false);
  const currentRoute = useRoute();
  const frameSrc = ref<string>('');
  const refFrameElement = ref<HTMLElement | null>(null);

  if (unref(currentRoute.meta)?.frameSrc) {
    frameSrc.value = unref(currentRoute.meta)?.frameSrc as string;
  }

  function hideLoading() {
    loading.value = false;
  }

  function init() {
    nextTick(() => {
      const iframe = unref(refFrameElement) as any;
      if (!iframe) {
        return;
      }
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          hideLoading();
        });
      } else {
        iframe.onload = () => {
          hideLoading();
        };
      }
    });
  }

  onMounted(() => {
    loading.value = true;
    init();
  });
</script>

<style scoped lang="scss">
  .frame {
    height: 100vh;
    z-index: 998;

    .frame-iframe {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border: 0;
      box-sizing: border-box;
    }
  }

  .main-content {
    margin: 0 !important;
  }
</style>
