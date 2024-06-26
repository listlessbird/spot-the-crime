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
  useMapEvents,
} from "react-leaflet"

import { useGeolocation } from "@uidotdev/usehooks"

import L, { LatLngExpression } from "leaflet"
import MarkerIcon from "leaflet/dist/images/marker-icon.png"
import MarkerShadow from "leaflet/dist/images/marker-shadow.png"

import "leaflet/dist/leaflet.css"

import { ControlContext, ControlProvider } from "./map-control"
import { useLayoutState } from "./layout-provider"

function MapWrapper({
  children,
  center,
}: {
  children: React.ReactNode
  center: LatLngExpression
}) {
  return (
    <div className="relative z-12">
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={true}
        className="min-h-[400px] min-w-[400px] h-dvh"
      >
        {children}
      </MapContainer>
    </div>
  )
}

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

const AddMarkerOnClick = () => {
  const { setHasPlaced, genOptions, setGenOptions } = useLayoutState()

  console.log({ genOptions })

  const assets = useCallback(
    (latlng: LatLngExpression) => {
      const assetsId = Math.random().toString(36).substring(7)

      const newMarker = L.marker(latlng)
        .addEventListener("click", function (e) {
          e.target.remove()
          setHasPlaced(false)
          // setGenOptions((prev) => ({
          //   ...prev,
          //   placedItems: prev.placedItems.filter((item) => item !== e.target),
          // }))
          setGenOptions((prev) => ({
            ...prev,
            placedItems: prev.placedItems.filter(
              (item) => item.id !== assetsId
            ),
          }))
        })
        .setIcon(
          new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png`,
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })
        )

      const radius = randomChoice([430, 523, 472, 410, 568])

      const newCircle = L.circle(latlng, {
        radius: radius,
        fillOpacity: 0,
        fillColor: "red",
        color: "red",
      })

      const newCircleMarkers = Array.from(
        {
          length: randomChoice([
            ...Array.from({ length: 10 }, () =>
              Math.floor(Math.random() * 10 + 3)
            ),
          ]),
        },
        () => {
          const markers = generateRandomCoordinatesWithinRadius(
            latlng.lat,
            latlng.lng,
            radius
          )
          return L.circleMarker(markers, {
            color: "red",
            fillColor: "red",
          }).bindTooltip(
            randomChoice([
              "Murder",
              "Kidnapping",
              "Burglary",
              "Rape",
              "Robbery",
            ]),
            {
              permanent: true,
            }
          )
        }
      )

      const assets = {
        id: assetsId,
        coords: latlng,
        assets: [newMarker, newCircle, ...newCircleMarkers],
      }

      if (genOptions.placedItems.length > 0) {
        setGenOptions((prev) => ({
          ...prev,
          placedItems: [...prev.placedItems, assets],
        }))
      } else {
        setGenOptions((prev) => ({
          ...prev,
          placedItems: [assets],
        }))
      }

      return assets
    },
    [genOptions, setHasPlaced]
  )

  const map = useMapEvents({
    click(e) {
      console.log(e.latlng)
      setHasPlaced(true)

      assets(e.latlng).assets.forEach((asset) => {
        asset.addTo(map)
      })
    },
  })

  const clearPlacedItems = () => {
    genOptions.placedItems.forEach((item) => {
      item.assets.forEach((asset) => asset.remove())
    })
  }

  const clearOneItem = (id: string) => {
    // remove from dom and from state
    const item = genOptions.placedItems.find((item) => item.id === id)
    item?.assets.forEach((asset) => asset.remove())
    setGenOptions((prev) => ({
      ...prev,
      placedItems: prev.placedItems.filter((item) => item.id !== id),
    }))
  }

  useEffect(() => {
    setGenOptions((prev) => ({
      ...prev,
      clearPlacedItemsCb: clearPlacedItems,
      clearOneItemCb: clearOneItem,
    }))
  }, [genOptions.placedItems])

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

  return (
    <MapWrapper center={coord}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <AddMarkerOnClick />

      {/* <DraggableMarker
        initialPosition={coord}
        setPosition={setCoord}
        markerText="Center Point"
      /> */}

      {/* <MarkerMove
                initialPosition={coord}
                setPosition={setCoord}
                markerText="Movable marker"
              /> */}

      <AutoRecenter lat={coord[0]} lng={coord[1]} />
      {/* <Circle
        center={coord}
        pathOptions={{ color: "red" }}
        radius={760}
        fillOpacity={0}
      />
      {randomCoords.map((coords, index) => {
        return (
          <Circle
            center={coords.coords}
            pathOptions={{ color: "red" }}
            radius={20}
            key={index}
          />
          // <Marker
          //   key={index}
          //   draggable={false}
          //   position={coords.coords}
          //   icon={
          //     new L.Icon({
          //       iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${coords.rotation}.png`,
          //       shadowUrl:
          //         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          //       iconSize: [25, 41],
          //       iconAnchor: [12, 41],
          //       popupAnchor: [1, -34],
          //       shadowSize: [41, 41],
          //     })
          //   }
          // >
          //   <Popup>
          //     <span>Crime Point</span>
          //   </Popup>
          // </Marker>
        )
      })} */}
    </MapWrapper>
  )
}

// function MarkerAdd({
//   initialPosition,
//   setPosition,
//   markerText = "",
// }: {
//   initialPosition: LatLngExpression
//   markerText?: string
//   setPosition: (position: LatLngExpression) => void
// }) {

//   const map = useMapEvents({
//     click(e) {

//     }
//   })

//   return (
//     <>
//       <Marker
//         position={initialPosition}
//         draggable={true}
//         icon={
//           new L.Icon({
//             iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png`,
//             shadowUrl:
//               "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
//             iconSize: [25, 41],
//             iconAnchor: [12, 41],
//             popupAnchor: [1, -34],
//             shadowSize: [41, 41],
//           })
//         }
//       >
//         <Popup minWidth={90}>
//           <span>{markerText}</span>
//         </Popup>
//       </Marker>
//     </>
//   )
// }
