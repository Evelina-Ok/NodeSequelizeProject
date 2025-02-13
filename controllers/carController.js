// Importerer express og testModel
import express from "express";
import { carModel } from "../models/carModel.js";
import { brandModel } from "../models/brandModel.js";
import { categoryModel } from "./models/categoryModel.js";
// Opretter en router
export const carController = express.Router();

// Definerer relationen mellem bilmodellen og mærkemodellen
carModel.belongsTo(brandModel, {
  foreignKey: {
    allowNull: false
  }
});
brandModel.hasMany(carModel);

carModel.belongsTo(categoryModel, {
  foreignKey: {
    allowNull: false
  }
});
categoryModel.hasMany(carModel);


//READ: Route til at hente liste
carController.get("/cars", async (req, res) => {
  try {
    //Henter alle biler fra databasen ved at kalde findAll på carModel
    const cars = await carModel.findAll({
      attributes: ["id", "brand", "color"],
    });
    //Tjekker om listen er tom eller undefined
    if (!cars || cars.length === 0) {
      //Returnerer 404, hvis ingen biler er fundet
      return res.status(404).json({ message: "Ingen biler fundet" });
    }
    //Returnerer listen af biler so JSON
    res.json(cars);
  } catch (error) {
    res.status(500).send({
      message: `Fejl i kald af CarModel: ${error}`,
    });
  }
});

//READ: Route til at hente detaljer
carController.get("/cars/:id([0-9]*)", async (req, res) => {
  try {
    //Konvertere ID til heltal
    const { id } = req.params;

    //Finder bilen i databasen baseret på id
    const result = await carModel.findOne({
      where: { id: id },
      attributes: ["brand", "color"],
    });

    //Hvis bilen ikke findes returneres en 404-fejl
    if (!result) {
      return res
        .status(404)
        .json({ message: `Could not find car on id #${id}` });
    }

    //Returnerer bilens data som JSON
    res.json(result);

    //Returnerer en 500-fejl
  } catch (error) {
    res
      .status(500)
      .json({ message: `Fejl i kald af CarModel: ${error.message}` });
  }
});

//CREATE: Route til at oprette
carController.post("/cars", async (req, res) => {
  const { brand, model, year, color, price } = req.body;

  if (!brand || !model || !year || !color || !price) {
    return res.status(400).json({ message: "Du skal udfylde alle felter" });
  }

  try {
    // const result = await carModel.create(req.body);
    const result = await carModel.create({ brand, model, year, color, price });

    res.status(201).json(result);
  } catch (error) {
    console.error("Fejl ved oprettelse af bil:", error);

    res
      .status(500)
      .json({ message: `Fejl i oprettelse af carModel: ${error.message} ` });
  }
});

//put - update
carController.put("/cars", async (req, res) => {
  const { id, brand, model, year, color, price } = req.body;

  if (id && year) {
    try {
      const result = await carModel.update({ year }, { where: { id } });

      if (result[0] > 0) {
        res.status(200).json({
          message: `Bil med id ${id} og årstal ${year} opdateret til ${brand} ${model}`,
        });
      } else {
        res.status(404).json({ message: `Bil med ${id} ikke fundet` });
      }
    } catch (error) {
      res.status(500).json({
        message: `Fejl ved opdatering af CarModel: ${error.message}`,
      });
    }
  } else {
    res.status(400).send({
      message: "Fejl i opdatering af CarModel: Mangler data",
    });
  }
});

// Route til at slette en bil baseret på ID
carController.delete("/cars/:id([0-9]+)", async (req, res) => {
  // Henter ID fra URL-parametrene
  const { id } = req.params;

  // Tjekker om et ID er angivet
  if (id) {
    try {
      // Forsøger at slette brand fra databasen baseret på ID
      await carModel.destroy({
        where: { id },
      });

      // Returnerer succesbesked
      res.status(200).send({
        message: `Record #${id} is deleted`,
      });
    } catch (error) {
      // Send en HTTP-statuskode 500 hvis der opstår en fejl
      res.status(500).send({
        message: `Kunne ikke slette bilen: ${error.message}`,
      });
    }
  } else {
    // Sender 400 Bad Request-fejl hvis ID er ugyldigt
    res.status(400).send({
      message: "Id er ugyldigt",
    });
  }
})

  //or:
  // try {
  //   const id = parseInt(req.params.id, 10);

  //   let result = await carModel.destroy({
  //     where: { id },
  //   });

  //   if (result > 0) {
  //     res.status(200).json({ message: `Bilen med id ${id} er blevet slettet` });
  //   } else {
  //     res.status(404).json({ message: `Bilen med id ${id} ikke fundet` });
  //   }
  // } catch (error) {
  //   console.error("Error deleting cars:", error);
  //   res.status(500).json({
  //     message: `Error: ${error.message}`,
  //   });
  // }



/* carController.delete("/cars", async (req, res) => {
    try {
      await carModel.destroy({ where: {} }); // Deletes all records
  
      res.status(200).json({ message: "All cars have been deleted" });
    } catch (error) {
      console.error("Error deleting cars:", error);
      res.status(500).json({ message: `Error: ${error.message}` });
    }
  });
   */
