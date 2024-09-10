import { StaticImageData } from "next/image";

declare  type menuListInterface = {
    id: string;
    name: string;
    link?: string;
    lists: {
      name: string;
      icon: StaticImageData;
      href?: string;
      baseRoute?: boolean;
    }[];
  }

 declare type ActionHeaderPropsInterface = {
    title: string;
    description: string;
    excelIcon?: StaticImageData; // URL of the Excel icon image
    handleAddClick?: () => void; // Optional function for Add New button click
    handleImportClick?: () => void; // Optional function for Import Product button click
  };

declare type tableDataInterface = {
  title: string;
  header: string[],
  body: any[]
}

declare type fnbInterface = {
  _id: string;
  name: string;
  price: number;
  category: string;
  sku: string;
  createdByName: string;
  createdByImage: string;
  unit: string;
}

declare type customerServiceAreaInterface = {
  _id: string;
    code: string;
    name: string;
}
