import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
// Create axios instance for api calls
var instance = null;

export const setAuth = () => {

        instance = axios.create({
            baseURL: "",
            timeout: 3000,
            headers: {
                "Content-Type": "application/json"
            }
        });
    

    instance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            debugger
            if (error.response.data.path === "/v1/login") {
                return Promise.reject(error);
            } else if (
                error.response.status !== undefined &&
                error.response.status === 401
            ) {

                localStorage.clear();
                window.location = "/login";
            }
             else if (
                error.response.status === 500
            ) {
                return Promise.reject("Something went wrong, please contact your service provider");
            }
            else {
                return Promise.reject(error.response.data);
            }
        }
    );
};

export default {
    Get: (route, data) => {
        instance || setAuth();
        return instance.get(route, data === {} ? null : JSON.stringify(data));
    },
    Post: (route, data) => {
        instance || setAuth();
        return instance.post(route, JSON.stringify(data));
    },
    Put: (route, data) => {
        instance || setAuth();
        return instance.put(route, JSON.stringify(data));
    },
    Delete: (route, data) => {
        instance || setAuth();
        return instance.delete(route, { data: data });
    },
    Patch : (route,data) =>{
        instance || setAuth();
        return instance.patch(route, JSON.stringify(data));
    }
};