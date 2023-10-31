import { jwtDecode } from "jwt-decode";
import { login } from "../services/store/features/account/accountSlice";

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const handleLogin = (data, dispatch) => {
  const loginData = {
    token: data.token,
    accountData: jwtDecode(data.token),
  };
  dispatch(login(loginData));
};

export const patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;
const validFileExtensions = {
  image: ["jpg", "png", "jpeg"],
};

export const isValidFileType = (fileName, fileType) => {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
};
