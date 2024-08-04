"use client";
import { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import PantryForm from "@/components/PantryForm";
import { auth } from "../firebase/config"; // Adjust the path as needed

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

  if (loading) return <p>Loading...</p>;

  return authenticated ? (
    <main className="mb-20 bg-yellow-50">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="100vh"
      >
        <PantryForm />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{ mt: 2 }} // Add margin-top for spacing
        >
          Logout
        </Button>
      </Box>
    </main>
  ) : null;
};

export default MainPage;
