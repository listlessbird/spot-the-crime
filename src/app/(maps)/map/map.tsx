"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {
  generateRandomCoordinatesWithinRadius,
  randomChoice,
} from "@/lib/utils"

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet"

import { useGeolocation } from "@uidotdev/usehooks"

import L, { LatLngExpression } from "leaflet"
import MarkerIcon from "leaflet/dist/images/marker-icon.png"
import MarkerShadow from "leaflet/dist/images/marker-shadow.png"

import "leaflet/dist/leaflet.css"

function DraggableMarker({
  initialPosition,
  setPosition,
  markerText = "",
  ...props
}: {
  initialPosition: LatLngExpression
  markerText?: string
  setPosition: (position: LatLngExpression) => void
} & React.ComponentProps<typeof Marker>) {
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
      {...props}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>{markerText}</span>
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

  const randomCoords = useMemo(
    () =>
      Array.from({ length: 10 }, () => ({
        coords: generateRandomCoordinatesWithinRadius(coord[0], coord[1], 768),
        rotation: randomChoice([
          "black",
          "grey",
          "violet",
          "yellow",
          "orange",
          "red",
          "gold",
        ]),
      })),
    [coord]
  )

  console.log({ randomCoords })

  return (
    <div>
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

        <DraggableMarker
          initialPosition={coord}
          setPosition={setCoord}
          markerText="Center Point"
        />
        <AutoRecenter lat={coord[0]} lng={coord[1]} />
        <Circle
          center={coord}
          pathOptions={{ color: "red" }}
          radius={760}
          fillOpacity={0}
        />
        {randomCoords.map((coords, index) => {
          return (
            <Marker
              key={index}
              draggable={true}
              position={coords.coords}
              icon={
                new L.Icon({
                  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${coords.rotation}.png`,
                  shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41],
                })
              }
            >
              <Popup>
                <span>Crime Point</span>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
