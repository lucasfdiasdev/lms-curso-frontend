"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { LoginSchema } from "@/lib/schemas";
import { useLoginMutation } from "@/redux/features/auth/authApi";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [login, { isSuccess, error, data }] = useLoginMutation();
  const formLogin = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitLogin: SubmitHandler<z.infer<typeof LoginSchema>> = async (
    data
  ) => {
    setIsLoading(true);

    try {
      await login(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        console.log(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <Form {...formLogin}>
      <form
        onSubmit={formLogin.handleSubmit(onSubmitLogin)}
        className="space-y-4"
      >
        <div className="space-y-4">
          <FormField
            control={formLogin.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="email@exemplo.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formLogin.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="********"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
