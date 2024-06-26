import { Tabs } from "antd";
import Products from "./Products/Products.jsx";

const Profile = () => {
  return (
    <div className="px-[50px] py-2">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key="2">
          <h1>Bids</h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <h1>General</h1>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
