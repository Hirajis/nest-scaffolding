/* 
* NEST & Third party imports
*/
import { Test, TestingModule } from '@nestjs/testing';

/* 
* Custom imports
*/
import { ErrorcodesController } from './errorcodes.controller';

describe('Errorcodes Controller', () => {
  let controller: ErrorcodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrorcodesController],
    }).compile();

    controller = module.get<ErrorcodesController>(ErrorcodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
