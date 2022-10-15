import { createContext, useContext, Dispatch } from "react";
export const DEFAULT_CONFIG = {
  userInfo: {
    name: "",
    sex: "",
    greet:''
  },
};
// todo: 注意！！！这里的ts应该这样子写！！！
type IConfig = typeof DEFAULT_CONFIG & {
  dispatch: Dispatch<{ type: string; value: any }>;
};
const context = createContext<IConfig>(DEFAULT_CONFIG as IConfig);
export const ContextProvider = context.Provider;
export function useToBe() {
  return useContext(context);
}
