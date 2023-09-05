import { useContext } from "react";
import { Context } from "../../../src/context/store";
import DipChip from "../dipchip/DipChip";
import EKYC from "../ekyc/EKYC";

const EkycMenu = () => {
  const { state } = useContext(Context);

  return (
    <div>
      {state.applicaton.ekyc === "dip-chip" && <DipChip />}
      {state.applicaton.ekyc === "ekyc" && <EKYC />}
    </div>
  );
};

export default EkycMenu;
