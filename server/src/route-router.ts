import express from "express";
import routeService from "./route-service";

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.get("/routes", (_request, response) => {
  routeService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

export default router;

