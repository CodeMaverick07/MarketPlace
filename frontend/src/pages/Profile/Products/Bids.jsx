/* eslint-disable react/prop-types */
import { Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { GetAllBids } from "../../../apicalls/product";
const Bids = ({ showBidsModal, setShowBidsModal, selectedProduct }) => {
  const columns = [
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
      render: (text, record) => {
        return <span>{record.buyer.name}</span>;
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
      key: "bidAmount",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Bid Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{new Date(text).toLocaleString()}</span>;
      },
    },
    {
      title: "contact",
      dataIndex: "contact",
      key: "contact",
      render: (text, record) => {
        return (
          <span className="flex flex-col">
            <p>phoneNo: {record.mobile} </p>
            <p>{record.buyer.email}</p>
          </span>
        );
      },
    },
  ];
  const [bids, setBids] = useState();
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(setLoader(true));

      const bidsData = await GetAllBids({ product: selectedProduct._id });

      dispatch(setLoader(false));
      if (bidsData.success) {
        setBids(bidsData.data);
      } else {
        message.error(bidsData.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Modal
      title="bids"
      open={showBidsModal}
      onCancel={() => {
        setShowBidsModal(false);
        console.log(selectedProduct);
      }}
      centered
      width={1000}
    >
      <h1 className="text-center pb-2">
        {" "}
        <span className="text-black font-bold text-lg">Product Name:</span>{" "}
        <span className="text-gray-800 font-bold text-lg">
          {selectedProduct.name}
        </span>
      </h1>
      <Table dataSource={bids} columns={columns} />
    </Modal>
  );
};

export default Bids;
