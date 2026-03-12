/**
 * Interfaz que define las operaciones que cualquier repositorio de usuarios debe tener.
 */
export interface UserRepository {
  /** Busca un usuario por su ID */
  findById(id: string): { id: string; name: string } | null;
}

/**
 * Implementación específica para bases de datos MySQL.
 */
export class MySqlUserRepository implements UserRepository {
  /** Simula una consulta a una base de datos MySQL */
  findById(id: string): { id: string; name: string } | null {
    console.log("Querying MySQL...");
    return { id, name: "Ada" };
  }
}

/**
 * Servicio encargado de la lógica de negocio de los usuarios.
 * Ahora usa Inyección de Dependencias.
 */
export class UserService {
  /**
   * El repositorio se recibe por el constructor (Inyección).
   * No sabemos si es MySQL, Postgres o un Mock, solo que cumple la interfaz.
   */
  constructor(private repo: UserRepository) {}

  /** Obtiene el nombre del usuario en mayúsculas */
  getUserName(id: string): string {
    const user = this.repo.findById(id);
    if (!user) throw new Error("User not found");
    return user.name.toUpperCase();
  }
}
