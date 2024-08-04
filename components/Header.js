// components/Header.js
"use client";

import React, { useState } from "react";
import { auth } from "../app/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // // Handle logout
  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     router.push("/sign-in"); // Redirect to the main page after logout
  //     setOpen(false);
  //   } catch (error) {
  //     console.error("Logout error: ", error.message);
  //   }
  // };

  return (
    <div className="flex justify-between items-center px-4">
      <div className="w-full sticky top-0 text-black flex items-center p-4 justify-between bg-yellow-50">
        <Link href="/" passHref>
          <h1 className="font-bold text-black sm:text-4xl text-3xl duration:300 hover:text-red-500">
            PantryPie.
          </h1>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/shahmeer-irfan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-purple-700 hover:scale-110"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/shahmeer-irfan-4a3175301 "
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-blue-600 hover:scale-110"
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
}
