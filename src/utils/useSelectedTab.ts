"use client";

import { useEffect, useState } from "react";
import {
  ProductTypeView,
  products,
} from "../../components/application/product-type/ProductType";
import { InitialState } from "../context/types/initialState";

interface Props {
  state: InitialState;
}

export const useSelectedTab = ({ state }: Props) => {
  const [selectedTab, setSelectedTab] = useState<ProductTypeView>();

  useEffect(() => {
    const pd = products.find((f) => f.value === state.applicaton.fromProduct);
    setSelectedTab(pd);
    return () => {};
  }, [state.applicaton.fromProduct]);

  return {
    selectedTab,
  };
};
