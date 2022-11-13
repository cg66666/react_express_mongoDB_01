export function getUserInfo() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  return {token,id};
}
export function clearUserInfo() {
  localStorage.removeItem("loginStatus");
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("sex");
  localStorage.removeItem("greet");
}

export function setUserInfo(userInfo) {
  console.log("进来了！！！");
  localStorage.setItem("loginStatus", "111");
  localStorage.setItem("token", userInfo.token);
  localStorage.setItem("name", userInfo.name);
  localStorage.setItem("sex", userInfo.sex);
  localStorage.setItem("greet", userInfo.greet);
  localStorage.setItem("userId", userInfo.id);
}
