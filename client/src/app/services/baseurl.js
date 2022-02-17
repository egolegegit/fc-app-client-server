import config from "../config/config.json";

const baseurl = process.env.API_ENDPOINT || config.apiEndpoint;
console.log("baseurl", baseurl);

export default baseurl;
