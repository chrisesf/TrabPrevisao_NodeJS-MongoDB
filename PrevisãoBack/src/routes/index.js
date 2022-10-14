const express = require("express");
const ResearchController = require("../controllers/ResearchController");
const routes = express.Router();

routes.get("/cities", ResearchController.get);
routes.post("/cities", ResearchController.post);

module.exports = routes;