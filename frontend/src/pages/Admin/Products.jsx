import { Table, message, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { GetProducts, UpdateProductStatus } from "../../apicalls/product";
import moment from "moment";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdateProductStatus(id, status);
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

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(null);
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
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
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
          } else
            return (
              <span className="text-red-600">
                {record.status.toUpperCase()}
              </span>
            );
        }
      },
    },

    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm A");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status == "pending" && (
              <Button
                onClick={() => {
                  onStatusUpdate(_id, "approved");
                }}
                className="btn btn-primary bg-blue-500 text-white"
              >
                Approve
              </Button>
            )}
            {status == "pending" && (
              <Button
                onClick={() => {
                  onStatusUpdate(_id, "rejected");
                }}
                className="btn btn-primary bg-red-500 text-white"
              >
                Reject
              </Button>
            )}
            {status == "approved" && (
              <Button
                onClick={() => {
                  onStatusUpdate(_id, "blocked");
                }}
                className="btn btn-primary bg-red-500 text-white"
              >
                Block
              </Button>
            )}
            {status == "blocked" && (
              <Button
                onClick={() => {
                  onStatusUpdate(_id, "approved");
                }}
                className="btn btn-primary bg-green-500 text-white"
              >
                Un-block
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={products} className=""></Table>
    </div>
  );
};

export default Products;
