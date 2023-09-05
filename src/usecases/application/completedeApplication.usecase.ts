import { Applicaton } from "../../context/types/initialState";
import { ApplicationRecord } from "../../repositories/application/types/applicationRecord";
import { CreateApplicationRecord } from "../../repositories/application/types/createApplicationRecord";
import { UserRecord } from "../../repositories/auth/types/userRecord";
import { CreateCostomerRecord } from "../../repositories/costomer/types/createCostomerRecord";
import {
  CreateApplicationUsecase,
  CreateApplicationUsecaseImpl,
} from "./createApplication.usecase";
import {
  CreateCostomerUsecase,
  CreateCostomerUsecaseImpl,
} from "./createCostomer.usecase";

export interface CompletedeApplicationUsecase {
  execute(payload: Applicaton, user: UserRecord): Promise<ApplicationRecord>;
}

export class CompletedeApplicationUsecaseImpl
  implements CompletedeApplicationUsecase
{
  private createCostomerUsecase: CreateCostomerUsecase;
  private createApplicationUsecase: CreateApplicationUsecase;

  constructor(
    createCostomerUsecase: CreateCostomerUsecase = new CreateCostomerUsecaseImpl(),
    createApplicationUsecase: CreateApplicationUsecase = new CreateApplicationUsecaseImpl()
  ) {
    this.createCostomerUsecase = createCostomerUsecase;
    this.createApplicationUsecase = createApplicationUsecase;
  }

  async execute(
    payload: Applicaton,
    user: UserRecord
  ): Promise<ApplicationRecord> {
    const { customerInfo, loan, product, productType, finance, bundleInfo } =
      payload;
    const { address, dateOfBirth } = customerInfo;
    const date = `${dateOfBirth.month}/${dateOfBirth.day}/${dateOfBirth.year}`;

    const createCostomer: CreateCostomerRecord = {
      email: customerInfo.email,
      gender: customerInfo.gender,
      first_name: customerInfo.firstName,
      last_name: customerInfo.lastName,
      phone_number: customerInfo.phoneNumber,
      date_of_birth: new Date(date),
      province: address.province.province,
      district: address.district.amphoe,
      sub_district: address.subDistrict.district,
      postal_code: address.postalCode,
      details: address.detail,
    };

    const costomer = await this.createCostomerUsecase.execute(createCostomer);

    const createApplication: CreateApplicationRecord = {
      user: user.id,
      my_case: user.id,
      loan_coverage: loan.coverage,
      loan_interest_rate: +loan.interestRate,
      loan_duration_year: +loan.durationYear,
      loan_installment_month: parseFloat(loan.installmentMonth),
      verified: true,
      otp: "",
      income: finance.income.id,
      debt: finance.debt.id,
      costomer_info: costomer.id,
      product_type: productType.id,
      car_model: product.model.id,
      car_model_image: product.modelImage.id,
      signature: "",
      bundle: bundleInfo.bundle.id,
      bundle_coverage: bundleInfo.coverage,
      bundle_duration_year: +bundleInfo.durationYear,
      score: 100,
      status: "Success",
      brand: product.brand.id,
      year_model: product.year.id,
    };

    const app = await this.createApplicationUsecase.execute(createApplication);
    return app;
  }
}
