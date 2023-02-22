import express, { request, response } from "express";
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

router.post("/routes", (request, response) => {
  const data = request.body;

  routeService
    .createRoute(
      data.destination,
      data.continent,
      data.duration,
      data.estimated_price
      // data.order_number
    )
    .then((route_id) => response.status(200).send({ route_id: route_id }))
    .catch((error) => response.status(500).send(error));
});

export default router;
