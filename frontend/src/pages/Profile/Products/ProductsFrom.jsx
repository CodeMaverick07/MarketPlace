/* eslint-disable react/prop-types */
import { Modal, Tabs, Form, Input, Row, Col, Checkbox, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, UpdateProduct } from "../../../apicalls/product";
import { setLoader } from "../../../redux/loadersSlice";
import Images from "./Images";

const ProductsFrom = ({
  showProductsFrom,
  setShowProductsFrom,
  selectedProduct,
  getData,
}) => {
  const dispatch = useDispatch();
  const checkBoxData = [
    {
      label: "Bill Available",
      name: "billAvailable",
    },
    {
      label: "Warranty Available",
      name: "warrantyAvailable",
    },
    {
      label: "Accessories Available",
      name: "accessoriesAvailable",
    },
    {
      label: "Box Available",
      name: "boxAvailable",
    },
  ];
  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];

  const formRef = React.useRef();

  const [selectedTab = "1", setSelectedTab] = React.useState("1");

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  const { user } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      values.seller = user._id;
      values.status = "pending";
      dispatch(setLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await UpdateProduct(selectedProduct._id, values);
      } else {
        response = await AddProduct(values);
      }

      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductsFrom(false);
      } else {
        setShowProductsFrom(false);
        message.error(response.message);
      }
    } catch (error) {
      setShowProductsFrom(false);
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div>
      <Modal
        title=""
        open={showProductsFrom}
        onCancel={() => setShowProductsFrom(false)}
        centered
        width={800}
        okText="Save"
        onOk={() => {
          formRef.current.submit();
        }}
        {...(selectedTab == "2" && { footer: false })}
      >
        <div className="text-center font-semibold text-xl">
          <h1>{selectedProduct ? "Edit Product" : "Add Product"}</h1>
          <Tabs
            defaultActiveKey="1"
            activeKey={selectedTab}
            onChange={(key) => {
              setSelectedTab(key);
            }}
          >
            <Tabs.TabPane tab="general" key="1">
              <Form layout="vertical" ref={formRef} onFinish={onFinish}>
                <Form.Item label="Name" name="name" rules={rules}>
                  <Input type="text" />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={rules}>
                  <TextArea />
                </Form.Item>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Form.Item label="Price" name="price" rules={rules}>
                      <Input type="number" />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label="Age" name="age" rules={rules}>
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      rules={rules}
                      label="Category"
                      name="category"
                      className="rounded"
                    >
                      <select>
                        <option value="select">select</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home</option>
                        <option value="sports">Sports</option>
                      </select>
                    </Form.Item>
                  </Col>
                </Row>
                <div className="flex justify-evenly">
                  {checkBoxData.map((data) => {
                    return (
                      <Form.Item
                        key={data.name}
                        valuePropName="checked"
                        name={data.name}
                      >
                        <Checkbox>{data.label}</Checkbox>
                      </Form.Item>
                    );
                  })}
                </div>
                <Form.Item valuePropName="checked" name="showBidsOnProductPage">
                  <Checkbox>show bids on product page</Checkbox>
                </Form.Item>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane
              disabled={!selectedProduct}
              tab="Images"
              key="2"
              className=""
            >
              <Images
                setShowProductForm={setShowProductsFrom}
                getData={getData}
                selectedProduct={selectedProduct}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsFrom;
