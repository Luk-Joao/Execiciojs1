function deepClone(obj) {
  // Casos base: valores primitivos e null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Lidar com Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Lidar com RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  
  // Lidar com Array
  if (Array.isArray(obj)) {
    const arrCopy = [];
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepClone(obj[i]);
    }
    return arrCopy;
  }
  
  // Lidar com Map
  if (obj instanceof Map) {
    const mapCopy = new Map();
    obj.forEach((value, key) => {
      mapCopy.set(deepClone(key), deepClone(value));
    });
    return mapCopy;
  }
  
  // Lidar com Set
  if (obj instanceof Set) {
    const setCopy = new Set();
    obj.forEach(value => {
      setCopy.add(deepClone(value));
    });
    return setCopy;
  }
  
  // Lidar com Object
  const objCopy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = deepClone(obj[key]);
    }
  }
  
  return objCopy;
}

// Testando com o exemplo fornecido
const obj = { 
  nome: "Ana", 
  endereco: { 
    cidade: "Luanda" 
  } 
};

const copia = deepClone(obj);

console.log("Original:", obj);
console.log("Cópia:", copia);

// Modificando a cópia
copia.nome = "João";
copia.endereco.cidade = "Lisboa";

console.log("\n--- Após modificar a cópia ---");
console.log("Original:", obj); // { nome: "Ana", endereco: { cidade: "Luanda" } }
console.log("Cópia:", copia);   // { nome: "João", endereco: { cidade: "Lisboa" } }

// Testes adicionais com diferentes tipos
console.log("\n--- Testes adicionais ---");

const objComplexo = {
  texto: "Olá",
  numero: 42,
  booleano: true,
  nulo: null,
  indefinido: undefined,
  array: [1, 2, { nested: "valor" }],
  data: new Date(),
  regex: /teste/gi,
  map: new Map([["chave", "valor"]]),
  set: new Set([1, 2, 3]),
  profundo: {
    nivel1: {
      nivel2: {
        nivel3: "muito profundo"
      }
    }
  }
};

const copiaComplexa = deepClone(objComplexo);

// Modificar a cópia
copiaComplexa.array[2].nested = "modificado";
copiaComplexa.profundo.nivel1.nivel2.nivel3 = "alterado";

console.log("Array original nested:", objComplexo.array[2].nested); // "valor"
console.log("Array cópia nested:", copiaComplexa.array[2].nested);   // "modificado"

console.log("\nProfundo original:", objComplexo.profundo.nivel1.nivel2.nivel3); // "muito profundo"
console.log("Profundo cópia:", copiaComplexa.profundo.nivel1.nivel2.nivel3);   // "alterado"