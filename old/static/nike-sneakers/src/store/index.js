import {configureStore} from '@reduxjs/toolkit'
import sneakersSlice from './sneakersSlice'

export const store = configureStore({
    reducer: {
        sneakers: sneakersSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export default store