import axios from "axios";
import * as constans from "./constans";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: constans.BASE_URL,
});
instance.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    request.headers.common["Authorization"] = "Bearer " + token;
  }
  return request;
});
export default instance;
