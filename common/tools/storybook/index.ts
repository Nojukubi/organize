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
   * Set boolean argument type for story.
   * @param name Argument name.
   * @param value Initial value.
   * @param doc Documentation.
   * @returns Current story.
   */
  setBooleanArgType(name: string, value: boolean, doc: string): Story;
}

/**
 * Describes the case functionality.
 */
export interface Case extends Meta {
  /**
   * Set argument value.
   * @param name Argument name.
   * @param value Argument value.
   * @returns Current case.
   */
  setArg(name: string, value: boolean): Case;

  /**
   * Disable argument for case.
   * @param name Argument name.
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
  return { title, component, args: {}, argTypes: {}, setBooleanArgType,
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
      template: configs?.content
        ? `<component :is="target" v-bind="args">
            ${configs?.content}
          </component>`
        : '<component :is="target" v-bind="args"/>'
    })) as unknown as Case;

  Proxy.args = {};
  Proxy.argTypes = {};
  Proxy.setArg = <any>setArg.bind(Proxy);
  Proxy.disableArg = <any>disableArg.bind(Proxy);
  return Proxy;
}

/**
 * Define the argument type as boolean.
 * @param name Argument name.
 * @param value Init value.
 * @param doc Documentation.
 */
function setBooleanArgType<T extends Meta>(this: T, name: string, value: boolean, doc: string): T {
  setArg.call(this, name, value);
  Object.assign(this.argTypes ?? {}, { [name]: { control: 'boolean', description: doc } });
  return this;
}

/**
 * Define the argument value.
 * @param name Argument name.
 * @param value Argument value.
 */
function setArg<T extends Meta>(this: T, name: string, value: boolean): T {
  Object.assign(this.args ?? {}, { [name]: value });
  return this;
}

/**
 * Disable the argument as control.
 * @param name Argument name.
 */
function disableArg<T extends Meta>(this: T, name: string): T {
  this.argTypes = { ...this.argTypes, [name]: { table: { disable: true } } };
  return this;
}
