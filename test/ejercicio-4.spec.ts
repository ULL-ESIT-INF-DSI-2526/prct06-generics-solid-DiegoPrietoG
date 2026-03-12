import { describe, test, expect, vi } from 'vitest';
import { BasicPrinter, MultiFunctionPrinter, sendFax } from '../src/ejercicio-4';

describe('Pruebas de impresoras y periféricos', () => {

    test('La impresora básica debe imprimir correctamente', () => {
        const impresora = new BasicPrinter();
        const spy = vi.spyOn(console, 'log');
        impresora.print("Documento 1");
        expect(spy).toHaveBeenCalledWith("Printing:", "Documento 1");
        spy.mockRestore();
    });

    test('La multifunción debe escanear y devolver un texto de confirmación', () => {
        const multi = new MultiFunctionPrinter();
        const resultado = multi.scan("Factura");
        expect(resultado).toBe("Scanned document");
    });

    test('La multifunción debe poder enviar faxes', () => {
        const multi = new MultiFunctionPrinter();
        const spy = vi.spyOn(console, 'log');
        multi.fax("Contrato");
        expect(spy).toHaveBeenCalledWith("Faxing:", "Contrato");
        spy.mockRestore();
    });

    test('La función sendFax debe funcionar con la máquina multifunción', () => {
        const multi = new MultiFunctionPrinter();
        const spy = vi.spyOn(console, 'log');
        sendFax(multi, "Documento Urgente");
        expect(spy).toHaveBeenCalledWith("Faxing:", "Documento Urgente");
        spy.mockRestore();
    });

    test('La impresora básica no debería tener el método scan', () => {
        const impresora = new BasicPrinter();
        // Comprobamos que el método no existe en la instancia
        expect((impresora as any).scan).toBeUndefined();
    });
});
