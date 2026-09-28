"use client";

import { useState } from "react";
import { projectsData, ProjectItem } from "@/data/projects";
import ProjectCard from "@/components/projects/project-card";

interface ProjectGridProps {
  initialProjects?: ProjectItem[];
  showFilters?: boolean;
  limit?: number;
}

const filterOptions = ["All", "Full Home", "Living", "Bedroom"];

export default function ProjectGrid({
  initialProjects = projectsData,
  showFilters = true,
  limit,
}: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = initialProjects.filter((proj) => {
    if (activeFilter === "All") return true;
    return proj.type.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const displayedProjects = limit
    ? filteredProjects.slice(0, limit)
    : filteredProjects;

  return (
    <div className="project-grid-wrapper">
      {/* Category Filter Chips */}
      {showFilters && (
        <div className="project-filters" role="tablist" aria-label="Project filter categories">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${activeFilter === filter ? "filter-active" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Strict 2-Column Desktop, 2-Column Tablet, 1-Column Mobile Grid */}
      <div className="project-grid-system" role="list">
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            priority={index < 2}
          />
        ))}
      </div>

      <style jsx>{`
        .project-grid-wrapper {
          width: 100%;
        }

        .project-filters {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          font-family: var(--font-body);
          font-size: 0.84375rem;
          font-weight: 550;
          color: var(--foreground-muted);
          background: #ffffff;
          border: 1px solid var(--border);
          padding: 0.5rem 1.125rem;
          border-radius: 980px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          color: var(--foreground);
          border-color: var(--foreground-subtle);
        }

        .filter-active {
          color: #ffffff !important;
          background: #29ABE2 !important;
          border-color: #29ABE2 !important;
          box-shadow: 0 4px 14px rgba(41, 171, 226, 0.35);
        }

        /* 3 columns desktop, 2 columns tablet, 1 column mobile */
        .project-grid-system {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .project-grid-system {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .project-grid-system {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .project-filters {
            margin-bottom: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}
