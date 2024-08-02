"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  function submitHandler()
  {
    if(!email || !password) (
      setError("Please fill in all fields")
    )
  }

  return (
    <section className="flex flex-1 flex-col justify-center items-center gap-2 sm:gap-4">
      {/*doing conditional rendering of heading on the bases of isLoggedIn*/ }
      <h1 className="text-2xl text-blue-500 p-4 font-bold uppercase">{isLoggingIn? 'Login':'Register'}</h1>
      {error && (
        <Alert variant="outlined" severity="warning">
          {error}
        </Alert>
      )}

      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        sx={{
          width: "300px", // Set the width
          input: { color: "black" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            color: "black",
          },
        }}
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        sx={{
          width: "300px", // Set the width
          input: { color: "black" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            color: "black",
          },
        }}
      />
      <Button
        type="submit"
        onClick={submitHandler}
        variant="contained"
        size="medium"
      >
        Submit
      </Button>
      <h1
        onClick={() => setIsLoggingIn(!isLoggingIn)}
        className="text-blue-500 cursor-pointer duration-300 hover:scale-110"
      >
        {!isLoggingIn ? "Login" : "Register"}
      </h1>
    </section>
  );
}
