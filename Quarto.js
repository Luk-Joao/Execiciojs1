// Função para achatar objeto aninhado
function flattenObject(obj, prefix = '') {
    const flattened = {};
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                // Se for um objeto, chama recursivamente
                Object.assign(flattened, flattenObject(obj[key], newKey));
            } else {
                // Se não for objeto, adiciona ao resultado
                flattened[newKey] = obj[key];
            }
        }
    }
    
    return flattened;
}

// Exemplos de uso
console.log('=== Exemplo 1: Usuário Simples ===');
const exemplo1 = {
    user: {
        name: "Ana",
        age: 20
    }
};
console.log('Entrada:', exemplo1);
console.log('Saída:', flattenObject(exemplo1));

console.log('\n=== Exemplo 2: Objeto Complexo ===');
const exemplo2 = {
    empresa: {
        nome: "TechCorp",
        endereco: {
            rua: "Av. Principal",
            numero: 100,
            cidade: "São Paulo"
        },
        funcionarios: 50
    }
};
console.log('Entrada:', exemplo2);
console.log('Saída:', flattenObject(exemplo2));

console.log('\n=== Exemplo 3: Múltiplos Níveis ===');
const exemplo3 = {
    config: {
        app: {
            theme: {
                colors: {
                    primary: "#007bff",
                    secondary: "#6c757d"
                }
            }
        }
    }
};
console.log('Entrada:', exemplo3);
console.log('Saída:', flattenObject(exemplo3));

console.log('\n=== Exemplo 4: Com Arrays ===');
const exemplo4 = {
    user: {
        name: "João",
        hobbies: ["programar", "ler", "jogar"]
    }
};
console.log('Entrada:', exemplo4);
console.log('Saída:', flattenObject(exemplo4));

// Exporta a função para uso em outros módulos (opcional)
// module.exports = flattenObject;