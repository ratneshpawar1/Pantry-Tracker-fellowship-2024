// components/AddItemModal.js
"use client";
import React, { useState } from "react";
import { Box, Button, Modal, Stack, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

const categories = [
  "Sweets & Desserts",
  "Dairy",
  "Meat & Poultry",
  "Vegetables",
  "Seafood",
  "Fruits",
  "Grains & Cereals",
  "Spices",
  "Legumes",
  "Nuts & Seeds",
  "Beverages",
  "Bakery Products",
  "Snacks",
  "Condiments & Sauces",
  "Prepared Foods",
  "Oils & Fats",
];

export const AddItemModal = ({ open, onClose, onAddItem }) => {
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [calories, setCalories] = useState("");
  const [totalFat, setTotalFat] = useState("");
  const [saturatedFat, setSaturatedFat] = useState("");
  const [transFat, setTransFat] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [sodium, setSodium] = useState("");
  const [totalCarbohydrates, setTotalCarbohydrates] = useState("");
  const [dietaryFiber, setDietaryFiber] = useState("");
  const [sugars, setSugars] = useState("");
  const [protein, setProtein] = useState("");

  const resetForm = () => {
    setItemName("");
    setCategory("");
    setServingSize("");
    setCalories("");
    setTotalFat("");
    setSaturatedFat("");
    setTransFat("");
    setCholesterol("");
    setSodium("");
    setTotalCarbohydrates("");
    setDietaryFiber("");
    setSugars("");
    setProtein("");
  };

  const handleClose = () => {
    onClose();
    setShowManualEntry(false);
    resetForm();
  };

  const handleAddItem = () => {
    const newItem = {
      Name: itemName,
      Category: category,
      Nutritional_value: [
        {
          Serving_Size: servingSize,
          Calories: Number(calories),
          Total_Fat: totalFat,
          Saturated_Fat: saturatedFat,
          Trans_Fat: transFat,
          Cholesterol: cholesterol,
          Sodium: sodium,
          Total_Carbohydrates: totalCarbohydrates,
          Dietary_Fiber: dietaryFiber,
          Sugars: sugars,
          Protein: protein,
        },
      ],
    };
    onAddItem(newItem);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {!showManualEntry ? (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Choose an Option
            </Typography>
            <Button onClick={() => setShowManualEntry(true)} fullWidth>
              Add Manually
            </Button>
            <Button onClick={() => alert("Scan Item functionality to be implemented.")} fullWidth>
              Scan Items
            </Button>
          </>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item Manually
            </Typography>
            <Stack width="100%" spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item Name"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack direction="row" spacing={2}>
                <TextField
                  id="serving-size"
                  label="Serving Size"
                  variant="outlined"
                  fullWidth
                  value={servingSize}
                  onChange={(e) => setServingSize(e.target.value)}
                />
                <TextField
                  id="calories"
                  label="Calories"
                  variant="outlined"
                  fullWidth
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  id="total-fat"
                  label="Total Fat"
                  variant="outlined"
                  fullWidth
                  value={totalFat}
                  onChange={(e) => setTotalFat(e.target.value)}
                />
                <TextField
                  id="saturated-fat"
                  label="Saturated Fat"
                  variant="outlined"
                  fullWidth
                  value={saturatedFat}
                  onChange={(e) => setSaturatedFat(e.target.value)}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  id="trans-fat"
                  label="Trans Fat"
                  variant="outlined"
                  fullWidth
                  value={transFat}
                  onChange={(e) => setTransFat(e.target.value)}
                />
                <TextField
                  id="cholesterol"
                  label="Cholesterol"
                  variant="outlined"
                  fullWidth
                  value={cholesterol}
                  onChange={(e) => setCholesterol(e.target.value)}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  id="sodium"
                  label="Sodium"
                  variant="outlined"
                  fullWidth
                  value={sodium}
                  onChange={(e) => setSodium(e.target.value)}
                />
                <TextField
                  id="total-carbohydrates"
                  label="Total Carbohydrates"
                  variant="outlined"
                  fullWidth
                  value={totalCarbohydrates}
                  onChange={(e) => setTotalCarbohydrates(e.target.value)}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  id="dietary-fiber"
                  label="Dietary Fiber"
                  variant="outlined"
                  fullWidth
                  value={dietaryFiber}
                  onChange={(e) => setDietaryFiber(e.target.value)}
                />
                <TextField
                  id="sugars"
                  label="Sugars"
                  variant="outlined"
                  fullWidth
                  value={sugars}
                  onChange={(e) => setSugars(e.target.value)}
                />
              </Stack>
              <TextField
                id="protein"
                label="Protein"
                variant="outlined"
                fullWidth
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddItem}>
                Add
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  );
};
