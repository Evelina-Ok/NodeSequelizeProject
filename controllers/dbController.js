// Importerer express og testModel
import express from 'express';
import sequelize from '../config/sequelizeConfig.js';
import { carModel } from '../models/carModel.js';
// import { brandModel } from "../models/brandModel.js";
import { categoryModel } from "../models/categoryModel.js";


// Opretter en router
export const dbController = express.Router();

dbController.get("/sync", async (req, res) => {
  try {
    const resp = await sequelize.sync({ force: true });
    res.send("Data synchronized successfully");
  } catch (error) {
    console.error("Sync error", error);
    res.status(500).send(`Error syncing database: ${error.message}`);
  }
});





/* 
// READ: Route til at hente liste
carController.get('/cars', async (req, res) => {
  // carModel.findAll()
});

// READ: Route til at hente detaljer
carController.get('/cars/:id([0-9]*)', async (req, res) => {
  // carModel.findOne()
});

// CREATE: Route til at oprette
carController.post('/cars', async (req, res) => {
  // carModel.create()
});

// UPDATE: Route til at opdatere
carController.put('/cars/:id([0-9]*)', async (req, res) => {
  // carModel.update()
});

// DELETE: Route til at slette
carController.delete('/cars/:id([0-9]*)', async (req, res) => {
  // carModel.destroy()
}); */