import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Login = ({ setIsLogin }) => {
  return (
    <div className="min-h-screen bg-[aliceblue] flex justify-center items-center">
      <Card className="max-w-4xl flex flex-col items-center text-center m-3 p-3 scale-90 sm:scale-110">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>Please Login to continue</CardDescription>
        </CardHeader>
        <CardContent className="text-left mt-5 w-96">
          <Label htmlFor="email" className="">
            Enter email
          </Label>
          <Input type="email" placeholder="e.g. np...@gmail.com" />
          <div className="p-3"></div>
          <Label htmlFor="password" className="">
            Enter password
          </Label>
          <Input type="password" placeholder="" />
        </CardContent>
        <Button
          onClick={() => setIsLogin(false)}
          className="px-10 py-5 bg-blue-600 hover:bg-blue-700 shadow-[0_1px_3px_gray] active:scale-90 rounded-full transition"
        >
          Login
        </Button>
        <div className="flex items-center justify-evenly text-gray-400 w-full my-5">
          <div className="flex-shrink-0 h-0.5 w-1/3 bg-gray-300"></div>
          <p>OR</p>
          <div className="flex-shrink-0 h-0.5 w-1/3 bg-gray-300"></div>
        </div>
        <CardFooter>
          <a
            href=""
            className="p-3 shadow-[0_1px_3px_gray] rounded-xl active:scale-90 transition flex items-center gap-3"
          >
            <img
              className="w-5 h-5"
              src="https://cdn.iconscout.com/icon/free/png-512/free-google-logo-icon-download-in-svg-png-gif-file-formats--youtube-pack-logos-icons-1721659.png?f=webp&w=256"
              alt="google"
            />
            <p className="text-gray-500 text-sm">Login with Google</p>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
