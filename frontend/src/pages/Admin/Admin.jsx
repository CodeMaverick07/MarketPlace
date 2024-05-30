import { Tabs } from "antd";
import Products from "./Products";
import Users from "./Users";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="px-[52px]">
      <Tabs>
        <Tabs.TabPane tab="products" key={"1"}>
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="users" key={"2"}>
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;
