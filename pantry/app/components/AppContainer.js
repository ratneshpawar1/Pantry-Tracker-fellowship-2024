// components/AppContainer.js
"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { InventoryList } from "./InventoryList";
import { AddItemModal } from "./AddItemModal";
import { CategorySelector } from "./CategorySelector";
import { firestore } from "/firebase"; // Adjusted import path
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { ThemeProvider } from "./ThemeProvider"; // Ensure to import ThemeProvider
import { GlobalStyles } from "./GlobalStyles"; // Import GlobalStyles
import { getNeumorphicContainerStyles, getNeumorphicButtonStyles } from "./NeumorphicStyles";

export const AppContainer = () => {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = docs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setInventory(inventoryList);
  };
  console.log(inventory);

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item.Name);
    const docSnap = await getDoc(docRef);
    const newItem = {
      id: item.id || docRef.id,
      Name: item.Name,
      Category: item.Category,
      Nutritional_value: item.Nutritional_value,
      ImageUrl: item.ImageUrl,
      quantity: (docSnap.exists() ? docSnap.data().quantity : 0) + 1,
      createdAt: item.createdAt || new Date(),
    };
    
    await setDoc(docRef, newItem, { merge: true });
    
    setInventory(prevInventory => {
      const existingItemIndex = prevInventory.findIndex(i => i.Name === item.Name);
      if (existingItemIndex !== -1) {
        const updatedInventory = [...prevInventory];
        updatedInventory[existingItemIndex] = newItem;
        return updatedInventory;
      } else {
        return [...prevInventory, newItem];
      }
    });
  };

  const removeItem = async (name) => {
    const docRef = doc(collection(firestore, "inventory"), name);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      const { quantity } = docSnap.data();
      if (quantity <= 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { ...docSnap.data(), quantity: quantity - 1 }, { merge: true });
      }
    }
    await updateInventory();
  };

  const toggleCardFlip = (itemId) => {
    setFlippedCards((prevFlippedCards) => ({
      ...prevFlippedCards,
      [itemId]: !prevFlippedCards[itemId],
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredInventory = selectedCategory === "All"
    ? inventory
    : inventory.filter((item) => item.Category === selectedCategory);

  return (
    <ThemeProvider>
      <GlobalStyles /> {/* Apply GlobalStyles */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={(theme) => ({
          ...getNeumorphicContainerStyles(theme),
          width: '100%',
          minHeight: '100vh',
          padding: '20px',
          boxSizing: 'border-box'
        })}
      >
        <Box width="100%" maxWidth="1200px">
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <CategorySelector
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <Button variant="contained" onClick={handleOpen} sx={(theme) => ({ ...getNeumorphicButtonStyles(theme), marginY: 2 })}>
              Add New Item
            </Button>
            {filteredInventory.length > 0 ? (
            <InventoryList
            inventory={filteredInventory}
            flippedCards={flippedCards}
            onRemove={removeItem}
            onFlip={toggleCardFlip}
          />
            ) : (
              <Typography variant="h6" sx={{ mt: 4 }}>No items found in this category.</Typography>
            )}
          </Box>
        </Box>
        <AddItemModal open={open} onClose={handleClose} onAddItem={addItem} />
      </Box>
    </ThemeProvider>
  );
};
