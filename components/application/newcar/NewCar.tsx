import { TabPanel, Tabs } from "@mui/joy";
import { useContext } from "react";
import { Context } from "../../../src/context/store";
import ConsentModal from "../../consent/ConsentModal";
import CreditScore from "../../credit-score/CreditScore";
import Otp from "../../opt/Otp";
import Bundle from "../bundle/Bundle";
import CarInfo from "../carInfo/CarInfo";
import Completede from "../completede/Completede";
import CustomerInfo from "../customer-info/CustomerInfo";
import EkycMenu from "../e-kyc-menu/EkycMenu";
import LoanCalculator from "../loan-calculator/LoanCalculator";
import Payment from "../payment/Payment";
import Verification from "../verification/Verification";

const NewCar = () => {
  const { state } = useContext(Context);

  return (
    <>
      <Tabs value={state.applicaton.tab}>
        <TabPanel value="car-info">
          <CarInfo />
        </TabPanel>
        <TabPanel value="loan-calculator">
          <LoanCalculator />
        </TabPanel>
        <TabPanel value="e-kyc">
          <Verification />
        </TabPanel>
        <TabPanel value="e-kyc-menu">
          <EkycMenu />
        </TabPanel>
        <TabPanel value="credit-score">
          <CreditScore />
        </TabPanel>
        <TabPanel value="customer-info">
          <CustomerInfo />
        </TabPanel>
        <TabPanel value="confirm-car-info">
          <CarInfo disabled />
        </TabPanel>
        <TabPanel value="confirm-loan-info">
          <LoanCalculator disabled />
        </TabPanel>
        <TabPanel value="confirm-repayment">
          <Payment />
        </TabPanel>
        <TabPanel value="confirm-bundle">
          <Bundle />
        </TabPanel>
        <TabPanel value="completed">
          <Completede type="detiled" />
        </TabPanel>
      </Tabs>
      <Otp />
      <ConsentModal />
    </>
  );
};

export default NewCar;
