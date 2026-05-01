"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import styles from "./project-detail.module.css";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  assignee?: { name: string };
}

interface Project {
  id: string;
  name: string;
  description: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { data: session, status } = useSession();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", assigneeId: "", dueDate: "" });
  const [users, setUsers] = useState<User[]>([]);

  const isAdmin = session?.user?.role === "ADMIN";

  const fetchData = useCallback(async () => {
    try {
      const projRes = await fetch(`/api/projects/${id}`);
      if (!projRes.ok) throw new Error("Failed to fetch project");
      const currentProj = await projRes.json();
      setProject(currentProj);

      const tasksRes = await fetch(`/api/tasks?projectId=${id}`);
      if (!tasksRes.ok) throw new Error("Failed to fetch tasks");
      const tasksData = await tasksRes.json();
      setTasks(tasksData);

      if (isAdmin) {
        const usersRes = await fetch(`/api/users`);
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setUsers(usersData);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, isAdmin]);

  useEffect(() => {
    if (status === "loading") return;
    fetchData();
  }, [fetchData, status]);

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newTask, projectId: id }),
      });
      if (res.ok) {
        setNewTask({ title: "", description: "", assigneeId: "", dueDate: "" });
        setShowAddTask(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className={styles.loading}>Loading project board...</div>;
  if (!project) return <div className={styles.error}>Project not found.</div>;

  const columns: { id: Task["status"]; title: string }[] = [
    { id: "TODO", title: "To Do" },
    { id: "IN_PROGRESS", title: "In Progress" },
    { id: "DONE", title: "Done" },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.subtitle}>{project.description}</p>
        </div>
        {isAdmin && (
          <button className={styles.addBtn} onClick={() => setShowAddTask(!showAddTask)}>
            {showAddTask ? "Cancel" : "Add Task"}
          </button>
        )}
      </header>

      {showAddTask && (
        <div className={`${styles.addForm} glass animate-fade-in`}>
          <form onSubmit={handleAddTask} className={styles.formRow}>
            <input 
              placeholder="Task Title" 
              value={newTask.title} 
              onChange={(e) => setNewTask({...newTask, title: e.target.value})} 
              required 
            />
            <input 
              type="date"
              value={newTask.dueDate} 
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} 
            />
            <select 
              value={newTask.assigneeId} 
              onChange={(e) => setNewTask({...newTask, assigneeId: e.target.value})}
            >
              <option value="">Assign to...</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            <button type="submit">Create</button>
          </form>
        </div>
      )}

      <div className={styles.board}>
        {columns.map((col) => (
          <div key={col.id} className={styles.column}>
            <div className={styles.columnHeader}>
              <h2 className={styles.columnTitle}>{col.title}</h2>
              <span className={styles.count}>{tasks.filter(t => t.status === col.id).length}</span>
            </div>
            <div className={styles.taskList}>
              {tasks.filter(t => t.status === col.id).map((task) => (
                <div key={task.id} className={`${styles.taskCard} glass`}>
                  <h3 className={styles.taskTitle}>{task.title}</h3>
                  <p className={styles.taskDesc}>{task.description}</p>
                  <div className={styles.taskFooter}>
                    <span className={styles.assignee}>👤 {task.assignee?.name || "Unassigned"}</span>
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
