/* 
* Define and add general error codes
* 0-10 general error codes
* 11-50 authentication related error codes
* 51-100 login related errors
*/
export class ErrorCodes {

    //make override false in all places excepts code = 1
    //0-10 general error codes
    generalErrorCodes = [
        { "code": 0, "message": 'OK', "description": 'Success', "type": 'SUCCESS', "canOverrideMessage": false },
        { "code": 1, "message": 'Internal Error', "description": 'Unexpected error encountered', "type": 'ERROR', "canOverrideMessage": true },
        { "code": 2, "message": 'Missing Input', "description": 'Missing one or more required parameters', "type": 'ERROR', "canOverrideMessage": false },
        { "code": 3, "message": 'Invalid Input', "description": 'Invalid input value(s)', "type": 'ERROR', "canOverrideMessage": false },
        { "code": 4, "message": 'Invalid URL', "description": 'URL not found', "type": 'ERROR', "canOverrideMessage": false },
        { "code": 5, "message": 'Invalid Configuration', "description": 'Invalid configuration value(s)', "type": 'ERROR', "canOverrideMessage": false }
    ];

    //11-50 authentication related error codes
    authErrorCodes = [
        { "code": 11, "message": 'Unauthorized access', "description": 'Unauthorized access', "type": 'ERROR', "canOverrideMessage": false },
        { "code": 12, "message": 'Invalid token', "description": 'Invalid token', "type": 'ERROR', "canOverrideMessage": false },
        { "code": 13, "message": 'Token Expired', "description": 'Token Expired', "type": 'ERROR', "canOverrideMessage": false },
        { "code": 14, "message": 'Refresh token required', "description": 'Refresh token required', "type": 'ERROR', "canOverrideMessage": false }
    ];

    //51-100 login related errors 
    loginErrorCodes = [
        { "code": 51, "message": 'Invalid email or password', "description": 'Invalid email or password', "type": 'ERROR', "canOverrideMessage": false },
        { "code": 52, "message": 'Invalid email id', "description": 'Invalid email id', "type": 'ERROR', "canOverrideMessage": false }
    ];

    //merge all type of error codes
    ErrorCodes = [...this.generalErrorCodes, ...this.authErrorCodes, ...this.loginErrorCodes];

}