# TaskFlow

Manage Projects with **Precision.**

TaskFlow is a high-performance, premium task management system engineered for teams that demand excellence. Built with the cutting-edge Next.js 16 architecture, it provides a seamless, glassmorphic experience for tracking complex workflows, managing granular permissions, and visualizing team performance in real-time.

![TaskFlow Hero](./public/hero.png)

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Robust permission system with granular controls for Admins and Members, ensuring secure and organized collaboration.
- **Dynamic Project Ecosystem**: Effortlessly organize tasks into distinct projects with dedicated ownership and milestone tracking.
- **Advanced Task Lifecycle**: Comprehensive management with real-time status updates (TODO, IN PROGRESS, DONE) and automated overdue alerts.
- **Next.js 16 Optimization**: Fully stabilized for the latest Next.js features, including the new **Proxy (Middleware) API** for ironclad security and high-performance server components.
- **Premium Visual Intelligence**: A stunning dark-mode interface utilizing **Tailwind CSS 4**, featuring glassmorphism effects and parallelized data fetching for near-instant dashboard loading.
- **Secure Authentication**: Enterprise-grade session management powered by NextAuth.js and bcrypt encryption.

## 🛠️ Tech Stack

- **Core Framework**: [Next.js 16.2](https://nextjs.org/) (App Router & Proxy API)
- **UI Library**: [React 19](https://react.dev/)
- **Styling Engine**: [Tailwind CSS 4](https://tailwindcss.com/) with Custom CSS Variables
- **Database Architecture**: SQLite via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- **Persistence Layer**: [Prisma ORM](https://www.prisma.io/)
- **Identity & Access**: [NextAuth.js](https://next-auth.js.org/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

### Prerequisites

- **Node.js**: 18.17.0 or higher
- **Package Manager**: npm, yarn, or pnpm

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/JCharith/TaskFlow.git
   cd TaskFlow
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secure-random-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize Database Schema**:
   ```bash
   npx prisma db push
   ```

5. **Launch Development Server**:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to experience TaskFlow.

## 📂 Project Architecture

- `src/app/`: Next.js 16 App Router implementation featuring parallel routing and optimized data fetching.
- `src/proxy.ts`: Next.js 16 Proxy configuration, serving as the primary authentication and security guard.
- `src/components/`: Modular UI components built with accessibility and performance in mind.
- `src/lib/`: Shared utilities, including Prisma client singleton and NextAuth configuration.
- `prisma/`: Database schema definitions and migration history.

## 🛡️ License

Distributed under the MIT License. See the `LICENSE` file for full details.

---

**Built for the future of collaborative excellence.**

