export function toKebabCase(str: string = ''): string {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
}
