"use client";

import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { useState } from "react";
import MyApplication from "./MyApplication";
import MyCase from "./MyCase";

type Props = {};

const TabCaseBasKet = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <Tabs
      size="sm"
      aria-label="Outlined tabs"
      value={tabIndex}
      onChange={(_, value) => {
        setTabIndex(value as number);
      }}
      sx={{ borderRadius: "lg" }}
    >
      <TabList sx={{ width: "300px", marginLeft: "auto" }} variant="outlined">
        <Tab
          variant={tabIndex === 0 ? "solid" : "plain"}
          color={tabIndex === 0 ? "info" : "neutral"}
        >
          My Application
        </Tab>
        <Tab
          variant={tabIndex === 1 ? "solid" : "plain"}
          color={tabIndex === 1 ? "info" : "neutral"}
        >
          My Case
        </Tab>
      </TabList>
      <TabPanel value={0} sx={{ p: 2, paddingLeft: 0, paddingRight: 0 }}>
        <MyApplication />
      </TabPanel>
      <TabPanel value={1} sx={{ p: 2, paddingLeft: 0, paddingRight: 0 }}>
        <MyCase />
      </TabPanel>
    </Tabs>
  );
};

export default TabCaseBasKet;
