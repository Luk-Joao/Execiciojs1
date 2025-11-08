// ========================================
// FLATTEN PROFUNDO - Várias Implementações
// ========================================

// 1️⃣ MÉTODO RECURSIVO (Mais comum e legível)
function flatten(array) {
    const result = [];
    
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            // Se for array, chama recursivamente e adiciona os elementos
            result.push(...flatten(array[i]));
        } else {
            // Se não for array, adiciona diretamente
            result.push(array[i]);
        }
    }
    
    return result;
}

// 2️⃣ MÉTODO COM REDUCE (Mais conciso)
function flattenReduce(array) {
    return array.reduce((acc, item) => {
        return acc.concat(Array.isArray(item) ? flattenReduce(item) : item);
    }, []);
}

// 3️⃣ MÉTODO ITERATIVO COM PILHA (Sem recursão)
function flattenIterative(array) {
    const stack = [...array];
    const result = [];
    
    while (stack.length) {
        const item = stack.pop();
        
        if (Array.isArray(item)) {
            // Se for array, adiciona todos os elementos de volta na pilha
            stack.push(...item);
        } else {
            // Se não for array, adiciona no início do resultado
            result.unshift(item);
        }
    }
    
    return result;
}

// 4️⃣ MÉTODO COM FLAT (ES2019 - Nativo do JavaScript)
function flattenNative(array) {
    return array.flat(Infinity);
}

// 5️⃣ MÉTODO COM TOSTRING (Truque criativo, mas limitado)
function flattenToString(array) {
    // ⚠️ Só funciona com números! Converte para string e de volta
    return array.toString().split(',').map(Number);
}


// ========================================
// TESTES E EXEMPLOS
// ========================================

console.log('=== FLATTEN PROFUNDO - TESTES ===\n');

// Teste 1: Array simples aninhado
const test1 = [1, [2, [3, [4]]]];
console.log('Teste 1: [1, [2, [3, [4]]]]');
console.log('Resultado:', flatten(test1));
console.log('Esperado: [1, 2, 3, 4]\n');

// Teste 2: Array com múltiplos níveis
const test2 = [1, [2, 3], [4, [5, 6]], 7];
console.log('Teste 2: [1, [2, 3], [4, [5, 6]], 7]');
console.log('Resultado:', flatten(test2));
console.log('Esperado: [1, 2, 3, 4, 5, 6, 7]\n');

// Teste 3: Array profundamente aninhado
const test3 = [[[[1]]], [2, [3]], 4];
console.log('Teste 3: [[[[1]]], [2, [3]], 4]');
console.log('Resultado:', flatten(test3));
console.log('Esperado: [1, 2, 3, 4]\n');

// Teste 4: Array com valores mistos
const test4 = [1, [2, [3, ['a', 'b']]], 'c', [4, [5]]];
console.log('Teste 4: [1, [2, [3, ["a", "b"]]], "c", [4, [5]]]');
console.log('Resultado:', flatten(test4));
console.log('Esperado: [1, 2, 3, "a", "b", "c", 4, 5]\n');

// Teste 5: Array vazio
const test5 = [[], [[]], [[[]], []]];
console.log('Teste 5: [[], [[]], [[[]], []]]');
console.log('Resultado:', flatten(test5));
console.log('Esperado: []\n');

console.log('=== COMPARAÇÃO DE MÉTODOS ===\n');

const complexArray = [1, [2, [3, [4, [5]]]], 6, [7, 8], [[9]], 10];

console.log('Array original:', JSON.stringify(complexArray));
console.log('\n1. Recursivo:', flatten(complexArray));
console.log('2. Reduce:', flattenReduce(complexArray));
console.log('3. Iterativo:', flattenIterative(complexArray));
console.log('4. Native flat():', flattenNative(complexArray));
console.log('5. ToString (apenas números):', flattenToString([1, [2, [3, [4]]]]));


// ========================================
// BENCHMARK SIMPLES
// ========================================

console.log('\n=== PERFORMANCE (array grande) ===\n');

const bigArray = Array(1000).fill([1, [2, [3, [4, [5]]]]]);

console.time('Recursivo');
flatten(bigArray);
console.timeEnd('Recursivo');

console.time('Reduce');
flattenReduce(bigArray);
console.timeEnd('Reduce');

console.time('Iterativo');
flattenIterative(bigArray);
console.timeEnd('Iterativo');

console.time('Native flat()');
flattenNative(bigArray);
console.timeEnd('Native flat()');


// ========================================
// CASOS DE USO PRÁTICOS
// ========================================

console.log('\n=== CASOS DE USO PRÁTICOS ===\n');

// Exemplo 1: Achatar estrutura de menus
const menuStructure = [
    { id: 1, nome: 'Home' },
    {
        id: 2,
        nome: 'Produtos',
        submenus: [
            { id: 3, nome: 'Eletrônicos' },
            { id: 4, nome: 'Roupas' }
        ]
    }
];

console.log('1. Menu estruturado (exemplo conceitual)');
console.log(JSON.stringify(menuStructure, null, 2));

// Exemplo 2: Processar dados aninhados de API
const apiResponse = [
    [{ user: 'Ana', tags: ['admin', 'user'] }],
    [[{ user: 'Carlos', tags: ['user'] }]],
    { user: 'Beatriz', tags: ['moderator'] }
];

console.log('\n2. Response de API com níveis inconsistentes:');
console.log('Original:', JSON.stringify(apiResponse));
console.log('Achatado:', flatten(apiResponse));


// ========================================
// EXPLICAÇÃO PASSO A PASSO
// ========================================

console.log('\n=== COMO FUNCIONA (RECURSIVO) ===\n');

function flattenExplicado(array, level = 0) {
    const indent = '  '.repeat(level);
    console.log(`${indent}Processando: [${array}]`);
    
    const result = [];
    
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            console.log(`${indent}  → Item ${i} é array, chamando recursão...`);
            result.push(...flattenExplicado(array[i], level + 1));
        } else {
            console.log(`${indent}  → Item ${i} = ${array[i]} (adicionando)`);
            result.push(array[i]);
        }
    }
    
    console.log(`${indent}Retornando: [${result}]`);
    return result;
}

console.log('Exemplo: [1, [2, [3]]]\n');
flattenExplicado([1, [2, [3]]]);


// ========================================
// EXPORTAR PARA USO
// ========================================

// Se estiver usando em Node.js ou módulos ES6:
// export { flatten, flattenReduce, flattenIterative, flattenNative };

// Para usar no navegador globalmente:
if (typeof window !== 'undefined') {
    window.flatten = flatten;
}

console.log('\n✅ Todas as implementações estão prontas para uso!');
console.log('💡 A função flatten() está disponível globalmente.');