// src/app/auth/login/page.tsx
"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-2 bg-yellow-500">
      <div className="mb-5">
        <Image 
          src="https://www.mateng.co.in/_next/image?url=%2Fmateng_icon.png&w=640&q=75"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[250px]"
          alt="mateng"
        />
        {/* <img
          src="https://www.mateng.co.in/_next/image?url=%2Fmateng_icon.png&w=640&q=75"
          alt=""
          className="w-[250px]"
        /> */}
      </div>
      <div className="flex flex-col items-center justify-center shadow-md p-10 gap-6 rounded bg-white">
        <h1>Login to your account</h1>
        <div
          className="flex border-2 border-sky-500 gap-5 rounded-full p-3 items center hover:bg-black hover:text-white hover:cursor-pointer"
          onClick={handleLogin}
        >
          {/* <img src="https://authjs.dev/img/providers/google.svg" width="30px" /> */}
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "30px", height: "auto" }} // optional
            alt="google"
          />
          <div className="flex items-center">Login with Google</div>
        </div>
      </div>
    </div>
  );
}
