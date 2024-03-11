import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { networkError } from "../general/reducers/notificationReducer";

let api = axios.create({
  baseURL: process.env.REACT_APP_MEMORY_SERVICE_URL
});

export interface cardsListParams {
  bookletId: string | undefined;
  indexId: string | null | undefined;
  pageNumber: number | null;
  pageSize: number | null;
  isDeleted: boolean | null;
  searchValue: string | null;
}

export const getCardsList = createAsyncThunk(
  "cards/getCardsList",
  async (params: cardsListParams, thunkAPI: any) => {
    try {
 
      const url = `/v1/cards?bookletId=${params.bookletId}&indexId=${params.indexId}&pageNumber=${params.pageNumber}&pageSize=${params.pageSize}&isDeleted=${params.isDeleted}&searchValue=${params.searchValue}`;

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

export const getCard = createAsyncThunk(
  "cards/getCard",
  async (id: any, thunkAPI) => {
    try {
      const response = await api.get(`/v1/cards/${id}`);
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

export const addCard = createAsyncThunk(
  "cards/addCard",
  async (newCard: any, thunkAPI) => {
    try {
      const response = await api.post(
        `/v1/cards`, newCard);
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

export const editCard = createAsyncThunk(
  "cards/editCard",
  async (modifiedItem: any, thunkAPI) => {
    try {
      const response = await api({
        url: `/v1/cards`,
        data: modifiedItem,
        method: "PUT"
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


export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (id: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/cards/delete/${id}`,
        method: "PATCH"
      });
      return id;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const restoreCard = createAsyncThunk(
  "cards/restoreCard",
  async (id: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/cards/restore/${id}`,
        method: "PATCH"
      });
      return id;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export const deleteCardPermanently = createAsyncThunk(
  "cards/deleteCardPermanently",
  async (id: any, thunkAPI) => {
    try {
      await api({
        url: `/v1/cards/${id}`,
        method: "DELETE"
      });
      return id;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(networkError);
      }
    }
  }
);

export interface emptyCardsTrashParams {
  bookletId: string | undefined;
  indexId: string | null | undefined;
}

export const emptyCardsTrash = createAsyncThunk(
  "cards/emptyCardsTrash",
  async (params: emptyCardsTrashParams, thunkAPI) => {
    try {
      await api({
        url: `/v1/cards/emptyTrash?bookletId=${params.bookletId}&indexId=${params.indexId}`,
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
