-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17/06/2026 às 19:04
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `contratempo`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `convidados`
--

CREATE TABLE `convidados` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `sobrenome` varchar(100) NOT NULL,
  `cpf` varchar(100) NOT NULL,
  `telefone` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `mesa` int(11) DEFAULT NULL,
  `presente` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `convidados`
--

INSERT INTO `convidados` (`id`, `nome`, `sobrenome`, `cpf`, `telefone`, `email`, `mesa`, `presente`) VALUES
(13, 'Joao', 'Vinicius', '231.232.131-31', '(21) 31231-2312', 'vinicios@gmail.com', 1, 1),
(14, 'Ruan', 'Estevon', '546.546.546-54', '(49) 84654-9864', 'estevon@gmail.com', 6, 0),
(15, 'CLaudio', 'dwadwad', '454.646.465-41', '(65) 41654-1641', 'dmwpojd@gmail.com', 6, 0),
(16, 'Chester', 'Bennington', '465.165.498-51', '(55) 19561-6541', 'linkin@gmail.com', 6, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `mesas`
--

CREATE TABLE `mesas` (
  `id` int(11) NOT NULL,
  `qtd` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `mesas`
--

INSERT INTO `mesas` (`id`, `qtd`, `nome`) VALUES
(1, 10, 'Mesa do meio'),
(2, 10, 'Avós'),
(3, 5, 'Tios'),
(4, 6, 'Madrinhas'),
(6, 3, 'Padrinhos'),
(7, 5, 'Mesa Kids');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `tipo` tinyint(1) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(100) NOT NULL,
  `telefone` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(180) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `tipo`, `nome`, `cpf`, `telefone`, `email`, `senha`) VALUES
(2, 1, 'Pedro Gigi', '500.215.489-51', '(51) 95564-8123', 'PedroAmaJulia@gmail.com', '$2b$10$EXH5mZePVfomh0eFUJbvbeDtejM.TrFT53z5nKxRtpG36NUltibAC'),
(3, 1, 'Adalto Ass', '554.896.248-85', '(51) 94645-5521', 'Adalto@gmail.com', '$2b$10$.tsOH/YSl7IhfyQ8p8xd8umpOZaV/ozErgtplFUgfajJR/2wrFi..'),
(19, 0, 'Joao', '600.374.100-75', '(51) 99682-8000', 'joaosalaberry@gmail.com', '$2b$10$XPMqOvqB3RA4nfdWi/xgd.0vQ290WPm8cG4.nCoDTdyx2jq1MAVYa');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `convidados`
--
ALTER TABLE `convidados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `telefone` (`telefone`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `mesa` (`mesa`);

--
-- Índices de tabela `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `telefone` (`telefone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `convidados`
--
ALTER TABLE `convidados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `mesas`
--
ALTER TABLE `mesas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `convidados`
--
ALTER TABLE `convidados`
  ADD CONSTRAINT `convidados_ibfk_1` FOREIGN KEY (`mesa`) REFERENCES `mesas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
