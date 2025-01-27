"use client"

import Image from "next/image"

export default function VerificationSuccess() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <Image
            src="/clipboard-success.svg"
            alt="Success"
            width={200}
            height={200}
            className="w-full h-full"
          />
        </div>
        <h1 className="text-2xl font-semibold">
          Your Profile has been submitted successfully!
        </h1>
        <p className="text-gray-600">
          kindly await as we verify your information and have you profiled
        </p>
      </div>
    </div>
  )
}

