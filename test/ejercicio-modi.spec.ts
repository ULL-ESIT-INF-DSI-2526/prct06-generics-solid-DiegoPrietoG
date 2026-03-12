import { describe, test, expect } from 'vitest';
import { Salty, Sweet, CookBook } from '../src/ejericicio-modi.ts';

describe('Pruebas de la clase Salty', () => {
    test('Debe crear una receta Salty y acceder a sus propiedades (getters)', () => {
        const receta = new Salty("Pasta", "Italia", 20, "principal");
        // Testeamos los getters para subir cobertura
        expect(receta.nombre_plato).toBe("Pasta");
        expect(receta.pais_origen).toBe("Italia");
        expect(receta.tiempo_preparacion).toBe(20);
        expect(receta.tipo_plato).toBe("principal");
    });

    test('Debe devolver descripción correctamente', () => {
        const receta = new Salty("Pasta", "Italia", 20, "principal");
        expect(receta.desc()).toBe("Pasta de Italia");
    });

    test('Debe explotar si el tiempo es negativo', () => {
        expect(() => new Salty("Arroz", "España", -5, "principal"))
            .toThrow("El tiempo de preparación no puede ser negativo");
    });
});

describe('Pruebas de la clase Sweet', () => {
    test('Debe acceder a todos los getters de Sweet', () => {
        const postre = new Sweet("Tarta", 5, 10, 20, 30);
        expect(postre.nombre_plato).toBe("Tarta");
        expect(postre.nivel_dificultad).toBe(5);
        expect(postre.tiempo_preparacion).toBe(10);
        expect(postre.tiempo_horneado).toBe(20);
        expect(postre.tiempo_refrigeracion).toBe(30);
    });

    test('Debe devolver el objeto de descripción correctamente', () => {
        const postre = new Sweet("Tarta", 5, 10, 20, 30);
        expect(postre.desc()).toEqual({ nombre: "Tarta", dificultad: 5 });
    });

    test('Debe explotar con dificultad incorrecta', () => {
        expect(() => new Sweet("D", 11, 1, 1, 1)).toThrow("Nivel de dificultad incorrecto");
        expect(() => new Sweet("D", 0, 1, 1, 1)).toThrow("Nivel de dificultad incorrecto");
    });
    test('Debe devolver correctamente el tiempo', () => {
        const postre = new Sweet("tarta", 10, 10, 10, 10);
        expect(postre.time()).toBe(30);
    });
});

describe('Pruebas de la clase CookBook', () => {
    test('Debe añadir y eliminar recetas (cobertura de remove)', () => {
        const miRecetario = new CookBook<string>();
        const receta = new Salty("Ceviche", "Perú", 30, "principal");
        
        miRecetario.add(receta);
        expect(miRecetario.size()).toBe(1);
        
        // Testeamos remove exitoso
        const eliminado = miRecetario.remove(0);
        expect(eliminado).toBe(true);
        expect(miRecetario.size()).toBe(0);
        
        // Testeamos remove fallido (índice inexistente) para cubrir el 'else'
        const noEliminado = miRecetario.remove(99);
        expect(noEliminado).toBe(false);
    });

    test('Debe acceder al getter de la lista completa de recetas', () => {
        const miRecetario = new CookBook<string>();
        expect(Array.isArray(miRecetario.recetas)).toBe(true);
    });

    test('Debe explotar si el índice en get() es negativo o excesivo', () => {
        const miRecetario = new CookBook<string>();
        miRecetario.add(new Salty("A", "B", 1, "postre"));
        
        expect(() => miRecetario.get(-1)).toThrow("Fuera de índice");
        expect(() => miRecetario.get(5)).toThrow("Fuera de índice");
    });

    test('Debe calcular el promedio correctamente', () => {
        const miRecetario = new CookBook<string>();
        miRecetario.add(new Salty("A", "B", 10, "entrante"));
        miRecetario.add(new Salty("C", "D", 20, "principal"));
        expect(miRecetario.avgTime()).toBe(15);
    });

    test('Promedio de recetario vacío debe ser 0', () => {
        const miRecetario = new CookBook<any>();
        expect(miRecetario.avgTime()).toBe(0);
    });
});
