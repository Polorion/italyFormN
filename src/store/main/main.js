import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mainCity: ['Улан-Удэ', 'Горно-Алтайск', 'Южно-Сухокумск', '1', '2', '3', '4', '5', '6', '7'],
    contract: ['Улан-Удэ', 'Горно-Алтайск', 'Южно-Сухокумск', '1', '2', '3', '4', '5', '6', '7'],
    products: ['Улан-Удэ', 'Горно-Алтайск', 'Южно-Сухокумск', '1', '2', '3', '4', '5', '6', '7'],
    choiceCity: ['Улан-Удэ', 'Горно-Алтайск', 'Южно-Сухокумск', '1', '2', '3', '4', '5', '6', '7'],
    choiceMainCity: [],
    choiceContract: [],
    choiceProducts: [],
    choiceChoiceCity: [],

};


export const main = createSlice({
    name: "main",
    initialState,
    reducers: {

        setMainCityStore: (state, {payload}) => {
            state.choiceMainCity = [payload]
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
    setChoiceChoiceCityStore
} =
    main.actions;

export default main.reducer;
