"use client";
import React, { useState } from "react";
import { TextField, Button, Container, Typography,Typobutton } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/main");
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <section className="bg-yellow-50 min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <h1 className="text-5xl font-bold text-center">
          Welcome Back to PantryPie
        </h1>
      </div>

      <div className="flex items-center justify-center p-8">
        <Container
          component="main"
          maxWidth="xs"
          className="flex flex-col items-center justify-center bg-yellow-100 p-6 rounded-lg shadow-sm shadow-red-500"
        >
          <Typography
            component="h1"
            variant="h5"
            className="text-black font-bold text-2xl mb-4"
          >
            Sign In
          </Typography>

          <form
            className="min-w-[300px] mt-1 flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            {error && (
              <Typography color="error" className="mb-4">
                {error}
              </Typography>
            )}
            <button className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg font-semibold duration:300 hover:scale-110 ">
              Sign In
            </button>
            <div className="flex flex-col justify-center items-center pt-4">
              <p className="text-sm font-light">Don't have an account?</p>{" "}
              <Link href="/sign-up" passHref>
                <button className="text-sm font-semibold hover:scale-105">
                  Sign Up
                </button>
              </Link>
            </div>
          </form>
        </Container>
      </div>
    </section>
  );
};

export default SignIn;
