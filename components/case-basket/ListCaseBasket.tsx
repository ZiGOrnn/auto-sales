"use client";

import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import { ApplicationRecord } from "../../src/repositories/application/types/applicationRecord";
import { Path } from "../../src/types/path";
import styles from "./CaseBasket.module.css";
import EndAction, { CaseBasketType } from "./EndAction";

interface Props {
  type: CaseBasketType;
  applications: ApplicationRecord[];
}

const ListCaseBasket = ({ applications, type }: Props) => {
  const router = useRouter();

  const onClickCaseBasket = (item: ApplicationRecord) => {
    router.push(`${Path.CaseBasket}/${item.id}`);
  };

  return (
    <List
      aria-labelledby="ellipsis-list-demo"
      sx={{ "--ListItemDecorator-size": "64px" }}
    >
      {applications.map((app) => (
        <ListItem
          key={app.id}
          endAction={
            <div className={styles.end_action}>
              <EndAction size="md" type={type} application={app} />
            </div>
          }
        >
          <ListItemButton
            sx={{
              borderRadius: "5px",
              paddingRight: "12px",
              borderBottom: "1px solid #f2f2f2",
            }}
          >
            <ListItemDecorator
              onClick={() => onClickCaseBasket(app)}
              sx={{ alignSelf: "flex-start", margin: "auto" }}
            >
              <Avatar size="lg" src="/images/profile/profile1.jpg" />
            </ListItemDecorator>
            <ListItemContent>
              <Typography onClick={() => onClickCaseBasket(app)}>
                {app.costomer_info.first_name.toUpperCase()}{" "}
                {app.costomer_info.last_name.toUpperCase()}
              </Typography>

              <Typography
                onClick={() => onClickCaseBasket(app)}
                level="body2"
                noWrap
              >
                {app.car_model.model}
              </Typography>
              <Typography
                onClick={() => onClickCaseBasket(app)}
                level="body3"
                noWrap
              >
                {new Date(app.updated).toLocaleDateString()}{" "}
                {new Date(app.updated).toLocaleTimeString()}
              </Typography>
              <div className={styles.end_action_mobile}>
                <EndAction size="sm" type={type} application={app} />
              </div>
            </ListItemContent>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ListCaseBasket;
