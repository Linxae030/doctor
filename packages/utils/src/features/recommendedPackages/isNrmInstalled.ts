import { execCommand } from "../../exec";
import { ValidateFn } from "../../types";

const isNrmInstalled: ValidateFn = async (pkgName) => {
  return new Promise((resolve, reject) => {
    execCommand("nrm -V")
      .then((res) => {
        resolve({
          isInstalled: true,
          pkgName,
          msg: res,
        });
      })
      .catch((error) => {
        reject({
          isInstalled: false,
          pkgName,
          msg: "",
        });
      });
  });
};

export default isNrmInstalled;
