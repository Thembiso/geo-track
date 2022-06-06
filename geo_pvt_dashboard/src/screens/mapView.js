import * as React from "react";
import { Card, CardContent } from '@mui/material';
import { Listen } from "../services/patrol_management_service";
import './styles/mapview.css'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
  
const _center = {
    lat: -26.199866,
    lng: 28.029939
};

function MapView(props) {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyB-4a-uzCa5E1reX-wnFAJYuCU4rbFXPH4"
    })
  
    const [height, setHeight] = React.useState(window.innerHeight*.75);
    const [sessions, setSessions] = React.useState([]);
    const [selected, setSelected] = React.useState();
    const [zoom, setZoom] = React.useState(5);
    const [map, setMap] = React.useState();
    const [center, setCenter] = React.useState(_center);
    const [locationlog, setLocationlog] = React.useState();

    const updateHeight = () => {
      setHeight(window.innerHeight*.75);
    }

    const _onLiveSessionData = React.useCallback ((data) => {
      console.log("received data from " + data.id)

      var index = sessions.findIndex(x => x.id == data.id);
      console.log(index);
      if (index > -1) {
        sessions[index] = data;
      }
      else {
        sessions.push(data);
      }
      setLocationlog(`${JSON.stringify(data.session.liveLocation)} id=[${data.id}]`)
      setSessions(sessions);

      if(props.single) {
        setSelected(data);
        setCenter(data.session.liveLocation)
      }

    })

    const _getLiveSessions = (ids) => {
      ids.forEach(vehicleId => {
        if (vehicleId && !sessions.find(e => e.id === vehicleId )) {
          console.log(`get live session...id=[${vehicleId}]`);
          Listen(vehicleId, _onLiveSessionData);
        }
      });
    };

    React.useEffect(() => {

      if (props.ids && props.ids.length > 0 && sessions.length === 0) {
        _getLiveSessions(props.ids)
      }

      window.addEventListener('resize', updateHeight);

      return function cleanup() {
        window.removeEventListener('resize', updateHeight);
      };
    }, [props.ids]);
  
    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    }, []);
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null);
    }, [])
  
    return isLoaded ? (
      <div>
        <GoogleMap
        mapContainerStyle={{width : "inherit", height : height, overflow : "hidden"}}
        center={center}
        mapTypeId = {"satellite"}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        >
          {
            sessions.map((session) => {
              return (
                <Marker
                  key = {session.id}
                  label = {session.vehicle.regno}
                  onLoad={ () => {
                    if (props.single || selected?.id === session.id) {
                      setSelected(session);
                    }
                  }}
                  onClick = {() => { 
                    if (props.single || selected?.id !== session.id) {
                      setSelected(session);
                    }
                    else setSelected(undefined);
                  }}
                  position={session.session.liveLocation}
                />
              );
            })
          }
        </GoogleMap>
        <p>{locationlog}</p>
        <Card style = {{position : "absolute", bottom : 100, margin: 10}}>
          <CardContent>
            {
              selected ?  
              <div style = {{minWidth : "200px"}}>
                <div>
                  <div style = {{margin : 10}}>
                    <p style = {{fontWeight : "bold", fontSize : "20px"}}>{selected.vehicle.regno}</p>
                    <p>{selected.vehicle.make}</p>
                    <p>{selected.vehicle.model}</p>
                    <p>{selected.session.liveLocation.lat} : {selected.session.liveLocation.lng}</p>
                  </div>
                  <div>
                    <div className="chip">
                      <img src={selected.driver.profilepicture} alt="Person" width="96" height="96"/>
                      {selected.driver.firstname} {selected.driver.lastname} (D)
                    </div>
                  </div>
                </div>
              </div>
              :
              <div>
                {
                  props.single ?
                    <p>No Live Session for vehicle</p>
                    :
                    <p>Select vehicle to see info</p>
                }
              </div>
            }
          </CardContent>
        </Card>
      </div>
    ) : <></>
  }
  
export default React.memo(MapView)