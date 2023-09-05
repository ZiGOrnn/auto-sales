import {
  CarModelImageRepository,
  CarModelImageRepositoryImpl,
} from "../../repositories/car/carModelImage.repository";
import {
  FileRepository,
  FileRepositoryImpl,
} from "../../repositories/file.repository";
import { CarModelImageRecord } from "../../repositories/types/carModelImageRecord";

export interface GetCarModelImageUsecase {
  execute(modelId: string, yearId: string): Promise<CarModelImageRecord[]>;
}

export class GetCarModelImageUsecaseImpl implements GetCarModelImageUsecase {
  private carModelImageRepository: CarModelImageRepository;
  private fileRepository: FileRepository;

  constructor(
    carModelImageRepository: CarModelImageRepository = new CarModelImageRepositoryImpl(),
    fileRepository: FileRepository = new FileRepositoryImpl()
  ) {
    this.carModelImageRepository = carModelImageRepository;
    this.fileRepository = fileRepository;
  }

  async execute(
    modelId: string,
    yearId: string
  ): Promise<CarModelImageRecord[]> {
    const listRecord =
      await this.carModelImageRepository.getImageByModelIdAndYearId(
        modelId,
        yearId
      );

    const modelImages = listRecord.map<CarModelImageRecord>((item) => {
      return {
        ...item,
        image: this.fileRepository.getUrl(item, item.image),
      };
    });

    return modelImages;
  }
}
