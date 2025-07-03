"use client";
import { useState } from "react";

export const VipToggle = () => {
  const [isVip, setIsVip] = useState(false);
  return (
    <div
      className="flex items-center space-x-3"
      onClick={() => setIsVip((curr) => !curr)}
    >
      <span
        className={`font-medium transition-colors ${
          isVip ? "text-gray-500" : "text-blue-600"
        }`}
      >
        Regular
      </span>
      <button
        role="switch"
        className={`
          relative inline-flex items-center h-6 rounded-full w-11
          transition-colors duration-200
          ${isVip ? "bg-green-500" : "bg-gray-300"}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        `}
      >
        <span
          className={`
            inline-block w-5 h-5 transform bg-white rounded-full shadow
            transition-transform duration-200
            ${isVip ? "translate-x-5" : "translate-x-1"}
          `}
        />
      </button>
      <span
        className={`font-medium transition-colors ${
          isVip ? "text-green-600" : "text-gray-500"
        }`}
      >
        VIP
      </span>
    </div>
  );
};
