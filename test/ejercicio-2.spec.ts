import { describe, it, expect, beforeEach } from "vitest";

import {
  Chef,
  Recetario,
  RepositorioChef,
} from "../src/ejercicio-2";

describe("RepositorioChef", () => {

  let repo: RepositorioChef;

  beforeEach(() => {
    repo = new RepositorioChef();
  });

  it("debe agregar chefs", () => {

    const chef = new Chef("Gordon", 100000, new Recetario());

    repo.add(chef);

    expect(repo.getAll().length).toBe(1);

  });

  it("debe buscar chefs por nombre", () => {

    repo.add(new Chef("Carlos", 200, new Recetario()));
    repo.add(new Chef("Carla", 300, new Recetario()));

    const resultado = repo.searchByName("car");

    expect(resultado.length).toBe(2);

  });

  it("debe filtrar por seguidores", () => {

    repo.add(new Chef("Chef1", 100, new Recetario()));
    repo.add(new Chef("Chef2", 500, new Recetario()));

    const resultado = repo.searchByFollowers(200);

    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe("Chef2");

  });

});