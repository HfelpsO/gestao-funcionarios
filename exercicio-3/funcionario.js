// Classe Funcionario: atributos, construtor, get/set e toString

class Funcionario {
  static proximoId = 1;

  constructor(nome, idade, cargo, salario) {
    this._id = Funcionario.proximoId++;
    this._nome = nome;
    this._idade = idade;
    this._cargo = cargo;
    this._salario = salario;
  }

  get id() { return this._id; }

  get nome() { return this._nome; }
  set nome(valor) { this._nome = valor; }

  get idade() { return this._idade; }
  set idade(valor) { this._idade = valor; }

  get cargo() { return this._cargo; }
  set cargo(valor) { this._cargo = valor; }

  get salario() { return this._salario; }
  set salario(valor) { this._salario = valor; }

  toString() {
    const salarioFormatado = this._salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return `#${this._id} - ${this._nome}, ${this._idade} anos, ${this._cargo}, ${salarioFormatado}`;
  }
}
