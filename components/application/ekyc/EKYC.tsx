"use client";

import {
  Avatar,
  ColorPaletteProp,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { IoCheckmarkCircleSharp, IoInformationCircle } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Context } from "../../../src/context/store";
import { useBackBtnTab } from "../../../src/utils/useBackBtnTab";

export interface Verified {
  label: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  color: ColorPaletteProp;
  verified: boolean;
}

const verified: Verified[] = [
  {
    label: "Photo of Identity",
    title:
      "Yor can upload a National Identity Card, Driver's Liscence or Passport",
    path: "create-application/photo-id",
    icon: <FaRegAddressCard fontSize={24} />,
    color: "primary",
    verified: true,
  },
  {
    label: "Upload a selfie",
    title:
      "Yor can upload a National Identity Card, Driver's Liscence or Passport",
    path: "create-application/selfie",
    icon: <MdOutlineAddPhotoAlternate fontSize={24} />,
    color: "warning",
    verified: false,
  },
];

const EKYC = () => {
  const { state, dispatch } = useContext(Context);
  useBackBtnTab({ state, dispatch });

  const router = useRouter();

  const onClickVerification = (item: Verified) => {
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
          E-KYC
        </Typography>
      </div>
      <List
        aria-label="Personal info"
        sx={{ "--ListItemDecorator-size": "72px" }}
      >
        {verified.map((item) => {
          return (
            <ListItem key={item.label}>
              <ListItemButton
                // disabled={item.verified}
                sx={{
                  borderRadius: 6,
                }}
                onClick={() => onClickVerification(item)}
              >
                <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                  <Avatar
                    color={item.color}
                    size="lg"
                    sx={{ "--Avatar-size": "60px" }}
                  >
                    {item.icon}
                  </Avatar>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography fontSize="xl">{item.label}</Typography>
                  <Typography fontSize="xs">{item.title}</Typography>
                </ListItemContent>

                <ListItemDecorator sx={{ justifyContent: "end" }}>
                  {item.verified ? (
                    <IoCheckmarkCircleSharp color="#2dd36f" fontSize={24} />
                  ) : (
                    <IoInformationCircle fontSize={24} />
                  )}
                </ListItemDecorator>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </motion.div>
  );
};

export default EKYC;
