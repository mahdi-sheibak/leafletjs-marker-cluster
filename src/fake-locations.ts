import { faker } from "@faker-js/faker";
import type { LatLngExpression } from "leaflet";

const positions: LatLngExpression[] = [
  [35.7219, 51.3347],
  [35.8027521, 51.3759257],
  [35.8279671, 50.8679881],
  [35.8650287, 50.8363885],
  [35.8928697, 50.81953],
  [35.8377436, 50.9984922],
  [35.8480469, 51.5422342],
  [35.7496172, 51.7604699],
];

export const coordinates = positions.map(
  (
    position
  ): {
    id: string;
    position: LatLngExpression;
  } => ({
    id: faker.database.mongodbObjectId(),
    position: position,
  })
);
