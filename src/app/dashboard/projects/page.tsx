"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./projects.module.css";

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  owner: { name: string; email: string };
  _count: { tasks: number };
}

export default function ProjectsPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const isAdmin = session?.user?.role === "ADMIN";

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, description: newDesc }),
      });
      if (res.ok) {
        setNewName("");
        setNewDesc("");
        setShowCreate(false);
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className={styles.loading}>Loading projects...</div>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Manage and track your team's initiatives</p>
        </div>
        {isAdmin && (
          <button className={styles.createBtn} onClick={() => setShowCreate(!showCreate)}>
            {showCreate ? "Cancel" : "New Project"}
          </button>
        )}
      </header>

      {showCreate && (
        <div className={`${styles.createForm} glass animate-fade-in`}>
          <form onSubmit={handleCreate}>
            <div className={styles.field}>
              <label>Project Name</label>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Website Redesign" required />
            </div>
            <div className={styles.field}>
              <label>Description</label>
              <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="What is this project about?" />
            </div>
            <button type="submit" className={styles.submitBtn}>Create Project</button>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {projects.map((project) => (
          <Link href={`/dashboard/projects/${project.id}`} key={project.id} className={`${styles.card} glass`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.projectName}>{project.name}</h3>
              <span className={styles.taskCount}>{project._count.tasks} Tasks</span>
            </div>
            <p className={styles.projectDesc}>{project.description || "No description provided."}</p>
            <div className={styles.cardFooter}>
              <span className={styles.owner}>Owner: {project.owner.name}</span>
              <span className={styles.date} suppressHydrationWarning>
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {projects.length === 0 && !loading && (
        <div className={styles.empty}>
          <p>No projects found. {isAdmin ? "Create your first one!" : "Wait for an admin to add one."}</p>
        </div>
      )}
    </div>
  );
}
