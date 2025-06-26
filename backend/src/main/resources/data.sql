-- Inserir materiais de exemplo
INSERT INTO materiais (nome, descricao, categoria, unidade, preco_unitario, fornecedor, estoque_atual, estoque_minimo) VALUES
('Farinha de Trigo', 'Farinha de trigo tipo 1', 'Farinhas', 'kg', 4.50, 'Distribuidora Central', 25.5, 10.0),
('Açúcar Refinado', 'Açúcar branco refinado', 'Açúcares', 'kg', 3.80, 'Distribuidora Central', 15.0, 8.0),
('Chocolate em Pó', 'Chocolate em pó 50% cacau', 'Chocolates', 'kg', 25.00, 'Cacau Brasil', 2.5, 5.0),
('Ovos', 'Ovos de galinha caipira', 'Ovos', 'dúzia', 8.50, 'Granja São João', 0, 5),
('Manteiga', 'Manteiga sem sal', 'Laticínios', 'kg', 18.00, 'Laticínios Silva', 3.0, 2.0),
('Leite', 'Leite integral', 'Laticínios', 'L', 4.20, 'Laticínios Silva', 10.0, 5.0),
('Fermento Biológico', 'Fermento biológico fresco', 'Fermentos', 'g', 0.15, 'Distribuidora Central', 500.0, 200.0),
('Baunilha', 'Extrato de baunilha', 'Essências', 'ml', 0.08, 'Essências Gourmet', 1000.0, 300.0);

-- Inserir receitas de exemplo
INSERT INTO receitas (nome, descricao, instrucoes, tempo_preparo, rendimento, data_criacao, visualizacoes) VALUES
('Bolo de Chocolate', 'Delicioso bolo de chocolate com cobertura cremosa', '1. Pré-aqueça o forno a 180°C\n2. Misture os ingredientes secos\n3. Adicione os ingredientes líquidos\n4. Asse por 40 minutos\n5. Deixe esfriar antes de desenformar', 60, '12 fatias', '2024-01-15', 15),
('Torta de Maçã', 'Torta tradicional de maçã com massa crocante', '1. Prepare a massa\n2. Corte as maçãs\n3. Monte a torta\n4. Asse por 45 minutos', 90, '8 porções', '2024-01-20', 8),
('Pão de Queijo', 'Pão de queijo tradicional mineiro', '1. Misture todos os ingredientes\n2. Faça bolinhas\n3. Asse por 20 minutos', 45, '30 unidades', '2024-01-25', 12),
('Brigadeiro', 'Brigadeiro tradicional brasileiro', '1. Misture leite condensado e chocolate\n2. Cozinhe até engrossar\n3. Faça bolinhas', 30, '20 unidades', '2024-01-30', 25);

-- Inserir materiais das receitas
INSERT INTO receita_materiais (receita_id, material_id, quantidade, unidade) VALUES
(1, 1, 2.0, 'kg'),
(1, 2, 1.5, 'kg'),
(1, 3, 0.5, 'kg'),
(1, 4, 3.0, 'dúzia'),
(1, 5, 0.2, 'kg'),
(1, 6, 1.0, 'L'),
(1, 7, 20.0, 'g'),
(1, 8, 10.0, 'ml'),
(2, 1, 1.0, 'kg'),
(2, 2, 0.5, 'kg'),
(2, 4, 2.0, 'dúzia'),
(2, 5, 0.1, 'kg'),
(3, 1, 0.5, 'kg'),
(3, 4, 1.0, 'dúzia'),
(3, 5, 0.1, 'kg'),
(3, 6, 0.5, 'L'),
(3, 7, 10.0, 'g'),
(4, 2, 0.4, 'kg'),
(4, 3, 0.1, 'kg'),
(4, 5, 0.05, 'kg'); 