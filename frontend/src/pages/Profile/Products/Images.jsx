/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Upload, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import {
  DeleteProductImage,
  UploadProductImage,
} from "../../../apicalls/product";
import { MdDeleteForever } from "react-icons/md";

const Images = ({ selectedProduct, getData, setShowProductForm }) => {
  const [showPreview, setShowPreview] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [images, setImages] = React.useState(selectedProduct.images || []);
  const [fileList, setFileList] = React.useState([]);
  const dispatch = useDispatch();

  const deleteImage = async (url) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteProductImage(selectedProduct._id, url);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages((prevImages) => prevImages.filter((image) => image !== url));
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "removed") {
      setFile(null);
      setFileList([]);
      setShowPreview(false);
    } else {
      setFile(info.file);
      setFileList([info.file]);
      setShowPreview(true);
    }
  };

  const upload = async () => {
    try {
      dispatch(setLoader(true));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(setLoader(false));
      if (response.success) {
        setImages([...images, response.data]);
        setShowPreview(false);
        message.success(response.message);
        setFile(null);
        setFileList([]);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div className="">
      <div className="flex gap-5 rounded mb-5">
        {images.map((image) => {
          return (
            <div
              key={image}
              className="relative flex gap-2 border border-solid border-gray-500"
            >
              <img
                src={image}
                alt="product"
                className="h-20 w-20 object-cover"
              />
              <div className="absolute h-20 w-20 flex items-end justify-end">
                <MdDeleteForever
                  onClick={() => deleteImage(image)}
                  className="text-red-600 text-2xl cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={handleUploadChange}
        fileList={fileList}
        showUploadList={showPreview}
      >
        <Button>Upload Images</Button>
      </Upload>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="default" onClick={() => setShowProductForm(false)}>
          Cancel
        </Button>
        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Images;
