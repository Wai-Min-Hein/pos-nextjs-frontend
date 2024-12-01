"use client";

import React from "react";
import { useGetAllPosSaleReport } from "@/utils/TanStackHooks/useSystem";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SaleReports = () => {
  const { data: posReports, isLoading, isError } = useGetAllPosSaleReport();
  const allTotalRevenue = posReports?.reduce((pv, cv) => pv + cv?.totalPaymentAmount, 0)

  if(isLoading){
    return(
      <h1>Loading ...</h1>
    )
  }

  return (
    <main className="flex-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Order Number</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-center">Menus</TableHead>
            <TableHead>Total Quantity</TableHead>
            <TableHead className="">Product Amount</TableHead>
            <TableHead className="">Discounted Amount</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Total Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            posReports?.map(report=> (
              <TableRow key={report?._id}>
                <TableCell className="">{report.orderId}</TableCell>
                <TableCell className="capitalize">{report.area}</TableCell>
                <TableCell className="">{report.customer ?report.customer :report.area}</TableCell>
                <TableCell className="">
                  {
                    report.billMenus.map((menu, index) => (
                      <div key={menu?.menuId?._id} className="flex items-center justify-start gap-1">
                        <span>{index+1}. </span> <h1>{menu?.menuId?.name} - {menu.qty} {menu.menuId?.unit} - {menu.price} Ks</h1>
                      </div>
                    ))
                  }
                </TableCell>
                <TableCell className="text-center">{report.totalQty}</TableCell>
                <TableCell className="">{report.productAmount} Ks</TableCell>
                <TableCell className="">{report.totalDiscount} Ks</TableCell>
                <TableCell className="">{report.totalTax} Ks</TableCell>
                <TableCell className="">{report.totalPaymentAmount} Ks</TableCell>
                </TableRow>
            ))
          }
          
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} className="text-right">Total Rvenue:</TableCell>
            <TableCell className="">{allTotalRevenue} Ks</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
};

export default SaleReports;
