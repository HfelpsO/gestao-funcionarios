// Exercício 1 - Cadastro e listagem de funcionários

const funcionarios = []; // array de objetos da classe Funcionario

const formatarMoeda = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function cadastrar() {
  const nome = document.getElementById('nome').value.trim();
  const idade = document.getElementById('idade').value;
  const cargo = document.getElementById('cargo').value.trim();
  const salario = document.getElementById('salario').value;

  if (nome === '' || cargo === '') {
    alert('Preencha nome e cargo.');
    return;
  }
  if (idade === '' || Number(idade) <= 0) {
    alert('Informe uma idade válida.');
    return;
  }
  if (salario === '' || Number(salario) < 0) {
    alert('Informe um salário válido.');
    return;
  }

  const funcionario = new Funcionario(nome, Number(idade), cargo, Number(salario));
  funcionarios.push(funcionario);

  document.getElementById('form-funcionario').reset();
  renderizar();
}

function criarCelula(texto) {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
}

function renderizar() {
  const tbody = document.getElementById('tabela-funcionarios');
  const lista = document.getElementById('lista-tostring');
  tbody.innerHTML = '';
  lista.innerHTML = '';

  funcionarios.forEach(function (f) {
    const tr = document.createElement('tr');
    tr.appendChild(criarCelula(f.id));
    tr.appendChild(criarCelula(f.nome));
    tr.appendChild(criarCelula(f.idade));
    tr.appendChild(criarCelula(f.cargo));
    tr.appendChild(criarCelula(formatarMoeda(f.salario)));
    tbody.appendChild(tr);

    const li = document.createElement('li');
    li.textContent = f.toString();
    lista.appendChild(li);
  });
}

renderizar();
