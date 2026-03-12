import { describe, test, expect } from 'vitest';
import { Circle, Rectangle, Triangle, Pentagon, AreaCalculator } from '../src/ejercicio-3';

describe('Pruebas de cálculo de áreas', () => {
    const calc = new AreaCalculator();

    test('Debe calcular el área de un círculo', () => {
        const circulo = new Circle(10);
        // PI * 10 * 10 = 314.159...
        expect(calc.area(circulo)).toBeCloseTo(314.159, 2);
    });

    test('Debe calcular el área de un rectángulo', () => {
        const rectangulo = new Rectangle(10, 10);
        expect(calc.area(rectangulo)).toBe(100);
    });

    test('Debe calcular el área de un triángulo', () => {
        const triangulo = new Triangle(10, 10);
        // (10 * 10) / 2 = 50
        expect(calc.area(triangulo)).toBe(50);
    });

    test('Debe calcular el área de un pentágono ', () => {
        const pentagono = new Pentagon(10);
        // El área de un pentágono de lado 10 es aprox 172.04
        expect(calc.area(pentagono)).toBeCloseTo(172.04, 1);
    });

    test('Debe funcionar con valores repetidos', () => {
        const rect1 = new Rectangle(5, 5);
        const rect2 = new Rectangle(5, 5);
        expect(calc.area(rect1)).toBe(calc.area(rect2));
    });
});
