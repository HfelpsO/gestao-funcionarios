# Sistema de Gestão de Funcionários

Projeto desenvolvido por mim como atividade prática de JavaScript. A ideia é simular um sistema simples, rodando no navegador, para uma startup de tecnologia gerenciar seus funcionários: cadastrar, listar, editar e excluir, além de gerar relatórios com os métodos de array do JavaScript (streams JS).

Dividi o trabalho em quatro exercícios, cada um em uma pasta própria e funcionando de forma independente.

## Tecnologias utilizadas

- HTML5
- JavaScript (puro, sem bibliotecas ou frameworks)
- Docker e Docker Compose (Nginx para servir os arquivos)
- Git e GitHub para versionamento

## Estrutura do projeto

```
gestao-funcionarios/
├── index.html            # menu com links para os exercícios
├── Dockerfile
├── docker-compose.yml
├── exercicio-1/          # formulário, classe Funcionario e tabela
├── exercicio-2/          # excluir e editar funcionários
├── exercicio-3/          # funções anônimas e arrow functions (lambda)
└── exercicio-4/          # relatórios com map, filter, reduce e Set
```

## O que fiz em cada exercício

### Exercício 1 - Cadastro e listagem
Criei um formulário com nome, idade, cargo e salário. Os funcionários são armazenados em um array de objetos da classe `Funcionario`, que tem construtor, métodos de acesso (`get`/`set`) e o método `toString()`. Os dados são exibidos dinamicamente em uma tabela HTML.

### Exercício 2 - Excluir e alterar
Adicionei os botões **Excluir** e **Editar** em cada linha da tabela. Ao clicar em editar, os dados são carregados no formulário, e ao salvar os atributos são atualizados pelos métodos `set` da classe. Usei eventos `onclick` com funções anônimas.

### Exercício 3 - Funções anônimas e expressões lambda
Refatorei os eventos de cadastro, exclusão e edição para usar funções anônimas e reescrevi as funções de busca, remoção e atualização como arrow functions. Também incluí na própria página uma comparação entre uma função anônima tradicional e a arrow function equivalente, além de um campo de busca por nome.

### Exercício 4 - Relatórios
Criei relatórios dinâmicos com `filter`, `map`, `reduce` e `new Set()`:
- funcionários com salário maior que R$ 5.000;
- média salarial;
- cargos únicos (sem repetição);
- lista de nomes em maiúsculo.

Os relatórios se atualizam automaticamente quando os dados mudam.

## Como executar

### Pré-requisitos
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/HfelpsO/gestao-funcionarios.git
   cd gestao-funcionarios
   ```

2. Suba o container:
   ```bash
   docker compose up --build
   ```

3. Abra o navegador em **http://localhost:8081** e escolha o exercício.

4. Para parar o container, use `Ctrl + C` e depois:
   ```bash
   docker compose down
   ```

Também é possível rodar sem o Compose:
```bash
docker build -t gestao-funcionarios .
docker run --rm -p 8081:80 gestao-funcionarios
```

> Durante o desenvolvimento, o projeto é montado como volume no container. Ao alterar um arquivo, basta recarregar a página no navegador (`Ctrl + F5` se o cache atrapalhar).

## Observações

- Os dados ficam armazenados **somente em memória** (em um array), então ao recarregar a página ou fechar o navegador os cadastros são perdidos.

## Autor

Desenvolvido por **HfelpsO** - [github.com/HfelpsO](https://github.com/HfelpsO)
