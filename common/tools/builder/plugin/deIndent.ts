import deIndent from 'de-indent';
import type { Plugin, TransformResult } from 'vite';

// RegExp to determine template file.
const fileRegExp: RegExp = /vue&type=template/g;

// RegExp to find and replace template content.
const tplRegExp: RegExp = /(?<=<template[^>]*>)(.|\n)*?(?=<\/template>)/gm;

// Plugin to remove the lead indent in templates.
export default function (): Plugin {
  return {
    // Plugin name.
    name: 'de-indent',
    // Enforce order.
    enforce: 'pre',
    // Code transformation.
    transform(src: string, path: string): TransformResult {
      if (fileRegExp.test(path))
        // De-indent source of template.
        return { code: deIndent(src), map: null };

      if (path.endsWith('.vue'))
        // De-indent template by replacing it.
        return { code: src.replace(tplRegExp, deIndent(src.match(tplRegExp)[0])), map: null };
    }
  };
}
