import axios from "axios";

import { serverURL } from "./serverURL";

//configuration file for axios

const CommonAPI=async(httpMethod,endPoint,requestBody,reqHeader)=>{
   const requestConfig={
    method:httpMethod,
    url:serverURL+endPoint,
    data:requestBody,
    headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
   }

   try {
    const res = await axios(requestConfig);
    return res;
  } catch (err) {
    return err;
  }
}

export default CommonAPI