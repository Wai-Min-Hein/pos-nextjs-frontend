'use client'

import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {  QueryClientProvider, QueryClient } from "@tanstack/react-query";

const TanStackProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanStackProvider;
