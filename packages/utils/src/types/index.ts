import { type IDoctorSourceParseResult } from "../features/scanningParser";

export type ValidateFn = (pkgName: string) => Awaitable<ValidateReturnValue>;
export type Awaitable<T> = T | Promise<T>;

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
  /** 附带信息 */
  msg: string;
}

export interface VerifiableItem {
  pkgName: string;
  validateFn: ValidateFn;
}
