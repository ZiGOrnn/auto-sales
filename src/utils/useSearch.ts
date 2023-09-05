import { useEffect, useRef } from "react";

export const useSearch = (search: string, onSearch: (text: string) => void) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      const delayDebounceFn = setTimeout(() => {
        onSearch(search);
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else didMount.current = true;
  }, [search]);
};
