interface Printer {
  print(doc: string): void;
}

interface Scanner {
  scan(doc: string): string;
}

interface Fax {
  fax(doc: string): void;
}

class BasicPrinter implements Printer {
  print(doc: string): void {
    console.log("Printing:", doc);
  }
}

class MultiFunctionPrinter implements Printer, Scanner, Fax {
  print(doc: string): void {
    console.log("Printing:", doc);
  }

  scan(doc: string): string {
    console.log("Scanning:", doc);
    return "Scanned document";
  }

  fax(doc: string): void {
    console.log("Faxing:", doc);
  }
}

function sendFax(machine: Fax, doc: string) {
  machine.fax(doc);
}

const printer = new BasicPrinter();
printer.print("Informe mensual");

const multi = new MultiFunctionPrinter();
multi.print("Contrato");
multi.scan("Documento escaneado");

sendFax(multi, "Documento urgente");