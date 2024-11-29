import { RootState } from '@/store/store'
import { fnbInterface, posMenuInterface } from '@/types'
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
  billMenus: posMenuInterface[]; // required, array of BillMenu objects
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
      const existingOrderIndex = state.menus.findIndex(menu => menu.orderId === action.payload.orderId);
      
      if (existingOrderIndex !== -1) {
        // If it exists, replace the existing order with the new one
        state.menus[existingOrderIndex] = action.payload;
      } else {
        // If it doesn't exist, add the new order to the menus array
        state.menus.push(action.payload);
        
        // Increment the orderId for future orders if needed
        state.orderId += 1; 
      }

    },
    deleteConfirmedOrder : (state ,action: PayloadAction<number>) => {
      const orderId = action.payload      
      const leftMenu = state.menus.filter(menu => menu.orderId != orderId)
      state.menus = leftMenu

    }
    
  },
})

export const { addCurrentOrderId,addConfirmedOrder,resetCurrentOrderId,deleteConfirmedOrder } = counterSlice.actions



export default counterSlice.reducer