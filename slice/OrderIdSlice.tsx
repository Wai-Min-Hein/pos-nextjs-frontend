import { RootState } from '@/store/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface OrderIdStateInterface {
  orderId: number
}

// Define the initial state using that type
const initialState: OrderIdStateInterface = {
  orderId: 1,
}

export const counterSlice = createSlice({
  name: 'orderId',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getCurrentId: (state) => {
      state.orderId += 1
    },
    
  },
})

export const { getCurrentId } = counterSlice.actions



export default counterSlice.reducer