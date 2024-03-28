"use client";

import { useCallback, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";
import VerificationForm from "@/components/forms/verification-form";
import SocialForm from "./social-form";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "REGISTER" | "LOGIN" | "VERIFICATION";

const ModalForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) => {
      switch (prevVariant) {
        case "LOGIN":
          return "REGISTER";
        default:
          return "LOGIN";
      }
    });
  }, []);

  const handleRegisterSubmit = useCallback(() => {
    setVariant("VERIFICATION");
  }, []);

  const handleVerificationSubmit = useCallback(() => {
    setVariant("LOGIN");
  }, []);

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
            {(variant === "LOGIN" && "Acesse gratuitamente") ||
              (variant === "REGISTER" && "Cadastrar nova conta") ||
              (variant === "VERIFICATION" && "Verification de email")}
          </DialogTitle>
          <DialogDescription>
            {(variant === "LOGIN" && (
              <>
                <p className="text-sm text-muted-foreground dark:text-white">
                  Acesse gratuitamente.
                </p>
              </>
            )) ||
              (variant === "REGISTER" && (
                <>
                  <p className="text-sm text-muted-foreground dark:text-white">
                    Cadastra-se em nossa plataforma gratuitamente e tenha acesso
                    a diversos cursos.
                  </p>
                </>
              )) ||
              (variant === "VERIFICATION" && (
                <>
                  <p className="text-sm text-muted-foreground dark:text-white">
                    Verifque seu email.
                  </p>
                </>
              ))}
          </DialogDescription>
        </DialogHeader>
        {(variant === "LOGIN" && <LoginForm />) ||
          (variant === "REGISTER" && (
            <RegisterForm onSubmit={handleRegisterSubmit} />
          )) ||
          (variant === "VERIFICATION" && (
            <VerificationForm onSubmit={handleVerificationSubmit} />
          ))}

        <>
          {(variant === "REGISTER" || variant === "LOGIN") && (
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
                <SocialForm icon={BsGithub} onClick={() => "github"} />
                <SocialForm icon={BsGoogle} onClick={() => "google"} />
              </div>
            </div>
          )}
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "Novo no LMS Cursos?"
                : variant === "REGISTER"
                ? "Já tem uma conta?"
                : "Precisa verificar sua conta?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN"
                ? "Criar uma conta"
                : variant === "REGISTER"
                ? "Login"
                : "Voltar para login"}
            </div>
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default ModalForm;
