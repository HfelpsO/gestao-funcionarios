// Exercício 3 - Funções anônimas nos eventos e arrow functions (lambda) na manipulação dos dados

let funcionarios = [];
let idEmEdicao = null;
let termoBusca = '';

const campo = (id) => document.getElementById(id);

const formatarMoeda = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// ---------- Arrow functions: busca, remoção e atualização ----------

// Buscar por ID (retorna o funcionário ou undefined)
const buscarPorId = (id) => funcionarios.find((f) => f.id === id);

// Buscar por nome (parcial, sem diferenciar maiúsculas/minúsculas)
const buscarPorNome = (texto) =>
  funcionarios.filter((f) => f.nome.toLowerCase().includes(texto.toLowerCase()));

// Remover por ID
const removerPorId = (id) => {
  funcionarios = funcionarios.filter((f) => f.id !== id);
};

// Atualizar por ID (usa os setters da classe)
const atualizarPorId = (id, dados) => {
  const f = buscarPorId(id);
  f.nome = dados.nome;
  f.idade = dados.idade;
  f.cargo = dados.cargo;
  f.salario = dados.salario;
};

const lerFormulario = () => ({
  nome: campo('nome').value.trim(),
  idade: campo('idade').value,
  cargo: campo('cargo').value.trim(),
  salario: campo('salario').value
});

const validar = (dados) => {
  if (dados.nome === '' || dados.cargo === '') return 'Preencha nome e cargo.';
  if (dados.idade === '' || Number(dados.idade) <= 0) return 'Informe uma idade válida.';
  if (dados.salario === '' || Number(dados.salario) < 0) return 'Informe um salário válido.';
  return null;
};

const sairDoModoEdicao = () => {
  idEmEdicao = null;
  campo('btn-salvar').textContent = 'Cadastrar';
  campo('btn-cancelar').hidden = true;
  campo('form-funcionario').reset();
};

const criarCelula = (texto) => {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
};

// ---------- Renderização ----------
const renderizar = () => {
  const tbody = campo('tabela-funcionarios');
  tbody.innerHTML = '';

  const lista = termoBusca ? buscarPorNome(termoBusca) : funcionarios;

  lista.forEach((f) => {
    const tr = document.createElement('tr');
    tr.appendChild(criarCelula(f.id));
    tr.appendChild(criarCelula(f.nome));
    tr.appendChild(criarCelula(f.idade));
    tr.appendChild(criarCelula(f.cargo));
    tr.appendChild(criarCelula(formatarMoeda(f.salario)));

    const tdAcoes = document.createElement('td');

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    // Função anônima tradicional no evento de clique
    btnEditar.addEventListener('click', function () {
      const alvo = buscarPorId(f.id);
      campo('nome').value = alvo.nome;
      campo('idade').value = alvo.idade;
      campo('cargo').value = alvo.cargo;
      campo('salario').value = alvo.salario;
      idEmEdicao = alvo.id;
      campo('btn-salvar').textContent = 'Salvar alterações';
      campo('btn-cancelar').hidden = false;
    });

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    // A mesma ideia, agora como arrow function
    btnExcluir.addEventListener('click', () => {
      removerPorId(f.id);
      if (idEmEdicao !== null) sairDoModoEdicao();
      renderizar();
    });

    tdAcoes.append(btnEditar, btnExcluir);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
  });
};

// ---------- Eventos ----------
campo('btn-salvar').addEventListener('click', function () {
  const dados = lerFormulario();
  const erro = validar(dados);
  if (erro) {
    alert(erro);
    return;
  }

  const dadosNumericos = {
    nome: dados.nome,
    idade: Number(dados.idade),
    cargo: dados.cargo,
    salario: Number(dados.salario)
  };

  if (idEmEdicao === null) {
    funcionarios.push(
      new Funcionario(dadosNumericos.nome, dadosNumericos.idade, dadosNumericos.cargo, dadosNumericos.salario)
    );
  } else {
    atualizarPorId(idEmEdicao, dadosNumericos);
    sairDoModoEdicao();
  }

  campo('form-funcionario').reset();
  renderizar();
});

campo('btn-cancelar').addEventListener('click', () => sairDoModoEdicao());

campo('btn-buscar').addEventListener('click', () => {
  termoBusca = campo('busca').value.trim();
  renderizar();
});

campo('btn-limpar-busca').addEventListener('click', () => {
  termoBusca = '';
  campo('busca').value = '';
  renderizar();
});

renderizar();
