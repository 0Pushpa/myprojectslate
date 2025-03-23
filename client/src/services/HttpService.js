import { apiEndpoint } from "../constant/endpoint";
import axios from "axios";
import decode from "jwt-decode";
import { refreshTokenService } from "../services/AuthService";

const refreshToken = localStorage.getItem("refresh-token");
const token = localStorage.getItem("user-token");

const secureApi = axios.create();

secureApi.interceptors.request.use(
  async (config) => {
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        await refreshTokenService({
          token: refreshToken,
          userId: decodedToken.id,
        });
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default class HttpService {
  url = apiEndpoint;
  postData = async (item, added_url, tokenId = "") => {
    const token = await localStorage.getItem(tokenId);
    const requestOptions = this.requestOptions(token);

    try {
      const response = await secureApi.post(
        this.url + "/" + added_url,
        item,
        requestOptions
      );
      if (response?.status === 200) {
        return response;
      } else {
        return { status: response.status, message: response.data.message };
      }
    } catch (e) {
      return { status: 400, message: e.message };
    }
  };
  patchData = async (item, added_url, tokenId = "") => {
    const token = await localStorage.getItem(tokenId);
    const requestOptions = this.requestOptions(token);

    try {
      const response = await secureApi.patch(
        this.url + "/" + added_url,
        item,
        requestOptions
      );
      if (response?.status === 200) {
        return response;
      } else {
        return { status: response.status, message: response.data.message };
      }
    } catch (e) {
      return { status: 400, message: e.message };
    }
  };
  deleteData = async (item, added_url, tokenId = "") => {
    const token = await localStorage.getItem(tokenId);
    const requestOptions = this.requestOptions(token);
    try {
      const response = await secureApi.delete(
        this.url + "/" + added_url,
        item,
        requestOptions
      );
      if (response?.status === 200) {
        return response;
      } else {
        return { status: response.status, message: response.data.message };
      }
    } catch (e) {
      return { status: 400, message: e.message };
    }
  };
  getData = async (added_url, tokenId = "") => {
    const token = await localStorage.getItem("user-token");
    const requestOptions = this.requestOptions(token);
    try {
      return await secureApi.get(this.url + "/" + added_url, requestOptions);
    } catch (e) {
      return false;
    }
  };
  downloadData = async (added_url, tokenId = "") => {
    const token = await localStorage.getItem("user-token");
    const requestOptions = this.requestOptions(token);
    try {
      window.open(apiEndpoint + "/" + added_url, "_blank");
    } catch (e) {
      return false;
    }
  };
  getDataWithParams = async (added_url, userId, tokenId = "") => {
    const token = await localStorage.getItem("user-token");
    const requestOptions = this.requestOptions(token);
    try {
      return await secureApi.get(
        this.url + "/" + added_url,
        {
          params: {
            userId,
          },
        },
        requestOptions
      );
    } catch (e) {
      return false;
    }
  };

  requestOptions = (token) => {
    return {
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    };
  };
}
