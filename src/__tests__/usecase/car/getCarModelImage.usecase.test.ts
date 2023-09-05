import { CarModelImageRepository } from "../../../repositories/car/carModelImage.repository";
import { FileRepository } from "../../../repositories/file.repository";
import { CarModelImageRecord } from "../../../repositories/types/carModelImageRecord";
import {
  GetCarModelImageUsecase,
  GetCarModelImageUsecaseImpl,
} from "../../../usecases/car/getCarModelImage.usecase";

describe("GetCarModelImageUsecaseImpl", () => {
  let usecase: GetCarModelImageUsecase;
  let carModelImageRepositoryMock: jest.Mocked<CarModelImageRepository>;
  let fileRepositoryMock: jest.Mocked<FileRepository>;

  beforeEach(() => {
    carModelImageRepositoryMock = {
      getImageByModelIdAndYearId: jest.fn().mockResolvedValue([]),
    };
    fileRepositoryMock = {
      getUrl: jest.fn(),
    };
    usecase = new GetCarModelImageUsecaseImpl(
      carModelImageRepositoryMock,
      fileRepositoryMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("execute_should_carModelImages", async () => {
    // Given
    const modelId = "model123";
    const yearId = "year2022";
    const imageRecords: CarModelImageRecord[] = [
      {
        id: "RECORD_ID",
        collectionId: "pgib1bm6282o9cu",
        collectionName: "car_model_image",
        created: "2022-01-01 01:00:00.123Z",
        updated: "2022-01-01 23:59:59.456Z",
        color: "test",
        color_code: "test",
        image: "filename.jpg",
        car_model: "RELATION_RECORD_ID",
        year_model: "RELATION_RECORD_ID",
      },
    ];

    const expectResult: CarModelImageRecord[] = [
      {
        id: "RECORD_ID",
        collectionId: "pgib1bm6282o9cu",
        collectionName: "car_model_image",
        created: "2022-01-01 01:00:00.123Z",
        updated: "2022-01-01 23:59:59.456Z",
        color: "test",
        color_code: "test",
        image: "https://filename.jpg",
        car_model: "RELATION_RECORD_ID",
        year_model: "RELATION_RECORD_ID",
      },
    ];

    carModelImageRepositoryMock.getImageByModelIdAndYearId.mockResolvedValue(
      imageRecords
    );

    fileRepositoryMock.getUrl.mockImplementation(
      (_, imageName) => `https://${imageName}`
    );

    // When
    const result = await usecase.execute(modelId, yearId);

    // Then
    expect(result).toEqual(expectResult);

    expect(
      carModelImageRepositoryMock.getImageByModelIdAndYearId
    ).toHaveBeenCalledWith(modelId, yearId);

    expect(fileRepositoryMock.getUrl).toHaveBeenCalledTimes(1);
  });

  test("execute_should_error", async () => {
    // Given
    const modelId = "model123";
    const yearId = "year2022";
    const expectedError = new Error("Async error");

    carModelImageRepositoryMock.getImageByModelIdAndYearId.mockRejectedValue(
      expectedError
    );

    // When
    try {
      await usecase.execute(modelId, yearId);
    } catch (error) {
      // Then
      expect(error).toBe(expectedError);
    }
  });
});
