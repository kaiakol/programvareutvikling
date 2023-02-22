import express, { response } from "express";
import routeService from "./route-service";

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.post("/routes", (request, response) => {
  const route = request.body;
  /**
   * route_id and time_published should be autogenerated
   */
  if (
    route &&
    route.duration &&
    typeof route.duration == "string" &&
    route.duration.length != 0
  )
    routeService
      .add(route.duration, route.estimated_price, route.time_published)
      .then((route_id) => response.send({ route_id: route_id }))
      .catch((error) => response.status(500).send(error));
  else
    response
      .status(400)
      .send(
        "Missing task one or more of the following attributes: route_id, duration, time_published"
      );
});

router.get("/routes", (_request, response) => {
  routeService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get("/routes/:route_id", (request, response) => {
  const route_id = Number(request.params.route_id);
  routeService
    .get(route_id)
    .then((route) =>
      route
        ? response.send(route)
        : response.status(404).send("Route not found")
    )
    .catch((error) => response.status(500).send(error));
});

router.delete("/routes/:route_id", (request, response) => {
  const route_id = Number(request.params.route_id);
  if (route_id) {
    routeService
      .remove(route_id)
      .then((_result) => response.send())
      .catch((error) => response.status(500).send(error));
  } else {
    response.status(400).send("Route does not exist.");
  }
});

router.put("/routes/:route_id", (request, response) => {
  const route_id = Number(request.params.route_id);
  const data = request.body;
  if (route_id && data.duration > 0) {
    routeService
      .update({
        route_id: data.route_id,
        duration: data.duration,
        estimated_price: data.estimated_price,
        time_published: data.time_published,
      })
      .then((rows) => response.send(rows))
      .catch((error) => response.status(500).send(error));
  } else {
    response
      .status(400)
      .send(
        "Missing task one or more of the following attributes: route_id, duration, time_published"
      );
  }
});

export default router;
