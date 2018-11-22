# pwTask
My first job with nodejs!!!

Este projeto é uma Restful-API desenvolvida em node para criar o que seria o básico de uma rede social.

## Execução

<ul>        
<li>git clone</li> 
<li>cd pwTask/</li> 
<li>npm install </li>
<li>npm start </li>
</ul>

## Endpoints

Rotas que precisam de um nivel de autenticação estão protegidas por um token que deve ser gerado pelo usuario ao cadastrar e ou logar na API

<ul>        
<li>
    <code>user</code>: (POST, PUT, DELETE) CRUD de usuarios de uma rede social exemplo de rota POST <code>{{URL}}/user/login</code>:<br><code>
      [
        {
           email: "a@a.com", 
           senha: "oioioi"
        }
      ]
    </code>
</li> 
<li><code>friends</code>: (POST, PUT, DELETE) CRUD de amigos de uma rede social exemplo de rota GET <code>{{URL}}/friends/</code>:<br><code>
      [
        {
           user_id: "3"
        }
      ]
    </code></li> 
<li><code>post</code>: (POST, PUT, DELETE) CRUD de post de uma rede social exemplo de rota POST <code>{{URL}}/post/</code>:<br><code>
      [
        {
           owner_id: "3",
           nome: "Ferdinando",
           date: "2016-09-22T13:57:31.2311892-04:00",
           text: "Olá mundo!",
           img: "base64",
           visualizacao: "1" // 1 - publico; 2 - privado; 3 - somente amigos...
        }
      ]
    </code></li>
<li><code>grupo</code>: (POST, PUT, DELETE) CRUD de grupo de uma rede social exemplo de rota POST <code>{{URL}}/grupo/login</code>:<br><code>
      [
        {
           email: "a@a.com", 
           senha: "oioioi"
        }
      ]
    </code></li>
<li><code>profile</code>: (POST, PUT, DELETE) CRUD de profile de uma rede social exemplo de rota POST <code>{{URL}}/profile/login</code>:<br><code>
      [
        {
           email: "a@a.com", 
           senha: "oioioi"
        }
      ]
    </code></li>
</ul>

## Versões utilizadas

<ul>        
<li>Nodejs v10.10.0</li> 
<li>npm v6.4.1</li> 
<li>Dependências externas listadas em <code>package.json</code></li>
<li>npm start </li>
</ul>
