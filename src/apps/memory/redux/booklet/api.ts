import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { networkError } from "../general/reducers/notificationReducer";

let api = axios.create({
  baseURL: process.env.REACT_APP_MEMORY_SERVICE_URL
});

export const getBookletsList = createAsyncThunk(
  "booklets/getBookletsList",
  async (_, thunkAPI: any) => {
    try {
      const response = await api.get(`/v1/Booklets`);
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
      const response = await api.get(`/v1/Booklets/${bookletId}`);
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
        `/v1/Booklets`, newBooklet);
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
        url: `/v1/Booklets/EditBookletTitle`,
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
  "booklets/delete",
  async (bookletId: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/Booklets/${bookletId}`,
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

export const archiveBooklet = createAsyncThunk(
  "booklets/archive",
  async (bookletId: any, thunkAPI) => {
    try {
      const response = await api({
        url: `/v1/Booklets/archive/${bookletId}`,
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

export const restoreBooklet = createAsyncThunk(
  "booklets/restore",
  async (bookletId: any, thunkAPI) => {
    try {
      const response = await api({
        url: `/v1/Booklets/restore/${bookletId}`,
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

export const checkBookletForArchiving = createAsyncThunk(
  "booklets/checkItemForArchiving",
  async (bookletId: any, thunkAPI) => {
    try {
      const response = await api({
        url: `/v1/Booklets/checkItemForArchiving/${bookletId}`,
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