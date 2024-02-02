import path from 'node:path';
import { sync } from 'pkg-dir';
import { existsSync, readFileSync } from 'node:fs';

const interpolate = (string: string, data: Record<string, string> = {}) =>
  Object.entries(data).reduce((acc, [k, v]) => acc.replace(new RegExp(`%${k}%`, 'g'), v), string);

export function getPreviewBodyTemplate(
  configDirPath: string,
  interpolations?: Record<string, string>
) {
  const base = readFileSync(`${sync(__dirname)}/templates/base-preview-body.html`, 'utf8');

  const bodyHtmlPath = path.resolve(configDirPath, 'preview-body.html');
  let result = base;

  if (existsSync(bodyHtmlPath)) {
    result = readFileSync(bodyHtmlPath, 'utf8') + result;
  }

  return interpolate(result, interpolations);
}

export function getPreviewHeadTemplate(
  configDirPath: string,
  interpolations?: Record<string, string>
) {
  const base = readFileSync(`${sync(__dirname)}/templates/base-preview-head.html`, 'utf8');
  const headHtmlPath = path.resolve(configDirPath, 'preview-head.html');

  let result = base;

  if (existsSync(headHtmlPath)) {
    result += readFileSync(headHtmlPath, 'utf8');
  }

  return interpolate(result, interpolations);
}
