/**
 * nest and third party imports
 */
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Repository, getConnection } from 'typeorm';

/**
 * custom imports
 */
import { Login } from './entity/login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppService } from 'src/service/app.service';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(Login)
    private readonly loginRepository: Repository<Login>, private appService: AppService) {
    }

    /**
     * check login credentials with database 
     * @param user user data
     */
    async login(user) {
        //verify user data with db 
        const userData = await this.loginRepository.findOne({ username: user.username });

        let respObj = {};

        if (!userData) {
            respObj["httpCode"] = 400;
            respObj["errorCode"] = 51;
        } else {
            let passwordFields = userData.password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha256', salt).update(user.password).digest("base64");
            if (hash === passwordFields[1]) {
                let tokens = await this.createAuthToken(userData);

                respObj["accessToken"] = tokens["accessToken"];
                respObj["refreshToken"] = tokens["refreshToken"];

            } else {
                respObj["httpCode"] = 400;
                respObj["errorCode"] = 51;
            }

        }

        return respObj;
    }

    /**
     * Currently we are not using this in scaffolding but we should use this as per session managemt requirement
     * Clear refresh token on logout from database  
     * @param refreshToken user data
     */
    async logout(evUniqueID: string, refreshToken: string) {
        let respObj = {};

        return respObj;
    }

    /**
     * Validate refresh token and return new access and refresh token 
     * @param evUniqueID req unique id
     * @param refreshToken user data
     */
    async refreshToken(evUniqueID: string, refreshToken: string) {
        let respObj = {};

        let payload = this.appService.jwtDecoder(evUniqueID, refreshToken, process.env.JWTSECRET);

        if (payload && payload['errorCode']) {
            respObj["httpCode"] = payload['httpCode'];
            respObj["errorCode"] = payload['errorCode'];

            return respObj;
        }

        let tokens = await this.createAuthToken(payload);

        respObj["accessToken"] = tokens["accessToken"];
        respObj["refreshToken"] = tokens["refreshToken"];

        return respObj;
    }


    /**
     * check signup credentials with database
     * @param user user data
     */
    async signup(user) {
        let respObj = {};
        //hash the pass and save hash value in db with salt 
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha256', salt)
            .update(user.password)
            .digest("base64");
        user.password = salt + "$" + hash;

        let userData = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Login)
            .values([{ username: user.username, password: user.password }])
            .execute();

        return userData;
    }

    /**
     * Create Access and Refresh JWT using jsonwebtoken npm library
     * @param user Data to build JWT payload part
     */
    createAuthToken(user) {
        let tokens = {};
        tokens["accessToken"] = jwt.sign({ username: user.username, exp: Math.floor(Date.now() / 1000) + (3 * 60) }, process.env.JWTSECRET);
        tokens["refreshToken"] = jwt.sign({ username: user.username, exp: Math.floor(Date.now() / 1000) + (5 * 60) }, process.env.JWTSECRET);

        return tokens;
    }
}
