export function getToken() {
  return localStorage.getItem("token");
}
export function clearUserInfo() {
  localStorage.removeItem("loginStatus");
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("sex");
  localStorage.removeItem("greet");
}

export function setUserInfo(userInfo) {
  localStorage.setItem("loginStatus", '111');
  localStorage.setItem("token", userInfo.token);
  localStorage.setItem("name", userInfo.name);
  localStorage.setItem("sex", userInfo.sex);
  localStorage.setItem("greet", userInfo.greet);
}
