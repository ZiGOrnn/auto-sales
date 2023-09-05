import { List, RadioGroup, radioClasses } from "@mui/joy";
import { Children } from "../../src/types/children";

interface Props extends Children {
  value: string;
}

const RadioGroupList = ({ value, children }: Props) => {
  return (
    <RadioGroup
      aria-label="platform"
      value={value}
      overlay
      name="platform"
      sx={{
        flexDirection: "row",
        gap: 2,
        [`& .${radioClasses.checked}`]: {
          [`& .${radioClasses.action}`]: {
            inset: -1,
            border: "3px solid",
            borderColor: "info.500",
          },
        },
        [`& .${radioClasses.radio}`]: {
          display: "contents",
          "& > svg": {
            zIndex: 2,
            position: "absolute",
            top: "-8px",
            right: "-8px",
            bgcolor: "background.body",
            borderRadius: "50%",
          },
        },
      }}
    >
      <List
        orientation="horizontal"
        wrap
        sx={{
          minWidth: 240,
          "--ListDivider-gap": "0px",
          "--List-gap": "1rem",
          "--ListItem-radius": "8px",
          "--ListItemDecorator-size": "48px",
        }}
      >
        {children}
      </List>
    </RadioGroup>
  );
};

export default RadioGroupList;
