import nodeCCAvenue from 'node-ccavenue'
import  env  from '../../env.js';

export const ccav = new nodeCCAvenue.Configure({
  merchant_id: env.Private_API_Key,
  access_code: env.Private_Auth_Token,
  working_key: env.Private_Salt
});