import {
  Box,
  Button,
  FormControl,
  FormLabel,
  List,
  Modal,
  ModalDialog,
  Stack,
  Switch,
  Typography,
} from "@mui/joy";
import { useContext } from "react";
import { Context } from "../../src/context/store";

const CONSENT_MENU = [
  {
    title: "Freely Given",
    discription: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Beatae aspernatur necessitatibus illum. Qui incidunt illum
    illo dolore explicabo distinctio nisi, voluptatum, praesentium
    modi ipsam rem facilis, sequi aliquam vel pariatur.`,
    checked: false,
  },
  {
    title: "Reversible",
    discription: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Beatae aspernatur necessitatibus illum. Qui incidunt illum
    illo dolore explicabo distinctio nisi, voluptatum, praesentium
    modi ipsam rem facilis, sequi aliquam vel pariatur.`,
    checked: false,
  },
  {
    title: "Informed",
    discription: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Beatae aspernatur necessitatibus illum. Qui incidunt illum
    illo dolore explicabo distinctio nisi, voluptatum, praesentium
    modi ipsam rem facilis, sequi aliquam vel pariatur.`,
    checked: false,
  },
  {
    title: "Specific",
    discription: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Beatae aspernatur necessitatibus illum. Qui incidunt illum
    illo dolore explicabo distinctio nisi, voluptatum, praesentium
    modi ipsam rem facilis, sequi aliquam vel pariatur.`,
    checked: false,
  },
];

const ConsentModal = () => {
  const { state, dispatch } = useContext(Context);

  const onCloseModal = () => {
    dispatch({
      type: "SET_APPLICATON_IS_CONSENT",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          isConsent: false,
        },
      },
    });
  };

  return (
    <Modal open={state.applicaton.isConsent}>
      <ModalDialog
        aria-labelledby="dialog-vertical-scroll-title"
        layout="center"
      >
        <Typography id="dialog-vertical-scroll-title" component="h2">
          Privacy Settings
        </Typography>

        <List
          sx={{
            overflow: "scroll",
            mx: "calc(-1 * var(--ModalDialog-padding))",
            px: "var(--ModalDialog-padding)",
          }}
        >
          {CONSENT_MENU.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#f7f7f7",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              <FormControl
                orientation="horizontal"
                sx={{
                  p: 1,
                  borderRadius: "8px",
                }}
              >
                <FormLabel>
                  {item.title} {index + 1}
                </FormLabel>
                <Switch
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                  sx={{ ml: "auto" }}
                />
              </FormControl>
              <Typography padding={"0px 8px 8px 8px"} level="body3">
                {item.discription}
              </Typography>
            </div>
          ))}
        </List>
        <Stack direction="row">
          <Box flex={1} />
          <Button color="info" onClick={onCloseModal}>
            Accept
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default ConsentModal;
