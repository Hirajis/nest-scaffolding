/* 
* Nest & Third party imports
*/
import { Get, Req, Res, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import * as crypto from 'crypto';

/* 
*Custom imports
*/
import { LogService } from '../shared/service/logger.service';
import { AppService } from "../shared/service/app.service";


/* 
* AppUtils Contoller
*/
@Controller('/apiutils/auth-token')
export class ApiUtils {

    MODULENAME = "ApiUtils";
    constructor(private logger: LogService, private appService: AppService) {
    }

    /**
 * Encrypts string
 * @param {String} evUniqueID EV unique ID
 * @param {String} clearText String to encrypt
 */
    encrypt(evUniqueID, clearText) {
        const taskName = 'encrypt method';

        try {

            let cipher = crypto.createCipher('aes256', process.env.encKey);
            let encrypted = cipher.update(new Buffer(clearText));
            encrypted = Buffer.concat([encrypted, cipher.final()]);

            return encrypted;
        } catch (e) {
            this.logger.error(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${e.message}`);
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${e.stack}`);

            throw e;
        }
    }

    /**
     * Decrypts string
     * @param {String} evUniqueID EV unique ID
     * @param {String} encryptedText String to decrypt (in Base64)
     */
    decrypt(evUniqueID, encryptedText) {
        const taskName = 'decrypt method';

        try {
            let decipher = crypto.createDecipher('aes256', process.env.encKey);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);

            return decrypted.toString();
        } catch (e) {
            this.logger.error(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${e.message}`);
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${e.stack}`);

            throw e;
        }
    }





}
