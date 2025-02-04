import { createContext, useContext, type RefObject } from "react";
import type { ModalComponentFunctions } from "src/components/common";

type HeaderContextData = {
  navModalRef: RefObject<ModalComponentFunctions>;
  query: string;
  isSearch: boolean;
  setQuery: (data: string) => void;
  setIsSearch: (data: boolean) => void;
};

const HeaderContext = createContext<HeaderContextData>(
  {} as HeaderContextData,
);

export default HeaderContext;

export function useHeaderContext() {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error(
      "useHeaderContext must be used within the HeaderContext.Provider.",
    );
  }

  return context;
}
