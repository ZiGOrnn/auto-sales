"use client";

import {
  Box,
  Button,
  Chip,
  ColorPaletteProp,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalDialog,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import { useContext, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import {
  IoBagAdd,
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoInformationCircleSharp,
  IoPerson,
  IoShare,
} from "react-icons/io5";
import { Context } from "../../src/context/store";
import { ApplicationRecord } from "../../src/repositories/application/types/applicationRecord";
import { UpdateMyCase } from "../../src/repositories/application/types/updateMyCase";
import { UserRecord } from "../../src/repositories/auth/types/userRecord";
import { GetListUsersUsecaseImpl } from "../../src/usecases/auth/getListUsers.usecase";
import { AddMyCaseApplicationUsecaseImpl } from "../../src/usecases/case-basket/addMyCaseApplication.usecase";
import { DeleteMyCaseApplicationUsecaseImpl } from "../../src/usecases/case-basket/deleteMyCaseApplication.usecase";
import styles from "./CaseBasket.module.css";

export type CaseBasketType = "my-case-basket" | "case-basket";

interface Props {
  type: CaseBasketType;
  application: ApplicationRecord;
  size: "sm" | "md" | "lg";
}

const EndAction = ({ size, application, type }: Props) => {
  const { state, dispatch } = useContext(Context);
  const [irId, setIrId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalInternalReferral, setIsInternalReferral] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [users, setUsers] = useState<UserRecord[]>([]);

  const onChangeUsername = (value: string) => {
    console.log("🚀 ~ file: EndAction.tsx:56 ~ EndAction ~ value:", value);
    setIrId(value);
  };

  const submitInternalReferral = async () => {
    if (!irId) return;
    const payload: UpdateMyCase = {
      my_case: irId,
    };
    const addMyCaseApplicationUsecase = new AddMyCaseApplicationUsecaseImpl();
    await addMyCaseApplicationUsecase.execute(application.id, payload);
    dispatch({
      type: "SET_RELOAD",
      payload: state,
    });
    setIsInternalReferral(false);
  };

  const onClickInternalReferral = async () => {
    setIsInternalReferral(true);
    const getListUsersUsecase = new GetListUsersUsecaseImpl();
    const result = await getListUsersUsecase.execute(state.user.id);
    setUsers(result.items);
    setIrId("");
  };

  const onClickDelete = () => {
    setIsModalDelete(true);
  };

  const addMyCase = async () => {
    try {
      setIsLoading(true);
      const payload: UpdateMyCase = {
        my_case: state.user.id,
      };
      const addMyCaseApplicationUsecase = new AddMyCaseApplicationUsecaseImpl();
      await addMyCaseApplicationUsecase.execute(application.id, payload);
      setIsModalAdd(false);
      setIsLoading(false);
      dispatch({
        type: "SET_RELOAD",
        payload: state,
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const deleteCase = async () => {
    try {
      setIsLoading(true);
      const deleteMyCaseApplicationUsecase =
        new DeleteMyCaseApplicationUsecaseImpl();
      await deleteMyCaseApplicationUsecase.execute(application.id);
      setIsModalDelete(false);
      setIsLoading(false);
      dispatch({
        type: "SET_RELOAD",
        payload: state,
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getIcon = () => {
    switch (application.status) {
      case "Success":
        return <IoCheckmarkCircleSharp fontSize={16} />;
      case "Requested":
        return <IoInformationCircleSharp fontSize={16} />;
      case "Not Qualified":
        return <IoCloseCircleSharp fontSize={16} />;
      default:
        return <></>;
    }
  };

  const getColor = (): ColorPaletteProp => {
    switch (application.status) {
      case "Success":
        return "success";
      case "Requested":
        return "warning";
      case "Not Qualified":
        return "danger";
      default:
        return "info";
    }
  };

  const modalAdd = () => {
    return (
      <Modal open={isModalAdd} onClose={() => setIsModalAdd(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<IoBagAdd />}
          >
            Add Case Basket
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            Are you sure you want to add your Case Basket?
          </Typography>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setIsModalAdd(false)}
            >
              Cancel
            </Button>
            <Button
              loading={isLoading}
              variant="solid"
              color="info"
              onClick={addMyCase}
            >
              Add My Case
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    );
  };

  const modalInternalReferral = () => {
    return (
      <Modal
        open={isModalInternalReferral}
        onClose={() => setIsInternalReferral(false)}
      >
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<IoShare />}
          >
            Internal Referral
          </Typography>
          <Divider />
          <FormControl
            sx={{
              marginTop: "16px",
              marginBottom: "16px",
              width: "300px",
            }}
          >
            <FormLabel>Username</FormLabel>
            <Select
              size="lg"
              startDecorator={<IoPerson fontSize={18} />}
              onChange={(_, v) => onChangeUsername(v as string)}
            >
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.email}
                </Option>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setIsInternalReferral(false)}
            >
              Cancel
            </Button>
            <Button
              loading={isLoading}
              variant="solid"
              color="info"
              onClick={submitInternalReferral}
            >
              Submit
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    );
  };

  const modalDelete = () => {
    return (
      <Modal open={isModalDelete} onClose={() => setIsModalDelete(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<IoMdTrash />}
          >
            Delete Case Basket
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            Are you sure you want to delete your Case Basket?
          </Typography>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setIsModalDelete(false)}
            >
              Cancel
            </Button>
            <Button
              loading={isLoading}
              variant="solid"
              color="danger"
              onClick={deleteCase}
            >
              Delete Case
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    );
  };

  return (
    <>
      <Stack justifyContent="end" direction="row" spacing={2}>
        {application.status === "Requested" && (
          <div className={styles.chip}>
            <Chip size={size} variant="soft" color="warning">
              {application.score} %
            </Chip>
          </div>
        )}
        <div className={styles.chip}>
          <Chip
            size={size}
            variant="soft"
            color={getColor()}
            startDecorator={getIcon()}
          >
            {application.status}
          </Chip>
        </div>
        {type === "my-case-basket" && (
          <IconButton
            aria-label="remove-my-case-basket"
            size={size}
            color="info"
            onClick={onClickInternalReferral}
          >
            <IoShare fontSize={22} />
          </IconButton>
        )}
        <IconButton
          aria-label="Delete"
          size={size}
          color="danger"
          onClick={onClickDelete}
        >
          <IoMdTrash fontSize={22} />
        </IconButton>
      </Stack>
      {modalAdd()}
      {modalInternalReferral()}
      {modalDelete()}
    </>
  );
};

export default EndAction;
