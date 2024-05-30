import { axiosInstance } from "./axiosInstance.js";

//add a notification
export const AddNotification = async (data) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:3000/api/notification/notify",
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
      "http://localhost:3000/api/notification/get-all-notification"
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
      `http://localhost:3000/api/notification/delete-notification/${id}`
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
      "http://localhost:3000/api/notification/read-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
