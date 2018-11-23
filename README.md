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

Rotas que precisam de um nivel de autenticação estão protegidas por um token que deve ser gerado pelo usuario ao 
cadastrar e ou logar na API então enviadas no HEADER da requisição.

*Tipo de privacidade => 1 - publico; 2 - privado; 3 - somente amigos...

<ul>        
<li>
    <code>user</code>: (POST, PUT, DELETE) CRUD de usuarios de uma rede social exemplo de rota POST <code>{{URL}}/user/login</code>:<br><pre><code>
      [
        {
           email: "a@a.com", 
           senha: "oioioi"
        }
      ]
    </code></pre>
</li> 
<li><code>friends</code>: (POST, PUT, DELETE) CRUD de amigos de uma rede social exemplo de rota GET <code>{{URL}}/friends/findFriend</code>:<br><pre><code>
      [
        {
           nome: "Arn" // Campo de autocomplete
        }
      ]
    </code></pre></li> 
<li><code>post</code>: (POST, PUT, DELETE) CRUD de post de uma rede social exemplo de rota POST <code>{{URL}}/post/</code>:<br><pre><code>
      [
        {
           owner_id: "3",
           nome: "Ferdinando",
           date: "2016-09-22T13:57:31.2311892-04:00",
           text: "Olá mundo!",
           img: "base64",
           privacidade: 1
        }
      ]
    </code></pre></li>
<li><code>grupo</code>: (POST, PUT, DELETE) CRUD de grupo de uma rede social exemplo de rota POST <code>{{URL}}/grupo/login</code>:<br><pre><code>
      [
        {
           email: "a@a.com", 
           senha: "oioioi"
        }
      ]
    </code></pre></li>
<li><code>profile</code>: (POST, PUT, DELETE) CRUD de profile de uma rede social exemplo de rota POST <code>{{URL}}/profile/createProfile</code>:<br><pre><code>
      [
        {
            id_owner: 3,
            nome: "Arnaldo",
            dt_nascimento: null,
            escolaridade: null,
            relacionamento_status: "solteiro",
            background_img: "base64",
            perfil_img: "base64",
            privacidade: 3
        }
      ]
    </code></pre></li>
    <li><code>direct</code>: (POST, PUT, DELETE) Usuários podem mandar menssagens uns para os outros POST <code>{{URL}}/friends/directMessage</code>:<br><pre><code>
      [
        {
           id_amigo: 2,
           nome: "Arnaldo",
           text: "Olá meu amigo"
        }
      ]
    </code></pre></li>
    <li><code>post_grupo</code>: (POST, PUT, DELETE) CRUD de posts em grupos de usuários POST <code>{{URL}}/grupostGrupo/</code>:<br><pre><code>
      [
        {
            owner_id: 2,
            grupo_id: 3,
            nome: "Arnaldo",
            text: "Post de arnaldo ...",
            img: "base64"
        }
      ]
    </code></pre></li>
</ul>

## Versões utilizadas

<ul>        
<li>Nodejs v10.10.0</li> 
<li>npm v6.4.1</li> 
<li>Dependências externas listadas em <code>package.json</code></li>
<li>npm start </li>
</ul>
