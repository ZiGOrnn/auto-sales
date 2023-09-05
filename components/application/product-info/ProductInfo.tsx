import {
  FormLabel,
  Option,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Stack,
  radioClasses,
} from "@mui/joy";
import { QRCode } from "antd";
import { motion } from "framer-motion";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  IoCalendarNumberOutline,
  IoCarSportOutline,
  IoCheckmarkCircleSharp,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { Context } from "../../../src/context/store";
import { BrandRecord } from "../../../src/repositories/types/brandRecord";
import { CarModelImageRecord } from "../../../src/repositories/types/carModelImageRecord";
import { ModelRecord } from "../../../src/repositories/types/modelRecord";
import { YearRecord } from "../../../src/repositories/types/yearRecord";
import { GetCarModelImageUsecaseImpl } from "../../../src/usecases/car/getCarModelImage.usecase";
import { GetListBrandUsecaseImpl } from "../../../src/usecases/car/getListBrand.usecase";
import { GetListModelUsecaseImpl } from "../../../src/usecases/car/getListModel.usecase";
import { GetListYearModelUsecaseImpl } from "../../../src/usecases/car/getListYearModel.usecase";
import styles from "./ProductInfo.module.css";

interface Props {
  disabled?: boolean;
}

const ProductInfo = ({ disabled }: Props) => {
  const { state, dispatch } = useContext(Context);

  const [brands, setBrands] = useState<BrandRecord[]>([]);
  const [models, setModels] = useState<ModelRecord[]>([]);
  const [years, setYears] = useState<YearRecord[]>([]);
  const [modelImages, setModelImages] = useState<CarModelImageRecord[]>([]);

  const getListBrand = async () => {
    try {
      const getListBrandUsecase = new GetListBrandUsecaseImpl();
      const listBrand = await getListBrandUsecase.execute();
      setBrands(listBrand);
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductInfo.tsx:49 ~ getListBrand ~ error:",
        error
      );
    }
  };

  const getListModel = async (brandId: string) => {
    try {
      const getListModelUsecase = new GetListModelUsecaseImpl();
      const listModel = await getListModelUsecase.execute(brandId);
      if (!listModel) return;
      setModels(listModel);
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductInfo.tsx:61 ~ getListModel ~ error:",
        error
      );
    }
  };

  const getListYearModel = async (modelId: string) => {
    try {
      const getListYearModelUsecase = new GetListYearModelUsecaseImpl();
      const listYear = await getListYearModelUsecase.execute(modelId);
      if (!listYear) return;
      setYears(listYear);
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductInfo.tsx:74 ~ getListYearModel ~ error:",
        error
      );
    }
  };

  const getCarModelImage = async (modelId: string, yearId: string) => {
    try {
      const getCarModelImageUsecase = new GetCarModelImageUsecaseImpl();
      const listcarModelImage = await getCarModelImageUsecase.execute(
        modelId,
        yearId
      );
      if (!listcarModelImage) return;
      setModelImages(listcarModelImage);
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductInfo.tsx:90 ~ getCarModelImage ~ error:",
        error
      );
    }
  };

  const onChangeBrandCar = (value: string) => {
    const brand = brands.find((b) => b.id === value);
    if (!brand) return;

    getListModel(brand.id);

    dispatch({
      type: "SET_APPLICATON_PRODUCT_BRAND",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          product: {
            ...state.applicaton.product,
            brand: brand,
          },
        },
      },
    });
  };

  const onChangeModel = (value: string) => {
    const year = state.applicaton.product.year;
    const model = models.find((m) => m.id === value);

    if (!model) return;

    dispatch({
      type: "SET_APPLICATON_PRODUCT_MODEL",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          product: {
            ...state.applicaton.product,
            model: model,
          },
        },
      },
    });

    getListYearModel(model.id);

    if (year && model) {
      getCarModelImage(model.id, year.id);
    }
  };

  const onChangeYear = (value: string) => {
    const model = state.applicaton.product.model;
    const year = years.find((y) => y.id === value);

    if (!year) return;

    dispatch({
      type: "SET_APPLICATON_PRODUCT_YEAR",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          product: {
            ...state.applicaton.product,
            year: year,
          },
        },
      },
    });

    if (year && model) {
      getCarModelImage(model.id, year.id);
    }
  };

  const onChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const mImg = modelImages.find((mImg) => {
      return mImg.id === event.target.value;
    });
    if (!mImg) return;

    dispatch({
      type: "SET_APPLICATON_PRODUCT_MODEL_IMAGE",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          product: {
            ...state.applicaton.product,
            modelImage: mImg,
          },
        },
      },
    });
  };

  useEffect(() => {
    getListBrand();
    return () => {};
  }, []);

  return (
    <div className={styles.product_info}>
      <Stack spacing={2}>
        <Select
          disabled={disabled}
          size="lg"
          placeholder="Brand Car"
          startDecorator={<IoCarSportOutline />}
          value={state.applicaton.product.brand.id}
          onChange={(_, v) => onChangeBrandCar(v as string)}
        >
          {brands.map((brand) => (
            <Option key={brand.id} value={brand.id}>
              {brand.name}
            </Option>
          ))}
        </Select>
        <Select
          value={state.applicaton.product.model.id}
          disabled={disabled}
          size="lg"
          placeholder="Model"
          startDecorator={<IoInformationCircleOutline />}
          onChange={(_, v) => onChangeModel(v as string)}
        >
          {models.map((model) => (
            <Option key={model.id} value={model.id}>
              {model.model}
            </Option>
          ))}
        </Select>

        <Select
          value={state.applicaton.product.year.id}
          disabled={disabled}
          size="lg"
          placeholder="Year"
          startDecorator={<IoCalendarNumberOutline />}
          onChange={(_, v) => onChangeYear(v as string)}
        >
          {years.map((year) => (
            <Option key={year.id} value={year.id}>
              {year.year}
            </Option>
          ))}
        </Select>

        <FormLabel
          sx={{
            mb: 1.5,
            fontWeight: "xl",
            textTransform: "uppercase",
            fontSize: "xs",
          }}
        >
          Color
        </FormLabel>

        <RadioGroup
          aria-label="platform"
          defaultValue="Website"
          overlay
          name="platform"
          onChange={onChangeColor}
          sx={{
            flexDirection: "row",
            gap: 1.5,
            [`& .${radioClasses.checked}`]: {
              [`& .${radioClasses.action}`]: {
                inset: -1,
                border: "3px solid",
                borderColor: "info",
              },
            },
            [`& .${radioClasses.radio}`]: {
              display: "contents",
              "& > svg": {
                zIndex: 2,
                position: "absolute",
                top: "-8px",
                right: "-8px",
                bgcolor: "background.body",
                borderRadius: "50%",
              },
            },
          }}
        >
          {modelImages.map((ci) => (
            <Sheet
              key={ci.id}
              variant="outlined"
              sx={{
                border: "1px solid #e2e2e2",
                borderRadius: "50%",
                bgcolor: "background.body",
                boxShadow: "sm",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                p: 2,
                background: ci.color_code,
              }}
            >
              <Radio
                id={ci.id}
                value={ci.id}
                color="info"
                checkedIcon={<IoCheckmarkCircleSharp fontSize="xl2" />}
              />
            </Sheet>
          ))}
        </RadioGroup>

        <FormLabel
          sx={{
            mb: 1.5,
            fontWeight: "xl",
            textTransform: "uppercase",
            fontSize: "xs",
          }}
        >
          QR Code Brochure
        </FormLabel>

        {state.applicaton.product.model.brochure_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: 16, margin: "auto" }}
          >
            <QRCode
              value={state.applicaton.product.model.brochure_url}
              size={220}
            />
          </motion.div>
        )}
      </Stack>
    </div>
  );
};

export default ProductInfo;
