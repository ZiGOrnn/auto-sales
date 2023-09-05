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
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoCheckmarkCircleSharp, IoInformationCircle } from "react-icons/io5";
import { MdAdfScanner } from "react-icons/md";
import { Context } from "../../../src/context/store";
import { useBackBtnTab } from "../../../src/utils/useBackBtnTab";
import { Verified } from "../ekyc/EKYC";

const dipChip: Verified = {
  label: "Dip-Chip ID Card",
  title: "Yor can upload a National Identity Card",
  path: "create-application/dip-chip",
  icon: <MdAdfScanner fontSize={24} />,
  color: "primary",
  verified: false,
};

const DipChip = () => {
  const { state, dispatch } = useContext(Context);
  const [dipChipMenu, setDipChipMenu] = useState<Verified>(dipChip);
  useBackBtnTab({ state, dispatch });

  const router = useRouter();

  const onClickDipChip = (item: Verified) => {
    dispatch({
      type: "SET_APPLICATON_BACK_BTN",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          backBtn: "router",
        },
      },
    });
    router.push(item.path);
  };

  useEffect(() => {
    if (state.applicaton.verified) {
      setDipChipMenu((v) => ({ ...v, verified: true }));
    }
    return () => {};
  }, [state.applicaton.verified]);

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
          Dip-chip
        </Typography>
      </div>
      <List
        aria-label="Personal info"
        sx={{ "--ListItemDecorator-size": "72px" }}
      >
        <ListItem key={dipChipMenu.path}>
          <ListItemButton
            sx={{
              borderRadius: 6,
            }}
            onClick={() => onClickDipChip(dipChipMenu)}
          >
            <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
              <Avatar
                color="primary"
                size="lg"
                sx={{ "--Avatar-size": "60px" }}
              >
                <MdAdfScanner fontSize={24} />
              </Avatar>
            </ListItemDecorator>
            <ListItemContent>
              <Typography fontSize="xl">{dipChipMenu.label}</Typography>
              <Typography fontSize="xs">{dipChipMenu.title}</Typography>
            </ListItemContent>
            <ListItemDecorator sx={{ justifyContent: "end" }}>
              {dipChipMenu.verified ? (
                <IoCheckmarkCircleSharp color="#2dd36f" fontSize={24} />
              ) : (
                <IoInformationCircle fontSize={24} />
              )}
            </ListItemDecorator>
          </ListItemButton>
        </ListItem>
      </List>
    </motion.div>
  );
};

export default DipChip;
