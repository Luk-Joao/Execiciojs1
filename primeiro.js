// Função para encontrar os 3 números mais repetidos
function top3MaisRepetidos(array) {
    if (!array || array.length === 0) {
        console.log("Array vazio!");
        return [];
    }

    // Contar a frequência de cada número
    const frequencia = {};
    array.forEach(num => {
        frequencia[num] = (frequencia[num] || 0) + 1;
    });

    // Converter para array de objetos e ordenar por frequência
    const ordenado = Object.entries(frequencia)
        .map(([numero, contagem]) => ({ 
            numero: parseFloat(numero), 
            contagem 
        }))
        .sort((a, b) => b.contagem - a.contagem);

    // Pegar os 3 primeiros
    const top3 = ordenado.slice(0, 3);

    // Exibir resultado formatado no console
    console.log("\n🏆 TOP 3 NÚMEROS MAIS REPETIDOS:");
    console.log("═".repeat(40));
    
    const medalhas = ["🥇", "🥈", "🥉"];
    top3.forEach((item, index) => {
        console.log(`${medalhas[index]} ${index + 1}º lugar: Número ${item.numero} - ${item.contagem}x repetições`);
    });
    
    console.log("═".repeat(40));
    console.log(`Total de números no array: ${array.length}\n`);

    return top3;
}

// Exemplo de uso:
console.log("📊 EXEMPLOS DE USO:");
console.log("─".repeat(40));

// Exemplo 1
console.log("\n📌 Exemplo 1:");
const numeros1 = [1, 2, 3, 1, 2, 1, 4, 5, 2, 1];
console.log("Array:", numeros1);
top3MaisRepetidos(numeros1);

// Exemplo 2
console.log("\n📌 Exemplo 2:");
const numeros2 = [5, 5, 5, 10, 10, 15, 20, 20, 20, 20];
console.log("Array:", numeros2);
top3MaisRepetidos(numeros2);

// Exemplo 3
console.log("\n📌 Exemplo 3:");
const numeros3 = [7, 8, 9, 7, 8, 7];
console.log("Array:", numeros3);
top3MaisRepetidos(numeros3);
