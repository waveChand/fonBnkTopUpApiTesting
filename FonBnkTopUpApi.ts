
import crypto from 'crypto';
import utf8 from 'utf8';

const generateSignature = ({
  clientSecret,
  requestData,
  timestamp,
  endpoint,
}: {
  clientSecret: string;
  requestData?: object; //empty for GET request
  timestamp: string;
  endpoint: string;
}) => {
  let body = '';
  if (requestData) {
    console.log(`REQUESTDATA ${JSON.stringify(requestData)}`);
    body = JSON.stringify(requestData);
  }
  const hash = crypto.createHash('md5');
  let hmac = crypto.createHmac('sha256', Buffer.from(clientSecret, 'base64'));
  let contentMD5 = hash.update(utf8.encode(body)).digest('base64');

  console.log(`UTFENCODEBODY ${utf8.encode(body)}`);
  console.log(`ContentMD5 ${contentMD5}`);

  let stringToSign = `${contentMD5}:${timestamp}:${endpoint}`;

  console.log(`STRING TO SIGN ${stringToSign}`);

  hmac.update(stringToSign);
  return hmac.digest('base64');
};


const clientSecret = '01HE2S2JVVAERASCZH2361FNSF';
const requestData = {}; // If requestData is not applicable, you can pass an empty object or omit it
const timestamp = '1699505851512';
const endpoint = '/api/v1/top-up/carriers';

const signature = generateSignature({
  clientSecret,
  requestData,
  timestamp,
  endpoint,
});

console.log(signature)