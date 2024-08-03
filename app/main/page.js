// app/main/page.tsx
"use client";
import {
  Typography,
  Button,
  IconButton,
  PersonIcon,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import PantryForm from "@/components/PantryForm";

const MainPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <main className="mb-20 bg-yellow-50">
      {/* <IconButton
        aria-label="logout"
        size="large"
        color="inherit"
        onClick={() => setOpen(true)}
      >
        <PersonIcon fontSize="large" color="white" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {auth.currentUser?.email}
          </Typography>
          <Typography variant="body2">
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog> */}

      <PantryForm />
    </main>
  );
};

export default MainPage;
