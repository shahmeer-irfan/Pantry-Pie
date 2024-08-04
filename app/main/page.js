"use client";
import { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import PantryForm from "@/components/PantryForm";
import { auth } from "../firebase/config";
import LogoutIcon from "@mui/icons-material/Logout"; // Adjust the path as needed

const MainPage = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        router.push("/sign-up");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear the token cookie
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      router.push("/sign-in");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  if (loading)
    return (
      <p className="text-center font-bold text-2xl text-green-700">
        Loading...
      </p>
    );

  return authenticated ? (
    <main className="bg-yellow-100 min-h-screen flex flex-col justify-between">
      <Box className="text-center pt-8">
        <h1
          className="sm:text-4xl text-3xl text-center font-bold text-green-800"
        >
          Welcome Back!
        </h1>
        <Typography
          variant="h7"
          component="p"
          className="text-green-700 pt-2 px-6"
        >
          Experience the peace of mind that comes with a well-organized pantry!
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        flexGrow="1"
      >
        <PantryForm />
      </Box>
      <Box display="flex" justifyContent="center" p={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          size="small"
          startIcon={<LogoutIcon />}
          className="bg-green-800 text-yellow-100 hover:bg-green-700"
        >
          Logout
        </Button>
      </Box>
    </main>
  ) : null;
};

export default MainPage;
