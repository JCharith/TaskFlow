"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "./tasks.module.css";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate?: string;
  project: { name: string };
}

export default function MyTasksPage() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const userId = session?.user?.id;
      if (!userId) return;
      const res = await fetch(`/api/tasks?assigneeId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchTasks();
  }, [session]);

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className={styles.loading}>Loading your tasks...</div>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Tasks</h1>
        <p className={styles.subtitle}>Tasks assigned specifically to you across all projects.</p>
      </header>

      <div className={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className={`${styles.taskCard} glass`}>
              <div className={styles.taskMain}>
                <div className={styles.taskHeader}>
                  <span className={styles.projectName}>{task.project.name}</span>
                  <span className={`${styles.statusBadge} ${styles[task.status.toLowerCase()]}`}>
                    {task.status.replace("_", " ")}
                  </span>
                </div>
                <h3 className={styles.taskTitle}>{task.title}</h3>
                <p className={styles.taskDesc}>{task.description}</p>
              </div>
              <div className={styles.taskActions}>
                <div className={styles.dueDate} suppressHydrationWarning>
                  {task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : "No due date"}
                </div>
                <select 
                  className={styles.statusSelect}
                  value={task.status} 
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">Doing</option>
                  <option value="DONE">Done</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            <p>You have no tasks assigned to you. Enjoy the free time!</p>
          </div>
        )}
      </div>
    </div>
  );
}
