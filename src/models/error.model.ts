
export interface ErrorModel {
    type?: ErrorType, 
    messages?: string
}


export enum ErrorType  {
    DATA_VALIDATION = 'DATA_VALIDATION',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    BUSINESS_RULE = 'BUSINESS_RULE'
}