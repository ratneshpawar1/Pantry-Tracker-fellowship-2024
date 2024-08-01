// components/InventoryList.js
"use client";
import React from "react";
import { Box } from "@mui/material";
import { InventoryItemCard } from "./InventoryItemCard";

export const InventoryList = ({ inventory, flippedCards, onRemove, onFlip }) => (
  <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mt={2}>
    {inventory.map((item) => (
      <InventoryItemCard
        key={item.name}
        item={item}
        isFlipped={flippedCards[item.name]}
        onRemove={onRemove}
        onFlip={onFlip}
      />
    ))}
  </Box>
);
