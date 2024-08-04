import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../app/firebase/config";
import { getAuth } from "firebase/auth";

const PantryForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    quantity: "",
    expirationDate: "",
    type: "",
  });

  const [pantryItems, setPantryItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPantryItems = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user ? user.uid : null;

      if (userId) {
        const querySnapshot = await getDocs(
          collection(db, "users", userId, "pantry")
        );
        const items = querySnapshot.docs.map((doc) => doc.data());
        setPantryItems(items);
      } else {
        console.error("User is not authenticated");
      }
    };

    fetchPantryItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    if (userId) {
      if (editIndex !== null) {
        // Edit existing item
        const updatedItems = pantryItems.map((item, index) =>
          index === editIndex ? formValues : item
        );
        setPantryItems(updatedItems);
        setEditIndex(null);
      } else {
        // Add new item to local state and Firestore
        const newPantryItems = [...pantryItems, formValues];
        setPantryItems(newPantryItems);
        await setDoc(doc(db, "users", userId, "pantry", formValues.name), {
          ...formValues,
        });
      }
    } else {
      console.error("User is not authenticated");
    }

    setFormValues({
      name: "",
      quantity: "",
      expirationDate: "",
      type: "",
    });
  };

  const handleEdit = (index) => {
    setFormValues(pantryItems[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user ? user.uid : null;

      if (userId) {
        await deleteDoc(
          doc(db, "users", userId, "pantry", pantryItems[index].name)
        );
        setPantryItems(pantryItems.filter((_, i) => i !== index));
      } else {
        console.error("User is not authenticated");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const filteredItems = pantryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-yellow-100">
      <Container className="bg-yellow-100">
        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ flex: 1, mr: { lg: 4 }, mb: { xs: 4, lg: 0 } }}
          >
            <TextField
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={formValues.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Expiration Date"
              type="date"
              name="expirationDate"
              value={formValues.expirationDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <FormControl
              fullWidth
              margin="normal"
              className="bg-yellow-100"
              required
            >
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                name="type"
                value={formValues.type}
                onChange={handleInputChange}
              >
                <MenuItem
                  className="bg-yellow-50 hover:font-bold"
                  value="fruit"
                >
                  Fruit
                </MenuItem>
                <MenuItem
                  className="bg-yellow-50 hover:font-bold"
                  value="vegetable"
                >
                  Vegetable
                </MenuItem>
                <MenuItem
                  className="bg-yellow-50 hover:font-bold"
                  value="dairy"
                >
                  Dairy
                </MenuItem>
                <MenuItem
                  className="bg-yellow-50 hover:font-bold"
                  value="grain"
                >
                  Grain
                </MenuItem>
                <MenuItem className="bg-yellow-50 hover:font-bold" value="meat">
                  Meat
                </MenuItem>
                <MenuItem
                  className="bg-yellow-50 hover:font-bold"
                  value="other"
                >
                  Other
                </MenuItem>
              </Select>
            </FormControl>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="text-sm px-4 py-2 bg-orange-400 hover:bg-orange-300 text-green-800 rounded-lg "
              >
                {editIndex !== null ? "Update Item" : "Add Item"}
              </button>
            </div>
          </Box>

          {/* Table Section */}
          <div className="flex flex-col lg:flex-row lg:ml-4 mt-4">
            <TableContainer
              component={Paper}
              sx={{ flex: 3 }}
              className="bg-yellow-100"
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="text-green-800 font-semibold">
                      Name
                    </TableCell>
                    <TableCell className="text-green-800 font-semibold">
                      Quantity
                    </TableCell>
                    <TableCell className="text-green-800 font-semibold">
                      Expiration Date
                    </TableCell>
                    <TableCell className="text-green-800 font-semibold">
                      Type
                    </TableCell>
                    <TableCell className="text-green-800 font-semibold">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-green-700">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-green-700">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-green-700">
                        {item.expirationDate}
                      </TableCell>
                      <TableCell className="text-green-700">
                        {item.type}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Tooltip title="Edit">
                            <IconButton
                              className="text-green-800"
                              onClick={() => handleEdit(index)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              className="text-red-600"
                              onClick={() => handleDelete(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PantryForm;
