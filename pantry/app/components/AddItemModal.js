// components/AddItemModal.js
"use client";
import React, { useState,useRef } from "react";
import { Box, Button, Modal, Stack, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import {Camera} from "react-camera-pro";
import axios from "axios";
import { storage, firestore } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

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
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Add this line


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
  const uploadImageToFirebase = async (imageFile) => {
    const storageRef = ref(storage, `food_images/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    return await getDownloadURL(storageRef);
  };

  const handleScanItem = async () => {
    if (!image) {
      alert("Please take a photo first");
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Convert base64 image to File object
      const response = await fetch(image);
      const blob = await response.blob();
      console.log('Blob size:', blob.size);
      const imageFile = new File([blob], "food_image.jpg", { type: "image/jpeg" });
      console.log('File size:', imageFile.size);
  
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('image', imageFile);
      // console.log('FormData contents:', [...formData.entries()]);
  
      // Send image to backend
      const apiResponse = await axios.post('http://localhost:3200/FoodImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Food data:', apiResponse);
  
      // Get the food data from the response
      const foodData = apiResponse.data;
  
      // Update form with received data
      setItemName(foodData.Name);
      setCategory(foodData.Category);
      if (foodData.Nutritional_value && foodData.Nutritional_value.length > 0) {
        const nutritionInfo = foodData.Nutritional_value[0];
        setServingSize(nutritionInfo.Serving_Size);
        setCalories(nutritionInfo.Calories.toString());
        setTotalFat(nutritionInfo.Total_Fat);
        setSaturatedFat(nutritionInfo.Saturated_Fat);
        setTransFat(nutritionInfo.Trans_Fat);
        setCholesterol(nutritionInfo.Cholesterol);
        setSodium(nutritionInfo.Sodium);
        setTotalCarbohydrates(nutritionInfo.Total_Carbohydrates);
        setDietaryFiber(nutritionInfo.Dietary_Fiber);
        setSugars(nutritionInfo.Sugars);
        setProtein(nutritionInfo.Protein);
      }
  
      setShowManualEntry(true);
      alert("Item analyzed successfully!");
    } catch (error) {
      console.error('Error processing image:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      alert('An error occurred while processing the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <Button onClick={() => setIsCameraOpen(true)} fullWidth>
              Scan Items
            </Button>
            {isCameraOpen && (
              <div>
                <Camera ref={camera} />
                <Button onClick={() => {
                  const photo = camera.current.takePhoto();
                  setImage(photo);
                  setIsCameraOpen(false);
                }}>
                  Take photo
                </Button>
              </div>
            )}
            {image && (
              <div>
                <img src={image} alt='Taken photo' style={{ maxWidth: '100%', height: 'auto' }} />
                <Button onClick={() => setImage(null)}>Retake Photo</Button>
                <Button onClick={handleScanItem} disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Process Image'}
                </Button>
              </div>
            )}
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
