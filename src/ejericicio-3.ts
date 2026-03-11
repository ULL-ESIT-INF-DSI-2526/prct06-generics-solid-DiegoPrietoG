interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  area(): number {
    return this.width * this.height;
  }
}

class Triangle implements Shape {
  constructor(private base: number, private height: number) {}

  area(): number {
    return (this.base * this.height) / 2;
  }
}

class AreaCalculator {
  area(shape: Shape): number {
    return shape.area();
  }
}

class Pentagon implements Shape {
  constructor(private side: number) {}

  area(): number {
    return (5 * this.side * this.side) / (4 * Math.tan(Math.PI / 5));
  }
}

const calculator = new AreaCalculator();

const circle = new Circle(5);
const rect = new Rectangle(4, 6);
const tri = new Triangle(3, 8);

console.log(calculator.area(circle));
console.log(calculator.area(rect));
console.log(calculator.area(tri));