<template lang="pug">
  .habit-view
    router-view(v-slot="{ Component }")
      component(
        :is="Component",
        @create="refresh")
    w-list
      w-list-item(v-for="habit in habits")
        | {{ habit.name }}
</template>

<script lang="ts" setup>
  import { WList, WListItem } from '@internal/framework';
  import { getHabits } from '#/api';
  import { onBeforeMount } from 'vue';

  let habits: any = $ref();

  onBeforeMount(async () => {
    habits = await getHabits();
  });

  async function refresh() {
    habits = await getHabits();
  }
</script>

<style lang="sass"></style>
