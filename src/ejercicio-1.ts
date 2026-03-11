/**
 * Typpe Affiliation: Define las posibles afiliaciones de los personajes y entidades galácticas
 */
export type Affiliation = 'República' | 'Imperio' | 'Sith' | 'Independiente';

/** Interfaz base que toda entidad galáctica debería tener */
export interface GalacticEntity {
  name: string;
  id: string;
}

/** Interfaz para entidades con procedencia */
export interface OriginTrackable {
  originPlanet: string;
}

/** Interfaz para entidades con fecha de creación/nacimiento */
export interface Chronological {
  year: number; // Año de construcción o formación
}

/** Interfaz para entidades con jerarquía o potencia */
export interface Tiered {
  powerLevel: number; // O "clase"
}

/** Interfaz para entidades con bando */
export interface Allied {
  affiliation: Affiliation;
}

/** Gestión básica: CRUD */
export interface GalacticRegistry<T> {
  add(item: T): void;
  remove(id: string): boolean;
  getAll(): T[];
  getById(id: string): T | undefined;
  searchByName(name: string): T[];
}

/** Búsquedas específicas segregadas */
export interface SearchByAffiliation<T> {
  filterByAffiliation(affiliation: Affiliation): T[];
}

/** Solo para entidades con nivel de poder */
export interface SearchByPower<T> {
  filterByPowerRange(min: number, max: number): T[];
}

/** Solo para entidades con año de creación/nacimiento */
export interface SearchByDate<T> {
  filterByYear(year: number): T[];
}

/**
 * Solo para entidades con planeta de origen. Se podría extender a búsqueda por sistema estelar o región galáctica en el futuro.
 */
export interface SearchByOriginPlanet<T> {
  filterByPlanet(planet: string): T[];
}

/** Interfaz completa que combina todas las funcionalidades para entidades que cumplen con todos los criterios */
export interface CompleteGalacticRegistry<T> extends GalacticRegistry<T>, SearchByAffiliation<T>, SearchByPower<T>, SearchByDate<T>, SearchByOriginPlanet<T> {}

/**
 * Implementación base de una colección galáctica que maneja operaciones CRUD y búsqueda por nombre. Las búsquedas específicas se implementarán en clases concretas para cada tipo de entidad (JediMaster, Starship, Planet) que extiendan esta clase base.
 */
export abstract class BasicGalacticCollection<T extends GalacticEntity> implements GalacticRegistry<T> {
    constructor(protected items: T[] = []) {}
    /**
     *  Agrega un nuevo elemento a la colección. Se asume que el elemento ya tiene un ID único asignado.
     * @param item - El elemento a agregar a la colección. Debe cumplir con la interfaz GalacticEntity para garantizar que tenga un ID y un nombre.
     */
    add(item: T): void {
        this.items.push(item);
    }
    /**
     * Elimina un elemento de la colección basado en su ID. Retorna true si el elemento fue encontrado y eliminado, o false si no se encontró ningún elemento con el ID proporcionado.
     */
    remove(id: string): boolean {
        const index = this.items.findIndex((item: any) => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
     *  Getter para obtener todos los elementos de la colección. Retorna un array con todos los elementos almacenados en la colección.
     * @returns - Un array de elementos de tipo T que representa todos los elementos actualmente en la colección.
     */
    getAll(): T[] {
        return this.items;
    }
    /**
     *  Busca un elemento en la colección por su ID. Retorna el elemento si se encuentra, o undefined si no se encuentra ningún elemento con el ID proporcionado.
     * @param id -  El ID del elemento que se desea buscar en la colección. Este ID debe ser único para cada elemento en la colección.
     * @returns -  El elemento de tipo T que coincide con el ID proporcionado, o undefined si no se encuentra ningún elemento con ese ID en la colección.
     */
    getById(id: string): T | undefined {
        return this.items.find((item: any) => item.id === id);
    }
    searchByName(name: string): T[] {
        return this.items.filter((item: any) => item.name.toLowerCase().includes(name.toLowerCase()));
    }
}

export interface JediMaster
    extends GalacticEntity,
        Allied,
        Tiered,
        Chronological,
        OriginTrackable {}

/**
 * Colección especializada para gestionar entidades de tipo JediMaster.
 * Extiende la funcionalidad básica de BasicGalacticCollection añadiendo
 * métodos de búsqueda específicos basados en las características de los Jedi.
 */
export class JediMasterCollection
    extends BasicGalacticCollection<JediMaster>
    implements 
        SearchByAffiliation<JediMaster>,
        SearchByPower<JediMaster>,
        SearchByDate<JediMaster>,
        SearchByOriginPlanet<JediMaster>    
    {
    /**
     * Constructor de la colección de Jedi. Permite inicializar la colección
     * con un conjunto opcional de maestros Jedi.
     * @param items - Lista inicial de JediMaster que se añadirán a la colección.
     */
    constructor(items: JediMaster[] = []) {
        super(items);
    }

    /**
     * Filtra los maestros Jedi según su afiliación (República, Imperio, Sith, Independiente).
     * @param affiliation - Afiliación por la que se desea filtrar.
     * @returns - Lista de JediMaster que pertenecen a la afiliación indicada.
     */
    filterByAffiliation(affiliation: Affiliation): JediMaster[] {
        return this.items.filter((jedi) => jedi.affiliation === affiliation);
    }

    /**
     * Filtra los maestros Jedi según un rango de nivel de poder.
     * @param min - Valor mínimo del nivel de poder.
     * @param max - Valor máximo del nivel de poder.
     * @returns - Lista de JediMaster cuyo nivel de poder está dentro del rango especificado.
     */
    filterByPowerRange(min: number, max: number): JediMaster[] {
        return this.items.filter((jedi) => jedi.powerLevel >= min && jedi.powerLevel <= max);
    }

    /**
     * Filtra los maestros Jedi según el año de formación.
     * @param year - Año de formación que se desea buscar.
     * @returns - Lista de JediMaster formados en el año indicado.
     */
    filterByYear(year: number): JediMaster[] {
        return this.items.filter((jedi) => jedi.year === year);
    }

    /**
     * Filtra los maestros Jedi según su planeta de origen.
     * @param planet - Nombre del planeta de origen.
     * @returns - Lista de JediMaster cuyo planeta de origen coincide con el indicado.
     */
    filterByPlanet(planet: string): JediMaster[] {
        return this.items.filter((jedi) => jedi.originPlanet.toLowerCase() === planet.toLowerCase());
    }
}

export interface Starship
  extends GalacticEntity,
    OriginTrackable,
    Chronological,
    Allied {}

/**
 * Colección especializada para gestionar entidades de tipo Starship.
 * Hereda las operaciones básicas de gestión (CRUD y búsqueda por nombre)
 * e implementa métodos de filtrado específicos relevantes para las naves.
 */
export class StarshipCollection
    extends BasicGalacticCollection<Starship>
    implements
        SearchByAffiliation<Starship>,
        SearchByDate<Starship>,
        SearchByOriginPlanet<Starship>    
    {
    /**
     * Constructor de la colección de naves espaciales.
     * @param items - Lista inicial opcional de naves espaciales.
     */
    constructor(items: Starship[] = []) {
        super(items);
    }

    /**
     * Filtra las naves según su afiliación.
     * @param affiliation - Afiliación a la que pertenece la nave.
     * @returns - Lista de naves que coinciden con la afiliación indicada.
     */
    filterByAffiliation(affiliation: Affiliation): Starship[] {
        return this.items.filter((starship) => starship.affiliation === affiliation);
    }

    /**
     * Filtra las naves según su año de construcción.
     * @param year - Año de construcción que se desea buscar.
     * @returns - Lista de naves construidas en el año indicado.
     */
    filterByYear(year: number): Starship[] {
        return this.items.filter((starship) => starship.year === year);
    }

    /**
     * Filtra las naves según su planeta o sistema de origen.
     * @param planet - Nombre del planeta de fabricación o procedencia.
     * @returns - Lista de naves cuyo planeta de origen coincide con el indicado.
     */
    filterByPlanet(planet: string): Starship[] {
        return this.items.filter((starship) => starship.originPlanet.toLowerCase() === planet.toLowerCase());
    }
}

/**
 * Interfaz que representa un planeta dentro del registro galáctico.
 * Un planeta tiene un identificador, un nombre, un año asociado
 * (por ejemplo año de descubrimiento o colonización) y una afiliación política.
 */
export interface Planet
  extends GalacticEntity,
    Chronological,
    Allied {}
    
/**
 * Colección especializada para gestionar entidades de tipo Planet.
 * Permite realizar operaciones básicas y filtrados específicos
 * por afiliación política y año.
 */
export class PlanetCollection
    extends BasicGalacticCollection<Planet>
    implements
        SearchByAffiliation<Planet>,
        SearchByDate<Planet>    
    {

    /**
     * Constructor de la colección de planetas.
     * @param items - Lista inicial opcional de planetas.
     */
    constructor(items: Planet[] = []) {
        super(items);
    }

    /**
     * Filtra los planetas según su afiliación política.
     * @param affiliation - Afiliación del planeta.
     * @returns - Lista de planetas que pertenecen a la afiliación indicada.
     */
    filterByAffiliation(affiliation: Affiliation): Planet[] {
        return this.items.filter((planet) => planet.affiliation === affiliation);
    }

    /**
     * Filtra los planetas según el año asociado (por ejemplo descubrimiento o colonización).
     * @param year - Año por el que se desea filtrar.
     * @returns - Lista de planetas que coinciden con el año indicado.
     */
    filterByYear(year: number): Planet[] {
        return this.items.filter((planet) => planet.year === year);
    }
}