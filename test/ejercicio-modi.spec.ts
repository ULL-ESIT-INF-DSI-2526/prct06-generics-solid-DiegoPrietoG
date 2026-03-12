import { describe, test, expect } from 'vitest';
import { Salty, TipoPlato } from '../src/ejericicio-modi.ts';
import { Sweet } from '../src/ejericicio-modi.ts';
import { CookBook } from '../src/ejericicio-modi.ts';

describe('Pruebas de la clase Salty', () => {
    test('Debe crear una receta Salty y devolver su descripción correctamente', () => {
        const receta = new Salty("Pasta Boloñesa", "Italia", 20, "principal");
        expect(receta.desc()).toBe("Pasta Boloñesa de Italia");
    });

    test('Debe explotar si el tiempo es negativo', () => {
        expect(() => new Salty("Arroz", "España", -5, "principal"))
            .toThrow("El tiempo de preparación no puede ser negativo");
    });
});

describe('Pruebas de la clase Sweet', () => {
    test('Debe calcular el tiempo total sumando todos los pasos', () => {
        const postre = new Sweet("Tarta de Queso", 3, 15, 45, 120); 
        // 15 + 45 + 120 = 180
        expect(postre.time()).toBe(180);
    });

    test('Debe explotar si la dificultad es mayor a 10', () => {
        expect(() => new Sweet("Soufflé", 11, 20, 20, 0))
            .toThrow("Nivel de dificultad incorrecto");
    });

    test('Debe explotar si la dificultad es menor a 1', () => {
        expect(() => new Sweet("Galletas", 0, 10, 15, 0))
            .toThrow("Nivel de dificultad incorrecto");
    });
});

describe('Pruebas de la clase CookBook', () => {
    test('Debe añadir y contar las recetas correctamente', () => {
        const miRecetario = new CookBook<string>();
        const receta = new Salty("Ceviche", "Perú", 30, "principal");
        miRecetario.add(receta);
        miRecetario.add(receta);
        expect(miRecetario.size()).toBe(2);
    });

    test('Debe explotar si pedimos un índice que no existe', () => {
        const miRecetario = new CookBook<string>();
        expect(() => miRecetario.get(5)).toThrow("Fuera de índice");
    });

    test('Debe calcular el tiempo medio de las recetas correctamente', () => {
        const miRecetario = new CookBook<string>();
        miRecetario.add(new Salty("Ensalada", "Grecia", 10, "entrante"));
        miRecetario.add(new Salty("Guiso", "Francia", 50, "principal"));
        // (10 + 50) / 2 = 30
        expect(miRecetario.avgTime()).toBe(30);
    });

    test('Debe retornar 0 en avgTime si el recetario no tiene nada', () => {
        const miRecetario = new CookBook<any>();
        expect(miRecetario.avgTime()).toBe(0);
    });

    test('Debe filtrar recetas que duren menos de un tiempo determinado', () => {
        const miRecetario = new CookBook<string>();
        miRecetario.add(new Salty("Tapa ", "España", 5, "entrante"));
        miRecetario.add(new Salty("Asado", "Argentina", 120, "principal"));
        
        const rapidas = miRecetario.filter(r => r.time() < 20);
        expect(rapidas.size()).toBe(1);
        expect(rapidas.get(0)?.time()).toBe(5);
    });
});
