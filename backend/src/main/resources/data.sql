-- Inserir materiais de exemplo
INSERT INTO materiais (descricao, QT_PORCAO, VL_PORCAO, TP_UNIDADE_MEDIDA) VALUES
('Farinha de Trigo', '1000', '5.80', 'G'),
('Açúcar', '1000', '3.99','G'),
('Chocolate em Pó', '1000', '48.70','G'),
('Ovos', '1', '0.60','U'),
('Manteiga', '1000','23.50', 'G'),
('Leite em Pó', '1000', '31.7','G'),
('Fermento Biológico', '100', '9.50', 'G');

-- INSERT INTO materiais (nome, descricao, categoria, unidade, preco_unitario, fornecedor, estoque_atual, estoque_minimo) VALUES
-- ('Farinha de Trigo', 'Farinha de trigo tipo 1', 'Farinhas', 'G', 4.50, 'Distribuidora Central', 25.5, 10.0),
-- ('Açúcar Refinado', 'Açúcar branco refinado', 'Açúcares', 'G', 3.80, 'Distribuidora Central', 15.0, 8.0),
-- ('Chocolate em Pó', 'Chocolate em pó 50% cacau', 'Chocolates', 'G', 25.00, 'Cacau Brasil', 2.5, 5.0),
-- ('Ovos', 'Ovos de galinha caipira', 'Ovos', 'dúzia', 8.50, 'Granja São João', 0, 5),
-- ('Manteiga', 'Manteiga sem sal', 'Laticínios', 'G', 18.00, 'Laticínios Silva', 3.0, 2.0),
-- ('Leite', 'Leite integral', 'Laticínios', 'L', 4.20, 'Laticínios Silva', 10.0, 5.0),
-- ('Fermento Biológico', 'Fermento biológico fresco', 'Fermentos', 'g', 0.15, 'Distribuidora Central', 500.0, 200.0),
-- ('Baunilha', 'Extrato de baunilha', 'Essências', 'ml', 0.08, 'Essências Gourmet', 1000.0, 300.0);

-- Inserir receitas de exemplo
INSERT INTO receitas ( descricao, data_criacao) VALUES
('Bolo de Chocolate', '2024-01-15'),
('Torta de Maçã', '2024-01-20'),
('Pão de Queijo', '2024-01-25'),
('Brigadeiro', '2024-01-30');

-- Inserir materiais das receitas
INSERT INTO receita_materiais (receita_id, material_id, quantidade, unidade) VALUES
(1, 1, 2.0, 'G'),
(1, 2, 1.5, 'G'),
(1, 3, 0.5, 'G'),
(1, 4, 3.0, 'U'),
(1, 5, 0.2, 'G'),
(1, 6, 1.0, 'L'),
(1, 7, 20.0, 'G'),
(2, 1, 1.0, 'G'),
(2, 2, 0.5, 'G'),
(2, 4, 2.0, 'U'),
(2, 5, 0.1, 'G'),
(3, 1, 0.5, 'G'),
(3, 4, 1.0, 'U'),
(3, 5, 0.1, 'G'),
(3, 6, 0.5, 'L'),
(3, 7, 10.0, 'G'),
(4, 2, 0.4, 'G'),
(4, 3, 0.1, 'G'),
(4, 5, 0.05, 'G'); 