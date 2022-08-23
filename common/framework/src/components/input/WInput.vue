<template lang="pug">
  component.w-input(:is="props.tag")
    slot(name="label")
      label.w-input__text(
        v-if="props.label",
        :for="uniqId")
        | {{ props.label }}
    input.w-input__control(
      v-model="props.modelValue",
      :id="uniqId",
      :name="uniqId",
      :type="props.type",
      @update:model-value="changeState")
    slot(name="message")
      .w-input__message(v-if="message")
        | {{ message }}
</template>

<script lang="ts" setup>
  // prettier-ignore
  import { boolProp, disabledProp, idProp, labelProp,
    modelProp, nameProp, stringProp, stylingProp,
    tagProp, useUid, variantProp } from '../../composables';

  // Defines the props.
  const props = defineProps({
    ...idProp(),
    ...tagProp(),
    ...nameProp(),
    ...labelProp(),
    ...stylingProp(),
    ...variantProp(),
    ...disabledProp(),
    ...modelProp(String, '', true),
    type: stringProp('text'),
    message: stringProp(),
    autofocus: boolProp(),
    placeholder: stringProp()
  });

  const { createUid } = useUid();

  const uniqId: string = $computed(() => {
    return props.id ?? `input-${createUid()}`;
  });

  // Defines the emits.
  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  function changeState(value: string): void {
    emits('update:modelValue', value);
  }
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *
  @use './WInput' as *

  .w-input
    +flex-col
</style>
