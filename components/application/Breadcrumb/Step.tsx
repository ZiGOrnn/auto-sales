import { Breadcrumbs, Chip, Link } from "@mui/joy";
import { useContext } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Context } from "../../../src/context/store";
import { useSelectedTab } from "../../../src/utils/useSelectedTab";

type Props = {};

const Step = (props: Props) => {
  const { state } = useContext(Context);
  const { selectedTab } = useSelectedTab({ state });

  return (
    <Breadcrumbs separator={<IoChevronBackOutline />} aria-label="breadcrumbs">
      <Chip size="sm" variant="soft" color="info">
        {selectedTab?.label.toUpperCase()}
      </Chip>
      {state.applicaton.breadcrumbs.map((item) => (
        <Link
          sx={{ fontSize: "12px" }}
          onClick={(event) => event.preventDefault()}
          key={item.value}
          underline="hover"
          color="neutral"
          fontSize="inherit"
        >
          {item.titel}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default Step;
