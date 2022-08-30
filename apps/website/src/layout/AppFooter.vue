<template lang="pug">
  w-footer.app__footer(border)
    router-view(name="footer")
</template>

<script lang="ts" setup>
  import { WFooter } from '@internal/framework';
</script>
