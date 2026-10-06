import Image from "next/image";
import Link from "next/link";
import Slider from "@/components/ui/slider";
import BookButton from "@/components/ui/book-button";
import { servicesData } from "@/data/services";
import { servicesList } from "@/lib/config/site";
import styles from "./home.module.css";

// One-sentence card copy lives in site config; fall back to the service's own summary
const shortCopy = new Map(servicesList.map((s) => [s.title, s.description]));

export default function Services() {
  return (
    <section className="block" id="services" aria-labelledby="services-title">
      <div className="container-wide">
        <div className="block-head reveal">
          <h2 id="services-title" className="block-title">
            Our <span className="hl">Services</span>
          </h2>
        </div>

        <div className="reveal">
          <Slider label="Interior design services" perView={[1.25, 2.2, 3, 4]} arrowTop="28%">
            {servicesData.map((service) => (
              <article key={service.slug} className={`${styles.svcCard} zoom-host`}>
                <Link href={`/services/${service.slug}`} className={styles.svcMedia} tabIndex={-1} draggable={false}>
                  <Image
                    src={service.image}
                    alt={`${service.name} by Design My Nivas`}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1200px) 34vw, 25vw"
                    className="zoom-img"
                    style={{ objectFit: "cover" }}
                    draggable={false}
                  />
                </Link>
                <div className={styles.svcBody}>
                  <h3 className={styles.svcName}>
                    <Link href={`/services/${service.slug}`} draggable={false}>
                      {service.name}
                    </Link>
                  </h3>
                  <p className={styles.svcDesc}>{shortCopy.get(service.name) ?? service.shortDescription}</p>
                  <BookButton
                    label="Book Consultation"
                    service={service.name}
                    source={`home-service-${service.slug}`}
                    className={styles.svcCta}
                  />
                </div>
              </article>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
