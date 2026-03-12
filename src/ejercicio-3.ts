/**
 * Interfaz para cualquier forma geométrica que sepa calcular su propia área.
 */
export interface Shape {
  /** Calcula el área de la figura */
  area(): number;
}

/**
 * Clase para representar un círculo.
 */
export class Circle implements Shape {
  /** Crea un círculo pasándole el radio */
  constructor(private radius: number) {}

  /** Calcula el área usando el radio y el número PI */
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

/**
 * Clase para representar un rectángulo.
 */
export class Rectangle implements Shape {
  /** Crea un rectángulo con su ancho y su alto */
  constructor(private width: number, private height: number) {}

  /** Calcula el área multiplicando la base por la altura */
  area(): number {
    return this.width * this.height;
  }
}

/**
 * Clase para representar un triángulo.
 */
export class Triangle implements Shape {
  /** Crea un triángulo con su base y su altura */
  constructor(private base: number, private height: number) {}

  /** Calcula el área dividiendo el producto de base y altura por dos */
  area(): number {
    return (this.base * this.height) / 2;
  }
}

/**
 * Clase encargada de calcular áreas de cualquier figura que sea Shape.
 */
export class AreaCalculator {
  /** Recibe una figura y nos dice cuánto mide su área */
  area(shape: Shape): number {
    return shape.area();
  }
}

/**
 * Clase para representar un pentágono regular.
 */
export class Pentagon implements Shape {
  /** Crea un pentágono pasándole lo que mide un lado */
  constructor(private side: number) {}

  /** Calcula el área usando la fórmula de polígonos regulares */
  area(): number {
    return (5 * this.side * this.side) / (4 * Math.tan(Math.PI / 5));
  }
}
