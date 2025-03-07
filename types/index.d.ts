import { ingredients } from "@/constant/image";
import { StaticImageData } from "next/image";

declare type registerUserInterface = {
  userName: string;
  email: string;
  password: string;
};

declare type loginUserInterface = {
  email: string;
  password: string;
};

declare type permissionInterface = {
  module: string;
  permissions: string[];
};

declare type userRoleInterface = {
  roleName: string;
  permissions: permissionInterface[];
};

declare type menuListInterface = {
  id: string;
  name: string;
  link?: string;
  lists: {
    name: string;
    icon: StaticImageData;
    href?: string;
    baseRoute?: boolean;
    module?: string;
  }[];
};

declare type ActionHeaderPropsInterface = {
  title: string;
  description: string;
  excelIcon?: StaticImageData; // URL of the Excel icon image
  handleAddClick?: () => void; // Optional function for Add New button click
  handleImportClick?: () => void; // Optional function for Import Product button click
};

declare type tableDataInterface = {
  title: string;
  header: string[];
  body: any[];
};

declare type menuCategoryInterface = {
  _id?: string;
  name: string;
  code: string;
  status: string;
};

declare interface customerServiceAreaInterface {
  _id?: string;
  code: string;
  name: string;
}
declare type fnbInterface = {
  _id?: string;
  name: string;
  category: menuCategoryInterface;
  sku: string;
  createdByName?: string;
  createdByImage?: string;
  description?: string;
  unit: string;
};

declare type fnbFormInterface = {
  _id?: string;
  name: string;
  category: string;
  sku: string;
  createdByName?: string;
  createdByImage?: string;
  description?: string;
  unit: string;
};

declare interface branchAreaInterface extends customerServiceAreaInterface {
  phone: string;
  address: string;
}

declare type productCategoryInterface = {
  _id: string;
  code: string;
  name: string;
  created_on?: string;
  status: string;
  productCount: number;
};

declare type productInterface = {
  _id: string;
  sku: string;
  unit: string;
  name: string;
  createBy?: string;
  image: string;
  category: productCategoryInterface;
};

declare type ingredientProductInterface = productInterface & {
  qty?: number;
};

declare type ingredientListInterface = {
  fnb: string;
  ingredients: [
    {
      ingredient: string;
      qty: number;
    }
  ];
}


declare type menuInterface = {
  menu: string;
  price: number;
  vat: number;
  disPercent: number;
  disAmount: number;
  adjust: boolean;
};

declare type priceTableMenuInterface = {
  menu: fnbInterface;
  price: number;
  vat: number;
  disPercent: number;
  disAmount: number;
  adjust: boolean;
};

declare type priceTableInterface = {
  _id: string;
  code: string;
  name: string;
  branch: branchAreaInterface;
  area: customerServiceAreaInterface;
  startDate: Date | null;
  endDate: Date | null;
  menus: priceTableMenuInterface[];
};

declare interface posMenuInterface extends priceTableMenuInterface {
  qty: number;
  totalMenuAmt: number;
  menuDiscountedAmt?: number;
  totalMenuDiscountedAmt?: number;
}

declare type priceTableMenuFormInterface = {
  menu: string;
  price: number;
  vat: number;
  disPercent: number;
  disAmount: number;
  adjust: boolean;
};

declare type priceTableFormInterface = {
  _id?: string;
  code: string;
  name: string;
  branch: string;
  area: string;
  startDate: Date | null;
  endDate: Date | null;
  menus: priceTableMenuFormInterface[];
};

declare type BillMenu = {
  menuId?: string | fnbInterface;
  price: number;
  qty: number;
  discountedAmount?: number;
  totalDiscountedAmount?: number;
};

declare type posBillInterface = {
  _id?: string;
  orderId: string | number; // Depending on the use case, choose one
  customer?: string;
  area: string;
  paymentMethod: string; // Extend this as needed
  productAmount: number;
  totalQty: number;
  totalDiscount?: number;
  totalPaymentAmount: number;
  totalTax?: number;
  billDiscount?: number;
  billTax?: number;
  billMenus: BillMenu[];
  createdAt?: Date;
};

declare type BillMenuReport = {
  menuId?: fnbInterface;
  price: number;
  qty: number;
  discountedAmount?: number;
  totalDiscountedAmount?: number;
};

declare type posBillReportInterface = {
  _id?: string;
  orderId: string | number; // Depending on the use case, choose one
  customer?: string;
  area: string;
  paymentMethod: string; // Extend this as needed
  productAmount: number;
  totalQty: number;
  totalDiscount?: number;
  totalPaymentAmount: number;
  totalTax?: number;
  billDiscount?: number;
  billTax?: number;
  billMenus: BillMenuReport[];
  createdAt?: Date;
};
declare type productCategoryInterface = {
  _id: string; // Assuming the product has an ID
  name: string;
  code: string;
  status: string;
};


declare type productInterface = {
  _id: string; // Assuming the product has an ID
  name: string;
  sku: string;
  unit: string;
  image?: string; // Optional field
  category: productCategoryInterface;
  createBy?: string; // Optional field
};
