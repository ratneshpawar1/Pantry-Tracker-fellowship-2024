// components/AppContainer.js
"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Container } from "@mui/material";
import { Header } from "./Header";
import { InventoryList } from "./InventoryList";
import { AddItemModal } from "./AddItemModal";
import { firestore } from "@/firebase";
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { ThemeProvider } from "./ThemeProvider"; // Make sure to import ThemeProvider here
import { GlobalStyles } from "./GlobalStyles"; // Import GlobalStyles

export const AppContainer = () => {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item.Name);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { ...item, quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (name) => {
    const docRef = doc(collection(firestore, "inventory"), name);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const toggleCardFlip = (name) => {
    setFlippedCards((prevFlippedCards) => ({
      ...prevFlippedCards,
      [name]: !prevFlippedCards[name],
    }));
  };

  return (
    <ThemeProvider>
      <GlobalStyles /> {/* Apply GlobalStyles */}
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center" py={4}>
          <Header />
          <Button variant="contained" onClick={handleOpen} sx={{ marginY: 2 }}>
            Add New Item
          </Button>
          <InventoryList
            inventory={inventory}
            flippedCards={flippedCards}
            onRemove={removeItem}
            onFlip={toggleCardFlip}
          />
        </Box>
        <AddItemModal open={open} onClose={handleClose} onAddItem={addItem} />
      </Container>
    </ThemeProvider>
  );
};
