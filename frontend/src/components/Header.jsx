/* eslint-disable react/prop-types */
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { FaRegBell } from "react-icons/fa";

const Header = ({
  name,
  setShowNotification,
  showNotification,
  notificationCount,
}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="h-[70px] bg-indigo-500 flex justify-center px-5">
      <div className="flex max-w-[90rem] w-full h-full justify-between">
        <div
          className="text-white font-mont flex justify-center items-center text-2xl cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          MarketPlace
        </div>

        <div className="flex items-center text-white text-xl justify-between gap-8 max-md:gap-3 cursor-pointer max-md:text-lg">
          <Badge
            count={notificationCount}
            className=""
            onClick={() => {
              setShowNotification(!showNotification);
            }}
          >
            <FaRegBell className="text-white text-xl" />
          </Badge>
          <span
            className="flex justify-center items-center gap-1"
            onClick={() => {
              if (user.role == "user") {
                navigate("/profile");
              } else if (user.role == "admin") {
                navigate("/admin");
              }
            }}
          >
            <FaRegUserCircle className="text-2xl" />
            <p>{name}</p>
            <MdKeyboardArrowDown className="text-2xl" />
          </span>
          <div>
            <IoMdLogOut className="text-2xl " onClick={logOut} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
