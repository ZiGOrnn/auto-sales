import { List, ListItem, ListItemDecorator, Typography } from "@mui/joy";
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoInformationCircleSharp,
} from "react-icons/io5";
import { Cell, Pie, PieChart } from "recharts";
import { ApplicationStatus } from "../../src/repositories/application/types/createApplicationRecord";
import styles from "./CreditScore.module.css";

const DATA = [{ value: 830 }, { value: 70 }];
const COLORS = [{ start: "#FF4E10", center: "#FAB732", end: "#68B34B" }];

interface CreditMenu {
  title: string;
  status: ApplicationStatus;
}

const CREDIT_MENU: CreditMenu[] = [
  {
    title: "Utilization Pattern Debt Burden",
    status: "Success",
  },
  {
    title: "Recent Credit",
    status: "Success",
  },
  {
    title: "Severity and Recency of Delinquency",
    status: "Success",
  },
  {
    title: "Depth of Credit",
    status: "Requested",
  },
  {
    title: "Thickness of Credit with good repayment",
    status: "Success",
  },
  {
    title: "Available Credit",
    status: "Not Qualified",
  },
  {
    title: "Enquiry Activity",
    status: "Success",
  },
];

const ScoreCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.fixed_wrapper}>
        <PieChart height={300} width={300}>
          <defs>
            <linearGradient id={`myGradient${0}`}>
              <stop offset="0%" stopColor={COLORS[0 % COLORS.length].start} />
              <stop offset="50%" stopColor={COLORS[0 % COLORS.length].center} />
              <stop offset="80%" stopColor={COLORS[0 % COLORS.length].end} />
            </linearGradient>
          </defs>
          <Pie
            startAngle={180}
            endAngle={0}
            innerRadius="55%"
            data={DATA}
            dataKey="value"
            labelLine={false}
            blendStroke
            isAnimationActive={false}
            cy={"70%"}
          >
            <Cell fill={`url(#myGradient${0})`} />
            <Cell fill="#eaeaea" />
          </Pie>
        </PieChart>
      </div>
      <div className={styles.credit_score}>
        <Typography sx={{ textTransform: "uppercase" }} level="body4">
          Credit Score
        </Typography>
        <Typography sx={{ textTransform: "uppercase" }} level="h2">
          830
        </Typography>
      </div>
      <div className={styles.start_score}>
        <Typography level="h6">0</Typography>
      </div>
      <div className={styles.end_score}>
        <Typography level="h6">900</Typography>
      </div>
      <div className={styles.list}>
        <List size="sm" sx={{ padding: "12px" }}>
          {CREDIT_MENU.map((credit) => (
            <ListItem key={credit.title}>
              <ListItemDecorator>
                {credit.status === "Success" && (
                  <IoCheckmarkCircleSharp color="#68B34B" />
                )}
                {credit.status === "Requested" && (
                  <IoInformationCircleSharp color="#FAB732" />
                )}
                {credit.status === "Not Qualified" && (
                  <IoCloseCircleSharp color="#FF4E10" />
                )}
              </ListItemDecorator>
              {credit.title}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default ScoreCard;
