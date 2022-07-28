const globalConfig = {
  iconType: 'default'
};

function getGlobalConfig() {
  return globalConfig;
}

function changeGlobalConfig(config) {
  globalConfig.iconType = config?.iconType;
}

function isIconSvg() {
  return globalConfig.iconType === 'svg';
}

export function useGlobalConfig() {
  return { getGlobalConfig, changeGlobalConfig, isIconSvg };
}
