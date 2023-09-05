import {
  ColorPaletteProp,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  ListItem,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { IoCheckmarkCircleSharp, IoDocumentTextSharp } from "react-icons/io5";
import { Context } from "../../../src/context/store";
import { BundleRecord } from "../../../src/repositories/types/bundleRecord";
import { GetListBundlesUsecaseImpl } from "../../../src/usecases/bundle/getListBundles.usecase";
import { interestRateCalculator } from "../../../src/utils/interestRateCalculator";
import RadioGroupList from "../../checked/RadioGroupList";
import styles from "./Bundle.module.css";

type Props = {};

type BundValue = "pa" | "cl";

interface DurationYear {
  label: string;
  value: string;
}

interface BundList {
  label: string;
  value: BundValue;
  color: ColorPaletteProp;
  icon: React.ReactNode;
}

const bundList: BundList[] = [
  {
    label: "PA",
    value: "pa",
    color: "info",
    icon: <IoDocumentTextSharp fontSize={18} />,
  },

  {
    label: "CL",
    value: "cl",
    color: "info",
    icon: <IoDocumentTextSharp fontSize={18} />,
  },
];

const durationYearList: DurationYear[] = [
  {
    label: "1 Year",
    value: "1",
  },
  {
    label: "2 Year",
    value: "2",
  },
  {
    label: "3 Year",
    value: "3",
  },
  {
    label: "5 Year",
    value: "5",
  },
  {
    label: "6 Year",
    value: "6",
  },
];

const Bundle = (props: Props) => {
  const { state, dispatch } = useContext(Context);
  const { bundleInfo } = state.applicaton;

  const [bundles, setBundles] = useState<BundleRecord[]>([]);
  const [priceCoverage, setPriceCoverage] = useState(0);

  const onChangeBundle = (bundle: BundleRecord) => {
    dispatch({
      type: "SET_APPLICATON_BUNDLE_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          bundleInfo: {
            ...bundleInfo,
            bundle,
          },
        },
      },
    });
  };

  const onChangeCoverage = (coverage: number) => {
    dispatch({
      type: "SET_APPLICATON_BUNDLE_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          bundleInfo: {
            ...bundleInfo,
            coverage,
          },
        },
      },
    });
    const price = interestRateCalculator(
      state.applicaton.product.model.price,
      coverage
    );
    setPriceCoverage(price);
  };

  const onChangeDurationYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({
      type: "SET_APPLICATON_BUNDLE_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          bundleInfo: {
            ...bundleInfo,
            durationYear: e.target.value,
          },
        },
      },
    });
  };

  const getListBundles = async () => {
    try {
      const getListBundlesUsecase = new GetListBundlesUsecaseImpl();
      const bundlesData = await getListBundlesUsecase.execute();
      setBundles(bundlesData);
    } catch (error) {
      console.log("🚀 ~ file: Bundle.tsx:138 ~ getListBundles ~ error:", error);
    }
  };

  const setBreadcrumbs = () => {
    const cb = state.applicaton.breadcrumbs.find(
      (b) => b.value === "confirm-bundle"
    );
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
              titel: "Bundle",
              value: "confirm-bundle",
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    setBreadcrumbs();
    getListBundles();
    dispatch({
      type: "SET_APPLICATON_NEXT_BACK_TAB",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          nextTab: "completed",
          backTab: "confirm-repayment",
        },
      },
    });
    return () => {};
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: 16 }}
    >
      <div className={styles.bundle_row}>
        <div className={styles.bundle}>
          <Typography
            level="body3"
            textTransform="uppercase"
            fontWeight="lg"
            mb={1}
          >
            Bundle
          </Typography>
          <div className={styles.bundles_list}>
            <FormControl sx={{ p: 2, gap: 2 }}>
              <RadioGroup value={bundleInfo.bundle.id}>
                {bundles.map((bundle) => (
                  <Radio
                    color="info"
                    key={bundle.id}
                    value={bundle.id}
                    label={
                      <div>
                        <FormLabel>{bundle.title}</FormLabel>
                        <FormHelperText>{bundle.description}</FormHelperText>
                      </div>
                    }
                    onChange={(e) => onChangeBundle(bundle)}
                  ></Radio>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className={styles.divider}>
          <Divider />
        </div>
        <div className={styles.bundle}>
          <Typography
            level="body3"
            textTransform="uppercase"
            fontWeight="lg"
            mb={1}
          >
            Car Price
          </Typography>
          <Typography
            fontSize="24px"
            lineHeight={1}
            startDecorator={
              <Typography fontSize="lg" textColor="text.secondary">
                ฿
              </Typography>
            }
            sx={{ alignItems: "flex-start" }}
          >
            {state.applicaton.product.model.price.toLocaleString()}
          </Typography>
          <div className={styles.bundle_title}>
            <Typography
              level="body3"
              textTransform="uppercase"
              fontWeight="lg"
              mb={1}
            >
              Coverage Amount
            </Typography>
          </div>
          <Slider
            color="info"
            marks={false}
            orientation="horizontal"
            size="lg"
            valueLabelDisplay="auto"
            variant="solid"
            value={bundleInfo.coverage}
            max={100}
            onChange={(e, v) => onChangeCoverage(+v)}
            valueLabelFormat={(v) => `${v}%`}
          />
          <Typography
            fontSize="24px"
            lineHeight={1}
            startDecorator={
              <Typography fontSize="lg" textColor="text.secondary">
                ฿
              </Typography>
            }
            sx={{ alignItems: "flex-start" }}
          >
            {priceCoverage.toLocaleString()}
          </Typography>
          <div className={styles.bundle_title}>
            <Typography
              level="body3"
              textTransform="uppercase"
              fontWeight="lg"
              mb={1}
            >
              Duration (Year)
            </Typography>
          </div>
          <RadioGroupList value={bundleInfo.durationYear}>
            {durationYearList.map((item) => (
              <ListItem key={item.value} variant="outlined">
                <Radio
                  id={item.value}
                  value={item.value}
                  checkedIcon={<IoCheckmarkCircleSharp />}
                  color="info"
                  onChange={onChangeDurationYear}
                />
                <FormLabel htmlFor={item.value}>{item.label}</FormLabel>
              </ListItem>
            ))}
          </RadioGroupList>
        </div>
      </div>
    </motion.div>
  );
};

export default Bundle;
