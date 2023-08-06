import { createContext} from "react";

export const context = createContext([]);

export default function Provider({ children }) {
  return <context.Provider value={[]}>{children}</context.Provider>;
}
