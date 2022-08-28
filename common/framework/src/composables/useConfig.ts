import { reactive } from 'vue';

const globalConfig = reactive({
  iconType: 'default',
  styling: 'flat'
});

function getGlobalConfig() {
  return globalConfig;
}

function changeGlobalConfig(config) {
  Object.assign(globalConfig, config);
}

function isIconSvg() {
  return globalConfig.iconType === 'svg';
}

export function useGlobalConfig() {
  return { getGlobalConfig, changeGlobalConfig, isIconSvg };
}
