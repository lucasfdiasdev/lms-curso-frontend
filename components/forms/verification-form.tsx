"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type verifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

interface IVerificationForm {
  onSubmit: () => void;
}

const VerificationForm: React.FC<IVerificationForm> = ({ onSubmit }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
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
      onSubmit();
      toast.success("Account actived successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error, onSubmit]);

  const submitVerification = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      return;
    }

    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
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

  return (
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
      <Button onClick={submitVerification} className="w-full">
        Verify OTP
      </Button>
    </>
  );
};

export default VerificationForm;
