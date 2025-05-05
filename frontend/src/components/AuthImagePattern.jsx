import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center h-full bg-background">
      <div className="max-w-md text-center">
        <div className="w-128 h-128 mx-8 my-6">
          <DotLottieReact src="bot-wave.lottie" loop autoplay />
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
