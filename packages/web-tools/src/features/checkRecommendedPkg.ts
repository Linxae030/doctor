import { DoctorLevel } from "@doctors/core";
import { IApi } from "../type";
import {
  ValidateReturnValue,
  VerifiableItem,
  chalkByDoctorLevel,
  isNrmInstalled,
} from "@doctors/utils";
import { CORRECT_ICON, ERROR_ICON } from "../constants";
const RecommendPackages: VerifiableItem[] = [
  {
    pkgName: "nrm",
    validateFn: isNrmInstalled,
  },
];

/** 按安装状态排序 */
const sortValidateRes = (validateRes: ValidateReturnValue[]) => {
  return validateRes.sort((a, b) => {
    if (a.isInstalled && !b.isInstalled) return -1;
    else return 0;
  });
};

// 生成描述信息
function generateDescription(validateRes, doctorLevel) {
  let description = "";
  const sortedValidateRes = sortValidateRes(validateRes);

  for (const item of sortedValidateRes) {
    if (item.isInstalled) {
      description += ` ${CORRECT_ICON}  '${
        item.pkgName
      }' is installed ${chalkByDoctorLevel(
        DoctorLevel.SUCCESS,
        `Now: v${item.msg}`
      )}\n`;
    } else if (doctorLevel === DoctorLevel.WARN) {
      description += ` ${ERROR_ICON} '${item.pkgName}' is not installed.\n`;
    }
  }

  return description;
}

// 处理检查结果
function handleValidateRes(validateRes) {
  let doctorLevel;
  let description;

  if (validateRes.every((result) => result.isInstalled)) {
    doctorLevel = DoctorLevel.SUCCESS;
    description = "All recommended packages is installed.\n";
  } else {
    doctorLevel = DoctorLevel.WARN;
    description = "Some recommended packages is not installed.\n";
  }

  description += generateDescription(validateRes, doctorLevel);

  return { doctorLevel, description };
}

export default (api: IApi) => {
  api.addDoctorWebToolsCheck(async () => {
    // TODO: 改config
    const ruleLevel = api.userConfig.webTools?.nodeVersion || DoctorLevel.WARN;

    if (ruleLevel === DoctorLevel.OFF) return;

    const validateRes = await Promise.allSettled(
      RecommendPackages.map((item) => item.validateFn?.(item.pkgName))
    );

    const formattedRes = validateRes.map(
      ({ status, ...rest }) => (rest as any)?.value || (rest as any)?.reason
    );

    const { doctorLevel, description } = handleValidateRes(formattedRes);

    return {
      label: "Recommend Package",
      description,
      doctorLevel,
    };
  });
};
