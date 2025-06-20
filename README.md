# 🍕 Foods Delivery

Um aplicativo moderno de delivery de comida construído com Next.js, TypeScript e Prisma. Permite aos usuários navegar por restaurantes, visualizar produtos, gerenciar carrinho de compras e fazer pedidos.

## ✨ Funcionalidades

- 🏪 **Navegação por Restaurantes**: Explore diversos restaurantes e suas especialidades
- 🍔 **Catálogo de Produtos**: Visualize produtos com imagens, preços e descontos
- 🛒 **Carrinho de Compras**: Adicione, remova e gerencie itens no carrinho
- 📱 **Design Responsivo**: Interface otimizada para desktop e mobile
- 🎯 **Categorias**: Filtre produtos por categorias
- 💰 **Sistema de Descontos**: Produtos com descontos e promoções
- 📋 **Histórico de Pedidos**: Acompanhe seus pedidos anteriores
- 🎨 **UI Moderna**: Interface limpa e intuitiva

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Banco de Dados**: Prisma ORM
- **UI Components**: Radix UI, Shadcn/ui
- **Gerenciamento de Estado**: Context API / Zustand
- **Estilização**: Tailwind CSS

## 📁 Estrutura do Projeto

```
app/
├── _components/           # Componentes globais
│   ├── ui/               # Componentes de UI base
│   ├── cart-item.tsx     # Item do carrinho
│   ├── category-item.tsx # Item de categoria
│   ├── discount-badge.tsx# Badge de desconto
│   ├── products-list.tsx # Lista de produtos
│   ├── promo-banner.tsx  # Banner promocional
│   └── restaurant-item.tsx# Item de restaurante
├── _helpers/             # Funções utilitárias
│   └── price.ts          # Cálculos de preço
├── my-orders/            # Página de pedidos
│   └── _components/
│       └── order-item.tsx
├── product/[id]/         # Página do produto
│   └── _components/
│       ├── product-details.tsx
│       └── product-image.tsx
└── restaurant/[id]/      # Página do restaurante
    └── _components/
        ├── cart-banner.tsx
        └── restaurant-image.tsx
```

## 🛠️ Instalação e Configuração

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/foods-delivery.git
cd foods-delivery
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

4. **Configure o banco de dados**
```bash
npx prisma generate
npx prisma db push
```

5. **Execute o projeto**
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## 🗃️ Banco de Dados

O projeto utiliza Prisma como ORM com os seguintes modelos principais:

- **Restaurant**: Informações dos restaurantes
- **Product**: Produtos disponíveis
- **Category**: Categorias de produtos
- **Order**: Pedidos realizados
- **OrderProduct**: Relação entre pedidos e produtos

## 🎨 Componentes Principais

### ProductImage
Componente para exibir imagens de produtos com otimização.

### ProductDetails
Exibe informações detalhadas do produto incluindo preço, desconto e produtos complementares.

### CartBanner
Banner do carrinho de compras com informações do restaurante.

### DiscountBadge
Badge que exibe a porcentagem de desconto dos produtos.

## 💰 Sistema de Preços

O sistema calcula automaticamente preços com desconto:

```typescript
// Exemplo de cálculo de preço
const finalPrice = calculateProductTotalPrice(product);
```

## 📱 Responsividade

O projeto é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:
- Mobile First Design
- Breakpoints otimizados
- Interface touch-friendly

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ por Alexandra

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
