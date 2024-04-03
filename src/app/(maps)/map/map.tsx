"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import { useGeolocation } from "@uidotdev/usehooks"

import L, { LatLngExpression } from "leaflet"
import MarkerIcon from "leaflet/dist/images/marker-icon.png"
import MarkerShadow from "leaflet/dist/images/marker-shadow.png"

import "leaflet/dist/leaflet.css"

const center = {
  lat: 51.505,
  lng: -0.09,
}

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef<any>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    []
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  )
}

export function Map() {
  const { latitude, longitude } = useGeolocation()

  const [coord, setCoord] = useState([latitude, longitude])

  // const SearchLocation = () => {
  //   return (
  //     <div className="search-location">
  //       <input type="text" placeholder="Search Location" />
  //     </div>
  //   )
  // }

  // const GetMyLocation = () => {
  //   const getMyLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         setCoord([position.coords.latitude, position.coords.longitude])
  //       })
  //     } else {
  //       console.log("Geolocation is not supported by this browser.")
  //     }
  //   }

  //   return (
  //     <div className="get-my-location">
  //       <button onClick={getMyLocation}>Get My Location</button>
  //     </div>
  //   )
  // }

  return (
    <div>
      {/* <SearchLocation /> */}
      {/* <GetMyLocation /> */}
      <MapContainer
        center={coord}
        zoom={13}
        scrollWheelZoom={true}
        className="min-h-[400px] min-w-[400px] h-dvh"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <Marker
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          }
          position={[51.505, -0.09]}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <DraggableMarker />
      </MapContainer>
    </div>
  )
}
