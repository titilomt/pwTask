CREATE TABLE `usuario` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`nome` varchar(50) NOT NULL,
`email` varchar(50) NOT NULL,
`senha` varchar(50) NOT NULL,
`chave` varchar(22) DEFAULT NULL,
`expiracao` timestamp NULL DEFAULT NULL,
`token` longtext DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `amigos` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`id_usuario_A` int(11) NOT NULL,
`id_usuario_B` int(11) NOT NULL,
`ativo` boolean NULL DEFAULT false,
`data_criacao` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`id_usuario_A`) REFERENCES `usuario` (`id`),
FOREIGN KEY (`id_usuario_B`) REFERENCES `usuario` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


CREATE TABLE `direct_message` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `id_amigos` int(11) NOT NULL,
    `chat_name` varchar(50) NOT NULL DEFAULT "Private Message",
    `text` varchar(255),
    `date_message` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_amigos`) REFERENCES `amigos` (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `post` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `id_owner` int(11) NOT NULL,
    `nome` varchar(50) NOT NULL,
    `date_post` timestamp NULL DEFAULT NULL,
    `text` longtext,
    `img` blob NULL DEFAULT NULL,
    `privacidade` int(5),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_owner`) REFERENCES `usuario` (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `post_grupo` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `id_owner` int(11) NOT NULL,
	`id_grupo` int(11) NOT NULL,
    `nome` varchar(50) NOT NULL,
    `date_post` timestamp NULL DEFAULT NULL,
    `text` longtext,
    `img` blob NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_owner`) REFERENCES `usuario` (`id`),
    FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `grupo` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `nome` varchar(50) NOT NULL,
    `date_grupo` timestamp NULL DEFAULT NULL,
    `img` blob NULL DEFAULT NULL,
    `privacidade` int(5),
    PRIMARY KEY (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `lista_grupo` (
    `id_usuario` int(11) NOT NULL,
	`id_grupo` int(11) NOT NULL,
    `permissao` int(5) NOT NULL DEFAULT 3,
    PRIMARY KEY (`id_grupo`, `id_usuario`)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


CREATE TABLE `profile` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `id_owner` int(11) NOT NULL,	
    `nickname` varchar(50),
    `dt_nascimento` timestamp NULL DEFAULT NULL,
    `escolaridade` varchar(50),
    `relacionamento_status` varchar(50),
    `background_img` blob NULL DEFAULT NULL,
    `profile_img` blob NULL DEFAULT NULL,
    `privacidade` int(5),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_owner`) REFERENCES `usuario` (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;