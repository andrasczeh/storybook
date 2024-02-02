import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';

export function readPackageJson(): Record<string, any> | false {
  const packageJsonPath = path.resolve('package.json');
  if (!existsSync(packageJsonPath)) {
    return false;
  }

  const jsonContent = readFileSync(packageJsonPath, 'utf8');
  return JSON.parse(jsonContent);
}
