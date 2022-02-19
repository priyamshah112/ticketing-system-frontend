import axios from "axios";

const getResponse = async (apipath, data) => {
    try {
        const { url, method } = apipath;
        const headers = {};
        headers["Content-Type"] = "application/json";
        let token = localStorage.authToken;
        if (localStorage.authToken)
            headers["Authorization"] = `Bearer ` + token;
        return await axios({
            url: `${process.env.REACT_APP_API_URL}${url}`,
            method, data, headers
        })
    } catch (error) {
        return { error: error.response.data };
    }
}

export { getResponse };