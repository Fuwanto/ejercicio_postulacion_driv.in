import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { getVehicleLocation } from "../../utils/getVehicleLocation";
import { getCarById } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import "./MapView.css";

export default function MapView() {
  const params = useParams();
  const navigate = useNavigate();

  // El id fue generado por VehicleTable como encodeURIComponent(`${make}-${model}-${year}-${transmission}`)
  const rawId = params.id ?? "";
  let decoded = "";
  try {
    decoded = rawId ? decodeURIComponent(rawId) : "";
  } catch {
    decoded = "";
  }

  // Extraer make, model, year, transmission del id (separador '-')
  const parts = decoded.split("-");
  const isValidId = parts.length >= 4;
  const [make, model, year, transmission] = isValidId
    ? parts
    : [undefined, undefined, undefined, undefined];

  const { data, error, isLoading } = useQuery({
    queryFn: () =>
      getCarById({
        make: make!,
        model: model!,
        year: year!,
        transmission: transmission!,
      }),
    queryKey: ["vehicle", make, model, year, transmission],
    retry: 1,
    enabled: isValidId,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!isValidId || error || !data) {
        navigate("/");
      }
    }
  }, [isLoading, isValidId, error, data, navigate]);

  if (isLoading || !isValidId) return <Loader />;

  const [lat, lng] = getVehicleLocation(decoded || "");

  return (
    <div className="map-view">
      <div className="map-view__header">
        <button className="map-view__back-btn" onClick={() => navigate(-1)}>
          Volver a la tabla
        </button>
        <h2 className="map-view__title">
          {data?.make} {data?.model} ({data?.year})
        </h2>
      </div>
      <div className="map-view__container" id="map">
        <MapContainer center={[lat, lng]} zoom={7} className="map-view__map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[lat, lng]}>
            <Tooltip>
              {data?.make} {data?.model} ({data?.year})
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
