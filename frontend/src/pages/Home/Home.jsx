import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetProducts } from "../../apicalls/product";
import { message } from "antd";
import { setLoader } from "../../redux/loadersSlice";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import { FaBars } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    age: [],
  });

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(filters);
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
  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="px-[50px] py-5">
      <div className="flex gap-5">
        {showFilters && (
          <Filters
            setFilters={setFilters}
            setShowFilters={setShowFilters}
            filters={filters}
          />
        )}
        <div className="flex flex-col w-full">
          <div className="flex gap-5 items-center mb-3">
            {!showFilters && (
              <FaBars
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
                className="text-4xl text-gray-500"
              />
            )}
            <input
              type="text"
              placeholder="search products here..."
              className="border border-gray-300 rounded border-solid w-full p-2"
            />
          </div>
          <div className=" flex gap-5">
            <div>
              <div
                className={`grid   gap-5 rounded-xl ${
                  showFilters ? "grid-cols-4" : "grid-cols-5"
                }`}
              >
                {products?.map((product) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                      }}
                      className=" border border-gray-300 col-span-1 rounded-lg border-solid flex flex-col cursor-pointer"
                      key={product.name}
                    >
                      <img
                        src={product.images[0]}
                        alt="image"
                        className="h-[12rem] object-contain w-[20rem] p-2"
                      />

                      <div className="flex flex-col gap-1 px-2">
                        <h1 className="text-lg font-semibold">
                          {product.name}
                          <p className="text-sm text-gray-500">
                            {product.description}
                          </p>
                        </h1>

                        <Divider className="" />
                        <span className="text-2xl text-gray-700 font-bold font-pop">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
