import { axiosInstance } from "./axiosInstance.js";

//add a notification
export const AddNotification = async (data) => {
  try {
    const response = await axiosInstance.post(
      "https://marketplacebackend.hemantjatal.me/api/notification/notify",
      data
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// get all notifications by userId
export const GetAllNotifications = async () => {
  try {
    const response = await axiosInstance.get(
      "https://marketplacebackend.hemantjatal.me/api/notification/get-all-notification"
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// delete a notification
export const DeleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `https://marketplacebackend.hemantjatal.me/api/notification/delete-notification/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// mark a notification as read
export const ReadAllNotifications = async () => {
  try {
    const response = await axiosInstance.put(
      "https://marketplacebackend.hemantjatal.me/api/notification/read-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
