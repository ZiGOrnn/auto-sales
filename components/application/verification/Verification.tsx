import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { MdAdfScanner, MdVerified } from "react-icons/md";
import { Context } from "../../../src/context/store";
import { Ekyc } from "../../../src/context/types/inputType";

interface EkycMenu {
  label: string;
  value: Ekyc;
  icon: React.ReactNode;
}

const ekyc: EkycMenu[] = [
  {
    label: "Dip-Chip",
    value: "dip-chip",
    icon: <MdAdfScanner fontSize={24} />,
  },
  {
    label: "E-KYC",
    value: "ekyc",
    icon: <MdVerified fontSize={24} />,
  },
];

const Verification = () => {
  const { state, dispatch } = useContext(Context);

  const onClickEkyc = (v: EkycMenu) => {
    dispatch({
      type: "SET_APPLICATON_EKYC",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          ekyc: v.value,
          tab: "e-kyc-menu",
        },
      },
    });
  };

  const setBreadcrumbs = () => {
    const cb = state.applicaton.breadcrumbs.find((b) => b.value === "e-kyc");
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
              titel: "Verification",
              value: "e-kyc",
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    setBreadcrumbs();
    dispatch({
      type: "SET_APPLICATON_NEXT_BACK_TAB",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          nextTab: "e-kyc-menu",
          backTab: "confirm-loan-info",
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
    >
      <div className="title">
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          User ID Verification
        </Typography>
      </div>
      <List
        aria-label="Personal info"
        sx={{ "--ListItemDecorator-size": "72px" }}
      >
        {ekyc.map((item) => (
          <ListItem key={item.value}>
            <ListItemButton
              sx={{
                borderRadius: 6,
              }}
              onClick={() => onClickEkyc(item)}
            >
              <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                <Avatar color="info" size="lg" sx={{ "--Avatar-size": "60px" }}>
                  {item.icon}
                </Avatar>
              </ListItemDecorator>
              <ListItemContent>
                <Typography fontSize="xl">{item.label}</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </motion.div>
  );
};

export default Verification;
