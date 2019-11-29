/**
 * nest and third party imports
 */
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';

/**
 * custom imports
 */
import { UserLoginDTO } from './dto/login/apirequest.login.validator.dto';
import { Login } from './entity/login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignupDTO } from './dto/signup/apirequest.signup.validator.dto';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(Login)
    private readonly loginRepository: Repository<Login>) {
    }

    /**
     * check login credentials with database 
     * @param user user data
     */
    async login(user: UserLoginDTO) {
        //verify user data with db 
        const userData = await this.loginRepository.findOne({ username: user.username });
        let respObj = {};

        if (!userData) {
            respObj["httpCode"] = 404;
            respObj["errorCode"] = 52;
        } else {
            let passwordFields = userData.password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha256', salt).update(user.password).digest("base64");
            if (hash === passwordFields[1]) {
                let accessToken = await this.createAuthToken(userData);

                respObj["accessToken"] = accessToken;
                respObj['username'] = userData.username;
            } else {
                respObj["httpCode"] = 400;
                respObj["errorCode"] = 51;
            }

        }
        return respObj;
    }

    /**
     * check signup credentials with database
     * @param user user data
     */
    async signup(user: UserSignupDTO) {
        //hash the pass and save hash value in db with salt 
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha256', salt)
            .update(user.password)
            .digest("base64");
        user.password = salt + "$" + hash;

        let resp = await this.loginRepository.save(user);

        return resp;
    }

    /**
     * Create JWT using jsonwebtoken npm library
     * @param user Data to build JWT payload part
     */
    createAuthToken(user) {
        let accessToken = jwt.sign({ userName: user.username }, process.env.JWTSECRET);

        return accessToken;
    }
}
