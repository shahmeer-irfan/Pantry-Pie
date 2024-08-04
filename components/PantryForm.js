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
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../app/firebase/config";
import { getAuth } from "firebase/auth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const [recipes, setRecipes] = useState(""); // State to hold recipe markdown

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
        const updatedItems = pantryItems.map((item, index) =>
          index === editIndex ? formValues : item
        );
        setPantryItems(updatedItems);
        setEditIndex(null);
      } else {
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

  const generateRecipes = async () => {
    try {
      setRecipes("Generating recipes...");
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text:
                    "I want you to write a short and concise recipe from these items. Generate recipe from these items, your response should be concise and clear: " +
                    pantryItems
                      .map(
                        (item) => `${item.name} (${item.quantity} ${item.type})`
                      )
                      .join(", "),
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the response is markdown
      const recipeMarkdown = response.data.candidates[0].content.parts[0].text;
      setRecipes(recipeMarkdown);
      console.log(recipeMarkdown); // Check the response
    } catch (error) {
      console.error(
        "Error generating recipes:",
        error.response ? error.response.data : error.message
      );
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

            <div className="flex justify-center gap-8 mt-4">
              <button
                type="submit"
                className="text-sm px-4 py-2 bg-orange-400 hover:bg-orange-300 text-green-800 rounded-lg "
              >
                {editIndex !== null ? "Update Item" : "Add Item"}
              </button>
              <button
                type="button"
                onClick={generateRecipes}
                className="bg-orange-400 text-sm px-4 py-2 hover:bg-orange-300 text-green-800 rounded-lg"
              >
                Make Recipes
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

        {/* Recipe Generation Section */}
        {recipes && (
          <div className="mt-8">
            <h2 className="text-green-800 font-bold sm:text-4xl text-center text-2xl mb-4">
              Generated Recipe
            </h2>
            <div className="bg-yellow-100 text-green-700 p-4 text-center">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {recipes}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PantryForm;
