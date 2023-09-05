"use client";

import {
  Avatar,
  Container,
  IconButton as IconButtonJoy,
  ListItemDecorator,
  Menu,
  MenuItem,
  Stack,
} from "@mui/joy";
import {
  AppBar,
  Box,
  IconButton as IconButtonMui,
  Toolbar,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import {
  IoChevronBack,
  IoLogOutOutline,
  IoNotifications,
  IoPersonOutline,
} from "react-icons/io5";
import { Context } from "../../src/context/store";
import { Children } from "../../src/types/children";
import { Path } from "../../src/types/path";

interface Props extends Children {
  backButton?: boolean;
}

const Nav = ({ backButton, children }: Props) => {
  const { state, dispatch } = useContext(Context);

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenu = Boolean(anchorEl);

  const onClickBackButton = () => {
    router.back();
  };

  const onClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClickLogout = () => {
    dispatch({ type: "SET_INITIAL_STATE", payload: state });
    router.replace(Path.Login);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#ffffff",
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        style={{ borderBottom: "1px solid #f3f3f3", background: "#ffffff" }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters variant="dense">
            {backButton ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <IconButtonMui onClick={onClickBackButton} size="small">
                  <IoChevronBack fontSize={24} color="#4C297D" />
                </IconButtonMui>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Image
                  src="/images/logo/logo_scb.png"
                  width={100}
                  height={40}
                  alt="logo_scb"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            )}

            <Box sx={{ flexGrow: 1 }} />
            <Stack alignItems="center" direction="row" spacing={1}>
              <Box>
                <IconButtonJoy size="sm" variant="outlined" color="neutral">
                  <IoNotifications fontSize={18} color="#4C297D" />
                </IconButtonJoy>
              </Box>
              <Box>
                <IconButtonMui
                  size="small"
                  aria-controls={isMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={isMenu ? "true" : undefined}
                  onClick={onClickProfile}
                >
                  <Avatar size="sm" alt="ic_scb" src="/icons/ic_scb.png" />
                </IconButtonMui>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={isMenu}
                  onClose={onCloseMenu}
                  aria-labelledby="basic-demo-button"
                >
                  <MenuItem>
                    <ListItemDecorator>
                      <IoPersonOutline />
                    </ListItemDecorator>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={onClickLogout}>
                    <ListItemDecorator>
                      <IoLogOutOutline />
                    </ListItemDecorator>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </div>
  );
};

export default Nav;
