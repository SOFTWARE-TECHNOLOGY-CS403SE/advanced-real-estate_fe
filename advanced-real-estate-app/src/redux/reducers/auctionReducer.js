import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomId: '',
    auction: null,
    userData : {
        connected: false,
        message: "",
    },
    bidMessages: []
};

const auctionSlice = createSlice({
    name: "auction",
    initialState,
    reducers: {
        joinAuctionRoom: (state, action) => {
            state.roomId = action.payload.roomId;
            state.userData = action.payload.userData;
            state.auction = action.payload.auction;
        },
        addBidMessages: (state, action) => {
            state.bidMessages.push(action.payload);
        },
        removeBidMessages: (state, action) => {
            state.bidMessages = [];
        },
        updatedAuctionRoom: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
            state.auction = null;
            state.roomId = '';
        }
    },
});

export const {
    joinAuctionRoom,
    updatedAuctionRoom,
    addBidMessages,
    removeBidMessages
} = auctionSlice.actions;
export default auctionSlice.reducer;
export const auctionSelector = (state) => state.auction;