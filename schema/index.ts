import { z } from "zod";

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
        price: z.number(),
        vat: z.number(),
        disPercent: z.number(),
        disAmount: z.number(),
        adjust: z.boolean(),
      })
    )
    .optional(),
});

export const fnbSchema = z.object({
  name: z.string().min(1, { message: "Name must be included." }),
  image: z.string().optional(),
  description: z.string().optional(),
  // createdByImage: z.string().optional(),
  // createdByName: z.string().optional(),
  category: z.string().min(1, { message: "Category must be chosen" }),
  sku: z.string().min(1, { message: "Shu must be included" }),
  unit: z.string().min(1, { message: "Unit must be included" }),
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
