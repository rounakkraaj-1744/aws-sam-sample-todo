import { type APIGatewayProxyResult } from "aws-lambda";

export const createResponse = (statusCode: number, body: any):APIGatewayProxyResult=>{
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body)
    }
}

export const successResponse = (data:any):APIGatewayProxyResult=>{
    return createResponse (200, {
        success: true,
        data
    })
}

export const errorResponse = (statusCode: number, message: String): APIGatewayProxyResult=>{
    return createResponse (statusCode, {
        success: false,
        error: message
    })
}