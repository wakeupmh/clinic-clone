## Desenvolvimento local
A aplicação foi criada baseada em container, por isso é necessário a instalação do *Docker* e do **docker-compose** para a utilização do mesmo pelo comando:

```bash
  docker-compose up --build
```
### Documentação:
https://app.swaggerhub.com/apis/devopmh/iClinic/1.0.0

## Tracing
Para visualizar o rastreamento da aplicação basta após o passo anterior ter sido executado, abrir o http://localhost:5601 e visualizar os mesmos dispostos no **Kibana**.

## Contribuindo

- O projeto faz uso do [**commitlint**](https://github.com/conventional-changelog/commitlint) em conjunto com [**husky**](https://github.com/typicode/husky) e [**commmitizen**](https://github.com/commitizen/cz-cli).
- Caso já esteja familiarizado com a convenção de commits do [**Angular**](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines), faça seu commit de forma convencional e não terá problemas, de toda forma, segue abaixo um roteiro básico para um commit seguindo as convenções:

1. `git add .`
2. `yarn cz`
3. Escolha o tipo dentre os disponíveis na convenção e expostos no terminal. e.g. _docs_
4. Diga o escopo que está sendo modificado. e.g. _project_
5. Escreva sua mensagem de commit de forma imperativa e curta. e.g. _add commitlint and git-cz to the project_

- As demais escolhas são opcionais.

# Misc
Sobre o framework utilizado para injeção de dependência **expres-decorator-router** e abstração do
arquivo de rotas este é um [artigo](https://dev.to/wakeupmh/decouple-your-express-applications-using-the-amazing-express-decorator-router-35p2) que falo um pouco sobre o beneficio do mesmo e um detalhe legal é que este esta listado no [awesome-express](https://github.com/rajikaimal/awesome-express) na categoria de **middleware**.
