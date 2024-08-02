// components/InventoryItemCard.js
"use client";
import React from "react";
import { Card, CardContent, CardActions, Button, Typography, Table, TableBody, TableCell, TableRow, TableContainer, Box } from "@mui/material";
import { styled } from "@mui/system";

const CardContainer = styled(Box)(({ theme }) => ({
  perspective: "1000px",
  width: "300px",
  height: "400px", // Increase the height to prevent cutting off
  margin: "10px",
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.2s ease-in-out'
  }
}));

const CardFlipper = styled(Box)(({ isFlipped }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  transformStyle: "preserve-3d",
  transition: "transform 0.6s",
  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
}));

const CardFront = styled(Card)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));

const CardBack = styled(Card)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  transform: "rotateY(180deg)",
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflowY: "auto", // Enable vertical scrolling
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));

export const InventoryItemCard = ({ item, isFlipped, onRemove, onFlip }) => (
  <CardContainer>
    <CardFlipper isFlipped={isFlipped}>
      <CardFront>
        <CardContent>
          <Typography variant="h5" gutterBottom>{item.Name || 'Unknown Item'}</Typography>
          <Typography variant="subtitle1">Category: {item.Category || 'Uncategorized'}</Typography>
          <Typography variant="body2">Quantity: {item.quantity || 'N/A'}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => onRemove(item.id || item.Name)}>
            Remove
          </Button>
          <Button size="small" color="primary" onClick={() => onFlip(item.id || item.Name)}>
            View Details
          </Button>
        </CardActions>
      </CardFront>
      <CardBack onClick={() => onFlip(item.id || item.Name)}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Nutritional Value</Typography>
          {item.Nutritional_value && item.Nutritional_value.length > 0 ? (
            <TableContainer>
              <Table>
                <TableBody>
                  {Object.entries(item.Nutritional_value[0]).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key.replace(/_/g, ' ')}:</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No nutritional information available.</Typography>
          )}
        </CardContent>
      </CardBack>
    </CardFlipper>
  </CardContainer>
);