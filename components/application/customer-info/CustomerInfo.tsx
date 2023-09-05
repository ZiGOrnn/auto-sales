"use client";

import {
  Avatar,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  ListItemDecorator,
  Option,
  Radio,
  Select,
  Textarea,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { DAY, MONTH } from "../../../src/constants/dateOfBirth";
import { Context } from "../../../src/context/store";
import { AddressRecord } from "../../../src/repositories/types/addressRecord";
import { GetAmphoeUsecaseImpl } from "../../../src/usecases/address/getAmphoe.usecase";
import { GetProvinceUsecaseImpl } from "../../../src/usecases/address/getProvince.usecase";
import { GetListSubDistrictUsecaseImpl } from "../../../src/usecases/address/getSubDistrict.usecase";
import RadioGroupList from "../../checked/RadioGroupList";
import styles from "./CustomerInfo.module.css";
import { GenderList } from "./types";

const genderList: GenderList[] = [
  {
    label: "Male",
    value: "male",
    color: "primary",
    icon: <IoMdMale fontSize={18} />,
  },
  {
    label: "Female",
    value: "female",
    color: "danger",
    icon: <IoMdFemale fontSize={18} />,
  },
];

const CustomerInfo = () => {
  const { state, dispatch } = useContext(Context);

  const { customerInfo } = state.applicaton;

  const [provinces, setProvinces] = useState<AddressRecord[]>([]);
  const [amphoes, setAmphoes] = useState<AddressRecord[]>([]);
  const [subDistricts, setSubDistricts] = useState<AddressRecord[]>([]);

  const getProvinces = async () => {
    try {
      const getProvinceUsecase = new GetProvinceUsecaseImpl();
      const getProvince = getProvinceUsecase.execute();
      setProvinces(getProvince);
    } catch (error) {
      console.log(
        "🚀 ~ file: CustomerInfo.tsx:58 ~ getProvinces ~ error:",
        error
      );
    }
  };

  const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch({
      type: "SET_APPLICATON_CUSTOMER_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          customerInfo: {
            ...customerInfo,
            gender: e.target.value,
          },
        },
      },
    });
  };

  const onChangeProvince = async (provinceCode: number) => {
    try {
      let province = provinces.find((pv) => pv.province_code === provinceCode);
      if (!province) return;

      const getAmphoeUsecase = new GetAmphoeUsecaseImpl();
      const amphoe = getAmphoeUsecase.execute(province.province_code);
      setAmphoes(amphoe);

      dispatch({
        type: "SET_APPLICATON_CUSTOMER_INFO",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            customerInfo: {
              ...customerInfo,
              address: {
                ...customerInfo.address,
                province,
              },
            },
          },
        },
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: CustomerInfo.tsx:108 ~ onChangeProvince ~ error:",
        error
      );
    }
  };

  const onChangeDistrict = async (districtCode: number) => {
    try {
      let district = amphoes.find((ap) => ap.amphoe_code === districtCode);
      if (!district) return;
      const getListSubDistrictUsecase = new GetListSubDistrictUsecaseImpl();
      const subDistrict = getListSubDistrictUsecase.execute(
        district.amphoe_code
      );
      setSubDistricts(subDistrict);

      dispatch({
        type: "SET_APPLICATON_CUSTOMER_INFO",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            customerInfo: {
              ...customerInfo,
              address: {
                ...customerInfo.address,
                district,
              },
            },
          },
        },
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: CustomerInfo.tsx:145 ~ onChangeDistrict ~ error:",
        error
      );
    }
  };

  const onChangeSubDistrict = (subDistrictCode: number) => {
    let subDistrict = subDistricts.find(
      (dist) => dist.district_code === subDistrictCode
    );
    if (!subDistrict) return;

    dispatch({
      type: "SET_APPLICATON_CUSTOMER_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          customerInfo: {
            ...customerInfo,
            address: {
              ...customerInfo.address,
              subDistrict,
              postalCode: subDistrict.zipcode.toString(),
            },
          },
        },
      },
    });
  };

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch({
      type: "SET_APPLICATON_CUSTOMER_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          customerInfo: {
            ...customerInfo,
            firstName: e.target.value,
          },
        },
      },
    });
  };

  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch({
      type: "SET_APPLICATON_CUSTOMER_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          customerInfo: {
            ...customerInfo,
            lastName: e.target.value,
          },
        },
      },
    });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch({
      type: "SET_APPLICATON_CUSTOMER_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          customerInfo: {
            ...customerInfo,
            email: e.target.value,
          },
        },
      },
    });
  };

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch({
      type: "SET_APPLICATON_CUSTOMER_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          customerInfo: {
            ...customerInfo,
            phoneNumber: e.target.value,
          },
        },
      },
    });
  };

  const onChangeDay = (day: string) => {
    dispatch({
      type: "SET_APPLICATON_CUSTOMER_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          customerInfo: {
            ...customerInfo,
            dateOfBirth: {
              ...customerInfo.dateOfBirth,
              day,
            },
          },
        },
      },
    });
  };

  const onChangeMonth = (month: string) => {
    dispatch({
      type: "SET_APPLICATON_CUSTOMER_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          customerInfo: {
            ...customerInfo,
            dateOfBirth: {
              ...customerInfo.dateOfBirth,
              month,
            },
          },
        },
      },
    });
  };

  const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch({
      type: "SET_APPLICATON_CUSTOMER_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          customerInfo: {
            ...customerInfo,
            dateOfBirth: {
              ...customerInfo.dateOfBirth,
              year: e.target.value,
            },
          },
        },
      },
    });
  };

  const onChangeDetail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    dispatch({
      type: "SET_APPLICATON_CUSTOMER_INFO",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          customerInfo: {
            ...customerInfo,
            address: {
              ...customerInfo.address,
              detail: e.target.value,
            },
          },
        },
      },
    });
  };

  const setBreadcrumbs = () => {
    const cb = state.applicaton.breadcrumbs.find(
      (b) => b.value === "customer-info"
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
              titel: "Customer Info",
              value: "customer-info",
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    setBreadcrumbs();
    getProvinces();
    dispatch({
      type: "SET_APPLICATON_NEXT_BACK_TAB",
      payload: {
        ...state,
        applicaton: {
          ...state.applicaton,
          nextTab: "confirm-car-info",
          backTab: "credit-score",
        },
      },
    });
    return () => {};
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
      <div className={styles.gender}>
        <FormControl>
          <FormLabel>Gender</FormLabel>
        </FormControl>
        <RadioGroupList value={customerInfo.gender}>
          {genderList.map((item) => (
            <ListItem key={item.value} variant="outlined">
              <Radio
                id={item.value}
                value={item.value}
                checkedIcon={<IoCheckmarkCircleSharp />}
                color="info"
                onChange={onChangeGender}
              />
              <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                <Avatar color={item.color} variant="soft" size="sm">
                  {item.icon}
                </Avatar>
              </ListItemDecorator>
              <FormLabel htmlFor={item.value}>{item.label}</FormLabel>
            </ListItem>
          ))}
        </RadioGroupList>
      </div>
      <div className={[styles.section_row, styles.customer_info].join(" ")}>
        <div className={styles.section_left}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              size="lg"
              value={customerInfo.firstName}
              onChange={onChangeFirstName}
            />
          </FormControl>
        </div>
        <div className={styles.section_right}>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              size="lg"
              value={customerInfo.lastName}
              onChange={onChangeLastName}
            />
          </FormControl>
        </div>
        <div className={styles.section_right}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              size="lg"
              value={customerInfo.email}
              onChange={onChangeEmail}
            />
          </FormControl>
        </div>
        <div className={styles.section_right}>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              size="lg"
              value={customerInfo.phoneNumber}
              onChange={onChangePhoneNumber}
            />
          </FormControl>
        </div>
      </div>
      <div className="title">
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Date of Birth
        </Typography>
      </div>
      <div
        className={[styles.section_date_of_birth, styles.date_of_birth].join(
          " "
        )}
      >
        <div className={styles.day}>
          <FormControl>
            <FormLabel>Day</FormLabel>
            <Select
              value={customerInfo.dateOfBirth.day}
              size="lg"
              placeholder="DD"
              sx={{ minWidth: 90 }}
              onChange={(_, v) => onChangeDay(v as string)}
            >
              {DAY.map((day) => (
                <Option key={day} value={day}>
                  {day}
                </Option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.month}>
          <FormControl>
            <FormLabel>Month</FormLabel>
            <Select
              value={customerInfo.dateOfBirth.month}
              size="lg"
              placeholder="MM"
              sx={{ minWidth: 90 }}
              onChange={(_, v) => onChangeMonth(v as string)}
            >
              {MONTH.map((month) => (
                <Option key={month} value={month}>
                  {month}
                </Option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.year}>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input
              value={customerInfo.dateOfBirth.year}
              type="tel"
              size="lg"
              placeholder="YYYY"
              sx={{ maxWidth: "130px" }}
              onChange={onChangeYear}
            />
          </FormControl>
        </div>
      </div>
      <div className={"title"}>
        <Typography
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          mb={1}
        >
          Address
        </Typography>
      </div>
      <div className={styles.section_row}>
        <div className={styles.section_left}>
          <FormControl>
            <FormLabel>Province</FormLabel>
            <Select
              value={customerInfo.address.province.province_code}
              size="lg"
              onChange={(_, v) => onChangeProvince(v as number)}
            >
              {provinces.map((pv) => (
                <Option key={pv.province_code} value={pv.province_code}>
                  {pv.province}
                </Option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.section_right}>
          <FormControl>
            <FormLabel>District</FormLabel>
            <Select
              value={customerInfo.address.district.amphoe_code}
              size="lg"
              onChange={(_, v) => onChangeDistrict(v as number)}
            >
              {amphoes.map((ap) => (
                <Option key={ap.amphoe_code} value={ap.amphoe_code}>
                  {ap.amphoe}
                </Option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.section_left}>
          <FormControl>
            <FormLabel>Sub-district</FormLabel>
            <Select
              value={customerInfo.address.subDistrict.district_code}
              size="lg"
              onChange={(_, v) => onChangeSubDistrict(v as number)}
            >
              {subDistricts.map((sd) => (
                <Option key={sd.district_code} value={sd.district_code}>
                  {sd.district}
                </Option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.section_right}>
          <FormControl>
            <FormLabel>Postal Code</FormLabel>
            <Input
              type="tel"
              size="lg"
              value={customerInfo.address.postalCode}
            />
          </FormControl>
        </div>
      </div>
      <div className={styles.details}>
        <FormControl>
          <FormLabel>Details</FormLabel>
          <Textarea
            minRows={2}
            value={customerInfo.address.detail}
            onChange={onChangeDetail}
          />
        </FormControl>
      </div>
    </motion.div>
  );
};

export default CustomerInfo;
