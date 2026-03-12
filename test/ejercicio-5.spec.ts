import { describe, test, expect } from 'vitest';
import { UserService, UserRepository } from '../src/ejercicio-5';

/**
 * Repositorio de prueba para no usar MySQL real en los tests.
 */
class MockUserRepository implements UserRepository {
  findById(id: string) {
    if (id === "1") return { id: "1", name: "test" };
    return null;
  }
}

describe('Pruebas de UserService (SOLID)', () => {
  
  test('Debe devolver el nombre en mayúsculas si el usuario existe', () => {
    // Inyectamos el mock en lugar del repo real
    const mockRepo = new MockUserRepository();
    const service = new UserService(mockRepo);
    
    expect(service.getUserName("1")).toBe("TEST");
  });

  test('Debe explotar si el usuario no existe en el repositorio', () => {
    const mockRepo = new MockUserRepository();
    const service = new UserService(mockRepo);
    
    expect(() => service.getUserName("999")).toThrow("User not found");
  });

  test('Debe ser capaz de usar cualquier repositorio que cumpla la interfaz', () => {
    // Ejemplo de un repo rápido "al vuelo"
    const fastRepo: UserRepository = {
      findById: () => ({ id: "10", name: "Juan" })
    };
    const service = new UserService(fastRepo);
    
    expect(service.getUserName("10")).toBe("JUAN");
  });
});
