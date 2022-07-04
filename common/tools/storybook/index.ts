export * from '@storybook/vue3';
import { defineComponent } from 'vue';
// prettier-ignore
import type { Args, Meta,
  VueFramework } from '@storybook/vue3';

/**
 * Configs used to define the case.
 * @property content Component content.
 */
export interface CaseConfig {
  content?: number | string;
}

/**
 * Describes the story functionality.
 */
export interface Story extends Meta {
  /**
   * Create the case for defined story.
   * @param configs Case configs.
   * @returns Created case.
   */
  createCase(configs?: CaseConfig): Case;

  /**
   * Set a boolean argument for story.
   * @param name Arg name.
   * @param val Initial value.
   * @param doc Documentation.
   * @returns Current story.
   */
  setBooleanArg(name: string, val: boolean, doc: string): Story;
}

/**
 * Describes the case functionality.
 */
export interface Case extends Meta {
  /**
   * Disable the arg for defined case.
   * @param name Arg name.
   */
  disableArg(name: string): Case;
}

/**
 * Create story for the target component.
 * @param title Story title and path.
 * @param component Target component.
 * @returns Story with specified component.
 */
export function createStory(title: string, component: VueFramework['component']): Story {
  // prettier-ignore
  return { title, component, args: {}, argTypes: {}, setBooleanArg,
    createCase: createCase.bind({}, component) };
}

/**
 * Create case for the target component.
 * @param component Target component.
 * @param configs Custom configs.
 * @returns Case with specified component.
 */
export function createCase(component: VueFramework['component'], configs?: CaseConfig): Case {
  const Proxy: Case = ((args: Args): VueFramework['component'] =>
    defineComponent({
      setup: () => ({ target: component, args }),
      template: `
        <component :is="target" v-bind="args">
          ${configs?.content}
        </component>`
    })) as unknown as Case;

  Proxy.args = {};
  Proxy.argTypes = {};
  Proxy.disableArg = disableArg.bind(Proxy);
  return Proxy;
}

/**
 * Define the argument as boolean.
 * @param name Arg name.
 * @param val Initial value.
 * @param doc Documentation.
 */
function setBooleanArg<T extends Meta>(this: T, name: string, val: boolean, doc: string): T {
  Object.assign(this.args ?? {}, { [name]: val });
  return this;
}

/**
 * Disable the argument as control.
 * @param name Arg name.
 */
function disableArg<T extends Case>(this: T, name: string): T {
  this.argTypes = { ...this.argTypes, [name]: { table: { disable: false } } };
  return this;
}
