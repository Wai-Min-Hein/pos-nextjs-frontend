import { z } from "zod";


export const registerSchema = z.object({
  userName: z.string().min(1, { message: "User name must be included." }),
  email: z.string().min(1, { message: "Email must be included." }).email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password must be included." }),
});
export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email must be included." }).email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password must be included." }),
});


export const fnbSchema = z.object({
  name: z.string().min(1, { message: "Name must be included." }),
  image: z.string().optional(),
  description: z.string().optional(),
  createdByImage: z.string().optional(),
  createdByName: z.string().optional(),
  category: z.string().min(1, { message: "Category must be chosen" }),
  sku: z.string().min(1, { message: "Shu must be included" }),
  unit: z.string().min(1, { message: "Unit must be included" }),
});

export const priceTableSchema = z.object({
  code: z.string().min(1, {
    message: "Table code must be include.",
  }),

  name: z.string().min(1, {
    message: "Table name must be include.",
  }),
  branch: z.string({
    required_error: "Branch must be chosen.",
  }),
  area: z.string({
    required_error: "Area must be chosen.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),

  endDate: z.date({
    required_error: "End date is required.",
  }),
  menus: z
    .array(
      z.object({
        menu: z.string(),
        // menu: z.union([z.string(), fnbSchema]), // Accepts string or fnbInterface
        price: z.number(),
        vat: z.number(),
        disPercent: z.number(),
        disAmount: z.number(),
        adjust: z.boolean(),
      })
    )
    
});


export const menuCategorySchema = z.object({
  name: z.string().min(1, { message: "Name must be included." }),
  code: z.string().min(1, { message: "Code must be included." }),
  status: z.string().min(1, { message: "Status must be included." }),
  
})

export const csaSchema = z.object({
  name: z.string().min(1, { message: "Name must be included." }),
  code: z.string().min(1, { message: "Code must be included." }),
})


export const billSchema = z.object({
  orderId: z.number(),
  area: z.string(),
  paymentMethod: z.string().min(1,{message: "Paymethod must be chosen."}),
  productAmount: z.number(),
  totalQty: z.number(),
  totalDiscount: z.number().optional(),
  totalTax: z.number().optional(),
  totalPaymentAmount: z.number(),
  customer: z.string().optional(),
  billDiscount: z.number().optional(),
  billTax: z.number().optional(),
  billMenus: z.array(
    z.object({
      menuId: z.string().optional(),
      price:z.number(),
      qty: z.number(),
      discountedAmount:z.number().optional(),
      totalDiscountedAmount: z.number().optional()
    })
  )

})