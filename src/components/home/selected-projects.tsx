"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { projectsData, ProjectItem } from "@/data/projects";
import Slider from "@/components/ui/slider";
import BookButton from "@/components/ui/book-button";
import YouTubePlayerModal from "@/components/ui/youtube-player-modal";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import styles from "./home.module.css";

const LIMIT = 8;

interface SelectedProjectsProps {
  initialProjects?: ProjectItem[];
}

function ProjectTile({ project, onPlay }: { project: ProjectItem; onPlay: (p: ProjectItem) => void }) {
  const ytId = project.youtubeUrl ? extractYouTubeId(project.youtubeUrl) : null;
  const initial =
    ytId && (!project.image || project.image === "/Images/main-hero.webp")
      ? getYouTubeThumbnail(ytId, "maxres")
      : project.image || "/Images/main-hero.webp";
  const [src, setSrc] = useState(initial);

  return (
    <article className={`${styles.projCard} zoom-host`}>
      <Image
        src={src}
        alt={`${project.title} — ${project.type}, ${project.location}`}
        fill
        sizes="(max-width: 640px) 85vw, (max-width: 1200px) 45vw, 32vw"
        className="zoom-img"
        style={{ objectFit: "cover" }}
        draggable={false}
        onError={() => {
          if (ytId && src !== getYouTubeThumbnail(ytId, "hq")) setSrc(getYouTubeThumbnail(ytId, "hq"));
        }}
      />
      <div className={styles.projShade} aria-hidden="true" />

      {ytId && (
        <button
          type="button"
          className={styles.projPlay}
          onClick={() => onPlay(project)}
          aria-label={`Watch video tour of ${project.title}`}
        >
          <Play size={18} fill="currentColor" aria-hidden="true" />
        </button>
      )}

      <div className={styles.projInfo}>
        <span className={styles.projMeta}>
          {project.type} · {project.location}
        </span>
        <h3 className={styles.projTitle}>
          <Link href={`/projects/${project.slug}`} className={styles.projLink} draggable={false}>
            {project.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

export default function SelectedProjects({ initialProjects }: SelectedProjectsProps = {}) {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(
    initialProjects && initialProjects.length > 0 ? initialProjects.slice(0, LIMIT) : projectsData.slice(0, LIMIT)
  );
  const [prevInitial, setPrevInitial] = useState(initialProjects);
  const [playing, setPlaying] = useState<ProjectItem | null>(null);

  if (initialProjects !== prevInitial) {
    setPrevInitial(initialProjects);
    if (initialProjects && initialProjects.length > 0) {
      setProjectsList(initialProjects.slice(0, LIMIT));
    }
  }

  useEffect(() => {
    let isMounted = true;
    const fetchLatest = () => {
      import("@/lib/supabase/queries").then(({ getProjects }) => getProjects()).then((items) => {
        if (isMounted && items && items.length > 0) {
          setProjectsList(items.slice(0, LIMIT));
        }
      });
    };

    if (!initialProjects || initialProjects.length === 0) {
      fetchLatest();
    }

    const handleUpdate = () => fetchLatest();
    window.addEventListener("dmn-projects-updated", handleUpdate);
    window.addEventListener("focus", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("dmn-projects-updated", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
    };
  }, [initialProjects]);

  return (
    <section className="block" id="projects" aria-labelledby="projects-title">
      <div className="container-wide">
        <div className="block-head reveal">
          <h2 id="projects-title" className="block-title">
            Our <span className="hl">Projects</span>
          </h2>
        </div>

        <div className="reveal">
          <Slider label="Recent projects" perView={[1.15, 2, 2.6, 3]}>
            {projectsList.map((project) => (
              <ProjectTile key={project.id} project={project} onPlay={setPlaying} />
            ))}
          </Slider>
        </div>

        <div className="block-cta">
          <BookButton source="home-projects" />
        </div>
      </div>

      <YouTubePlayerModal
        isOpen={Boolean(playing)}
        onClose={() => setPlaying(null)}
        videoUrl={playing?.youtubeUrl}
        title={playing ? `${playing.title} — Video Tour` : undefined}
        vertical={Boolean(playing?.youtubeUrl?.includes("/shorts/"))}
      />
    </section>
  );
}
