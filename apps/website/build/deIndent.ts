import deIndent from 'de-indent';
import type { Plugin, TransformResult } from 'vite';

// RegExp to identify pug template.
const fileRegExp = /vue&type=template/;

// Plugin to remove lead indent in templates.
export default function (): Plugin {
  return {
    // Plugin name.
    name: 'de-indent',
    // Code transformation.
    transform(src: string, id: string): TransformResult {
      if (fileRegExp.test(id))
        // De-indent template to avoid issue with root indent.
        return { code: deIndent(src), map: null };
    }
  };
}
