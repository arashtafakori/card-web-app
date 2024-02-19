import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let api = axios.create({
  baseURL: process.env.REACT_APP_MEMORY_SERVICE_URL
});

export const getBookletsList = createAsyncThunk(
  "booklets/getBookletsList",
  async() => {
    let response = await api.get(`/v1/booklets`);
    return response.data;
  }
);

export const getBooklet = createAsyncThunk(
  "booklets/getBooklet",
  async(id: string) => {
    let response = await api.get(`/v1/booklets/${id}`);
    return response.data;
  }
);
