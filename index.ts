// crear las clases Edificio, Piso y Departamento aquí
// Mi desafío
class Departamento {
    constructor(name:string) {
        this.name = name;
    }
    name: string;
    getName(){
        return this.name;
    }
}

class Piso {
    name:string;
    departamentos: Departamento[];
    constructor(name:string){
        this.name = name;
        // Lo que estamos haciendo acá es inicializar deptos. Podemos hacerlo en el constructor o fuera de él. Si no lo inicializamos, bash arrojará "cannot read properties of undefined, reading 'push'". Y es lógico. No se puede aplicar el método de array push a algo que no fue iniciado y el compilador no sabe qué tipo de dato es.
        this.departamentos = [];
    }
    pushDepartamento(departamento:Departamento){
        this.departamentos.push(departamento);
    }
    getDepartamentos(){
        return this.departamentos;
    }
}

class Edificio {
    constructor(piso: Piso[]) {
        this.pisos = piso;
    }
    pisos: Piso[];
    addDepartamentoToPiso(nombreDePiso:string, departamento:Departamento) {
        // Nos guardamos en pisoIndicado el piso que coincida con el pasado como parámetro
        const pisoIndicado = this.pisos.find((p) => {
            return p.name == nombreDePiso
        });
        // Chequeos
        if (pisoIndicado === undefined) {
            return "Error";
        } else {
            // Guardamos el depto en el piso indicado
            pisoIndicado.pushDepartamento(departamento);
        }
    };
    getDepartamentosByPiso(nombreDePiso:string):Departamento[]{
        // Obtenemos de nuevo el pisoIndicado
        const pisoIndicado = this.pisos.find((p) => {
            return p.name == nombreDePiso;
        })
        // Mostramos los deptos de dicho piso
        return pisoIndicado.getDepartamentos();  
    }
}

// no modificar este test
function testClaseEdificio() {
    const unPiso = new Piso("planta baja");
    const otroPiso = new Piso("primer piso");
    const unEdificio = new Edificio([unPiso, otroPiso]);
    const deptoUno = new Departamento("depto uno");
    const deptoDos = new Departamento("depto dos");
    const deptoTres = new Departamento("depto tres");
    unEdificio.addDepartamentoToPiso("planta baja", deptoUno);
    unEdificio.addDepartamentoToPiso("planta baja", deptoDos);
    unEdificio.addDepartamentoToPiso("planta baja", deptoTres);
  
    const deptos = unEdificio.getDepartamentosByPiso("planta baja");
    const deptosEmpty = unEdificio.getDepartamentosByPiso("primer piso");
  
    if (
      Array.isArray(deptosEmpty) &&
      deptosEmpty.length == 0 &&
      deptos.length == 3 &&
      deptos[2].getName() == "depto tres"
    ) {
      console.log("testClaseBandaApartment passed");
    } else {
      throw "testClaseBandaApartment not passed";
    }
  }
  
  function main() {
    testClaseEdificio();
  }
  main();