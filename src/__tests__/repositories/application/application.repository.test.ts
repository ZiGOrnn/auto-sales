import { ListResult, RecordQueryParams } from "pocketbase";
import { pb } from "../../../pocketbase/pb";
import {
  ApplicationRepository,
  ApplicationRepositoryImpl,
} from "../../../repositories/application/application.repository";
import { ApplicationRecord } from "../../../repositories/application/types/applicationRecord";
import { CreateApplicationRecord } from "../../../repositories/application/types/createApplicationRecord";
import { CollectionName } from "../../../repositories/types/collection";

describe("ApplicationRepositoryImpl", () => {
  let repository: ApplicationRepository;
  let pocketbaseSpy: jest.SpyInstance;
  let recordMock: ApplicationRecord;

  beforeEach(() => {
    recordMock = {
      id: "",
      collectionId: "",
      collectionName: "",
      created: "",
      updated: "",
      user: "",
      loan_coverage: 0,
      loan_interest_rate: 0,
      loan_installment_month: 0,
      loan_duration_year: 0,
      verified: false,
      otp: "",
      income: undefined,
      debt: undefined,
      costomer_info: undefined,
      product_type: "",
      brand: undefined,
      car_model: undefined,
      car_model_image: undefined,
      year_model: undefined,
      signature: "",
      bundle: undefined,
      bundle_coverage: 0,
      bundle_duration_year: 0,
      my_case: "",
      status: "Success",
      score: 0,
      watched: false,
    };
    repository = new ApplicationRepositoryImpl();
  });

  afterEach(() => {
    pocketbaseSpy.mockRestore();
  });

  test("createApplication_should_createRecord", async () => {
    // Given
    const createMock: CreateApplicationRecord = {
      user: "",
      loan_coverage: 0,
      loan_interest_rate: 0,
      loan_installment_month: 0,
      loan_duration_year: 0,
      verified: false,
      otp: "",
      income: "",
      debt: "",
      costomer_info: "",
      product_type: "",
      brand: "",
      car_model: "",
      car_model_image: "",
      year_model: "",
      signature: "",
      bundle: "",
      bundle_coverage: 0,
      bundle_duration_year: 0,
      my_case: "",
      status: "",
      score: 0,
    };

    pocketbaseSpy = jest.spyOn(
      pb.collection(CollectionName.Application),
      "create"
    );
    pocketbaseSpy.mockResolvedValueOnce(recordMock);

    // When
    const result = await repository.createApplication(createMock);

    // Then
    expect(result).toEqual(recordMock);
    expect(pocketbaseSpy).toHaveBeenCalledWith(createMock);
    expect(pocketbaseSpy).toHaveBeenCalledTimes(1);
  });

  test("createApplication_should_error", async () => {
    // Given
    const createMock: CreateApplicationRecord = {
      user: "",
      loan_coverage: 0,
      loan_interest_rate: 0,
      loan_installment_month: 0,
      loan_duration_year: 0,
      verified: false,
      otp: "",
      income: "",
      debt: "",
      costomer_info: "",
      product_type: "",
      brand: "",
      car_model: "",
      car_model_image: "",
      year_model: "",
      signature: "",
      bundle: "",
      bundle_coverage: 0,
      bundle_duration_year: 0,
      my_case: "",
      status: "",
      score: 0,
    };
    const errorRecord = new Error("Async error");

    pocketbaseSpy = jest.spyOn(
      pb.collection(CollectionName.Application),
      "create"
    );
    pocketbaseSpy.mockRejectedValueOnce(errorRecord);

    // When
    try {
      await repository.createApplication(createMock);
    } catch (error) {
      // Then
      expect(pocketbaseSpy).toHaveBeenCalledTimes(1);
      expect(error).toBe(errorRecord);
    }
  });

  test("getOneApplication_should_applicationRecord", async () => {
    // Given
    const idMock = "oe3wl123";
    const queryParamsMock: RecordQueryParams = {
      expand:
        "costomer_info, brand, car_model, car_model_image, year_model, income, debt, product_type, bundle",
    };

    pocketbaseSpy = jest.spyOn(
      pb.collection(CollectionName.Application),
      "getOne"
    );
    pocketbaseSpy.mockResolvedValueOnce(recordMock);

    // When
    const result = await repository.getOneApplication(idMock);

    // Then
    expect(result).toEqual(recordMock);
    expect(pocketbaseSpy).toHaveBeenCalledWith(idMock, queryParamsMock);
    expect(pocketbaseSpy).toHaveBeenCalledTimes(1);
  });

  test("getListApplication_should_listApplicationRecord", async () => {
    // Given
    const pageMock = 1;
    const limitMock = 20;
    const listResultMock: ListResult<ApplicationRecord> = {
      page: pageMock,
      perPage: limitMock,
      totalItems: 0,
      totalPages: 0,
      items: [recordMock],
    };
    const queryParamsMock: RecordQueryParams = {
      filter: `my_case = '' && delete = ''`,
      expand: "costomer_info, car_model, car_model_image, product_type",
    };

    pocketbaseSpy = jest.spyOn(
      pb.collection(CollectionName.Application),
      "getList"
    );
    pocketbaseSpy.mockResolvedValueOnce(listResultMock);

    // When
    const result = await repository.getListApplication(pageMock, limitMock);

    // Then
    expect(result).toEqual(listResultMock);
    expect(pocketbaseSpy).toHaveBeenCalledWith(
      pageMock,
      limitMock,
      queryParamsMock
    );
    expect(pocketbaseSpy).toHaveBeenCalledTimes(1);
  });
});
