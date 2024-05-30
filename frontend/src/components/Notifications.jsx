/* eslint-disable react/prop-types */
import { Button, Modal, message } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import {
  DeleteNotification,
  ReadAllNotifications,
} from "../apicalls/notification";

const Notifications = ({
  notifications,
  reloadNotification,
  showNotification,
  setShowNotification,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    reloadNotification();
  }, []);
  const markAllRead = async () => {
    try {
      const response = await ReadAllNotifications();
      if (response.success) {
        reloadNotification();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const deleteNotification = async (id) => {
    try {
      const response = await DeleteNotification(id);
      if (response.success) {
        reloadNotification();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  if (notifications.length === 0) {
    return (
      <Modal
        open={showNotification}
        centered
        onCancel={() => setShowNotification(!showNotification)}
        footer={null}
        width={600}
      >
        <div className="flex flex-col gap-4 mt-8 mb-3">
          <div className="px-5 flex border justify-between items-center border-gray-300 p-2 rounded-lg ">
            <div className="flex flex-col cursor-pointer ">
              <h1 className="text-lg font-semibold text-gray-800">
                No Notifications
              </h1>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <Modal
      open={showNotification}
      centered
      onCancel={() => setShowNotification(!showNotification)}
      footer={null}
      width={600}
    >
      <div className="h-10 w-full  mt-8 flex items-center justify-start">
        <Button
          className="bg-blue-500 text-white"
          onClick={() => {
            markAllRead();
          }}
        >
          Mark all Read
        </Button>
      </div>
      <div className="flex flex-col gap-4  my-3">
        {notifications.map((notification) => {
          return (
            <div
              key={notification._id}
              className="px-5 flex border justify-between items-center border-gray-300 p-2 rounded-lg "
              onClick={() => {
                navigate(notification.onClick);
                setShowNotification(false);
              }}
            >
              <div className="flex flex-col cursor-pointer ">
                <h1 className="text-lg font-semibold text-gray-800">
                  {notification.title}
                </h1>
                <p className="text-gray-500">{notification.message}</p>
                <p className="text-gray-500">
                  {moment(notification.createdAt).format("DD-MM-YYYY hh:mm A")}
                </p>
              </div>
              <div>
                <MdDeleteForever
                  className=" text-red-600  text-3xl cursor-pointer"
                  onClick={() => {
                    deleteNotification(notification._id);
                    setShowNotification(true);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default Notifications;
