"use client";

import { Container } from "@mui/joy";
import { useContext, useEffect } from "react";
import Completede from "../../../components/application/completede/Completede";
import {
  Address,
  DateOfBirth,
  FormCustomerInfo,
} from "../../../components/application/customer-info/types";
import Content from "../../../components/content/Content";
import { Context } from "../../../src/context/store";
import {
  BundleInfo,
  Finance,
  Loan,
  Product,
} from "../../../src/context/types/initialState";
import { GetApplicationByIdUsecaseImpl } from "../../../src/usecases/application/getApplicationById.usecase";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

const CaseBasketDetail = ({ params }: Props) => {
  const { state, dispatch } = useContext(Context);

  const getCaseBasketDetail = async (id: string) => {
    try {
      const getApplicationByIdUsecase = new GetApplicationByIdUsecaseImpl();
      const item = await getApplicationByIdUsecase.execute(id);

      const product: Product = {
        brand: item.brand,
        model: item.car_model,
        year: item.year_model,
        modelImage: item.car_model_image,
      };

      const finance: Finance = {
        income: item.income,
        debt: item.debt,
      };

      const loan: Loan = {
        coverage: item.loan_coverage,
        principal: item.car_model.price,
        interestRate: item.loan_interest_rate.toString(),
        durationYear: item.loan_duration_year.toString(),
        numInstallments: (item.loan_duration_year * 12).toString(),
        installmentMonth: item.loan_installment_month.toString(),
      };

      const day = new Date(item.costomer_info.date_of_birth)
        .getDate()
        .toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });

      const month = (
        new Date(item.costomer_info.date_of_birth).getMonth() + 1
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      const year = new Date(item.costomer_info.date_of_birth)
        .getFullYear()
        .toString();

      const dateOfBirth: DateOfBirth = {
        day,
        month,
        year,
      };

      const address: Address = {
        province: {
          district: "",
          amphoe: "",
          province: item.costomer_info.province,
          zipcode: 0,
          district_code: 0,
          amphoe_code: 0,
          province_code: 0,
        },
        district: {
          district: "",
          amphoe: item.costomer_info.district,
          province: "",
          zipcode: 0,
          district_code: 0,
          amphoe_code: 0,
          province_code: 0,
        },
        subDistrict: {
          district: item.costomer_info.sub_district,
          amphoe: "",
          province: "",
          zipcode: 0,
          district_code: 0,
          amphoe_code: 0,
          province_code: 0,
        },
        postalCode: item.costomer_info.postal_code,
        detail: item.costomer_info.details,
      };

      const customerInfo: FormCustomerInfo = {
        dateOfBirth,
        address,
        firstName: item.costomer_info.first_name,
        lastName: item.costomer_info.last_name,
        email: item.costomer_info.email,
        phoneNumber: item.costomer_info.phone_number,
        gender: item.costomer_info.gender,
      };

      const bundleInfo: BundleInfo = {
        bundle: item.bundle,
        coverage: item.bundle_coverage,
        durationYear: item.bundle_duration_year.toString(),
      };

      dispatch({
        type: "SET_APPLICATON",
        payload: {
          ...state,
          applicaton: {
            ...state.applicaton,
            loan,
            finance,
            product,
            customerInfo,
            bundleInfo,
            score: item.score,
          },
        },
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: page.tsx:23 ~ getCaseBasketDetail ~ error:",
        error
      );
    }
  };

  useEffect(() => {
    getCaseBasketDetail(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  return (
    <Container maxWidth="md" sx={{ paddingBottom: "32px" }}>
      <Content>
        <Completede type="editable" />
      </Content>
    </Container>
  );
};

export default CaseBasketDetail;
