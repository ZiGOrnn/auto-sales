"use client";

import {
  Button,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Content from "../../../components/content/Content";
import { Context } from "../../../src/context/store";
import { useSelectedTab } from "../../../src/utils/useSelectedTab";
import styles from "../create-application.module.css";

const photoID = [
  {
    label: "National Identity Card",
    value: "national_identity_card",
  },
  {
    label: "International Passport",
    value: "international_passport",
  },
  {
    label: "Drivers License",
    value: "drivers_license",
  },
];

const PhotoID = () => {
  const { state } = useContext(Context);

  const { selectedTab } = useSelectedTab({ state });
  const [verified, setVerified] = useState(photoID[0].value);

  const onChangeVerified = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVerified(e.target.value);
  };

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
          <div className="title">
            <Typography
              level="body3"
              textTransform="uppercase"
              fontWeight="lg"
              mb={1}
            >
              Verify your identity
            </Typography>
          </div>
          <div className={styles.photo_id}>
            <Stack spacing={2}>
              <RadioGroup aria-label="Your plan" name="people" value={verified}>
                <List
                  sx={{
                    minWidth: 240,
                    "--List-gap": "0.5rem",
                    "--ListItem-paddingY": "1rem",
                    "--ListItem-radius": "8px",
                    "--ListItemDecorator-size": "32px",
                  }}
                >
                  {photoID.map((item) => (
                    <ListItem
                      variant="outlined"
                      key={item.label}
                      sx={{ boxShadow: "sm", bgcolor: "background.body" }}
                    >
                      <Radio
                        overlay
                        value={item.value}
                        label={item.label}
                        sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                        onChange={onChangeVerified}
                        slotProps={{
                          action: ({ checked }) => ({
                            sx: (theme) => ({
                              ...(checked && {
                                inset: -1,
                                border: "2px solid",
                                borderColor: theme.vars.palette.primary[500],
                              }),
                            }),
                          }),
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </RadioGroup>
              <div className={styles.selfie_row}>
                <Button
                  disabled={!verified}
                  variant="soft"
                  color="info"
                  startDecorator={<MdOutlineAddPhotoAlternate fontSize={18} />}
                  style={{ marginTop: "14px", borderRadius: 30 }}
                  onClick={() => {}}
                >
                  Upload ad Image
                </Button>
                <Button
                  disabled={!verified}
                  color="info"
                  startDecorator={<IoCameraOutline fontSize={18} />}
                  style={{ marginTop: "14px", borderRadius: 30 }}
                  onClick={() => {}}
                >
                  Open the camera
                </Button>
              </div>
            </Stack>
          </div>
        </motion.div>
      </Container>
    </>
  );
};

export default PhotoID;
