# TaskFlow

Manage Projects with **Precision.**

TaskFlow is a beautiful, high-performance task management system designed for teams that demand excellence. Built with the latest web technologies, it provides a premium experience for tracking progress, assigning roles, and hitting deadlines.

![TaskFlow Hero](https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3)

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Granular permissions for Admins and Members to keep your team organized and secure.
- **Project Management**: Organize tasks into distinct projects with dedicated ownership.
- **Task Tracking**: Comprehensive task lifecycle management with statuses (TODO, IN PROGRESS, DONE) and due dates.
- **Real-time Dashboard**: A central hub to monitor project health, overdue tasks, and recent team activity.
- **Modern Aesthetics**: A premium, high-performance dark interface utilizing Tailwind CSS 4 and glassmorphism.
- **Secure Authentication**: Robust session management and password security powered by NextAuth.js and bcrypt.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Proxy API)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), CSS Modules
- **Database**: SQLite via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/taskflow.git
   cd taskflow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize Database**:
   ```bash
   npx prisma db push
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the results.

## 📂 Project Structure

- `src/app`: Next.js 16 App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Shared utilities, Prisma client, and Auth configuration.
- `src/proxy.ts`: Next.js 16 Proxy configuration (authentication guard).
- `prisma/`: Database schema and migrations.

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built for the future of work.
