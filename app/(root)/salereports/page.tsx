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
  const allTotalRevenue = posReports?.reduce(
    (pv, cv) => pv + cv?.totalPaymentAmount,
    0
  );


  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <main className="flex-1">
      <Table className="">
        <TableHeader className="">
          <TableRow>
            <TableHead className="text-center">Order Number</TableHead>
            <TableHead className=" min-w-[120px] text-center">Date</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-center min-w-[250px]">Menus</TableHead>
            <TableHead>Total Quantity</TableHead>
            <TableHead className="">Product Amount</TableHead>
            <TableHead className="">Discounted Amount</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Total Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posReports?.map((report) => (
            <TableRow key={report?._id}>
              <TableCell className="text-center">{report.orderId}</TableCell>
              <TableCell className="text-center min-w-[120px]">
                {report.createdAt
                  ? new Date(report.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : ""}
              </TableCell>
              <TableCell className="capitalize">{report.area}</TableCell>
              <TableCell className="">
                {report.customer ? report.customer : report.area}
              </TableCell>
              <TableCell className="text-center min-w-[250px] flex flex-col gap-1">
                {report.billMenus.map((menu, index) => (
                  <div
                    key={menu?.menuId?._id}
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="">{index + 1}. </span>{" "}
                    <h1 className="">
                      {menu?.menuId?.name} - {menu.qty} {menu.menuId?.unit} -{" "}
                      {menu.price} Ks
                    </h1>
                  </div>
                ))}
              </TableCell>
              <TableCell className="text-center">{report.totalQty}</TableCell>
              

              <TableCell className="">{report.productAmount} Ks</TableCell>
              <TableCell className="">{report.totalDiscount} Ks</TableCell>
              <TableCell className="">{report.totalTax} Ks</TableCell>
              <TableCell className="">{report.totalPaymentAmount} Ks</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={9} className="text-right">
              Total Rvenue:
            </TableCell>
            <TableCell className="">{allTotalRevenue} Ks</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
};

export default SaleReports;
