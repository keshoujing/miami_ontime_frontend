import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { get_route, get_stops } from './axios';
import L from 'leaflet';
import dataContext from './context'

const create_stop_icon = ((path) => {
  return new L.Icon({
    iconUrl: require(`./image/${path}`),
    popupAnchor:  [-0, -0],
    iconSize: [25,25],     
  })
});

const stop_icon = [
  create_stop_icon('blu.jpg'),
  create_stop_icon('red.jpg'),
  create_stop_icon('org.jpg'),
  create_stop_icon('yel.jpg'),
  create_stop_icon('pur.jpg'),
]

const Map = () => {
    const center = [25.761681, -80.191788]

    const colorOptions = [{ color: '#6699ff', weight: 5 }, 
                         { color: '#ff6666', weight: 5 }, 
                         { color: '#fc8403', weight: 5 },
                         { color: '#ffff66', weight: 5 },
                         { color: '#f803fc', weight: 5 }];
      
    const [currentRoute, setCurrentRoute] = useState([]);
    const [currentStop, setCurrentStop] = useState([]);
    //const [currentIndex, setCurrentIndex] = useState(0);
    //const [currentCoordinates, setCurrentCoordinates] = useState(initialCoordinates[0]);
    const {rows, displayRoute} = useContext(dataContext);
    const routes = rows.map(row => row[0]);

    useEffect(() => {
      const getAllRoutes = async () => {
        const promises = routes.map(async route => { return get_route(route); });
        const allRoutes = await Promise.all(promises);
        setCurrentRoute(convertToList(allRoutes));
      };

      const getAllStops = async () => {
        const promises = routes.map(async route => { return get_stops(route); });
        const allStops = await Promise.all(promises);
        console.log(allStops);
        setCurrentStop(allStops);
      };

      if (rows.length > 0) {
        getAllRoutes();
        getAllStops();
      }
      
    }, [rows]);

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setCurrentIndex(prevIndex => (prevIndex + 1) % initialCoordinates.length);
    //   }, 1000); // Adjust the interval as needed
  
    //   return () => {
    //     clearInterval(interval);
    //   };
    // }, []);
  
    // useEffect(() => {
    //   setCurrentCoordinates(initialCoordinates[currentIndex]);
    // }, [currentIndex]);


     return (
          <MapContainer center={center} zoom={10} scrollWheelZoom={true}>
          <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={currentCoordinates} eventHandlers={{click: () => handleMarkerClick("11").then((res) => {setCurrentRoute(res)})}}>
               <Popup>
               A pretty CSS3 popup. <br /> Easily customizable.
               </Popup>
          </Marker> */}
          {
            displayRoute ?
            (currentStop.map(routeStop => {
                return routeStop.map((stop, index) => {
                  console.log(stop);
                  return <Marker icon={stop_icon[index]} position={stop}></Marker>
                });
              }  
            ))
             : 
            (currentRoute.length > 0 ? (currentRoute.map((route, index) => 
              (<Polyline pathOptions={colorOptions[index]} positions={route} />)  
            )) : <></>)
          }
          </MapContainer>
     );
}

export default Map;

const convertToList = (routes) => {
  var list = [];

  routes.forEach(geometryString => {
    var geoList = [];
    // Remove the "MULTILINESTRING" prefix and parentheses
    const cleanedString = geometryString.replace("MULTILINESTRING (", "").replace(/\)/g, "").replace(/\(/g, "");
    // Split the string into individual line strings
    const lineStrings = cleanedString.split(", ");

      // Process each line string
    lineStrings.forEach((lineString) => {
      // Split the line string into individual points
      const points = lineString.split(", ");

      // Process each point
      points.forEach((point) => {
        // Split the point into latitude and longitude
        const [longitude, latitude] = point.split(" ");

        // Convert the latitude and longitude to numbers
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        geoList.push([lat, lon]);
      });
    });
    list.push(geoList);
  });
  return list;
}