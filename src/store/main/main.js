import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    mainCity: ['DSFDSFDSFDS', '2', '3', '4', '5', '6', '7', '8', '9',],
    contract: ['1', '2', '3', '4', '5', '6', '7', '8', '9',],
    products: ['1', '2', '3', '4', '5', '6', '7', '8', '9',],
    choiceCity: [],
    choiceMainCity: [],
    choiceContract: [],
    choiceProducts: [],
    choiceChoiceCity: [],
    isLoading: false,
    sendLoad: false,
    request: []

};

// getAllProduct
// getAllCity
// getAllContact

export const getAllProductRedux = createAsyncThunk(
    "cart/getAllProductRedux",
    async (params) => {

        const {data} = await axios.get(
            `http://localhost:2000/getAllProduct`
        );
        return data;
    }
);
export const getAllCityRedux = createAsyncThunk(
    "cart/getAllCityRedux",
    async (params) => {

        const {data} = await axios.get(
            `http://localhost:2000/getAllCity`
        );
        return data;
    }
);
export const getAllContactRedux = createAsyncThunk(
    "cart/getAllContactRedux",
    async (params) => {

        const {data} = await axios.get(
            `http://localhost:2000/getAllContact`
        );
        return data;
    }
);

export const setData = createAsyncThunk(
    "cart/setData",
    async (params) => {

        const {data} = await axios.post(
            `http://localhost:2000/setData`, {
                params
            }
        );
        return data;
    }
);


export const main = createSlice({
    name: "main",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllProductRedux.pending, (state, {payload}) => {

            state.isLoading = true;
        });
        builder.addCase(getAllProductRedux.fulfilled, (state, {payload}) => {
            state.products = [...payload];
            state.isLoading = false;
        });
        builder.addCase(getAllProductRedux.rejected, (state, {payload}) => {
            state.isLoading = false;
        });

        builder.addCase(getAllCityRedux.pending, (state, {payload}) => {
            state.isLoading = true;
        });
        builder.addCase(getAllCityRedux.fulfilled, (state, {payload}) => {
            console.log(payload)
            state.mainCity = [...payload];
            state.isLoading = false;
        });
        builder.addCase(getAllCityRedux.rejected, (state, {payload}) => {
            state.isLoading = false;
        });

        builder.addCase(getAllContactRedux.pending, (state, {payload}) => {
            state.isLoading = true;
        });
        builder.addCase(getAllContactRedux.fulfilled, (state, {payload}) => {
            state.contract = [...payload];
            state.isLoading = false;
        });
        builder.addCase(getAllContactRedux.rejected, (state, {payload}) => {
            state.isLoading = false;
        });
        builder.addCase(setData.pending, (state, {payload}) => {
            state.sendLoad = true;
        });
        builder.addCase(setData.fulfilled, (state, {payload}) => {
            state.sendLoad = false;
            state.request = payload

        });
        builder.addCase(setData.rejected, (state, {payload}) => {
            state.sendLoad = false;
            state.request = [{q: 'ошибка на сервере попробуйте позже'}]
        });
    },
    reducers: {

        setMainCityStore: (state, {payload}) => {
            state.choiceMainCity = [payload]
        },
        setRequest: (state, {payload}) => {
            state.request = [{q: ''}]
        },
        setChoiceContractStore: (state, {payload}) => {
            state.choiceContract = [payload]
        },
        setChoiceProductsStore: (state, {payload}) => {
            state.choiceProducts = [...payload]
        },
        setChoiceChoiceCityStore: (state, {payload}) => {
            state.choiceChoiceCity = [...payload]
        },


    },
});

export const {
    setMainCityStore,
    setChoiceContractStore,
    setChoiceProductsStore,
    setChoiceChoiceCityStore, setRequest
} =
    main.actions;

export default main.reducer;
