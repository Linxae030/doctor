import { execCommand } from "../exec";
import { ValidateFn } from "../types";
import { getPkgLatestVersionByName } from "../common";

const isPkgInstalled: ValidateFn = async (pkgName, versionCommand) => {
  return new Promise((resolve, reject) => {
    execCommand(versionCommand)
      .then(async (res) => {
        try {
          const latestVersion = await getPkgLatestVersionByName(pkgName);
          resolve({
            isInstalled: true,
            pkgName,
            currentVersion: res,
            latestVersion,
          });
        } catch (err) {}
      })
      .catch((error) => {
        reject({
          isInstalled: false,
          pkgName,
        });
      });
  });
};

export default isPkgInstalled;
