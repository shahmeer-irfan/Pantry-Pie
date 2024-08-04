"use client";
import React, { useState } from "react";
import { TextField, Container, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/main");
    } catch (error) {
      setLoading(false);
      setError(getCustomErrorMessage(error.code));
      console.error("Error signing up:", error);
    }
  };

  const getCustomErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "The email address is already in use.";
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/weak-password":
        return "The password is too weak.";
      default:
        return "Failed to sign up. Please try again.";
    }
  };

  return (
    <section className="bg-yellow-100 min-h-screen grid grid-cols-1 md:grid-cols-2 ">
      <div className="flex items-center justify-center ">
        <h1 className="text-4xl sm:text-6xl text-green-800 font-bold text-center px-4">
          Create Account and Get Started!
        </h1>
        <p></p>
      </div>

      <div className="flex items-center justify-center">
        <Container
          component="main"
          maxWidth="xs"
          className="flex flex-col items-center justify-center bg-yellow-100 p-6 rounded-lg shadow-lg "
        >
          <Typography
            component="h1"
            variant="h5"
            className="text-green-800 font-bold text-3xl mb-4"
          >
            Sign Up
          </Typography>

          <form
            className="min-w-[250px] mt-1 flex flex-col justify-center items-center"
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
            <TextField
              size="small"
              variant="outlined"
              margin="none"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4"
            />
            {error && <p className="text-sm text-green-700 p-2">{error}</p>}
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-300 text-green-800 text-sm px-4 py-2 rounded-lg font-semibold duration-300 my-2"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <div className="flex flex-col justify-center items-center pt-4">
              <p className="text-sm text-green-700 font-light">
                Already part of the family?
              </p>{" "}
              <Link href="/sign-in" passHref>
                <button className="text-green-800 text-sm font-semibold">
                  Sign In
                </button>
              </Link>
            </div>
          </form>
        </Container>
      </div>
    </section>
  );
};

export default Signup;
