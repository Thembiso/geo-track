export interface SessionRequest {
    vehicleId: string,
    driverId: string,
    responderIds : string[],
    start : {
        lat :number,
        lng :number
    }
}

export interface SimulationRequest {
    id : string,
    repeats : number,
    route : Location[]
}

export interface Location {
    lat : string,
    lng : string
}

export interface UpdateLocationRequest {
    id : string,
    location : Location
}

export interface Responder {
    id : string,
    firstname : string,
    lastname : string,
    profilepicture : string,
    age : string,
    licenseno : string
}

export interface Vehicle {
    id : string,
    regno : string,
    make : string,
    model : string
}

export interface Session {
    id : string,
    driver : Responder
    vehicle : Vehicle,
    session : {
      distance : number,
      startTime : string,
      liveLocation : {
        lat: number,
        lng: number
      },
      route : {
        lat : number,
        lng : number
      }[]
    }
}