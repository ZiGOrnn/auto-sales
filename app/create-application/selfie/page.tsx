"use client";

import {
  Button,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useContext } from "react";
import { IoCameraOutline, IoEllipse, IoScanOutline } from "react-icons/io5";
import Content from "../../../components/content/Content";
import { Context } from "../../../src/context/store";
import { useSelectedTab } from "../../../src/utils/useSelectedTab";
import styles from "../create-application.module.css";

const selfieList = [
  {
    label: "Make sure that you are well lit.",
  },
  {
    label: "Clealy show your face.",
  },
  {
    label: "Keep your phone vertical.",
  },
];

const Selfie = () => {
  const { state } = useContext(Context);

  const { selectedTab } = useSelectedTab({ state });

  return (
    <>
      <Container maxWidth="md">
        {selectedTab && (
          <Content>
            <div className={styles.divider_from_product}>
              <Divider>
                <Chip variant="soft" color={selectedTab.color} size="sm">
                  FROM {selectedTab.label}
                </Chip>
              </Divider>
            </div>
          </Content>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.selfie}>
            <Box sx={{ flexGrow: 1 }} />
            <Stack spacing={2}>
              <Stack
                color="#814CDE"
                alignItems="center"
                justifyContent="center"
              >
                <IoScanOutline fontSize={240} />
              </Stack>
              <Typography level="h2" fontSize="xl" sx={{ mb: 0.5 }}>
                Please take a portrait selfie.
              </Typography>
              <div>
                <List
                  aria-labelledby="decorated-list-demo"
                  sx={{ "--ListItemDecorator-size": "32px" }}
                >
                  {selfieList.map((item) => {
                    return (
                      <ListItem key={item.label}>
                        <ListItemDecorator>
                          <IoEllipse fontSize={12} />
                        </ListItemDecorator>
                        {item.label}
                      </ListItem>
                    );
                  })}
                </List>
              </div>
              <Button
                color="info"
                startDecorator={<IoCameraOutline fontSize={18} />}
                style={{ marginTop: "14px", borderRadius: 30 }}
                onClick={() => {}}
              >
                Open the camera
              </Button>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
          </div>
        </motion.div>
      </Container>
    </>
  );
};

export default Selfie;
