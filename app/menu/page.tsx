"use client";

import {
  Avatar,
  Container,
  List,
  ListItemButton,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { IoBriefcase, IoDocumentAttach, IoReader } from "react-icons/io5";
import Content from "../../components/content/Content";
import { ColorProp } from "../../components/mui/types";
import { Context } from "../../src/context/store";

interface Menu {
  name: string;
  path: string;
  color: ColorProp;
  icon: React.ReactNode;
}

const menu: Menu[] = [
  {
    name: "Create Application",
    path: "/create-application",
    color: "info",
    icon: <IoDocumentAttach fontSize={24} />,
  },
  {
    name: "Case Basket",
    path: "/case-basket",
    color: "primary",
    icon: <IoBriefcase fontSize={24} />,
  },
  {
    name: "Product Inquiry",
    path: "/product-inquiry",
    color: "success",
    icon: <IoReader fontSize={24} />,
  },
];

const Menu = () => {
  const { state, dispatch } = useContext(Context);

  const router = useRouter();

  const onClickMenu = (item: Menu) => {
    dispatch({
      type: "SET_APPLICATON_RESET",
      payload: {
        ...state,
      },
    });
    router.push(item.path);
  };

  return (
    <div>
      <Container maxWidth="md">
        <Content>
          <List
            aria-label="Personal info"
            sx={{ "--ListItemDecorator-size": "72px" }}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {menu.map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    onClick={() => onClickMenu(item)}
                    sx={{
                      borderRadius: 6,
                    }}
                  >
                    <ListItemDecorator>
                      <Avatar
                        color={item.color}
                        size="lg"
                        sx={{ "--Avatar-size": "60px" }}
                      >
                        {item.icon}
                      </Avatar>
                    </ListItemDecorator>
                    <div>
                      <Typography textColor="" fontSize="xl" color={item.color}>
                        {item.name}
                      </Typography>
                      <Typography fontSize="xs">
                        Apple ID, iCloud, Media & Purchase
                      </Typography>
                    </div>
                  </ListItemButton>
                );
              })}
            </motion.div>
          </List>
        </Content>
      </Container>
    </div>
  );
};

export default Menu;
