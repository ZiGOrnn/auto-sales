import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import { Rate } from "antd";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AiFillFrown, AiFillMeh, AiFillSmile } from "react-icons/ai";
import {
  IoCalendarNumberOutline,
  IoCalendarOutline,
  IoCallOutline,
  IoCarSportOutline,
  IoCashOutline,
  IoColorFillOutline,
  IoDocumentTextOutline,
  IoEllipseSharp,
  IoInformationCircleOutline,
  IoLocationOutline,
  IoMailOutline,
  IoPersonOutline,
  IoShieldCheckmarkOutline,
  IoStatsChartOutline,
  IoTransgenderOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { Context } from "../../../src/context/store";
import ScoreCard from "../../credit-score/ScoreCard";
import GoogleLocations from "../../map/GoogleMap";
import styles from "./Completede.module.css";

interface Props {
  type: "detiled" | "editable";
}

const customIcons: Record<number, React.ReactNode> = {
  1: <AiFillFrown />,
  2: <AiFillFrown />,
  3: <AiFillMeh />,
  4: <AiFillSmile />,
  5: <AiFillSmile />,
};

const Completede = ({ type }: Props) => {
  const { state, dispatch } = useContext(Context);
  const [isCreditScore, setIsCreditScore] = useState(false);
  const {
    finance,
    loan,
    customerInfo,
    bundleInfo,
    score,
    product: { brand, model, year, modelImage },
  } = state.applicaton;

  const setBreadcrumbs = () => {
    const cb = state.applicaton.breadcrumbs.find(
      (b) => b.value === "completed"
    );
    if (cb) return;
    dispatch({
      type: "SET_APPLICATON_BREADCRUMBS",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          breadcrumbs: [
            ...state.applicaton.breadcrumbs,
            {
              titel: "Completed",
              value: "completed",
            },
          ],
        },
      },
    });
  };
  useEffect(() => {
    setBreadcrumbs();
    return () => {};
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Modal open={isCreditScore}>
        <ModalDialog
          aria-labelledby="modal-credit-score"
          aria-describedby="modal-description-credit-score"
        >
          <div className={styles.modal_score_card}>
            <ScoreCard />
          </div>
          <Stack>
            <Button
              color="info"
              variant="outlined"
              onClick={() => setIsCreditScore(false)}
            >
              Close
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
      <div className="title">
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Credi Score
        </Typography>
      </div>
      <List component="nav">
        <ListItemButton onClick={() => setIsCreditScore(true)}>
          <ListItemDecorator>
            <IoStatsChartOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Score
            <br />
            <Typography color="success" level="body1">
              830
            </Typography>
          </Typography>
        </ListItemButton>
      </List>
      <div className="title">
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Finance
        </Typography>
      </div>

      <List component="nav">
        <ListItem
          {...(type === "editable" && {
            endAction: (
              <Button startDecorator="+" color="info" variant="outlined">
                Add
              </Button>
            ),
          })}
        >
          <ListItemButton>
            <ListItemDecorator>
              <IoStatsChartOutline />
            </ListItemDecorator>
            <Typography color="success" level="body1">
              Score 60%
            </Typography>
            <Rate
              allowHalf
              style={{ color: "#1A7D35" }}
              value={3.5}
              character={({ index }) => {
                if (!index) return;
                return customIcons[index + 1];
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <IoWalletOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Income
            <br />
            <Typography level="body1">{finance.income.title}</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoCashOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Debt
            <br />
            <Typography level="body1">{finance.debt.title}</Typography>
          </Typography>
        </ListItemButton>
      </List>
      <div className="title">
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Car Info
        </Typography>
      </div>
      <List component="nav">
        <ListItem
          {...(type === "editable" && {
            endAction: (
              <Button startDecorator="+" color="info" variant="outlined">
                Add
              </Button>
            ),
          })}
        >
          <ListItemButton>
            <ListItemDecorator>
              <IoStatsChartOutline />
            </ListItemDecorator>
            <Typography color="success" level="body1">
              Score 60%
            </Typography>
            <Rate
              allowHalf
              style={{ color: "#1A7D35" }}
              value={3.5}
              character={({ index }) => {
                if (!index) return;
                return customIcons[index + 1];
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <IoCarSportOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Brand Car
            <br />
            <Typography level="body1">{brand.name}</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoInformationCircleOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Model
            <br />
            <Typography level="body1">{model.model}</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoCalendarNumberOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Year
            <br />
            <Typography level="body1">{year.year}</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoCashOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Price
            <br />
            <Typography level="body1">
              ฿{model.price.toLocaleString()}
            </Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoColorFillOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Color
            <br />
            <Typography level="body1">
              <IoEllipseSharp color={modelImage.color_code} />
            </Typography>
          </Typography>
        </ListItemButton>
      </List>
      <div className="title">
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Loan
        </Typography>
      </div>
      <List component="nav">
        <ListItem
          {...(type === "editable" && {
            endAction: (
              <Button startDecorator="+" color="info" variant="outlined">
                Add
              </Button>
            ),
          })}
        >
          <ListItemButton>
            <ListItemDecorator>
              <IoStatsChartOutline />
            </ListItemDecorator>
            <Typography color="success" level="body1">
              Score 60%
            </Typography>
            <Rate
              allowHalf
              style={{ color: "#1A7D35" }}
              value={3.5}
              character={({ index }) => {
                if (!index) return;
                return customIcons[index + 1];
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <IoShieldCheckmarkOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Loan Coverage
            <br />
            <Typography level="body1">{+loan.coverage}%</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>%</ListItemDecorator>
          <Typography level="body3">
            Interest Rate Per Year
            <br />
            <Typography level="body1">{+loan.interestRate}%</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoCalendarNumberOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Year
            <br />
            <Typography level="body1">{loan.durationYear}</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoCalendarOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Number of Installments
            <br />
            <Typography level="body1">{loan.numInstallments}</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoCashOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Installment/Month
            <br />
            <Typography level="body1">
              {parseFloat(loan.installmentMonth).toLocaleString()}
            </Typography>
          </Typography>
        </ListItemButton>
      </List>
      <div className="title">
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Bundle
        </Typography>
      </div>
      <List component="nav">
        <ListItem
          {...(type === "editable" && {
            endAction: (
              <Button startDecorator="+" color="info" variant="outlined">
                Add
              </Button>
            ),
          })}
        >
          <ListItemButton>
            <ListItemDecorator>
              <IoStatsChartOutline />
            </ListItemDecorator>
            <Typography color="success" level="body1">
              Score 60%
            </Typography>
            <Rate
              allowHalf
              style={{ color: "#1A7D35" }}
              value={3.5}
              character={({ index }) => {
                if (!index) return;
                return customIcons[index + 1];
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <IoDocumentTextOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Bundle Type
            <br />
            <Typography level="body1">{bundleInfo.bundle.title}</Typography>
            {bundleInfo.bundle.description && (
              <>
                <br />
                <Typography level="body2">
                  {bundleInfo.bundle.description}
                </Typography>
              </>
            )}
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoCashOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Coverage Amount
            <br />
            <Typography level="body1">{bundleInfo.coverage}%</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoCalendarNumberOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Year
            <br />
            <Typography level="body1">{bundleInfo.durationYear}</Typography>
          </Typography>
        </ListItemButton>
      </List>
      <div className="title">
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Customer Information
        </Typography>
      </div>
      <List component="nav">
        <ListItem
          {...(type === "editable" && {
            endAction: (
              <Button startDecorator="+" color="info" variant="outlined">
                Add
              </Button>
            ),
          })}
        >
          <ListItemButton>
            <ListItemDecorator>
              <IoStatsChartOutline />
            </ListItemDecorator>
            <Typography color="success" level="body1">
              Score 60%
            </Typography>
            <Rate
              allowHalf
              style={{ color: "#1A7D35" }}
              value={3.5}
              character={({ index }) => {
                if (!index) return;
                return customIcons[index + 1];
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <IoTransgenderOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Gender
            <br />
            <Typography level="body1">{customerInfo.gender}</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoPersonOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Name
            <br />
            <Typography level="body1">
              {customerInfo.firstName} {customerInfo.lastName}
            </Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoMailOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Email
            <br />
            <Typography level="body1">{customerInfo.email}</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoCallOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Phone Number
            <br />
            <Typography level="body1">{customerInfo.phoneNumber}</Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoCalendarNumberOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Date Of Birth
            <br />
            <Typography level="body1">
              {`${customerInfo.dateOfBirth.day}/${customerInfo.dateOfBirth.month}/${customerInfo.dateOfBirth.year}`}
            </Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoLocationOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Province
            <br />
            <Typography level="body1">
              {customerInfo.address.province.province}
            </Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoLocationOutline />
          </ListItemDecorator>
          <Typography level="body3">
            District
            <br />
            <Typography level="body1">
              {customerInfo.address.district.amphoe}
            </Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoLocationOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Sub-District
            <br />
            <Typography level="body1">
              {customerInfo.address.subDistrict.district}
            </Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoLocationOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Postal Code
            <br />
            <Typography level="body1">
              {customerInfo.address.postalCode}
            </Typography>
          </Typography>
        </ListItemButton>
        <ListItemButton>
          <ListItemDecorator>
            <IoLocationOutline />
          </ListItemDecorator>
          <Typography level="body3">
            Detail
            <br />
            <Typography level="body1">
              {customerInfo.address.detail || "-"}
            </Typography>
          </Typography>
        </ListItemButton>
      </List>
      <div className="title">
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Location
        </Typography>
      </div>
      <br />
      <GoogleLocations />
    </motion.div>
  );
};

export default Completede;
