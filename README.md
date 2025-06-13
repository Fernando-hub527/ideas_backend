# 💡 App de Ideias

## ✅ Pré-requisitos
- Docker

---

## ▶️ Iniciando a demo
1. Na raiz do projeto, rode:
   ```bash
   docker compose up -d
   ```
2. Acesse em:  
   ```
   http://localhost:5173/
   ```

---

## 🧪 Rodando testes (Backend)
1. Entre na pasta `backend/devEnvironment` e suba os containers:
   ```bash
   cd backend/devEnvironment
   docker compose up -d
   ```
2. Em seguida, na pasta `backend`, execute os testes de integração:
   ```bash
   cd ../
   npm run test
   ```

---

## 🚀 Aplicação
- **Login & Cadastro**  
  Ao acessar a aplicação, faça login ou crie um novo usuário.
- **Tela Inicial**  
  Após autenticar, você verá todas as ideias cadastradas.
- **Filtros Disponíveis**  
  - Por nome  
  - Por data  
  - Por mais votadas
- **Interação**  
  - Curtir  
  - Comentar  
- **Criar Ideias**  
  Use o botão na barra de navegação para submeter suas próprias ideias.

---

## 🔍 Destaques da Implementação

1. **Divisão em camadas** (Controller → Service → Repository)  
   Mantém a simplicidade e a escalabilidade do projeto.

2. **Wrapper de resultados & tratamento de erros**  
   - Encapsula retornos da maioria das funções  
   - Reduz o uso de exceções  
   - Melhora a legibilidade e consistência no fluxo de erros

3. **Uso de DTOs**  
   - Desacopla as entidades do ORM da lógica de negócio  
   - Facilita trocas de banco de dados futuras  
   - Garante transferência de dados segura e clara entre camadas

---

## 📈 Próximas melhorias

- **Teste de carga** integrado ao pipeline de CI, para validar performance em produção  
- **Observabilidade** com ferramenta dedicada (logs, métricas e traces)  
- **Integração contínua** (CI/CD) para deploy automático e feedback rápido  