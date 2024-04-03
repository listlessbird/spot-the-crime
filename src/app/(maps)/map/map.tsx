"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"

import { useGeolocation } from "@uidotdev/usehooks"

import L, { LatLngExpression } from "leaflet"
import MarkerIcon from "leaflet/dist/images/marker-icon.png"
import MarkerShadow from "leaflet/dist/images/marker-shadow.png"

import "leaflet/dist/leaflet.css"

const center = {
  lat: 51.505,
  lng: -0.09,
}

function DraggableMarker({
  initialPosition,
  setPosition,
}: {
  initialPosition: LatLngExpression
  setPosition: (position: LatLngExpression) => void
}) {
  const [draggable, setDraggable] = useState(false)
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
      position={initialPosition}
      ref={markerRef}
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

function AutoRecenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()

  useEffect(() => {
    map.setView([lat, lng])
    const maxZoom = map.getMaxZoom()
    map.setZoom(maxZoom - 2)
  }, [lat, lng])

  return null
}

export function Map() {
  const { latitude, longitude } = useGeolocation()

  const [coord, setCoord] = useState<LatLngExpression>([51.505, -0.09])

  useEffect(() => {
    if (latitude && longitude) {
      console.log({ latitude, longitude })
      setCoord([latitude, longitude])
    }
  }, [latitude, longitude])

  return (
    <div>
      {/* <SearchLocation /> */}
      {/* <GetMyLocation /> */}
      <MapContainer
        center={coord}
        zoom={5}
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
          position={coord}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <DraggableMarker initialPosition={coord} setPosition={setCoord} />
        <AutoRecenter lat={coord[0]} lng={coord[1]} />
      </MapContainer>
    </div>
  )
}
