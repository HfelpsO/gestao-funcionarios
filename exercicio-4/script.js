// Exercício 4 - CRUD + relatórios com filter, map, reduce e new Set()

let funcionarios = [];
let idEmEdicao = null;
let relatorioAtual = null; // relatório aberto, atualizado quando os dados mudam

const campo = (id) => document.getElementById(id);

const formatarMoeda = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// ---------- Manipulação dos dados ----------
const buscarPorId = (id) => funcionarios.find((f) => f.id === id);

const removerPorId = (id) => {
  funcionarios = funcionarios.filter((f) => f.id !== id);
};

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

// ---------- Renderização da tabela ----------
const renderizar = () => {
  const tbody = campo('tabela-funcionarios');
  tbody.innerHTML = '';

  funcionarios.forEach((f) => {
    const tr = document.createElement('tr');
    tr.appendChild(criarCelula(f.id));
    tr.appendChild(criarCelula(f.nome));
    tr.appendChild(criarCelula(f.idade));
    tr.appendChild(criarCelula(f.cargo));
    tr.appendChild(criarCelula(formatarMoeda(f.salario)));

    const tdAcoes = document.createElement('td');

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
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
    btnExcluir.addEventListener('click', () => {
      removerPorId(f.id);
      if (idEmEdicao !== null) sairDoModoEdicao();
      atualizarTela();
    });

    tdAcoes.append(btnEditar, btnExcluir);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
  });
};

// ---------- Relatórios ----------
const mostrarRelatorio = (titulo, linhas) => {
  const area = campo('relatorio');
  area.innerHTML = '';

  const h3 = document.createElement('h3');
  h3.textContent = titulo;

  const ul = document.createElement('ul');
  linhas.forEach((linha) => {
    const li = document.createElement('li');
    li.textContent = linha;
    ul.appendChild(li);
  });

  area.append(h3, ul);
};

const SEM_FUNCIONARIOS = ['Nenhum funcionário cadastrado.'];

// 1) Salário maior que R$ 5.000 (filter + map)
const relatorioSalarioAlto = () => {
  const titulo = 'Funcionários com salário maior que R$ 5.000';
  const lista = funcionarios.filter((f) => f.salario > 5000);
  const linhas = lista.length
    ? lista.map((f) => f.toString())
    : ['Nenhum funcionário com salário acima de R$ 5.000.'];
  mostrarRelatorio(titulo, linhas);
};

// 2) Média salarial (reduce)
const relatorioMediaSalarial = () => {
  const titulo = 'Média salarial';
  if (funcionarios.length === 0) return mostrarRelatorio(titulo, SEM_FUNCIONARIOS);
  const total = funcionarios.reduce((soma, f) => soma + f.salario, 0);
  mostrarRelatorio(titulo, [formatarMoeda(total / funcionarios.length)]);
};

// 3) Cargos únicos (map + new Set)
const relatorioCargosUnicos = () => {
  const titulo = 'Cargos únicos';
  if (funcionarios.length === 0) return mostrarRelatorio(titulo, SEM_FUNCIONARIOS);
  const cargos = [...new Set(funcionarios.map((f) => f.cargo))];
  mostrarRelatorio(titulo, cargos);
};

// 4) Nomes em maiúsculo (map)
const relatorioNomesMaiusculos = () => {
  const titulo = 'Nomes em maiúsculo';
  if (funcionarios.length === 0) return mostrarRelatorio(titulo, SEM_FUNCIONARIOS);
  mostrarRelatorio(titulo, funcionarios.map((f) => f.nome.toUpperCase()));
};

const atualizarTela = () => {
  renderizar();
  if (relatorioAtual) relatorioAtual();
};

const abrirRelatorio = (funcaoRelatorio) => {
  relatorioAtual = funcaoRelatorio;
  funcaoRelatorio();
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
  atualizarTela();
});

campo('btn-cancelar').addEventListener('click', () => sairDoModoEdicao());

campo('btn-salario-alto').addEventListener('click', () => abrirRelatorio(relatorioSalarioAlto));
campo('btn-media-salarial').addEventListener('click', () => abrirRelatorio(relatorioMediaSalarial));
campo('btn-cargos-unicos').addEventListener('click', () => abrirRelatorio(relatorioCargosUnicos));
campo('btn-nomes-maiusculos').addEventListener('click', () => abrirRelatorio(relatorioNomesMaiusculos));

renderizar();
