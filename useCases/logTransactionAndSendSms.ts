import 'source-map-support/register';
const logTransactionAndSendSms = async (event) => {
  console.log('EVENT inside log transaction and send sms: ', event);
};

export const handler = logTransactionAndSendSms;
