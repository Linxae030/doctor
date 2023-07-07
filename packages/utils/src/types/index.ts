import { type IDoctorSourceParseResult } from "../features/scanningParser";

export type Awaitable<T> = T | Promise<T>;

export type ValidateFn = (
  pkgName: string,
  versionCommand: string
) => Awaitable<ValidateReturnValue>;

export interface SourceFile {
  path?: string;
  imports?: IDoctorSourceParseResult["imports"];
  contents?: string;
}

export interface ValidateReturnValue {
  /** 是否安装 */
  isInstalled: boolean;
  /** 包名 */
  pkgName: string;
  /** 当前版本 */
  currentVersion?: string;
  /** 最新版本 */
  latestVersion?: string;
}

export interface VerifiableItem {
  /** 包名 */
  pkgName: string;
  /** 获取版本指令 */
  versionCommand: string;
}
