<template lang="pug">
  w-dialog.habit-create(@close="close")
    w-card.habit-create__body
      w-input(
        v-model="name",
        label="Name")

      template(#footer)
        w-button(@click="save")
          | Save
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { WCard, WDialog, WInput, WButton } from '@internal/framework';
  import type { Router } from 'vue-router';
  import { createHabit } from '#/api';

  const emits = defineEmits<{
    (e: 'create'): void;
  }>();

  // Composable to handle the Router.
  const router: Router = useRouter();

  const name: string = $ref('');

  function save(): void {
    createHabit({ id: +new Date(), name });
    emits('create');
    close();
  }

  // Handler to close the create dialog.
  function close() {
    router.push({ name: 'habit' });
  }
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .habit-create
    &__body
      +size(400px)
</style>
