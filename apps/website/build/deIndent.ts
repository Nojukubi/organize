import deInd from 'de-indent';

const fileRegex = /vue&type=template/;

export default function deIndent() {
  return {
    name: 'de-indent',
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: deInd(src),
          map: null
        };
      }
    }
  };
}
