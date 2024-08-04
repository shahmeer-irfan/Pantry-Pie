"use client";
import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "../firebase/config"; // Adjust the import to your setup

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      // Set the token in cookies
      document.cookie = `token=${token}; path=/`;

      router.push("/main");
    } catch (error) {
      setError(error.message);
      console.error("Error signing in:", error);
    }
  };

  return (
    <section className="bg-yellow-100 text-green-800 min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <h1 className="text-4xl sm:text-6xl text-green-800 font-bold text-center">
          Welcome back! Ready to organize your kitchen?
        </h1>
      </div>

      <div className="flex items-center justify-center">
        <Container
          component="main"
          maxWidth="xs"
          className="flex flex-col items-center justify-center bg-yellow-100 p-6 rounded-lg shadow-lg"
        >
          <Typography
            component="h1"
            variant="h4"
            className="text-green-800 font-bold text-3xl mb-4"
          >
            Sign In
          </Typography>

          <form
            className="min-w-[250px]  flex flex-col justify-center items-center"
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
            <button className="bg-orange-400 text-green-800 text-sm px-4 py-2 rounded-lg font-semibold duration:300 hover:bg-orange-300">
              Sign In
            </button>
            <div className="flex flex-col justify-center items-center pt-4">
              <p className="text-sm font-light">Don&apos;t have an account?</p>{" "}
              <Link href="/sign-up">
                <button className="text-sm font-semibold">Sign Up</button>
              </Link>
            </div>
          </form>
        </Container>
      </div>
    </section>
  );
};

export default SignIn;
