// Função que executa promises em sequência (uma após a outra)
async function executePromiseQueue(promiseFunctions) {
    const results = [];
    
    for (const fn of promiseFunctions) {
        console.log('Executando próxima promise...');
        const result = await fn();
        results.push(result);
        console.log('Resultado:', result);
    }
    
    return results;
}

// Versão alternativa usando reduce
async function executePromiseQueueReduce(promiseFunctions) {
    return promiseFunctions.reduce(async (previousPromise, currentFn) => {
        const results = await previousPromise;
        console.log('Executando próxima promise...');
        const result = await currentFn();
        console.log('Resultado:', result);
        return [...results, result];
    }, Promise.resolve([]));
}

// ============================================
// EXEMPLOS DE USO
// ============================================

console.log('=== Exemplo 1: Fila Simples ===\n');

async function exemplo1() {
    const f1 = () => new Promise(resolve => {
        console.log('🔄 Iniciando primeira promise...');
        setTimeout(() => resolve("Primeira"), 1000);
    });
    
    const f2 = () => new Promise(resolve => {
        console.log('🔄 Iniciando segunda promise...');
        setTimeout(() => resolve("Segunda"), 500);
    });
    
    const f3 = () => new Promise(resolve => {
        console.log('🔄 Iniciando terceira promise...');
        setTimeout(() => resolve("Terceira"), 800);
    });
    
    const inicio = Date.now();
    const resultados = await executePromiseQueue([f1, f2, f3]);
    const tempo = Date.now() - inicio;
    
    console.log('\n✅ Todos os resultados:', resultados);
    console.log(`⏱️  Tempo total: ${tempo}ms (aproximadamente 2300ms)`);
}

console.log('=== Exemplo 2: Simulando Requisições API ===\n');

async function exemplo2() {
    const buscarUsuario = (id) => () => new Promise(resolve => {
        console.log(`📡 Buscando usuário ${id}...`);
        setTimeout(() => resolve({ id, nome: `Usuário ${id}` }), 1000);
    });
    
    const buscarPosts = (userId) => () => new Promise(resolve => {
        console.log(`📡 Buscando posts do usuário ${userId}...`);
        setTimeout(() => resolve([
            { id: 1, texto: 'Post 1' },
            { id: 2, texto: 'Post 2' }
        ]), 800);
    });
    
    const buscarComentarios = (postId) => () => new Promise(resolve => {
        console.log(`📡 Buscando comentários do post ${postId}...`);
        setTimeout(() => resolve(['Comentário 1', 'Comentário 2']), 600);
    });
    
    const resultados = await executePromiseQueue([
        buscarUsuario(1),
        buscarPosts(1),
        buscarComentarios(1)
    ]);
    
    console.log('\n✅ Pipeline completo:', resultados);
}

console.log('=== Exemplo 3: Processamento de Dados ===\n');

async function exemplo3() {
    let dados = { valor: 10 };
    
    const etapa1 = () => new Promise(resolve => {
        console.log('🔧 Etapa 1: Multiplicando por 2...');
        setTimeout(() => {
            dados.valor *= 2;
            resolve(dados);
        }, 500);
    });
    
    const etapa2 = () => new Promise(resolve => {
        console.log('🔧 Etapa 2: Somando 5...');
        setTimeout(() => {
            dados.valor += 5;
            resolve(dados);
        }, 500);
    });
    
    const etapa3 = () => new Promise(resolve => {
        console.log('🔧 Etapa 3: Dividindo por 5...');
        setTimeout(() => {
            dados.valor /= 5;
            resolve(dados);
        }, 500);
    });
    
    await executePromiseQueue([etapa1, etapa2, etapa3]);
    
    console.log('\n✅ Valor final:', dados.valor); // (10 * 2 + 5) / 5 = 5
}

console.log('=== Exemplo 4: Com Tratamento de Erros ===\n');

async function exemplo4() {
    const promiseOk = () => new Promise(resolve => {
        setTimeout(() => resolve("Sucesso 1"), 500);
    });
    
    const promiseErro = () => new Promise((resolve, reject) => {
        setTimeout(() => reject("❌ Erro simulado!"), 300);
    });
    
    const promiseOk2 = () => new Promise(resolve => {
        setTimeout(() => resolve("Sucesso 2"), 500);
    });
    
    try {
        await executePromiseQueue([promiseOk, promiseErro, promiseOk2]);
    } catch (error) {
        console.log('\n⚠️  Erro capturado:', error);
        console.log('A fila foi interrompida no primeiro erro');
    }
}

// ============================================
// EXECUTANDO OS EXEMPLOS
// ============================================

(async () => {
    await exemplo1();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await exemplo2();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await exemplo3();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await exemplo4();
})();