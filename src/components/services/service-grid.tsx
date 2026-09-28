"use client";

import { servicesData } from "@/data/services";
import ServiceCard from "@/components/services/service-card";

interface ServiceGridProps {
  limit?: number;
  className?: string;
  layout?: "grid" | "row";
  prioritizeFirst?: boolean;
}

export default function ServiceGrid({
  limit,
  className = "",
  layout = "grid",
  prioritizeFirst = false,
}: ServiceGridProps) {
  const displayedServices = limit ? servicesData.slice(0, limit) : servicesData;

  if (layout === "row") {
    return (
      <div className={`services-system-rows ${className}`} role="list">
        {displayedServices.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            priority={prioritizeFirst && index === 0}
            layout="row"
            reversed={index % 2 === 1}
          />
        ))}

        <style jsx>{`
          .services-system-rows {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            width: 100%;
          }

          @media (max-width: 768px) {
            .services-system-rows {
              gap: 1.75rem;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`services-system-grid ${className}`} role="list">
      {displayedServices.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          priority={prioritizeFirst && index === 0}
          layout="grid"
        />
      ))}

      <style jsx>{`
        /* Exactly 2 large cards per row on desktop, 2 on tablet, 1 on mobile */
        .services-system-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          width: 100%;
        }

        @media (max-width: 960px) {
          .services-system-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 720px) {
          .services-system-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
