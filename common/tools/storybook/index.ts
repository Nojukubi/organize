export * from '@storybook/vue3';
import { defineComponent } from 'vue';
import type { Args, Meta, VueFramework } from '@storybook/vue3';

/**
 * Config used to define the Meta.
 * @property component Component target.
 * @property subcomponents Other components.
 */
export interface BaseConfig {
  component: VueFramework['component'];
  subcomponents?: Record<string, VueFramework['component']>;
}

/**
 * Config used to define the Story.
 * @property title Title with path.
 */
export interface StoryConfig extends BaseConfig {
  title: string;
}

/**
 * Config used to define the Case.
 * @property content Content.
 * @property template Template.
 */
export interface CaseConfig extends BaseConfig {
  content?: string;
  template?: string;
}

/**
 * Config used to define the Base Arg.
 * @property value Argument value.
 * @property hint Argument hint.
 * @property if Visibility condition.
 */
export interface BaseArgConfig<T = any> {
  value?: T;
  hint?: string;
  if?: {
    arg: string;
    truthy?: boolean;
  };
}

/**
 * Config used to define the Select Arg.
 * @property options Argument options.
 */
interface SelectArgConfig extends BaseArgConfig<string> {
  options: string[];
}

/**
 * Describes the story functionality.
 */
export interface Story extends Meta {
  /**
   * Set select argument type for story.
   * @param name Argument name.
   * @param config Argument config.
   * @returns Current story.
   */
  setSelectArgType(name: string, config: SelectArgConfig): Story;

  /**
   * Set string argument type for story.
   * @param name Argument name.
   * @param config Argument config.
   * @returns Current story.
   */
  setStringArgType(name: string, config: BaseArgConfig<string>): Story;

  /**
   * Set boolean argument type for story.
   * @param name Argument name.
   * @param config Argument config.
   * @returns Current story.
   */
  setBooleanArgType(name: string, config: BaseArgConfig<boolean>): Story;
}

/**
 * Describes the case functionality.
 */
export interface Case extends Meta {
  /**
   * Set argument value for case.
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
 * Create the story based on config.
 * @param config Story config.
 * @returns Story with config.
 */
export function createStory(config: StoryConfig): Story {
  // prettier-ignore
  return { ...config, args: {}, argTypes: {}, setSelectArgType,
    setBooleanArgType, setStringArgType };
}

/**
 * Create the case based on config.
 * @param config Case config.
 * @returns Case with config.
 */
export function createCase(config: CaseConfig): Case {
  const Proxy: Case = ((args: Args, { argTypes }): VueFramework['component'] =>
    defineComponent({
      // prettier-ignore
      setup: () => ({ target: config.component, ...config?.subcomponents,
        args: { ...defaultArgs(argTypes), ...normalizeArgs(args) } }),
      template:
        config?.template ??
        (config?.content
          ? `<component :is="target" v-bind="args">
              ${config?.content}
            </component>`
          : '<component :is="target" v-bind="args"/>')
    })) as unknown as Case;

  Proxy.args = {};
  Proxy.argTypes = {};
  Proxy.setArg = <any>setArg.bind(Proxy);
  Proxy.disableArg = <any>disableArg.bind(Proxy);
  return Proxy;
}

/**
 * Define the value for argument.
 * @param name Argument name.
 * @param value Argument value.
 */
function setArg<T extends Meta>(this: T, name: string, value: any): T {
  this.args = { ...this.args, [name]: value };
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

/**
 * Default the args based on the keys.
 * @param args Arguments.
 */
function defaultArgs(args: Args): Args {
  // prettier-ignore
  return Object.fromEntries(Object.keys(args)
    .map((key: string): string[] => [key]));
}

/**
 * Normalize the argument received from URL.
 * @param args Arguments.
 */
function normalizeArgs(args: Args): Args {
  for (let key in args) {
    if (args[key] === 'true') args[key] = true;
    else if (args[key] === 'false') args[key] = false;
  }

  return args;
}

/**
 * Create the base type based on config.
 * @param config Argument config.
 */
function createBaseArgType(config: BaseArgConfig): Record<string, unknown> {
  return { if: config.if, description: config.hint, defaultValue: config.value };
}

/**
 * Create the documentation for argument.
 * @param type Argument type.
 * @param value Argument value.
 */
function createDocArgType(type: string, value: any): Record<string, unknown> {
  const config: Record<string, any> = { table: {} };

  config.table.type = { summary: type };

  if (value !== undefined)
    // Define default value in case its exist.
    config.table.defaultValue = { summary: value };
  return config;
}

/**
 * Define the argument type as select.
 * @param name Argument name.
 * @param config Argument config.
 */
function setSelectArgType(this: Story, name: string, config: SelectArgConfig): Story {
  setArg.call(this, name, config.value);
  Object.assign(this.argTypes ?? {}, {
    [name]: {
      control: 'select',
      options: config.options,
      ...createBaseArgType(config),
      ...createDocArgType('select', config.value)
    }
  });

  return this;
}

/**
 * Define the argument type as boolean.
 * @param name Argument name.
 * @param config Argument config.
 */
function setBooleanArgType(this: Story, name: string, config: BaseArgConfig<boolean>): Story {
  setArg.call(this, name, config.value);
  Object.assign(this.argTypes ?? {}, {
    [name]: {
      control: 'boolean',
      ...createBaseArgType(config),
      ...createDocArgType('boolean', config.value)
    }
  });

  return this;
}

/**
 * Define the argument type as string.
 * @param name Argument name.
 * @param config Argument config.
 */
function setStringArgType(this: Story, name: string, config: BaseArgConfig<string>): Story {
  setArg.call(this, name, config.value);
  Object.assign(this.argTypes ?? {}, {
    [name]: {
      control: 'text',
      ...createBaseArgType(config),
      ...createDocArgType('string', config.value)
    }
  });

  return this;
}
