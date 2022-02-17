import config from "config";

const baseUrl = process.env.API_ENDPOINT || config.get("apiEndpoint");
export default baseUrl;
