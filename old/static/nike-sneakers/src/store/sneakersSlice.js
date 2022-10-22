import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: [],
    buy: {},
}

export const sneakersSlice = createSlice({
    name: 'sneakers',
    initialState,
    reducers: {
        saveAllData: (state, action) => {
            // console.log(`action = ${JSON.stringify( action)}`)
            state.list = action.payload
        },
        setBuySneaker: (state, action) => {
            // console.log(action.payload)
            state.buy = action.payload
        }
    }
})

export const {saveAllData, setBuySneaker} = sneakersSlice.actions

export default sneakersSlice.reducer
