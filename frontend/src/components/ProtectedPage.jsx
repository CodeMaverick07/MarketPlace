import PropTypes from "prop-types";
import { message } from "antd";
import { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/user";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import { setUser } from "../redux/userSlice";
import Notifications from "./Notifications";
import { GetAllNotifications } from "../apicalls/notification";

const ProtectedPage = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getNotifications = async () => {
    try {
      const response = await GetAllNotifications();
      if (response.success) {
        setNotifications(response.data);
        setNotificationCount(
          response.data.filter((notification) => notification.read === false)
            .length
        );
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setUser(response.user));
      } else {
        message.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getNotifications();
      console.log(notifications);
    } else {
      navigate("/login");
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {showNotification && (
        <Notifications
          reloadNotification={getNotifications}
          notifications={notifications}
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      )}
      <Header
        name={user.name}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        notificationCount={notificationCount}
      />
      {children}
    </div>
  );
};

ProtectedPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedPage;
