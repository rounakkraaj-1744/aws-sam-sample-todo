import { type APIGatewayProxyEvent, type APIGatewayProxyResult } from 'aws-lambda';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { docClient, TABLE_NAME } from '../utils/dynamodb';
import { successResponse, errorResponse } from '../utils/response';

interface CreateItemInput {
  name: string;
  description?: string;
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log('Event:', JSON.stringify(event, null, 2));

    if (!event.body) {
      return errorResponse(400, 'Request body is required');
    }

    const input: CreateItemInput = JSON.parse(event.body);

    if (!input.name || input.name.trim() === '') {
      return errorResponse(400, 'Name is required');
    }

    const now = new Date().toISOString();
    const item = {
      id: uuidv4(),
      name: input.name.trim(),
      description: input.description?.trim(),
      createdAt: now,
      updatedAt: now,
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );

    console.log('Created item:', item);
    return successResponse(item);
  } catch (error) {
    console.error('Error creating item:', error);
    return errorResponse(500, 'Internal server error');
  }
};
