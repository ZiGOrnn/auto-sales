import {
  Avatar,
  ColorPaletteProp,
  List,
  ListItemButton,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { IoCarOutline, IoDocumentTextOutline } from "react-icons/io5";
import { Context } from "../../../src/context/store";
import { ProductValue } from "../../../src/context/types/inputType";
import { ProductTypeRecord } from "../../../src/repositories/product-type/types/productTypeRecord";
import { GetListProductTypeUsecaseImpl } from "../../../src/usecases/product/getListProductType.usecase";
import UsedCar from "../UsedCar";
import NewCar from "../newcar/NewCar";

export interface ProductTypeView {
  label: string;
  value: ProductValue;
  color: ColorPaletteProp;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export const products: ProductTypeView[] = [
  {
    label: "New Car",
    value: "new_car",
    color: "success",
    icon: <IoDocumentTextOutline fontSize={24} />,
    component: <NewCar />,
  },
  {
    label: "Used Car",
    value: "used_car",
    color: "primary",
    icon: <IoCarOutline fontSize={24} />,
    component: <UsedCar />,
  },
];

const ProductType = () => {
  const { state, dispatch } = useContext(Context);
  const [productType, setProductType] = useState<ProductTypeRecord[]>([]);

  const onClickProduct = (productType: ProductTypeRecord) => {
    dispatch({
      type: "SET_APPLICATON_FROM_PRODUCT",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          productType,
          fromProduct: productType.value as ProductValue,
        },
      },
    });
  };

  const getListProductType = async () => {
    try {
      const getListProductTypeUsecase = new GetListProductTypeUsecaseImpl();
      const productTypeData = await getListProductTypeUsecase.execute();
      setProductType(productTypeData);
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductType.tsx:67 ~ getListProductType ~ error:",
        error
      );
    }
  };

  useEffect(() => {
    getListProductType();

    return () => {};
  }, []);

  return (
    <div>
      <List
        aria-label="Personal info"
        sx={{ "--ListItemDecorator-size": "72px" }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {productType.map((item) => {
            return (
              <ListItemButton
                key={item.id}
                onClick={() => onClickProduct(item)}
                sx={{
                  borderRadius: 6,
                }}
              >
                <ListItemDecorator>
                  <Avatar
                    color="info"
                    size="lg"
                    sx={{ "--Avatar-size": "60px" }}
                  >
                    <IoDocumentTextOutline fontSize={24} />
                  </Avatar>
                </ListItemDecorator>
                <div>
                  <Typography textColor="" fontSize="xl" color="info">
                    {item.title}
                  </Typography>
                  <Typography fontSize="xs">{item.description}</Typography>
                </div>
              </ListItemButton>
            );
          })}
        </motion.div>
      </List>
    </div>
  );
};

export default ProductType;
