// Genera una ubicación pseudoaleatoria pero consistente en Chile para cada vehículo
export function getVehicleLocation(vehicleId: string): [number, number] {
  // Chile: lat entre -33 y -37, lng entre -70 y -73
  let hash = 0;
  for (let i = 0; i < vehicleId.length; i++) {
    hash = vehicleId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const lat = -33 - (Math.abs(hash) % 40) / 10; // -33 a -37
  const lng = -70 - (Math.abs(hash * 7) % 30) / 10; // -70 a -73
  return [lat, lng];
}
