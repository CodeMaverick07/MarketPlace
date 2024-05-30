import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import moment from "moment";
import { GetAllUsers, UpdateUserStatus } from "../../apicalls/user";

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllUsers();
      dispatch(setLoader(false));
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdateUserStatus(id, status);
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
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        {
          if (record.role == "admin") {
            return (
              <span className="text-purple-600 font-bold">
                {record.role.toUpperCase()}
              </span>
            );
          } else
            return (
              <span className=" font-bold">{record.role.toUpperCase()}</span>
            );
        }
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm A");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        {
          if (record.status == "active") {
            return (
              <span className="text-green-600 font-bold">
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
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status == "active" && (
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
                  onStatusUpdate(_id, "active");
                }}
                className="btn btn-primary bg-green-500 text-white"
              >
                Unblock
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
      <Table columns={columns} dataSource={users} className=""></Table>
    </div>
  );
};

export default Users;
