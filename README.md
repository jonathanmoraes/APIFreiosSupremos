
# API Freios Supremos 

Esta é uma API RESTful que permite gerenciar usuários, empresas, unidades e ativos. Ela permite que os usuários realizem operações básicas de CRUD (criação, leitura, atualização e exclusão) em cada uma dessas entidades.



## EndPoints
```http
  API apifreiossupremos-production.up.railway.app
```


### Users

```http
  GET /api/user
```
Retorna uma lista de todos os usuários cadastrados.

```http
  GET /api/user/{id}
```
Retorna informações detalhadas sobre um usuário específico.

```http
  POST /api/user/{id}
```
Cria um novo usuário com as informações fornecidas no corpo da requisição.

```http
  PUT /api/user/{id}
```
Atualiza as informações de um usuário específico com as informações fornecidas no corpo da requisição.

```http
  DELETE /api/user/{id}
```
Remove um usuário específico do sistema.

### Companies

```http
  GET /api/company
```
Retorna uma lista de todas as empresas cadastradas.

```http
  GET /api/company/{id}
```
Retorna informações detalhadas sobre uma empresa específica.

```http
  POST /api/company/{id}
```
Cria uma nova empresa com as informações fornecidas no corpo da requisição.

```http
  PUT /api/company/{id}
```
Atualiza as informações de uma empresa específica com as informações fornecidas no corpo da requisição.

```http
  DELETE /api/company/{id}
```
Remove uma empresa específica do sistema.

### Units

```http
  GET /api/unit
```
Retorna uma lista de todas as unidades cadastradas.

```http
  GET /api/unit/{id}
```
Retorna informações detalhadas sobre uma unidade específica.

```http
  POST /api/unit/{id}
```
Cria uma nova unidade com as informações fornecidas no corpo da requisição.

```http
  PUT /api/unit/{id}
```
Atualiza as informações de uma unidade específica com as informações fornecidas no corpo da requisição.

```http
  DELETE /api/unit/{id}
```
Remove uma unidade específica do sistema.

### Assets

```http
  GET /api/asset
```
Retorna uma lista de todas os ativos cadastrados.

```http
  GET /api/asset/{id}
```
Retorna informações detalhadas sobre um ativo específico.

```http
  POST /api/asset/{id}
```
Cria um novo ativo com as informações fornecidas no corpo da requisição.

```http
  PUT /api/asset/{id}
```
Atualiza as informações de um ativo específico com as informações fornecidas no corpo da requisição.

```http
  DELETE /api/asset/{id}
```
Remove um ativo específico do sistema.


## Exemplos de requisições
## Companies
```http
  POST or PUT /api/company
```

```javascript
{
  "name": "Empresa Exemplo"
}
```
## Users
```http
  POST or PUT /api/user
```

```javascript
{
  "name": "Usuario Exemplo",
  "companyId":"641f05e29fc79b3d66732f3b"
}
```
## Units
```http
  POST or PUT /api/unit
```

```javascript
{
  "name": "Unidade Exemplo",
  "companyId":"641f05e29fc79b3d66732f3b"
}
```
## Assets
```http
  POST or PUT /api/asset
```

```javascript
{
  "img": "https://example.com/image.jpg",
  "name": "Produto Exemplo",
  "description": "Este produto é um exemplo",
  "model": "Exemplar",
  "owner": "José",
  "status": "Alerting",
  "healthLevel": 90,
  "unitId": "641f06d122801f2112098dd9"
}
```



