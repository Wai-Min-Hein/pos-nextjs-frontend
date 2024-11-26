import { RootState } from '@/store/store'
import { posMenuInterface } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



interface BillMenu {
  menuId?: string; // optional
  price: number; // required
  qty: number; // required
  discountedAmount?: number; // optional
  totalDiscountedAmount?: number; // optional
}

interface Order {
  orderId: number; // required
  paymentMethod: string; // required, must be at least 1 character long
  productAmount: number; // required
  totalQty: number; // required
  totalDiscount?: number; // optional
  totalTax?: number; // optional
  totalPaymentAmount: number; // required
  customer?: string; // optional
  billDiscount?: number; // optional
  billTax?: number; // optional
  billMenus: BillMenu[]; // required, array of BillMenu objects
}
// Define a type for the slice state
interface OrderIdStateInterface {
  orderId: number
  menus: Order[],
  lastResetDate: string;
}

// Define the initial state using that type
const initialState: OrderIdStateInterface = {
  orderId: 1,
  menus: [],
  lastResetDate: new Date().toISOString().split('T')[0], // Set to today's date in YYYY-MM-DD format
}

export const counterSlice = createSlice({
  name: 'order',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCurrentOrderId: (state) => {
      state.orderId += 1
    },
    resetCurrentOrderId: (state) => {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      if(state.lastResetDate != today){
        state.orderId=1
        state.lastResetDate = today
      }
    },
    addConfirmedOrder : (state ,action: PayloadAction<Order>) => {
      state.menus.push(action.payload);
      state.orderId += 1
    }
    
  },
})

export const { addCurrentOrderId,addConfirmedOrder,resetCurrentOrderId } = counterSlice.actions



export default counterSlice.reducer