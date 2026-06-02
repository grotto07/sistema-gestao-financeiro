# FinanSmart

Controle financeiro pessoal e empresarial com dashboard, graficos, relatorios, metas, carteiras e persistencia em LocalStorage.

## Como rodar

```bash
npm install
npm run dev
```

Depois abra a URL exibida pelo Vite no navegador.

## Supabase

1. Copie `.env.example` para `.env`.
2. No Supabase, abra `SQL Editor`.
3. Execute os arquivos nesta ordem: `supabase/01_schema.sql`, `supabase/02_security.sql`, `supabase/03_functions_seed.sql`.
4. Se preferir tentar tudo de uma vez, use `supabase/schema.sql`.
5. Ative um provedor em `Authentication` para usar as politicas RLS por usuario.
6. Depois que um usuario estiver logado, chame a RPC `seed_finansmart_example_data` para popular dados de exemplo desse usuario.

O app ainda usa LocalStorage como fonte principal, mas ja tem o client em `src/lib/supabase.ts` e o banco esta modelado para a futura integracao.

## O que foi criado

- Dashboard com saldo, receitas, despesas, economia, alertas inteligentes e graficos.
- Cadastro, edicao, exclusao, detalhes e filtros de transacoes.
- Categorias de receitas e despesas com cor e icone.
- Relatorio mensal com metricas, maiores despesas e exportacao JSON.
- Metas financeiras com progresso animado e prazo.
- Carteiras com saldo recalculado pelas transacoes.
- Configuracoes com tema claro/escuro, restauracao de dados e limpeza geral.

## Uso basico

1. Na landing page, clique em `Entrar` ou `Criar conta`.
2. Para teste rapido, use usuario `admin` e senha `admin`.
3. Acesse `Transacoes` e clique em `Nova receita` ou `Nova despesa`.
4. Preencha titulo, valor, categoria, forma de pagamento, data, status e recorrencia.
5. Use os filtros por mes, tipo, categoria e busca por titulo.
6. Acesse `Relatorios` para selecionar mes/ano e exportar o resumo.
7. Acesse `Configuracoes` para editar perfil, restaurar dados de exemplo ou limpar o workspace.

## Login e multi-tenancy

- O app tem landing page, login, cadastro e usuario admin de demonstracao.
- Cada usuario salva os dados em uma chave propria do LocalStorage: `finansmart:data:<userId>`.
- Isso evita que um usuario veja transacoes, metas, carteiras e configuracoes de outro usuario no mesmo navegador.
