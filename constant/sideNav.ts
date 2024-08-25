import {
  analysisReport,
  cashBookList,
  cashPayment,
  cashReceipt,
  customer,
  debt,
  discount,
  expense,
  income,
  posRestaurant,
} from "@/constant/icon";

import {
  branch,
  csArea,
  employee,
  fnb,
  ingredients,
  menu,
  mobile,
  openingDebtList,
  priceTable,
  product,
  productCategory,
  stockIn,
  stockOut,
  userAccount,
  userRight,
} from "@/constant/image";
import { menuListInterface } from "@/types";

export const menuList: menuListInterface[] = [
  {
    id: "system",

    name: "System",
    lists: [
      {
        name: "F&B Menu List",
        icon: fnb,
        href: "/system/fnb",
        baseRoute: true,
      },

      {
        name: "Menu Category",
        icon: menu,
        href: "/system/menucategory",
      },
      {
        name: "Branch List",
        icon: branch,
        href: "/system/branchlists",
      },

      {
        name: "Customer Service area",
        icon: csArea,
        href: "/system/customerservicearea",
      },

      {
        name: "Price Table ",
        icon: priceTable,

        href: "/system/pricetable",
      },

      {
        name: "Ingredient List",
        icon: ingredients,

        href: "/system/ingredients",
      },

      {
        name: "User Rights ",
        icon: userRight,

        href: "/system/rights",
      },

      {
        name: "User Account ",
        icon: userAccount,

        href: "/system/accounts",
      },

      {
        name: "Employee List",
        icon: employee,

        href: "/system/employees",
      },

      {
        name: "Mobile Account",
        icon: mobile,

        href: "/system/mobileaccounts",
      },
    ],
  },

  {
    id: "inventory",

    name: "Inventory",
    link: "/inventory",
    lists: [
      {
        name: "Product List",
        icon: product,

        href: "/inventory/products",
      },
      {
        name: "Product Category",
        icon: productCategory,

        href: "/inventory/productcategories",
      },
      {
        name: "Stock In",
        icon: stockIn,
        href: "/inventory/stockin",
      },

      {
        name: "Stock Out",
        icon: stockOut,
        href: "/inventory/stockout",
      },
    ],
  },

  {
    id: "crm",

    name: "CRM",
    link: "/crm",
    lists: [
      {
        name: "Customer",
        icon: customer,
        href: "/crm/customers",
      },
      {
        name: "Discount",
        icon: discount,
        href: "/crm/discounts",
      },
    ],
  },

  {
    id: "finance",

    name: "Finance",
    link: "/finance",
    lists: [
      {
        name: "Cash book list",
        icon: cashBookList,
        href: "/finance/cashbooks",
      },

      {
        name: "Income Type",
        icon: income,
        href: "/finance/income",
      },
      {
        name: "Expense Type",
        icon: expense,
        href: "/finance/expense",
      },

      {
        name: "Cash Receipt Voucher",
        icon: cashReceipt,
        href: "/finance/cashreceipt",
      },

      {
        name: "Cash Payment Voucher",
        icon: cashPayment,
        href: "/finance/cashpayment",
      },

      {
        name: "Debt Receipt Voucher",
        icon: debt,
        href: "/finance/debtreceipt",
      },

      {
        name: "Debt Payment Voucher",
        icon: debt,
        href: "/finance/debtpayment",
      },

      {
        name: "Cash Book Report",
        icon: cashBookList,
        href: "/finance/cashbookreport",
      },
      {
        name: "Opening Debt List",
        icon: openingDebtList,
        href: "/finance/openingdebtlists",
      },
    ],
  },

  {
    id: "analysisReport",

    name: "Analysis Report",
    link: "/report",
    lists: [
      {
        name: "Sales Report",
        icon: analysisReport,
        href: "/salereports",
      },
    ],
  },

  {
    id: "pos",

    name: "Point of Sale",
    link: "/pos",
    lists: [
      {
        name: "Point of Sale",
        icon: posRestaurant,
        href: "/pos",
      },
    ],
  },
];
