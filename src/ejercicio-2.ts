/** Interfaz genérica para modelar almacenamiento de unidades */
export interface iRepositorio<T, K> {
    add(item : T): void;
    remove(id: K): void;
    getById(id: K): T | undefined;
    getAll(): T[];
}
/** Interfaz para buscar elementos por nombre */
export interface SearchByName<T> {
    searchByName(name: string): T[];
}

/** Interfaz para filtrar por etiquetas */
export interface SearchByTags<T> {
  searchByTags(tags: string[]): T[];
}

/** Interfaz para buscar elementos por año */
export interface SearchByYear<T> {
    searchByYear(year: number): T[];
}

/** Interfaz para buscar elementos por número de seguidores */
export interface SearchByFollowers<T> {
    searchByFollowers(minFollowers: number): T[];
}

/** Interfaz para un paso de receta */
export interface iPaso {
    nombre: string;
    descripcion: string;
    etiquetas: string[];
    opcional: boolean;
    numeroVecesCompletado: number;
}

/** Interfaz para una receta */
export interface iReceta {
    nombre: string;
    año: number;
    pasos: iPaso[];
}

/** Interfaz para un recetario */
export interface iRecetario {
    recetas: iReceta[];
    agregarReceta(receta: iReceta): void;
}

/** Interfaz para un chef */
export interface iChef {
    nombre: string;
    seguidores: number;
    recetario: iRecetario;
    agregarReceta(receta: iReceta): void;
}

/** Clase Paso implementando iPaso */
export class Paso implements iPaso {
    nombre: string;
    descripcion: string;
    etiquetas: string[];
    opcional: boolean;
    numeroVecesCompletado: number;

    constructor(nombre: string, descripcion: string, etiquetas: string[], opcional: boolean, numeroVecesCompletado: number) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.etiquetas = etiquetas;
        this.opcional = opcional;
        this.numeroVecesCompletado = numeroVecesCompletado;
    }
}

/** Clase Receta implementando iReceta */
export class Receta implements iReceta {
    nombre: string;
    año: number;
    pasos: Paso[];

    constructor(nombre: string, año: number, pasos: Paso[]) {
        this.nombre = nombre;
        this.año = año;
        this.pasos = pasos;
    }
}

/** Clase Recetario implementando iRecetario */
export class Recetario implements iRecetario {
    recetas: Receta[];

    constructor(recetas: Receta[] = []) {
        this.recetas = recetas;
    }
    /**
     * Agrega una receta al recetario
     * @param receta - Objeto receta
     */
    agregarReceta(receta: Receta): void {
        this.recetas.push(receta);
    }
}

/** Clase Chef implementando iChef */
export class Chef implements iChef {
    nombre: string;
    seguidores: number;
    recetario: Recetario;

    constructor(nombre: string, seguidores: number, recetario: Recetario) {
        this.nombre = nombre;
        this.seguidores = seguidores;
        this.recetario = recetario;
    }

    agregarReceta(receta: Receta): void {
        this.recetario.agregarReceta(receta);
    }
}

export class EstimadorTiempoReceta {
        /**
     *  Calcula el tiempo total de la receta considerando pasos opcionales
     * @returns el tiempo total de la receta considerando pasos opcionales
     */
    calcularTiempoTotal(receta: Receta): { minimo: number; maximo: number } {
        let tiempoMin = 0;
        let tiempoMax = 0;
        for (const paso of receta.pasos) {
            if (paso.opcional) {
                tiempoMax += paso.numeroVecesCompletado;
            } else {
                tiempoMin += paso.numeroVecesCompletado;
                tiempoMax += paso.numeroVecesCompletado;
            }
        }
        return { minimo: tiempoMin, maximo: tiempoMax };
    }
    /**
     * calcula el número de pasos de la receta
     * @returns numero de pasos
     */
    calcularNumeroDePasos(receta : Receta): number {
        return receta.pasos.length;
    }
}

export interface PresentarTabla<T> {
  render(data: T[]): void;
}

export class ConsoleTableRenderer<T> implements PresentarTabla<T> {
  render(data: T[]): void {
    console.table(data);
  }
}

export class RepositorioChef
  implements
    iRepositorio<Chef, string>,
    SearchByName<Chef>,
    SearchByFollowers<Chef> {

  private chefs: Chef[] = [];

  add(item: Chef): void {
    this.chefs.push(item);
  }

  remove(nombre: string): void {
    this.chefs = this.chefs.filter((chef) => chef.nombre !== nombre);
  }

  getById(nombre: string): Chef | undefined {
    return this.chefs.find((chef) => chef.nombre === nombre);
  }

  getAll(): Chef[] {
    return this.chefs;
  }

  searchByName(name: string): Chef[] {
    return this.chefs.filter((chef) =>
      chef.nombre.toLowerCase().includes(name.toLowerCase())
    );
  }

  searchByFollowers(minFollowers: number): Chef[] {
    return this.chefs.filter((chef) => chef.seguidores >= minFollowers);
  }
}


export class ChefProfessional extends Chef {}
export class ChefAficionado extends Chef {}