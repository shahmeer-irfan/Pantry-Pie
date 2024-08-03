import React, { useState } from "react";
import {
  TextField,
  Button,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Edit existing item
      const updatedItems = pantryItems.map((item, index) =>
        index === editIndex ? formValues : item
      );
      setPantryItems(updatedItems);
      setEditIndex(null);
    } else {
      // Add new item
      setPantryItems([...pantryItems, formValues]);
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

  const handleDelete = (index) => {
    setPantryItems(pantryItems.filter((_, i) => i !== index));
  };

  const filteredItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container m className=" bg-yellow-50 mt-20">
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
            classname="bg-yellow-100"
            required
          >
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              name="type"
              value={formValues.type}
              onChange={handleInputChange}
            >
              <MenuItem className="bg-yellow-50 hover:font-bold " value="fruit">
                Fruit
              </MenuItem>
              <MenuItem className="bg-yellow-50 hover:font-bold " value="vegetable">
                Vegetable
              </MenuItem>
              <MenuItem className="bg-yellow-50 hover:font-bold " value="dairy">
                Dairy
              </MenuItem>
              <MenuItem className="bg-yellow-50 hover:font-bold " value="grain">
                Grain
              </MenuItem>
              <MenuItem className="bg-yellow-50 hover:font-bold " value="meat">
                Meat
              </MenuItem>
              <MenuItem className="bg-yellow-50 hover:font-bold" value="other">
                Other
              </MenuItem>
            </Select>
          </FormControl>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="text-sm px-4 py-2 bg-red-500 hover:scale-110 rounded-lg text-white"
            >
              {editIndex !== null ? "Update Item" : "Add Item"}
            </button>
          </div>
        </Box>

        {/* Table Section */}
        <div className="flex flex-col lg:flex-row lg:ml-4 mt-4 ">
          {/* <Box sx={{ flex: 2 }}>
            <TextField
              label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              margin="normal"
            />
          </Box> */}

          <TableContainer
            component={Paper}
            sx={{ flex: 3 }}
            className="bg-yellow-100"
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Expiration Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.expirationDate}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(index)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                        {/* </IconButton>  */}
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
};

export default PantryForm;
