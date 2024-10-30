import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    buildings: [],
    isError: false,
    selectedType: '',
    selectedArea: '',
    selectedStructure: '',
    inputPrice: 0,
    formattedPrice: '',
};

const buildingSlice = createSlice({
    name: "building",
    initialState,
    reducers: {
        success: (state, action) => {
            state.isLoading = true;
            state.buildings = action.payload;
            state.isError = false;
        },
        failed: (state, action) => {
            state.isLoading = false;
            state.buildings = [];
            state.isError = true;
        },
        setSelectedType: (state, action) =>{
            state.selectedType = action.payload;
        },
        setSelectedArea: (state, action) =>{
            state.selectedArea = action.payload;
        },
        setSelectedStructure: (state, action) =>{
            state.selectedStructure = action.payload;
        },
        setPrice: (state, action) =>{
            state.inputPrice = action.payload;
        },
        setFormattedPrice: (state, action) =>{
            state.inputPrice = action.payload;
        },
        removeSelectedType: (state, action) =>{
            state.selectedType = '';
        },
        removeSelectedArea: (state, action) =>{
            state.selectedArea = '';
        },
        removeSelectedStructure: (state, action) =>{
            state.selectedStructure = '';
        },
        removePrice: (state, action) =>{
            state.inputPrice = 0;
        },
        removeFormattedPrice: (state, action) =>{
            state.formattedPrice = '';
        }
    },
});

export const {
    success,
    failed,
    setSelectedType,
    setSelectedArea,
    setSelectedStructure,
    setPrice,
    setFormattedPrice,
    removeSelectedType,
    removeSelectedArea,
    removeSelectedStructure,
    removePrice,
    removeFormattedPrice
} = buildingSlice.actions;
export default buildingSlice.reducer;
export const buildingSelector = (state) => state.building;