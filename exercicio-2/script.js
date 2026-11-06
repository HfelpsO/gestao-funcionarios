// Exercício 2 - Excluir e alterar funcionários (onclick com funções anônimas)

const funcionarios = [];
let idEmEdicao = null; // null = modo cadastro; número = id do funcionário sendo editado

const formatarMoeda = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function campo(id) {
  return document.getElementById(id);
}

function lerFormulario() {
  return {
    nome: campo('nome').value.trim(),
    idade: campo('idade').value,
    cargo: campo('cargo').value.trim(),
    salario: campo('salario').value
  };
}

function validar(dados) {
  if (dados.nome === '' || dados.cargo === '') return 'Preencha nome e cargo.';
  if (dados.idade === '' || Number(dados.idade) <= 0) return 'Informe uma idade válida.';
  if (dados.salario === '' || Number(dados.salario) < 0) return 'Informe um salário válido.';
  return null;
}

function buscarPorId(id) {
  return funcionarios.find(function (f) { return f.id === id; });
}

function sairDoModoEdicao() {
  idEmEdicao = null;
  campo('btn-salvar').textContent = 'Cadastrar';
  campo('btn-cancelar').hidden = true;
  campo('form-funcionario').reset();
}

function criarCelula(texto) {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
}

function renderizar() {
  const tbody = campo('tabela-funcionarios');
  tbody.innerHTML = '';

  funcionarios.forEach(function (f) {
    const tr = document.createElement('tr');
    tr.appendChild(criarCelula(f.id));
    tr.appendChild(criarCelula(f.nome));
    tr.appendChild(criarCelula(f.idade));
    tr.appendChild(criarCelula(f.cargo));
    tr.appendChild(criarCelula(formatarMoeda(f.salario)));

    const tdAcoes = document.createElement('td');

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    // Evento onclick com função anônima: carrega os dados no formulário
    btnEditar.onclick = function () {
      campo('nome').value = f.nome;
      campo('idade').value = f.idade;
      campo('cargo').value = f.cargo;
      campo('salario').value = f.salario;
      idEmEdicao = f.id;
      campo('btn-salvar').textContent = 'Salvar alterações';
      campo('btn-cancelar').hidden = false;
    };

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    // Evento onclick com função anônima: remove o funcionário do array
    btnExcluir.onclick = function () {
      const indice = funcionarios.findIndex(function (item) { return item.id === f.id; });
      funcionarios.splice(indice, 1);
      if (idEmEdicao !== null) sairDoModoEdicao();
      renderizar();
    };

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
  });
}

// Cadastrar ou salvar alterações
campo('btn-salvar').onclick = function () {
  const dados = lerFormulario();
  const erro = validar(dados);
  if (erro) {
    alert(erro);
    return;
  }

  if (idEmEdicao === null) {
    funcionarios.push(new Funcionario(dados.nome, Number(dados.idade), dados.cargo, Number(dados.salario)));
  } else {
    // Atualiza os atributos usando os setters da classe
    const f = buscarPorId(idEmEdicao);
    f.nome = dados.nome;
    f.idade = Number(dados.idade);
    f.cargo = dados.cargo;
    f.salario = Number(dados.salario);
    sairDoModoEdicao();
  }

  campo('form-funcionario').reset();
  renderizar();
};

campo('btn-cancelar').onclick = function () {
  sairDoModoEdicao();
};

renderizar();
