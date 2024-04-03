import { type ClassValue, clsx } from "clsx"
import { LatLngExpression } from "leaflet"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to calculate distance between two lat/lng points in meters
export const calculateDistanceInMeters = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
): number => {
  const earthRadiusInMeters = 6371000 // Radius of the Earth in meters
  const latitudeInRadians1 = (latitude1 * Math.PI) / 180 // Convert latitude to radians
  const latitudeInRadians2 = (latitude2 * Math.PI) / 180
  const latitudeDifferenceInRadians = ((latitude2 - latitude1) * Math.PI) / 180
  const longitudeDifferenceInRadians =
    ((longitude2 - longitude1) * Math.PI) / 180

  const a =
    Math.sin(latitudeDifferenceInRadians / 2) *
      Math.sin(latitudeDifferenceInRadians / 2) +
    Math.cos(latitudeInRadians1) *
      Math.cos(latitudeInRadians2) *
      Math.sin(longitudeDifferenceInRadians / 2) *
      Math.sin(longitudeDifferenceInRadians / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return earthRadiusInMeters * c // Distance in meters
}

// Function to generate random coordinates within a specified radius
export const generateRandomCoordinatesWithinRadius = (
  centerLatitude: number,
  centerLongitude: number,
  radius: number
): LatLngExpression => {
  const radiusInDegrees = radius / 111300
  let newLatitude: number, newLongitude: number

  // Ensure the point is within the specified radius
  while (true) {
    const randomValue1 = Math.random()
    const randomValue2 = Math.random()
    const randomDistanceFromCenter = radiusInDegrees * Math.sqrt(randomValue1)
    const randomAngle = 2 * Math.PI * randomValue2
    const xOffset = randomDistanceFromCenter * Math.cos(randomAngle)
    const yOffset = randomDistanceFromCenter * Math.sin(randomAngle)

    newLatitude = centerLatitude + xOffset
    newLongitude = centerLongitude + yOffset

    // Check if the point is within the radius
    const distance = calculateDistanceInMeters(
      centerLatitude,
      centerLongitude,
      newLatitude,
      newLongitude
    )
    if (distance <= radius) {
      break // Break the loop if the point is within the radius
    }
  }

  return [newLatitude, newLongitude]
}

export function randomChoice(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}
