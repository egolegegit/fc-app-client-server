import config from "../config/config.json";

let baseurl;

if (process.env.NODE_ENV === "production") {
    baseurl = process.env.REACT_APP_BASE_URL;
} else {
    baseurl = config.apiEndpoint;
}

console.log("baseurl", baseurl);

export default baseurl;
