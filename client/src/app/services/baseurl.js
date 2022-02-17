import config from "../config/config.json";

const baseurl =
    "https://fc-client-server-docker.herokuapp.com" || config.apiEndpoint;
// const baseurl = process.env.API_ENDPOINT || config.apiEndpoint;
console.log("baseurl", baseurl);

export default baseurl;
