/* 
* Define error code interface
*/
export interface errorCodes {
    code: number,
    message: string,
    description: string,
    type: string,
    canOverrideMessage: Boolean
}