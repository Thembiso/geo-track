import * as admin from "firebase-admin";
import { Responder, Session, SessionRequest, UpdateLocationRequest, Vehicle } from "../Models/session";
import { DB_NAMES } from "../Constants/constants";

const db = admin.initializeApp({
  databaseURL: "https://corenect-core-services-default-rtdb.firebaseio.com/"
}).database();

/**
 * @description add a new session
 * @param {SessionRequest} sessionRequest user information
 */
 export async function add(sessionRequest : SessionRequest): Promise<string | {}> {
  var driver_info = await getDoc(sessionRequest.driverId, DB_NAMES.RESPONDERS) as Responder;
  var vehicle_info = await getDoc(sessionRequest.vehicleId, DB_NAMES.VEHICLES) as Vehicle;

  var session : Session = {
    id : sessionRequest.vehicleId,
    driver : driver_info,
    vehicle : vehicle_info,
    session : {
      distance : 0,
      startTime : new Date().getTime().toString(),
      liveLocation : {
        lat : sessionRequest.start.lat,
        lng : sessionRequest.start.lng
      },
      route : [] as {lat : number, lng : number}[]
    }
  }

  await db.ref(DB_NAMES.LIVESESSIONS)
  .child(sessionRequest.vehicleId)
  .set(session);

  return session.id;

}

/**
 * @description update location for a session
 * @param locationRequest 
 */
 export async function updateSessionLoc(locationRequest : UpdateLocationRequest): Promise<string | {}> {
  await db.ref(`${DB_NAMES.LIVESESSIONS}/${locationRequest.id}/session`)
  .child("liveLocation")
  .set(locationRequest.location);
  return locationRequest.id;
}

async function getDoc(id : string, collection : string) {
  return await admin.firestore()
    .collection(collection)
    .doc(id)
    .get()
    .then((res)=> {
      return res.data();
    })
    .catch((err)=>{
      throw new Error(err);
    })
}