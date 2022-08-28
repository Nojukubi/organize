// prettier-ignore
import { Component, computed, ComputedRef,
  getCurrentInstance, PropType, resolveComponent } from 'vue';
import { toKebabCase } from '../helpers/string';
import type { RouteLocationRaw } from 'vue-router';
import type { CssClasses } from '../types';

/**
 * Create the base property definition.
 * @param type Native property type.
 * @param defaults Default value when undefined.
 * @param required Required; optional by default.
 * @param validator Validator for property value.
 * @returns Generic property definition.
 */
export function prop<T, K = T>(type: any, defaults?: K, required?: boolean, validator?: any) {
  return { type: type as PropType<T>, default: defaults, required, validator };
}

/**
 * Create the boolean type property definition.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition with boolean type.
 */
export function boolProp(defaults?: boolean, required?: boolean) {
  return prop<boolean>(Boolean, defaults, required);
}

/**
 * Create the string type property definition.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @param validator Validator for property value.
 * @returns Property definition with string type.
 */
export function stringProp<T = string>(defaults?: T, required?: boolean, validator?: any) {
  return prop<T>(String, defaults, required, validator);
}

/**
 * Create the property definition for ID.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for ID.
 */
export function idProp(defaults?: string, required?: boolean) {
  return { id: stringProp(defaults, required) };
}

/**
 * Create the property definition for tag.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for tag.
 */
export function tagProp(defaults?: string, required?: boolean) {
  return { tag: stringProp(defaults ?? 'div', required) };
}

/**
 * Create the property definition for name.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for name.
 */
export function nameProp(defaults?: string, required?: boolean) {
  return { name: stringProp(defaults, required) };
}

/**
 * Create the property definition for label.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for label.
 */
export function labelProp(defaults?: string, required?: boolean) {
  return { label: stringProp(defaults, required) };
}

/**
 * Create the property definition for active.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for active.
 */
export function activeProp(defaults?: boolean, required?: boolean) {
  return { active: boolProp(defaults ?? false, required) };
}

/**
 * Create the property definition for disabled.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for disabled.
 */
export function disabledProp(defaults?: boolean, required?: boolean) {
  return { disabled: boolProp(defaults ?? false, required) };
}

/**
 * Property value for direction.
 */
export type Direction = 'vertical' | 'horizontal';

/**
 * Create the property definition for direction.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for direction.
 */
export function directionProp(defaults?: Direction, required?: boolean) {
  return { direction: prop<Direction>(String, defaults ?? 'vertical', required) };
}

/**
 * Create the property definition for block.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for block.
 */
export function blockProp(defaults?: boolean, required?: boolean) {
  return { block: boolProp(defaults ?? false, required) };
}

/**
 * Create the property definition for border.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for border.
 */
export function borderProp(defaults?: boolean, required?: boolean) {
  return { border: boolProp(defaults ?? false, required) };
}

/**
 * Create the property definition for transparent.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for transparent.
 */
export function transparentProp(defaults?: boolean, required?: boolean) {
  return { transparent: boolProp(defaults ?? false, required) };
}

/**
 * Property value for styling.
 */
export type Styling = 'flat' | 'outline' | 'elevate' | 'plain' | string;

/**
 * Create the property definition for styling.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for styling.
 */
export function stylingProp(defaults?: Styling, required?: boolean) {
  return { styling: prop<Styling>(String, defaults ?? 'flat', required) };
}

/**
 * Property value for variant.
 */
export type Variant = 'primary' | 'standard' | 'success' | 'danger' | 'warning' | string;

/**
 * Create the property definition for variant.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for variant.
 */
export function variantProp(defaults?: Styling, required?: boolean) {
  return { variant: prop<Variant>(String, defaults ?? 'standard', required) };
}

/**
 * Create the property definition for interactive.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for interactive.
 */
export function interactiveProp(defaults?: boolean, required?: boolean) {
  return { interactive: boolProp(defaults ?? false, required) };
}

/**
 * Create the property definition for absolute.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for absolute.
 */
export function absoluteProp(defaults?: boolean, required?: boolean) {
  return { absolute: boolProp(defaults ?? false, required) };
}

/**
 * Create the property definition for top.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for top.
 */
export function topProp(defaults?: boolean, required?: boolean) {
  return { top: boolProp(defaults ?? false, required) };
}

/**
 * Create the property definition for right.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for right.
 */
export function rightProp(defaults?: boolean, required?: boolean) {
  return { right: boolProp(defaults ?? false, required) };
}

/**
 * Create the property definition for bottom.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for bottom.
 */
export function bottomProp(defaults?: boolean, required?: boolean) {
  return { bottom: boolProp(defaults ?? false, required) };
}

/**
 * Create the property definition for left.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for left.
 */
export function leftProp(defaults?: boolean, required?: boolean) {
  return { left: boolProp(defaults ?? false, required) };
}

/**
 * Property value for size.
 */
export type Size = 'small' | 'normal' | 'large';

/**
 * Create the property definition for size.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for size.
 */
export function sizeProp(defaults?: Size, required?: boolean) {
  return { size: prop<Size>(String, defaults ?? 'normal', required) };
}

/**
 * Property value for corner.
 */
export type Corner = 'tile' | 'round' | 'pill' | 'circle';

/**
 * Create the property definition for corner.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for corner.
 */
export function cornerProp(defaults?: Corner, required?: boolean) {
  return { corner: prop<Corner>(String, defaults, required) };
}

/**
 * Create the property definition for width.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for width.
 */
export function widthProp<T = string | number>(defaults?: T, required?: boolean) {
  return { width: prop<T>([String, Number], defaults, required) };
}

/**
 * Create the property definition for height.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for height.
 */
export function heightProp<T = string | number>(defaults?: T, required?: boolean) {
  return { height: prop<T>([String, Number], defaults, required) };
}

/**
 * Create the property definition for model.
 * @param type Native property type.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for model.
 */
export function modelProp<T>(type: any, defaults?: T, required?: boolean) {
  return { modelValue: prop<T>(type, defaults, required) };
}

/**
 * Create the property definition for Route Href.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for Route Href.
 */
export function routeHrefProp(defaults?: string, required?: boolean) {
  return { href: stringProp(defaults, required) };
}

/**
 * Create the property definition for Route Href.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for Route Href.
 */
export function routeReplaceProp(defaults?: boolean, required?: boolean) {
  return { replace: boolProp(defaults, required) };
}

/**
 * Property value for target.
 */
export type Target = '__blank' | '__self' | '__parent' | '__top' | string;

/**
 * Create the property definition for Route Target.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for Route Target.
 */
export function routeTargetProp(defaults?: Target, required?: boolean) {
  return { target: prop<Target>(String, defaults, required) };
}

/**
 * Create the property definition for Route To.
 * @param defaults Default value when undefined.
 * @param required Required; optional otherwise.
 * @returns Property definition for Route To.
 */
export function routeToProp(defaults?: RouteLocationRaw, required?: boolean) {
  return { to: prop<RouteLocationRaw>(Object, defaults, required) };
}

/**
 * Standardized css styles based on props.
 */
const cssStyles: {
  get widthCssStyle(): ComputedRef<string>;
  get heightCssStyle(): ComputedRef<string>;
} = {} as any;

// Css styles for props based on context.
['width', 'height'].forEach((key: string): void => {
  Object.defineProperty(cssStyles, `${key}CssStyle`, {
    get: (): ComputedRef<string> => propCssLength(key)
  });
});

/**
 * Standardized css classes based on props.
 */
const cssClasses: {
  get topCssClass(): ComputedRef<CssClasses>;
  get rightCssClass(): ComputedRef<CssClasses>;
  get bottomCssClass(): ComputedRef<CssClasses>;
  get leftCssClass(): ComputedRef<CssClasses>;
  get blockCssClass(): ComputedRef<CssClasses>;
  get cornerCssClass(): ComputedRef<CssClasses>;
  get borderCssClass(): ComputedRef<CssClasses>;
  get activeCssClass(): ComputedRef<CssClasses>;
  get disabledCssClass(): ComputedRef<CssClasses>;
  get sizeCssClass(): ComputedRef<CssClasses>;
  get stylingCssClass(): ComputedRef<CssClasses>;
  get variantCssClass(): ComputedRef<CssClasses>;
  get directionCssClass(): ComputedRef<CssClasses>;
  get absoluteCssClass(): ComputedRef<CssClasses>;
  get transparentCssClass(): ComputedRef<CssClasses>;
  get interactiveCssClass(): ComputedRef<CssClasses>;
} = {} as any;

// prettier-ignore
// Css classes for boolean props based on context.
['active', 'top', 'left', 'right', 'bottom', 'block', 'disabled',
    'absolute', 'border', 'transparent', 'interactive']
  .forEach((key: string): void => {
    Object.defineProperty(cssClasses, `${key}CssClass`, {
      get: (): ComputedRef<CssClasses> => propCssClass(key)
    });
  });

// Css classes for string prop based on context.
['corner', 'direction', 'size', 'styling', 'variant'].forEach((key: string): void => {
  Object.defineProperty(cssClasses, `${key}CssClass`, {
    get: (): ComputedRef<CssClasses> => propagateCssClass(key)
  });
});

/**
 * Get the component details for current instance.
 * @returns Autogenerated name and props.
 */
function getComponent(): { name: string; props: any } {
  const { $props, $options } = getCurrentInstance()?.proxy ?? {};
  // Get the autogenerated name and properties.
  return { name: toKebabCase($options?.__name ?? $options?.name), props: $props };
}

/**
 * Create the Css class for boolean prop name.
 * @param prop Property name.
 * @returns Computed with Css Class.
 */
function propCssClass(prop: string): ComputedRef<CssClasses> {
  const { name, props } = getComponent();
  return computed(() => ({
    [`${name}--${prop}`]: props[prop]
  }));
}
/**
 * Create the Css class for string prop name.
 * @param prop Property name.
 * @returns Computed with Css Class.
 */
function propagateCssClass(prop: string): ComputedRef<CssClasses> {
  const { name, props } = getComponent();
  return computed(() => ({
    [`${name}--${props[prop]}`]: props[prop]
  }));
}

/**
 * Create the Css value for length prop name.
 * @param prop Property name.
 * @returns Computed with Css value.
 */
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

/**
 * Create the attributes for native link.
 * @param props Component props.
 * @returns Link attributes.
 */
function createNativeLinkAttrs(props: any) {
  return { href: props.href, target: props.target };
}

/**
 * Create the attributes for route link.
 * @param name Component name.
 * @param props Component props.
 * @returns Route attributes.
 */
function createRouteLinkAttrs(name: string, props: any) {
  return {
    'to': props.to,
    'target': props.target,
    'replace': props.replace,
    'active-class': `${name}--active`,
    'exact-active-class': `${name}--exact-active`
  };
}

/**
 * Composable to handle the Css styles based on props.
 * @returns Helpers to generate styles.
 */
export function usePropsCssStyles(): typeof cssStyles {
  return cssStyles;
}

/**
 * Composable to handle the Css classes based on props.
 * @returns Helpers to generate classes.
 */
export function usePropsCssClasses(): typeof cssClasses {
  return cssClasses;
}

/**
 * Composable to handle link tag and attrs based on props.
 * @returns Link tag and attrs.
 */
export function usePropsLink() {
  const { name, props } = getComponent();
  // Determine the native tag or resolved route component.
  const linkTag: ComputedRef<Component | string | null> = computed(() => {
    return props?.href ? 'a' : props.to ? resolveComponent('RouterLink') : null;
  });
  // Determine the attrs bound to native or route link.
  const linkAttrs: Record<string, any> = computed(() =>
    props.to ? createRouteLinkAttrs(name, props) : props.href ? createNativeLinkAttrs(props) : null
  );

  return { linkTag, linkAttrs };
}
