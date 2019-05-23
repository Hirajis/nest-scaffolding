/* 
* NEST & Third party imports
*/
import { Test } from '@nestjs/testing';
import { Req, Res } from '@nestjs/common';

/* 
* Custom imports
*/
import { PingController } from './ping.controller';
import { AppService } from '../service/app.service';


// Unit test method
describe('Ping Controller', () => {

  let pingController: PingController;
  let appService: AppService;

  beforeAll(async () => {

    const module = await Test.createTestingModule({
      controllers: [PingController],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
    pingController = module.get<PingController>(PingController);

  });


  describe('ping controller test', () => {
    it('should return errcode', async () => {
      const metadata = {
        errCode: 0,
      }
      let test = pingController.ping(Req, Res);
      expect(test.errCode).toBe(metadata.errCode);
    });

  });

});
