import { reactive } from 'vue';

const globalConfig = reactive({
  styling: 'flat'
});

function getGlobalConfig() {
  return globalConfig;
}

function changeGlobalConfig(config) {
  Object.assign(globalConfig, config);
}

export function useGlobalConfig() {
  return { getGlobalConfig, changeGlobalConfig };
}
