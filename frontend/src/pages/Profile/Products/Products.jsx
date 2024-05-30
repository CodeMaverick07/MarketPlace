import { Button, Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import ProductsFrom from "./ProductsFrom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { DeleteProduct, GetProducts } from "../../../apicalls/product";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import moment from "moment";
import Bids from "./Bids";

const Products = () => {
  const [showBids, setShowBids] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [showProductsFrom, setShowProductsFrom] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts({
        seller: user._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        {
          if (record.status == "approved") {
            return (
              <span className="text-green-600">
                {record.status.toUpperCase()}
              </span>
            );
          } else if (record.status == "pending") {
            return (
              <span className="text-yellow-600">
                {record.status.toUpperCase()}
              </span>
            );
          } else {
            return (
              <span className="text-red-600">
                {record.status.toUpperCase()}
              </span>
            );
          }
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-5">
            <MdDeleteForever
              className=" text-red-600  text-2xl cursor-pointer"
              onClick={() => {
                setSelectedProduct(record);
                setShowDeleteModal(true);
              }}
            />
            <FaEdit
              onClick={() => {
                setSelectedProduct(record);
                setShowProductsFrom(true);
              }}
              className=" text-blue-500 text-lg cursor-pointer"
            />
            <Button
              onClick={() => {
                setSelectedProduct(record);
                setShowBids(true);
              }}
            >
              show Bids
            </Button>
          </div>
        );
      },
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm A");
      },
    },
  ];
  const removeProduct = async (id) => {
    try {
      dispatch(setLoader(true));

      const response = await DeleteProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
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
    <div>
      <Modal
        className="z-50"
        title=""
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        centered
        width={500}
        okText="Delete"
        onOk={() => {
          removeProduct(selectedProduct._id);
          setShowDeleteModal(false);
        }}
      >
        Do you want delete this item?
      </Modal>
      <div className="flex justify-end pb-3">
        <Button
          className="h-10"
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductsFrom(true);
          }}
        >
          add Products
        </Button>
      </div>
      <Table columns={columns} dataSource={products} className=""></Table>
      {showProductsFrom && (
        <ProductsFrom
          showProductsFrom={showProductsFrom}
          setShowProductsFrom={setShowProductsFrom}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
      {showBids && (
        <Bids
          showBidsModal={showBids}
          setShowBidsModal={setShowBids}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
