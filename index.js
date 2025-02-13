import express, { response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/sequelizeConfig.js";
import { carModel } from "./models/carModel.js";
import { dbController } from "./controllers/dbController.js";
import { carController } from "./controllers/carController.js";
import { brandController } from "./controllers/brandController.js";
import { categoryController } from "./controllers/categoryController.js";
import { authController } from "./controllers/authController.js";

dotenv.config();

// Initialiserer Express-applikationen
const app = express();
// const port = 4000
const port = process.env.SERVERPORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tilføjer controller som middleware
app.use(dbController, carController);

app.use(carController,
brandController,
categoryController,
authController);

app.listen(port, () => {
    console.log(`Server runs at http://localhost:${port}`);
  });

//Route til root
app.get("/", (req, res) => {
  console.log("Hej verden");
  res.send("Hello world");
});

app.get("/about", (req, res) => {
  res.send("Hello About");
});

app.get("/cars/:category/:id", (req, res) => {
  console.log(req.params);
});

app.get("/brand/:id", (req, res) => {
  console.log(req.params);
});

app.get("/category/:id", (req, res) => {
  console.log(req.params);
});


app.get("/api", async (req, res) => {
    try {
      await sequelize.authenticate();
      console.log("Contact with server established");
      res.send("Contact with server established");
    } catch (error) {
      console.error("Error", error);
      res.status(500).send(`Error connecting to server: ${error.message}`);
    }
  });


  app.use((req, res, next) => {
    res.status(404).send("Couldn't be found");
  });


//Route til 404
app.get("*", (req, res) => {
  res.send("Could not find file");
});

/* dotenv.config();
console.log(process.env.SERVERPORT || 21001);

const app = express()
const port = 21001

// request is what we are requesting, response is what server gives back to browser
app.get('/', (req, res) => {
    console.log('Velkommen til min side');
})

app.get('/about', (request, response) => {
    console.log('Om os');
})

app.get('/test', (request, response) => {
    try {
        // await sequelize.authenticate();
        response.send('Der er forbindelse til database')
    } catch (error) {
console.error( `Fejl! ${error}`)
    }
})

app.get('/sync', async (req, re) => {
    try {
        const rep = await sequelize.sync();
        res.send('Data successfully synchronised');
    }
    catch(error) {
        res.send(error);
    }
});


app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
    
}) */

/* import http from 'http'

const port = 4000

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello world')

    /* console.log('Server responded with Hello world');    
}).listen(4000,  () => {
    console.log(`Server kører på port 4000`); //

    console.log('Server responded with Hello world');    
}).listen(port,  () => {
    console.log(`Server kører på http://localhost:${port}`);
    
}) */
