import config from "../config/config.json";

let baseurl;

if (process.env.NODE_ENV === "production") {
    console.log("REACT_APP_BASE_URL", process.env.REACT_APP_BASE_URL);
    baseurl = "https://fc-client-server-docker.herokuapp.com/api";
} else {
    baseurl = config.apiEndpoint;
}

console.log("baseurl", baseurl);

export default baseurl;
