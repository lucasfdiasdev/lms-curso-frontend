"use client";

import * as z from "zod";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { RegisterSchema } from "@/lib/schemas";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

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

interface IRegisterForm {
  onSubmit: () => void;
}

const RegisterForm: React.FC<IRegisterForm> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [register, { isError, data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      onSubmit();
      const message = data?.message || "Registration succefully";
      toast.success(message);
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        console.log(errorData.data.message);
      }
    }
  }, [isSuccess, error, data, onSubmit]);

  const formRegister = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmitRegister: SubmitHandler<
    z.infer<typeof RegisterSchema>
  > = async (data) => {
    setIsLoading(true);

    try {
      await register(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...formRegister}>
      <form
        onSubmit={formRegister.handleSubmit(onSubmitRegister)}
        className="space-y-4"
      >
        <div className="space-y-4">
          <FormField
            control={formRegister.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="John Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formRegister.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formRegister.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
          Confirmar
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
