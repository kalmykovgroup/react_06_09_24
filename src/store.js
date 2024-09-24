import { createSlice, configureStore } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'counter',
    initialState: {
        positions: undefined,
        direction: undefined
    },
    reducers: {
        saveState: (preState, newState) => {
            // Redux Toolkit позволяет нам писать "изменяющуюся" логику в редукторах. На самом деле она
            // не изменяет состояние, потому что использует библиотеку Immer,
            // которая обнаруживает изменения в "черновом состоянии" и создает совершенно новое
            // неизменяемое состояние, основанное на этих изменениях

            preState.positions = newState.payload.positions ?? preState.positions;
            preState.direction = newState.payload.direction ?? preState.direction;
        }
    }
})

export const { saveState } = slice.actions

const store = configureStore({
    reducer: slice.reducer
})

export default store;
