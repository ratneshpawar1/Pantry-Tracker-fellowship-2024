// components/CategorySelector.js
"use client";
import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

const categories = [
  "All",
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

export const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" my={4}>
      <Typography variant="h6" sx={{ mr: 2 }}>Filter by Category:</Typography>
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel id="category-selector-label">Category</InputLabel>
        <Select
          labelId="category-selector-label"
          id="category-selector"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
