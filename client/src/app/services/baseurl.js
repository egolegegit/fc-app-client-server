import config from "../config/config.json";

let baseurl;

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    baseurl = process.env.BASE_URL;
    // baseurl = "https://fc-client-server-docker.herokuapp.com/api";
} else {
    baseurl = config.apiEndpoint;
}

export default baseurl;
