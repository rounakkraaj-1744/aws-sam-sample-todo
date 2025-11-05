import { type APIGatewayProxyEvent, type APIGatewayProxyResult } from 'aws-lambda';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLE_NAME } from '../utils/dynamodb';
import { successResponse, errorResponse } from '../utils/response';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log('Event:', JSON.stringify(event, null, 2));

    const id = event.pathParameters?.id;
    if (!id) {
      return errorResponse(400, 'Item ID is required');
    }

    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    if (!result.Item) {
      return errorResponse(404, 'Item not found');
    }

    console.log('Retrieved item:', result.Item);
    return successResponse(result.Item);
  } catch (error) {
    console.error('Error getting item:', error);
    return errorResponse(500, 'Internal server error');
  }
};