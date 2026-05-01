import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = session.user.id;
  const role = session.user.role;

  // Fetch some stats
  const projectCount = await prisma.project.count();
  const taskStats = await prisma.task.groupBy({
    by: ['status'],
    where: role === "ADMIN" ? {} : { assigneeId: userId },
    _count: true
  });

  const todoCount = taskStats.find(s => s.status === "TODO")?._count || 0;
  const inProgressCount = taskStats.find(s => s.status === "IN_PROGRESS")?._count || 0;
  const doneCount = taskStats.find(s => s.status === "DONE")?._count || 0;

  const overdueCount = await prisma.task.count({
    where: {
      status: { not: "DONE" },
      dueDate: { lt: new Date() },
      ...(role === "ADMIN" ? {} : { assigneeId: userId })
    }
  });

  const recentTasks = await prisma.task.findMany({
    where: role === "ADMIN" ? {} : { assigneeId: userId },
    take: 5,
    orderBy: { updatedAt: "desc" },
    include: { project: true }
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back, {session?.user?.name || "User"}. Here is what's happening.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass`}>
          <p className={styles.statLabel}>Total Projects</p>
          <p className={styles.statValue}>{projectCount}</p>
        </div>
        <div className={`${styles.statCard} glass`}>
          <p className={styles.statLabel}>Tasks To Do</p>
          <p className={styles.statValue}>{todoCount}</p>
        </div>
        <div className={`${styles.statCard} glass`}>
          <p className={styles.statLabel}>In Progress</p>
          <p className={styles.statValue}>{inProgressCount}</p>
        </div>
        <div className={`${styles.statCard} glass`}>
          <p className={styles.statLabel}>Overdue</p>
          <p className={styles.statValue} style={{ color: overdueCount > 0 ? "var(--danger)" : "var(--text)" }}>{overdueCount}</p>
        </div>
      </div>

      <section className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={`${styles.activityList} glass`}>
          {recentTasks.length > 0 ? (
            <div className={styles.taskList}>
              {recentTasks.map(task => (
                <div key={task.id} className={styles.taskItem}>
                  <div className={styles.taskInfo}>
                    <span className={styles.taskTitle}>{task.title}</span>
                    <span className={styles.taskProject}>{task.project.name}</span>
                  </div>
                  <span className={`${styles.statusBadge} ${styles[task.status.toLowerCase()]}`}>
                    {task.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>No recent activity to show.</p>
          )}
        </div>
      </section>
    </div>
  );
}
