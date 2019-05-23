/* 
* Define and add general error codes
*/
export class GeneralCodes {

    //make override false in all places excepts code = 1
    ErrorCodes = [
        { "code": 0, "message": 'OK', "description": 'Success', "type": 'SUCCESS', "canOverrideMessage": false },
        { "code": 1, "message": 'Internal Error', "description": 'Unexpected error encountered', "type": 'ERROR', "canOverrideMessage": true },
        { "code": 2, "message": 'Missing Input', "description": 'Missing one or more required parameters', "type": 'ERROR', "canOverrideMessage": false },
        { "code": 3, "message": 'Invalid Input', "description": 'Invalid input value(s)', "type": 'ERROR', "canOverrideMessage": false },
        { "code": 4, "message": 'Invalid URL', "description": 'URL not found', "type": 'ERROR', "canOverrideMessage": false },
        { "code": 5, "message": 'Invalid Configuration', "description": 'Invalid configuration value(s)', "type": 'ERROR', "canOverrideMessage": false }
    ];
}