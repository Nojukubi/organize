import type { Plugin, TransformResult } from 'vite';
export declare function transform(code: string, path: string): TransformResult;
export default function plugin(): Plugin;
