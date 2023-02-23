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

//Hører til transkasjonen som vi testet og kommenterte ut i route-router:
// router.post("/routes", (request, response) => {
//   const data = request.body;

//   routeService
//     .createRoute(
//       data.destination,
//       data.continent,
//       data.duration,
//       data.estimated_price
//       // data.order_number
//     )
//     .then((route_id) => response.status(200).send({ route_id: route_id }))
//     .catch((error) => response.status(500).send(error));
// });

//Creates new route
router.post("/routes", (request, response) => {
  const data = request.body; //Validering av parameter om nødvendig
  routeService
    .createRoute(data.duration, data.estimated_price, data.time_published)
    .then((route_id) => response.send({ route_id: route_id }))
    .catch((error) => response.status(500).send(error));
});

//Creates new travel points
router.post("/travel_points", (request, response) => {
  const data = request.body; //Validering av parameter om nødvendig
  routeService
    .createTravelPoint(data.travel_point_id, data.destination, data.continent)
    .then((travel_point_id) =>
      response.send({ travel_point_id: travel_point_id })
    )
    .catch((error) => response.status(500).send(error));
});

//Creates new route travel points
router.post("/route_travel_points", (request, response) => {
  const data = request.body; //Validering av parameter om nødvendig
  routeService
    .createRouteTravelPoint(
      data.route_id,
      data.travel_point_id,
      data.order_number
    )
    .then((route_travel_point_id) =>
      response.send({ route_travel_point_id: route_travel_point_id })
    )
    .catch((error) => response.status(500).send(error));
});

export default router;
