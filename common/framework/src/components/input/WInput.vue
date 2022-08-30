<template lang="pug">
  component.w-input(
    :is="props.tag",
    :class="cssClasses")
    slot(name="label")
      label.w-input__text(
        v-if="props.label",
        :for="uniqId")
        | {{ props.label }}
    .w-input__field(:class="cssFieldClasses")
      input.w-input__control(
        v-model="props.modelValue",
        :id="uniqId",
        :name="uniqId",
        :type="props.type",
        :class="cssControlClasses",
        :disabled="props.disabled",
        @update:model-value="changeState")
    slot(name="message")
      .w-input__message(v-if="message")
        | {{ message }}
</template>

<script lang="ts" setup>
  // prettier-ignore
  import { boolProp, cornerProp, disabledProp, idProp,
    labelProp, modelProp, nameProp, sizeProp, stringProp,
    stylingProp, tagProp, useUid, variantProp,
    usePropsCssClasses, blockProp } from '../../composables';

  // Defines the props.
  const props = defineProps({
    ...idProp(),
    ...tagProp(),
    ...nameProp(),
    ...sizeProp(),
    ...blockProp(),
    ...labelProp(),
    ...cornerProp(),
    ...stylingProp(),
    ...variantProp(),
    ...disabledProp(),
    ...modelProp(String, '', true),
    type: stringProp('text'),
    message: stringProp(),
    autofocus: boolProp(),
    placeholder: stringProp()
  });

  // Defines the emits.
  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  // Composable to handle the UID.
  const { createUid } = useUid();

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { blockCssClass, cornerCssClass,
    disabledCssClass, sizeCssClass, stylingCssClass,
    variantCssClass } = $(usePropsCssClasses());

  // Determine the uniq id for input.
  const uniqId: string = $computed(() => {
    return props.id ?? `input-${createUid()}`;
  });

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [blockCssClass]);

  // Create the CSS classes based on context.
  const cssFieldClasses: unknown = $computed(() => [
    cornerCssClass,
    stylingCssClass,
    variantCssClass,
    disabledCssClass
  ]);

  // Create the CSS classes based on context.
  const cssControlClasses: unknown = $computed(() => [sizeCssClass]);

  // Change the state of the input.
  function changeState(value: string): void {
    emits('update:modelValue', value);
  }
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *
  @use '../variable' as *
  @use '../mixin' as *
  @use './WInput' as *

  .w-input
    +flex-col

    &__field
      border: 1px solid red
      +corner-tile
      +corner-circle
      +styling-flat
      +styling-plain
      +styling-outline
      +styling-elevate

    &__control
      width: 100%
      border: none
      outline: none
      padding: 0
      appearance: none

    &--block
      min-width: 100%

    &--disabled
      cursor: not-allowed
      pointer-events: none
      opacity: var(--input-disabled-opacity, $input-disabled__opacity)

    &--small
      min-height: var(--input-small-min-height, $min-height-xs)

    &--normal
      min-height: var(--input-normal-min-height, $min-height-sm)

    &--large
      min-height: var(--input-large-min-height, $min-height-md)
</style>
