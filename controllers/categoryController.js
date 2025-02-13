// Importerer express og testModel
import express from "express";
import { brandModel } from "../models/brandModel.js";

// Opretter en router
export const categoryController = express.Router();

//READ: Route til at hente liste
brandController.get("/brands", async (req, res) => {
  try {
    //Henter alle biler fra databasen ved at kalde findAll på carModel
    const brands = await brandModel.findAll({
      attributes: ["id", "brand"],
    });
    //Tjekker om listen er tom eller undefined
    if (!brands || brands.length === 0) {
      //Returnerer 404, hvis ingen biler er fundet
      return res.status(404).json({ message: "Ingen brands fundet" });
    }
    //Returnerer listen af biler so JSON
    res.json(brands);
  } catch (error) {
    res.status(500).send({
      message: `Fejl i kald af brandsModel: ${error}`,
    });
  }
});

//READ: Route til at hente detaljer
brandController.get("/brands/:id([0-9]*)", async (req, res) => {
  try {
    //Konvertere ID til heltal
    const { id } = req.params;

    //Finder bilen i databasen baseret på id
    const result = await brandModel.findOne({
      where: { id: id },
      attributes: ["brand"],
    });

    //Hvis bilen ikke findes returneres en 404-fejl
    if (!result) {
      return res
        .status(404)
        .json({ message: `Could not find brand with id #${id}` });
    }

    //Returnerer bilens data som JSON
    res.json(result);

    //Returnerer en 500-fejl
  } catch (error) {
    res
      .status(500)
      .json({ message: `Fejl i kald af brandModel: ${error.message}` });
  }
});

//CREATE: Route til at oprette
brandController.post("/brands", async (req, res) => {
  // Takes name and logo from request body
  const { name, logo } = req.body;

  if (!name || !logo) {
    return res.status(400).json({ message: "Du skal udfylde alle felter" });
  }

  try {
    // const result = await brandModel.create(req.body);
    const result = await brandModel.create({ name, logo });

    res.status(201).json(result);
  } catch (error) {
    console.error("Fejl ved oprettelse af brand:", error);

    res
      .status(500)
      .json({ message: `Fejl i oprettelse af brandModel: ${error.message} ` });
  }
});

//put - update. Routes to update
brandController.put("/brands", async (req, res) => {
  const { id, name } = req.body;

  if (id && name) {
    try {
      const result = await brandModel.update({ name }, { where: { id } });

      if (result[0] > 0) {
        res.status(200).json({
          message: `Brand med id ${id} opdateret til ${name}`,
        });
      } else {
        res.status(404).json({ message: `Brand med ${id} ikke fundet` });
      }
    } catch (error) {
      res.status(500).json({
        message: `Fejl ved opdatering af brandModel: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Fejl i opdatering af brandModel: Mangler data",
    });
  }
});

// Route til at slette en bil baseret på ID
brandController.delete("/brands/:id([0-9]+)", async (req, res) => {
  // Henter ID fra URL-parametrene
  const id = parseInt(req.params.id, 10);

  // Tjekker om et ID er angivet
  if (id) {
    try {
      // Forsøger at slette brand fra databasen baseret på ID
      await brandModel.destroy({
        where: { id },
      });

      // Returnerer succesbesked
      res.status(200).send({
        message: `Record #${id} is deleted`,
      });
    } catch (error) {
      // Send en HTTP-statuskode 500 hvis der opstår en fejl
      res.status(500).send({
        message: `Kunne ikke slette brand: ${error.message}`,
      });
    }
  } else {
    // Sender 400 Bad Request-fejl hvis ID er ugyldigt
    res.status(400).send({
      message: "Id er ugyldigt",
    });
  }
})
