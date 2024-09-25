import { axiosInstance } from "./axiosInstance";
import { message } from "antd";

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "https://marketplacebackend.hemantjatal.me/api/user/register",
      payload
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "https://marketplacebackend.hemantjatal.me/api/user/login",
      payload
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(
      "https://marketplacebackend.hemantjatal.me/api/user/get-current-user"
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      "https://marketplacebackend.hemantjatal.me/api/user/get-all-users"
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateUserStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `https://marketplacebackend.hemantjatal.me/api/user/update-user-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};
