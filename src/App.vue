<template>
  <el-config-provider :locale="getElLocale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ElConfigProvider } from 'element-plus';
  import { useLocale } from '/@/locales';

  export default defineComponent({
    name: 'App',
    components: {
      [ElConfigProvider.name]: ElConfigProvider,
    },
    setup() {
      const { getElLocale } = useLocale();
      return {
        getElLocale,
      };
    },
  });
</script>
