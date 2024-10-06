"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8 bg-green-100">
      <div className="flex flex-col items-center justify-center shadow-md p-10 gap-6 rounded bg-white max-w-md w-full text-center">
        {/* Logo */}
        <Image
          src="/mateng-logo.png"
          width={150}
          height={150}
          alt="mateng"
          className="w-[200px]"
        />
        {/* Main Text */}
        <h1 className="text-2l font-bold text-gray-900">Start your productive journey with us</h1>
        {/* Google Sign-In Button */}
        <div
          className="flex border-2 border-sky-500 gap-5 rounded-full p-3 items-center hover:bg-black hover:text-white hover:cursor-pointer transition-all duration-200"
          onClick={handleLogin}
        >
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            width={30}
            height={30}
            alt="google"
            className="ml-2"
          />
          <div className="flex items-center font-medium text-gray-800">
            Login with Google
          </div>
        </div>
      </div>
    </div>
  );
}