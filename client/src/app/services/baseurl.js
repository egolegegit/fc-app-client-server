import config from "../config/config.json";

console.log("process.env.API_ENDPOINT", process.env.API_ENDPOINT);

const baseurl = process.env.API_ENDPOINT || config.apiEndpoint;

export default baseurl;
