"use client";

import * as z from "zod";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useActivationMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";

import { BsGithub, BsGoogle } from "react-icons/bs";

import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import SocialForm from "@/components/forms/social-form";

type Variant = "LOGIN" | "REGISTER" | "VERIFICATION";

type verifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const ButtonAuth = () => {
  const router = useRouter();
  const { token } = useSelector((state: any) => state.auth);
  const [activation] = useActivationMutation();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [register, { isError, data, error, isSuccess }] = useRegisterMutation();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<verifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration succefully";
      // toast.success(message);
      setVariant("VERIFICATION");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        // toast.error(errorData.data.message);
        console.log(errorData.data.message);
      }
    }
  }, [isSuccess, error, data]);

  const verificationHandler = async () => {
    console.log("test");
  };

  const handleInputChange = (index: number, value: string) => {
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const formRegister = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const formLogin = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
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

  const onSubmitLogin: SubmitHandler<z.infer<typeof LoginSchema>> = () => {
    setIsLoading(true);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex font-semibold items-center justify-center whitespace-nowrap cursor-pointer bg-black text-white dark:text-black dark:bg-white py-1.5 px-3 rounded-md">
          Login
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {variant === "LOGIN"
              ? "Acesse sua conta"
              : "Cadastrar gratruitamente"}
          </DialogTitle>
          <DialogDescription>
            {variant === "LOGIN" ? (
              "Insira seu email e senha para poder acessar sua conta em nossa plataforma."
            ) : (
              <p>
                By clicking continue, you agree to our{" "}
                <Link
                  href={"/"}
                  target="_blank"
                  className="hover:underline text-black dark:text-white"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href={"/"}
                  target="_blank"
                  className="hover:underline text-black dark:text-white"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        {variant === "LOGIN" && (
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
                          placeholder="john.doe@example.com"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          placeholder="******"
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
        )}

        {variant === "REGISTER" && (
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
                          placeholder="******"
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
        )}

        {variant === "VERIFICATION" && (
          <>
            <div className="flex items-center justify-center gap-8">
              {Object.keys(verifyNumber).map((key, index) => (
                <Input
                  key={key}
                  type="number"
                  ref={inputRefs[index]}
                  placeholder="0"
                  className="h-[50px] w-[45px] flex items-center justify-center text-3xl"
                  value={verifyNumber[key as keyof verifyNumber]}
                  maxLength={1}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
            <Button onClick={verificationHandler}>Verify OTP</Button>
          </>
        )}

        <>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <SocialForm icon={BsGithub} onClick={() => ""} />
              <SocialForm icon={BsGoogle} onClick={() => ""} />
            </div>
          </div>
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "New to Messenger?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonAuth;
