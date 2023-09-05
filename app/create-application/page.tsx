"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import { ChangeEvent, Suspense, useContext, useEffect, useState } from "react";
import Step from "../../components/application/Breadcrumb/Step";
import SelectProduct from "../../components/application/select-product/SelectProduct";
import { Context } from "../../src/context/store";
import {
  LocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../../src/utils/localStorage";
import { useSelectedTab } from "../../src/utils/useSelectedTab";
import styles from "./create-application.module.css";

const CreateApplication = () => {
  const { state } = useContext(Context);
  const { selectedTab } = useSelectedTab({ state });

  const [openTour, setOpenTour] = useState(false);

  const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLocalStorage(LocalStorage.Tutorial, e.target.checked);
  };

  useEffect(() => {
    const tutorial = getLocalStorage(LocalStorage.Tutorial);
    const fromProduct = state.applicaton.fromProduct === "none";
    if (!tutorial && fromProduct) {
      setTimeout(() => {
        setOpenTour(true);
      }, 500);
    }
    return () => {};
  }, []);

  return (
    <Suspense>
      <Container
        maxWidth="md"
        sx={{ paddingBottom: "20px", minHeight: "89vh" }}
      >
        <div className={styles.step_divider}>
          {selectedTab && (
            <div className={styles.divider_from_product}>
              {/* <Divider>
                <Chip variant="soft" color={selectedTab.color} size="sm">
                  FORM {selectedTab.label}
                </Chip>
              </Divider> */}
              <Step />
            </div>
          )}
          <SelectProduct />
        </div>
      </Container>
      <Modal keepMounted open={openTour}>
        <ModalDialog
          size="md"
          sx={{ width: "100%", maxWidth: "600px", maxHeight: "80vh" }}
        >
          <Typography component="h2">Procedure for use</Typography>
          <div className={styles.tour}>
            {JSON.stringify(selectedTab)}
            <Image
              src="/images/bg/bg_stab_fill_form.png"
              alt="bg_stab_fill_form"
              fill
              className={styles.tour_image}
            />
          </div>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <Checkbox label="don't show again" onChange={onChangeChecked} />
            <Box flex={1} />
            <Button
              variant="solid"
              color="info"
              onClick={() => setOpenTour(false)}
            >
              OK
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Suspense>
  );
};

export default CreateApplication;
