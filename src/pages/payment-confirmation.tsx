// "use client";
// pages/confirmation.js
import React from "react";
import { useRouter } from "next/router";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Button } from "@component/buttons";

const Confirmation = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <CheckIcon className="w-2 h-2 text-green-500" />

      <h1 className="mt-4 text-3xl font-bold text-center">
        Your form has been submitted successfully!
      </h1>
      <p className="mt-2 text-gray-500 text-center">
        Thank you for your submission. We will get back to you shortly.
      </p>
      <Button
        variant="contained"
        color="primary"
        className="mt-8"
        onClick={handleBack}
      >
        Back
      </Button>
    </div>
  );
};

export default Confirmation;
