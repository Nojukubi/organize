// prettier-ignore
import { Component, ComputedRef, Prop, PropType, computed,
  getCurrentInstance, resolveComponent } from 'vue';
import { toKebabCase } from '../helpers/string';
import type { RouteLocationRaw } from 'vue-router';
import type { CssClasses, Styling, Variant } from '../types';

// Create the boolean prop.
export const boolProp = (value?: boolean): Prop<boolean> => ({
  type: Boolean as PropType<boolean>,
  default: value
});

// Create the string prop.
export const stringProp = (value?: string): Prop<string> => ({
  type: String as PropType<string>,
  default: value
});

// Create the prop to define the root tag.
export const tagProp = () => ({
  tag: stringProp('div')
});

// Create the prop to define the size style.
export const sizeProp = () => ({
  size: {
    type: String as PropType<'small' | 'normal' | 'large'>,
    default: 'normal'
  }
});

// Create the prop to define the tile style.
export const tileProp = () => ({
  tile: boolProp(false)
});

// Create the prop to define the active state.
export const activeProp = () => ({
  active: boolProp(false)
});

// Create the prop to define the block style.
export const blockProp = () => ({
  block: boolProp(false)
});

// Create the prop to define the top align.
export const topProp = () => ({
  top: boolProp(false)
});

// Create the prop to define the right align.
export const rightProp = () => ({
  right: boolProp(false)
});

// Create the prop to define the bottom align.
export const bottomProp = () => ({
  bottom: boolProp(false)
});

// Create the prop to define the left align.
export const leftProp = () => ({
  left: boolProp(false)
});

// Create the prop to define the width.
export const widthProp = () => ({
  width: { type: [String, Number] as PropType<string | number> }
});

// Create the prop to define the height.
export const heightProp = () => ({
  height: { type: [String, Number] as PropType<string | number> }
});

// Create the prop to define the styling.
export const stylingProp = () => ({
  styling: {
    type: String as PropType<Styling>,
    default: 'flat'
  }
});

// Create the prop to define the variant.
export const variantProp = () => ({
  variant: {
    type: String as PropType<Variant>,
    default: 'standard'
  }
});

// Create the prop to define the rounded style.
export const roundedProp = () => ({
  rounded: boolProp(false)
});

// Create the prop to define the disabled state.
export const disabledProp = () => ({
  disabled: boolProp(false)
});

// Create the prop to define the routing location.
export const routeToProp = () => ({
  to: { type: Object as PropType<RouteLocationRaw> }
});

// Create the prop to define the routing href.
export const routeHrefProp = () => ({
  href: stringProp()
});

// Create the prop to define the routing replace.
export const routeReplaceProp = () => ({
  replace: boolProp()
});

// Create the prop to define the routing target.
export const routeTargetProp = () => ({
  target: {
    type: String as PropType<'__blank' | '__self' | '__parent' | '__top' | string>
  }
});

// Standardized css styles based on props.
const cssStyles: {
  get widthCssStyle(): ComputedRef<string>;
  get heightCssStyle(): ComputedRef<string>;
} = {} as any;

// Css styles for width prop based on context.
Object.defineProperty(cssStyles, 'widthCssStyle', {
  get: (): ComputedRef<string> => propCssLength('width')
});

// Css styles for height prop based on context.
Object.defineProperty(cssStyles, 'heightCssStyle', {
  get: (): ComputedRef<string> => propCssLength('height')
});

// Standardized css classes based on props.
const cssClasses: {
  get tileCssClass(): ComputedRef<CssClasses>;
  get blockCssClass(): ComputedRef<CssClasses>;
  get roundedCssClass(): ComputedRef<CssClasses>;
  get disabledCssClass(): ComputedRef<CssClasses>;
  get sizeCssClass(): ComputedRef<CssClasses>;
  get stylingCssClass(): ComputedRef<CssClasses>;
  get variantCssClass(): ComputedRef<CssClasses>;
} = {} as any;

// Css classes for tile prop based on context.
Object.defineProperty(cssClasses, 'tileCssClass', {
  get: (): ComputedRef<CssClasses> => propCssClass('tile')
});

// Css classes for block prop based on context.
Object.defineProperty(cssClasses, 'blockCssClass', {
  get: (): ComputedRef<CssClasses> => propCssClass('block')
});

// Css classes for rounded prop based on context.
Object.defineProperty(cssClasses, 'roundedCssClass', {
  get: (): ComputedRef<CssClasses> => propCssClass('rounded')
});

// Css classes for disabled prop based on context.
Object.defineProperty(cssClasses, 'disabledCssClass', {
  get: (): ComputedRef<CssClasses> => propCssClass('disabled')
});

// Css classes for size prop based on context.
Object.defineProperty(cssClasses, 'sizeCssClass', {
  get: (): ComputedRef<CssClasses> => propagateCssClass('size')
});

// Css classes for styling prop based on context.
Object.defineProperty(cssClasses, 'stylingCssClass', {
  get: (): ComputedRef<CssClasses> => propagateCssClass('styling')
});

// Css classes for variant prop based on context.
Object.defineProperty(cssClasses, 'variantCssClass', {
  get: (): ComputedRef<CssClasses> => propagateCssClass('variant')
});

// Get the component data for current instance.
function getComponent(): { name: string; props: any } {
  const { $props, $options } = getCurrentInstance()?.proxy ?? {};
  // Get the autogenerated name and properties.
  return { name: toKebabCase($options?.__name ?? $options?.name), props: $props };
}

// Create the css class based on boolean prop name.
function propCssClass(prop: string): ComputedRef<CssClasses> {
  const { name, props } = getComponent();
  return computed(
    (): CssClasses => ({
      [`${name}--${prop}`]: props[prop]
    })
  );
}

// Create the css class based on string prop name.
function propagateCssClass(prop: string): ComputedRef<CssClasses> {
  const { name, props } = getComponent();
  return computed((): CssClasses => `${name}--${props[prop]}`);
}

// Create the css style based on length prop name.
function propCssLength(prop: string): ComputedRef<string> {
  const { props } = getComponent();
  return computed((): string => {
    return typeof props[prop] === 'number' || +props[prop]
      ? `${props[prop]}px`
      : typeof props[prop] === 'string'
      ? props[prop]
      : undefined;
  });
}

// Create the link attributes for native link component.
function createLinkAttrs(props: any) {
  return { href: props.href, target: props.target };
}

// Create the link attributes for route link component.
function createRouteAttrs(name: string, props: any) {
  return {
    'to': props.to,
    'target': props.target,
    'replace': props.replace,
    'active-class': `${name}--active`,
    'exact-active-class': `${name}--exact-active`
  };
}

// Composable to create the css styles based on props.
export function usePropsCssStyles(): typeof cssStyles {
  return cssStyles;
}

// Composable to create the css classes based on props.
export function usePropsCssClasses(): typeof cssClasses {
  return cssClasses;
}

// Composable to create route tag and attrs based on props.
export function usePropsRoute() {
  const { name, props } = getComponent();
  // Determine the tag or resolved route component.
  const routeTag: ComputedRef<Component | string | null> = computed(() => {
    return props?.href ? 'a' : props.to ? resolveComponent('RouterLink') : null;
  });
  // Determine the attrs bound only to route link.
  const routeAttrs: Record<string, any> = computed(() =>
    props.to ? createRouteAttrs(name, props) : props.href ? createLinkAttrs(props) : null
  );

  return { routeTag, routeAttrs };
}
