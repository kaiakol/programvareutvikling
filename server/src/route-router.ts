import express, { request } from "express";
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

/*router.get("/routes/:route_id", (request, response) => {
  const route_id = Number(request.params.route_id);
  routeService
    .get(route_id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});*/

router.get("/routes/:route_id", (request, response) => {
  const route_id = Number(request.params.route_id);
  routeService
    .getRoute(route_id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

export default router;
