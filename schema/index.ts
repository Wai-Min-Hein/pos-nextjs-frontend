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
        menuId: z.string(),
        price: z.number(),
        vat: z.number(),
        disPercent: z.number(),
        disAmount: z.number(),
        adjust: z.boolean(),
      })
    )
    .optional(),
  });