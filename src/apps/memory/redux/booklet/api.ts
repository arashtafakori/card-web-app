import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { networkError } from "../general/reducers/notificationReducer";

let api = axios.create({
  baseURL: process.env.REACT_APP_MEMORY_SERVICE_URL
});

export interface bookletsListParams {
  pageNumber: number | null;
  pageSize: number | null;
  isDeleted: boolean | null;
  searchValue: string | null;
}

export const getBookletsList = createAsyncThunk(
  "booklets/getBookletsList",
  async (params: bookletsListParams, thunkAPI: any) => {
    try {
 
      const url = `/v1.1/booklets?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}&isDeleted=${params.isDeleted}&searchValue=${params.searchValue}`;

      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const getBooklet = createAsyncThunk(
  "booklets/getBooklet",
  async (bookletId: any, thunkAPI) => {
    try {
      const response = await api.get(`/v1/booklets/${bookletId}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const createNewBooklet = createAsyncThunk(
  "booklets/createNewBooklet",
  async (newBooklet: any, thunkAPI) => {
    try {
      const response = await api.post(
        `/v1/booklets`, newBooklet);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const editBookletTitle = createAsyncThunk(
  "booklets/editBookletTitle",
  async (modifiedBooklet: any, thunkAPI) => {
    try {
      const response = await api({
        url: `/v1/booklets/editBookletTitle`,
        data: modifiedBooklet,
        method: "PATCH"
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);


export const deleteBooklet = createAsyncThunk(
  "booklets/deleteBooklet",
  async (bookletId: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/booklets/delete/${bookletId}`,
        method: "PATCH"
      });
      return bookletId;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const restoreBooklet = createAsyncThunk(
  "booklets/restoreBooklet",
  async (bookletId: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/booklets/restore/${bookletId}`,
        method: "PATCH"
      });
      return bookletId;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const deleteBookletPermanently = createAsyncThunk(
  "booklets/deleteBookletPermanently",
  async (bookletId: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/booklets/${bookletId}`,
        method: "DELETE"
      });
      return bookletId;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const emptyBookletsTrash = createAsyncThunk(
  "booklets/emptyBookletsTrash",
  async (_, thunkAPI) => {
    try {
      await api({
        url: `/v1/booklets/emptyTrash`,
        method: "DELETE"
      });
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);
