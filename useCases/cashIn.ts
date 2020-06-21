import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import { SNS } from 'aws-sdk';

const sns = new SNS({ apiVersion: '2010-03-31' });

const cashIn = async (event) => {
  const { amount } = event.body;

  sns.publish({
    Subject: 'Yoww',
    Message: `You have cashed-in an amount of ${amount}`,
    TopicArn: 'arn:aws:sns:ap-southeast-1:552434643125:MySNSTopic',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'OK',
      message: `You have a cashed-in an amount of ${amount}`,
    }),
  };
};

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        amount: {
          type: 'integer',
        },
      },
      required: ['amount'], // Insert here all required event properties
    },
  },
};

export const handler = middy(cashIn)
  .use(httpJsonBodyParser())
  .use(
    validator({
      inputSchema,
    })
  )
  .use(httpErrorHandler());
