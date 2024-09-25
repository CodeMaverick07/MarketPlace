import { axiosInstance } from "./axiosInstance";
import { message } from "antd";

export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "https://marketplacebackend.hemantjatal.me/api/product/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return message.error(error.message);
  }
};

export const GetProducts = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "https://marketplacebackend.hemantjatal.me/api/product/get-products",
      filters
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `https://marketplacebackend.hemantjatal.me/api/product/edit-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};

export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `https://marketplacebackend.hemantjatal.me/api/product/delete-product/${id}`
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};

export const UploadProductImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "https://marketplacebackend.hemantjatal.me/api/product/upload-product-image",
      payload
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateProductStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `https://marketplacebackend.hemantjatal.me/api/product/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};

export const DeleteProductImage = async (id, url) => {
  try {
    const response = await axiosInstance.put(
      `https://marketplacebackend.hemantjatal.me/api/product/delete-product-image/${id}`,
      { url }
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};
//get product by id
export const GetProductById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `https://marketplacebackend.hemantjatal.me/api/product/get-product-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};

export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "https://marketplacebackend.hemantjatal.me/api/bid/place-new-bid",
      payload
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};

export const GetAllBids = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "https://marketplacebackend.hemantjatal.me/api/bid/get-all-bids",
      filters
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};

//search product by name and description

export const SearchProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "https://marketplacebackend.hemantjatal.me/api/product/search-product",
      { payload }
    );
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
};
