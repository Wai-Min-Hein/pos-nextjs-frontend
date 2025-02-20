"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosInstance";
import { loginSchema } from "@/schema";
import { loginUserInterface } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ClipLoader } from 'react-spinners';


const Login = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // email: "waiminhein@gmail.com",
      // password: "111111",
      email: "admin@gmail.com",
      password: "admin19002137",
    },
  });


  const mutation = useMutation({
    mutationFn: async (data: loginUserInterface) => {
      try {
        const res = await axiosInstance.post(`/auth/signIn`, data)

        router.push("/system/fnb")
      } catch (error) {
        console.log(error);
        
      }
    }
  })

  function onSubmit(formData: z.infer<typeof loginSchema>) {
    mutation.mutate(formData);
  }


  return (
    <div>
      <h1>Login</h1>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={mutation.isPending} type="submit">
            {mutation.isPending ? <ClipLoader size={20} color="#ffffff" /> : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
