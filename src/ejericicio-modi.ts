export type TipoPlato = "entrante" | "principal" | "guarncion" | "segundo" | "postre";

export interface Elaborable<T> {
    desc() : T;
    time() : number;
}

export interface SweetDesc {
    nombre: string;
    dificultad: number;
}

/**
 * Clase Salty que implementa la interfaz Elaborable con el tipo string
 */
export class Salty implements Elaborable<string> {
    private _nombre_plato : string;
    private _pais_origen : string;
    private _tiempo_preparacion : number;
    private _tipo_plato : TipoPlato;
    constructor(nombre_plato : string, pais_origen : string, tiempo_preparacion : number, tipo_plato : TipoPlato) {
        this._nombre_plato = nombre_plato;
        this._pais_origen = pais_origen;
        if (tiempo_preparacion < 0) {throw Error("El tiempo de preparación no puede ser negativo");}
        this._tiempo_preparacion = tiempo_preparacion;
        this._tipo_plato = tipo_plato;
    }
    get nombre_plato() { return this._nombre_plato; }
    get pais_origen() { return this._pais_origen; }
    get tiempo_preparacion() { return this._tiempo_preparacion; }
    get tipo_plato() { return this._tipo_plato; }
    /**
     * Método que describe la receta.
     * @returns Devuelve una string con el nombre del plato y el país de origen.
     */
    desc(): string {
        return (this.nombre_plato + " de " + this.pais_origen)
    }
    /**
     * Método que muestra el tiempo de elaboración de la receta.
     * @returns number
     */
    time() : number {
        return this.tiempo_preparacion; 
    }
}
/**
 * Clase Salty que implementa la interfaz Elaborable con la interfaz SweetDesc
 */
export class Sweet implements Elaborable<SweetDesc> {
    private readonly _nombre_plato : string;
    private readonly _nivel_dificultad : number;
    private readonly _tiempo_preparacion : number;
    private readonly _tiempo_horneado : number;
    private readonly _tiempo_refrigeracion : number;
    constructor(nombre_plato : string, nivel_dificultad : number, tiempo_preparacion : number, tiempo_horneado : number, tiempo_refrigreacion : number) {
        this._nombre_plato = nombre_plato;
        if (nivel_dificultad > 10 || nivel_dificultad < 1) {throw Error("Nivel de dificultad incorrecto")}
        this._nivel_dificultad = nivel_dificultad;
        this._tiempo_horneado = tiempo_horneado;
        this._tiempo_preparacion = tiempo_preparacion; 
        this._tiempo_refrigeracion = tiempo_refrigreacion;      
    }
    
    get nombre_plato() { return this._nombre_plato; }
    get nivel_dificultad() { return this._nivel_dificultad; }
    get tiempo_preparacion() { return this._tiempo_preparacion; }
    get tiempo_horneado() { return this._tiempo_horneado; }
    get tiempo_refrigeracion() { return this._tiempo_refrigeracion; }
    /**
     * Método que describe la receta.
     * @returns Devuelve el tipo SweetDesc de la interfaz previamente definida.
     */
    desc() : SweetDesc {
        return {
            nombre : this.nombre_plato,
            dificultad : this.nivel_dificultad
        }
    }
    /**
     * Método que muestra el tiempo de elaboración de la receta.
     * @returns la suma de los distintos tiempos.
     */
    time () : number {
        return this._tiempo_horneado + this._tiempo_preparacion + this._tiempo_refrigeracion;
    }
}
/**
 * Clase genérica  CookBook encargada de almacenar la una lista de recetas
 */
export class CookBook<T> {
    private readonly _recetas : Elaborable<T>[];
    constructor(recetas : Elaborable<T>[] = []) {
        this._recetas = recetas
    }
    get recetas() : Elaborable<T>[] {
        return this._recetas;
    }
    /**
     * Función para añadir una nueva receta
     * @param receta La receta que se quiere añadir
     */
    add(receta: Elaborable<T>): void {
        this._recetas.push(receta);
    }
    /**
     * Remove para borrar una receta en específico.
     * @param indice - Índice de la receta que se quiere borrar del recetario.
     * @returns Retorna true or false si es que se puede o no borrar.
     */
    remove(indice: number): boolean {
        if (indice >= 0 && indice < this._recetas.length) {
            this._recetas.splice(indice, 1);
            return true;
        }
        return false;
    }
    /**
     * Busca una receta específica usando su posición en la lista.
     * @param indice - La posición de la receta (empezando desde 0).
     * @returns La receta encontrada en esa posición.
     * @throws Lanza un error si el índice no existe en el recetario.
     */
    get(indice: number): Elaborable<T> | undefined {
        if (indice >= this.recetas.length || indice < 0) {
            throw Error("Fuera de índice");
        }
        return this._recetas[indice];
    }

    /**
     * Nos dice cuántas recetas hay guardadas actualmente.
     * @returns El número total de recetas.
     */
    size(): number {
        return this._recetas.length;
    }

    /**
     * Crea un nuevo recetario que solo contiene las recetas que cumplen una condición.
     * @param predicado - Una función que recibe una receta y decide si se queda (true) o se descarta (false).
     * @returns Un nuevo objeto CookBook con el resultado del filtrado.
     */
    filter(predicado: (receta: Elaborable<T>) => boolean): CookBook<T> {
        const filtradas = this._recetas.filter(predicado);
        return new CookBook<T>(filtradas);
    }

    /**
     * Calcula el tiempo medio de elaboración sumando todas las recetas.
     * @returns El promedio de tiempo en minutos, o 0 si no hay ninguna receta.
     */
    avgTime(): number {
        if (this._recetas.length === 0) {
            return 0;
        }
        let sumaTotal = 0;
        for (let i = 0; i < this._recetas.length; i++) {
            sumaTotal += this._recetas[i]!.time();
        }
        const promedio = sumaTotal / this._recetas.length;
        return promedio;
    }

}