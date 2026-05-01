"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: string;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/dashboard", icon: "📊" },
    { name: "Projects", href: "/dashboard/projects", icon: "📁" },
    { name: "My Tasks", href: "/dashboard/tasks", icon: "✅" },
  ];

  if (user.role === "ADMIN") {
    links.push({ name: "Team", href: "/dashboard/team", icon: "👥" });
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logo}>TaskFlow</div>
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
            >
              <span className={styles.icon}>{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>{user.name?.[0] || user.email?.[0]}</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user.name || "User"}</p>
            <p className={styles.userRole}>{user.role}</p>
          </div>
        </div>
        <button onClick={() => signOut()} className={styles.logoutBtn}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
