import { describe, it, expect, beforeEach } from "vitest";

import {
  JediMasterCollection,
  StarshipCollection,
  PlanetCollection,
  JediMaster,
  Starship,
  Planet
} from "../src/ejercicio-1";

describe("JediMasterCollection", () => {

  let collection: JediMasterCollection;

  const jedi1: JediMaster = {
    id: "J1",
    name: "Yoda",
    affiliation: "República",
    powerLevel: 1000,
    year: 896,
    originPlanet: "Desconocido"
  };

  const jedi2: JediMaster = {
    id: "J2",
    name: "Obi-Wan Kenobi",
    affiliation: "República",
    powerLevel: 900,
    year: 57,
    originPlanet: "Stewjon"
  };

  beforeEach(() => {
    collection = new JediMasterCollection();
    collection.add(jedi1);
    collection.add(jedi2);
  });

  it("Debería añadir Jedi correctamente", () => {
    expect(collection.getAll().length).toBe(2);
  });

  it("Debería buscar Jedi por nombre", () => {
    const result = collection.searchByName("yoda");
    expect(result[0].name).toBe("Yoda");
  });

  it("Debería filtrar por afiliación", () => {
    const result = collection.filterByAffiliation("República");
    expect(result.length).toBe(2);
  });

  it("Debería filtrar por rango de poder", () => {
    const result = collection.filterByPowerRange(950, 1100);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Yoda");
  });

  it("Debería filtrar por planeta", () => {
    const result = collection.filterByPlanet("Stewjon");
    expect(result[0].name).toBe("Obi-Wan Kenobi");
  });

});