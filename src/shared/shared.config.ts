import { Injectable } from "@nestjs/common";


@Injectable()
export class SharedConfig {
    config = {
        "development": {
        },
        "qa": {

        },
        "production": {

        }
    }

    constructor() {
        let envConfig = this.config[process.env.NODE_ENV] || 'development';

        Object.keys(envConfig).forEach((key) => {
            process.env[key] = envConfig[key]

        })

    }

}

