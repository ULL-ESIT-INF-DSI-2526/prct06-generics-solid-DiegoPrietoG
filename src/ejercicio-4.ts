/**
 * Interfaz para máquinas que pueden imprimir documentos.
 */
export interface Printer {
  /** Imprime el texto del documento por consola */
  print(doc: string): void;
}

/**
 * Interfaz para máquinas que tienen escáner.
 */
export interface Scanner {
  /** Escanea un documento y devuelve el resultado */
  scan(doc: string): string;
}

/**
 * Interfaz para máquinas que pueden enviar faxes.
 */
export interface Fax {
  /** Envía un documento por fax */
  fax(doc: string): void;
}

/**
 * Una impresora sencilla que solo sabe imprimir.
 */
export class BasicPrinter implements Printer {
  /** Imprime un mensaje sencillo con el contenido del documento */
  print(doc: string): void {
    console.log("Printing:", doc);
  }
}

/**
 * Una máquina avanzada que imprime, escanea y envía faxes.
 */
export class MultiFunctionPrinter implements Printer, Scanner, Fax {
  /** Imprime el documento */
  print(doc: string): void {
    console.log("Printing:", doc);
  }

  /** Escanea el documento y confirma que lo ha hecho */
  scan(doc: string): string {
    console.log("Scanning:", doc);
    return "Scanned document";
  }

  /** Envía el documento por fax */
  fax(doc: string): void {
    console.log("Faxing:", doc);
  }
}

/**
 * Función auxiliar para enviar un fax usando cualquier máquina compatible.
 */
export function sendFax(machine: Fax, doc: string) {
  machine.fax(doc);
}
