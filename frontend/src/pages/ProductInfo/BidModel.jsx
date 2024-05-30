/* eslint-disable react/prop-types */
import { Form, Input, Modal, message } from "antd";
import { useRef } from "react";
import { PlaceNewBid } from "../../apicalls/product";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { AddNotification } from "../../apicalls/notification";

const BidModel = ({ showBidModel, setShowBidModel, product, reloadData }) => {
  const rules = [{ required: true, message: "required" }];
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const fromRef = useRef();

  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      if (response.success) {
        dispatch(setLoader(false));
        message.success("bid added successfully");
        await AddNotification({
          title: "new bid has been placed",
          message: `${user.name} has placed a new bid of ${values.bidAmount} on your product`,
          user: product.seller._id,
          onClick: `/profile`,
          read: false,
        });
        reloadData();
        setShowBidModel(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      onCancel={() => {
        setShowBidModel(false);
      }}
      onOk={() => {
        fromRef.current.submit();
      }}
      open={showBidModel}
      centered
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-5">
          New Bid
        </h1>
        <Form layout="vertical" ref={fromRef} onFinish={onFinish}>
          <Form.Item rules={rules} label="Bid Amount" name="bidAmount">
            <Input type="number" />
          </Form.Item>
          <Form.Item rules={rules} label="Message" name="message">
            <Input type="text" />
          </Form.Item>
          <Form.Item rules={rules} label="Mobile" name="mobile">
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default BidModel;
