import { useEffect, useState } from "react";
import { GetAllBids, GetProductById } from "../../apicalls/product";
import { setLoader } from "../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { useParams } from "react-router-dom";
import Divider from "../../components/Divider";
import moment from "moment";
import BidModel from "./BidModel";

const ProductInfo = () => {
  const { user } = useSelector((state) => state.users);

  const [showAddNewBid, setShowAddNewBid] = useState(false);
  const dispatch = useDispatch();
  let { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProductById(id);
      dispatch(setLoader(false));
      if (response.success) {
        const bidsData = await GetAllBids({ product: id });
        setProduct({ ...response.data, bids: bidsData.data });
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
    product && (
      <div className="px-[50px] py-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-3">
            <img
              src={product.images[selectedImageIndex]}
              alt="image"
              className="w-full h-[30rem] object-contain rounded-md"
            />
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <img
                  className={`${
                    index === selectedImageIndex
                      ? "border-2 border-blue-500"
                      : ""
                  } w-24 h-24 object-cover rounded-md`}
                  src={image}
                  alt="image"
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h1>
              <span className="text-md">{product.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-gray-800">
                Product Details
              </h1>
              <div className="flex justify-between">
                <span className="text-md">Price</span>
                <span className="text-md">${product.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md">Category</span>
                <span className="text-md">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md">Age</span>
                <span className="text-md">{product.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md">Bill Available</span>
                <span className="text-md">
                  {product.billAvailable ? "yes" : "no"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-md">Warranty Available</span>
                <span className="text-md">
                  {product.warrantyAvailable ? "yes" : "no"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-md">Accessories Available</span>
                <span className="text-md">
                  {product.accessoriesAvailable ? "yes" : "no"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-md">Box Available</span>
                <span className="text-md">
                  {product.boxAvailable ? "yes" : "no"}
                </span>
              </div>
            </div>
            <Divider />
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Seller Details
              </h1>
              <div className="flex justify-between">
                <span className="text-lg">Name</span>
                <span className="text-lg">{product.seller.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Email</span>
                <span className="text-lg">{product.seller.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-md">Added on</span>
                <span className="text-md">
                  {moment(product.createdAt).format("DD-MM-YYYY hh:mm A")}
                </span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <h1 className="text-xl font-semibold text-gray-800">Bids</h1>
                <Button
                  onClick={() => {
                    setShowAddNewBid((item) => !item);
                  }}
                  disabled={product.seller._id === user._id}
                >
                  Place bid
                </Button>
              </div>
              {product.showBidsOnProductPage && (
                <div className="flex flex-col gap-3">
                  {product.bids.map((bid, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1 p-1 border border-gray-200 rounded-md"
                    >
                      <div className="flex justify-between">
                        <span className="text-md">Bid Amount</span>
                        <span className="text-md">${bid.bidAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-md">Buyer</span>
                        <span className="text-md">{bid.buyer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-md">Email</span>
                        <span className="text-md">{bid.buyer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-md">MobileNo</span>
                        <span className="text-md">{bid.mobile}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-md">CreatedAt</span>
                        <span className="text-md">
                          {moment(bid.createdAt).format("DD-MM-YYYY hh:mm A")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {showAddNewBid && (
          <BidModel
            product={product}
            showBidModel={showAddNewBid}
            setShowBidModel={setShowAddNewBid}
            reloadData={getData}
          />
        )}
      </div>
    )
  );
};

export default ProductInfo;
