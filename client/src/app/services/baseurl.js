import config from "../config/config.json";

const baseurl = process.env.API_ENDPOINT || config.apiEndpoint;

export default baseurl;
