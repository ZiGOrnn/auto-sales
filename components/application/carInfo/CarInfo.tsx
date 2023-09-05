import { Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Context } from "../../../src/context/store";
import Finance from "../finance/Finance";
import ImgProduct from "../img-product/ImgProduct";
import styles from "../newcar/NewCar.module.css";
import ProductInfo from "../product-info/ProductInfo";

interface Props {
  disabled?: boolean;
}

const CarInfo = ({ disabled }: Props) => {
  const { state, dispatch } = useContext(Context);

  const setBreadcrumbs = () => {
    const cb = state.applicaton.breadcrumbs.find((b) => b.value === "car-info");
    if (cb) return;
    dispatch({
      type: "SET_APPLICATON_BREADCRUMBS",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          breadcrumbs: [
            ...state.applicaton.breadcrumbs,
            {
              titel: "Car Info",
              value: "car-info",
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    if (disabled) {
      dispatch({
        type: "SET_APPLICATON_NEXT_BACK_TAB",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            nextTab: "confirm-loan-info",
            backTab: "customer-info",
          },
        },
      });
    } else {
      setBreadcrumbs();
      dispatch({
        type: "SET_APPLICATON_NEXT_BACK_TAB",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            nextTab: "loan-calculator",
            backTab: "car-info",
          },
        },
      });
    }

    return () => {};
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Finance disabled={disabled} />
      <div className={styles.title}>
        <Typography
          id="decorated-list-demo"
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Car Info
        </Typography>
      </div>
      <div className={styles.section_row}>
        <ImgProduct />
        <ProductInfo disabled={disabled} />
      </div>
    </motion.div>
  );
};

export default CarInfo;
