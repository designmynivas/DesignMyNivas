"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { projectsData, ProjectItem } from "@/data/projects";
import ProjectCard from "@/components/projects/project-card";
import { useBookingModal } from "@/context/booking-modal-context";

interface SelectedProjectsProps {
  initialProjects?: ProjectItem[];
}

export default function SelectedProjects({ initialProjects }: SelectedProjectsProps = {}) {
  const { openBookingModal } = useBookingModal();
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(
    initialProjects && initialProjects.length > 0 ? initialProjects.slice(0, 6) : projectsData.slice(0, 6)
  );
  const [prevInitial, setPrevInitial] = useState(initialProjects);

  if (initialProjects !== prevInitial) {
    setPrevInitial(initialProjects);
    if (initialProjects && initialProjects.length > 0) {
      setProjectsList(initialProjects.slice(0, 6));
    }
  }

  useEffect(() => {
    let isMounted = true;
    const fetchLatest = () => {
      import("@/lib/supabase/queries").then(({ getProjects }) => getProjects()).then((items) => {
        if (isMounted && items && items.length > 0) {
          setProjectsList(items.slice(0, 6));
        }
      });
    };

    // If initialProjects wasn't provided, fetch immediately
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

  // Feature up to 6 cards on home page (newest first)
  const featuredProjects = projectsList.slice(0, 6);

  return (
    <section className="section projects-section" id="projects" aria-label="Selected Interior Design Projects">
      <div className="container-wide">
        {/* Section Header */}
        <div className="projects-header">
          <div className="projects-header-text">
            <span className="eyebrow projects-eyebrow">Portfolio</span>
            <h2 className="projects-headline">Homes we&rsquo;ve designed.</h2>
            <p className="projects-supporting">
              Every residence reflects the family living inside it. Explore our recent turnkey executions across Hyderabad, Warangal, and Karimnagar.
            </p>
          </div>
          <div className="projects-header-actions">
            <button
              type="button"
              onClick={() => openBookingModal({ source: "home-projects-header" })}
              className="btn btn-primary projects-cta-btn"
              aria-label="Discuss Your Home"
            >
              <span>Discuss Your Home</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        {/* 3 Columns Desktop (3x2), 2 Columns Tablet (2x3), 1 Column Mobile (1x6) */}
        <div className="projects-grid" role="list">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Projects Discovery Footer */}
        <div className="projects-view-all-row">
          <Link href="/projects" className="btn btn-secondary view-all-projects-btn">
            <span>View All Projects</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .projects-section {
          background-color: var(--background);
          padding: var(--space-96) 0;
        }

        .projects-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: var(--space-48);
        }

        .projects-header-text {
          max-width: 680px;
        }

        .projects-eyebrow {
          margin-bottom: 0.75rem;
        }

        .projects-headline {
          font-size: var(--text-statement);
          font-weight: 650;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-bottom: 0.75rem;
        }

        .projects-supporting {
          font-size: 1.0625rem;
          line-height: 1.6;
          color: var(--foreground-muted);
        }

        :global(.projects-cta-btn) {
          height: 48px;
          padding: 0 1.85rem;
          font-size: 0.9375rem;
          font-weight: 600;
          white-space: nowrap;
          color: #FFFFFF !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          border: 1px solid #29ABE2 !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.52) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.projects-cta-btn:hover) {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          border-color: #1FA0D6 !important;
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -4px rgba(41, 171, 226, 0.7) !important;
        }

        /* 3 x 2 desktop, 2 x 3 tablet, 1 x 6 mobile */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: var(--space-48);
        }

        .projects-view-all-row {
          display: flex;
          justify-content: center;
        }

        :global(.view-all-projects-btn) {
          height: 48px;
          padding: 0 2rem;
          font-size: 0.9375rem;
          font-weight: 600;
          background-color: #ffffff;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.04);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.view-all-projects-btn:hover) {
          border-color: #29ABE2;
          color: #29ABE2;
          background-color: rgba(41, 171, 226, 0.04);
          box-shadow: 0 8px 24px -4px rgba(41, 171, 226, 0.18);
          transform: translateY(-2px);
        }

        @media (max-width: 1080px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .projects-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }

          :global(.projects-cta-btn) {
            width: 100%;
            justify-content: center;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          :global(.view-all-projects-btn) {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
