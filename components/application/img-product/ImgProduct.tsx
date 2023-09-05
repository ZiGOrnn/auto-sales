import { Box, Card, IconButton, Typography } from "@mui/joy";
import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { Context } from "../../../src/context/store";
import styles from "./ImgProduct.module.css";

const ImgProduct = () => {
  const { state } = useContext(Context);

  return (
    <div className={styles.img_product}>
      <Card variant="outlined">
        {state.applicaton.product?.model?.model ? (
          <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
            {state.applicaton.product.model.model}
          </Typography>
        ) : (
          <Skeleton variant="text" width={"85%"} />
        )}

        {state.applicaton.product?.year?.year ? (
          <Typography level="body2">
            {state.applicaton.product.year.year}
          </Typography>
        ) : (
          <Skeleton variant="text" width={"20%"} />
        )}

        {state.applicaton.product?.brand?.logo ? (
          <IconButton
            disabled
            aria-label="logo_bmw Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
          >
            <Image
              alt="logo_bmw"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "25px",
                height: "auto",
                objectFit: "contain",
              }}
              src={state.applicaton.product.brand.logo}
            />
          </IconButton>
        ) : (
          <Skeleton
            variant="circular"
            sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
            width={25}
            height={25}
          />
        )}

        {state.applicaton.product.modelImage.image ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              alt="pd_bmw_m3"
              style={{
                width: "100%",
                height: "230px",
                objectFit: "contain",
              }}
              src={state.applicaton.product.modelImage.image}
            />
          </motion.div>
        ) : (
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{ height: "230px" }}
          />
        )}
        <Box>
          <div>
            <Typography level="body3">Total price:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              ฿{state.applicaton.product?.model?.price?.toLocaleString() || 0}
            </Typography>
          </div>
        </Box>
      </Card>
    </div>
  );
};

export default ImgProduct;
