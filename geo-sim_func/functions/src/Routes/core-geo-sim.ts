import * as functions from "firebase-functions";
import { updateSessionLoc, add } from "../DataAccessLayer/DataAccess";
import { SessionRequest, SimulationRequest, UpdateLocationRequest } from "../Models/session";
import { sleep } from "../Utils/utils";

exports.add = functions.https.onRequest(async (req, res) => {
  try {
    const requestModel : SessionRequest = req.body.data;
    const dataAccessResult = await add(requestModel);
    res.json(dataAccessResult);
  } catch (error) {
    res.json({ error : error.message });
  }
});

exports.updateLocation = functions.https.onRequest(async (req, res) => {
  try {
    const requestModel : UpdateLocationRequest = req.body.data;
    const dataAccessResult = await updateSessionLoc(requestModel);
    res.json(dataAccessResult);
  } catch (error) {
    res.json({ error : error.message });
  }
});

exports.simulate_drive = functions.https.onRequest(async (req, res) => {
  try {
    const requestModel : SimulationRequest = req.body.data;

    const simulation = async (model : SimulationRequest) => {
      for (var i = 0; i < model.repeats; i++) {
        for(var j = 0; j< model.route.length; j++) {
          await updateSessionLoc({ id : model.id, location : model.route[j] });
          await sleep(5000);
          console.log(`...simulation update location id=[${model.id}] run=[${i}] route no.${j}`);
        }
      }
    }

    //run simulation
    simulation(requestModel);

    res.json("Simulation started...");
  } catch (error) {
    res.json({ error : error.message });
  }
});