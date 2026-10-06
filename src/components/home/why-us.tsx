import Image from "next/image";
import { ClipboardCheck, HardHat, Layers, ShieldCheck } from "lucide-react";
import BookButton from "@/components/ui/book-button";
import styles from "./home.module.css";

const POINTS = [
  { icon: ClipboardCheck, title: "Locked, itemised estimate", text: "Every cost listed before work begins." },
  { icon: Layers, title: "One team, design to handover", text: "3D design, materials and execution under one roof." },
  { icon: HardHat, title: "A site engineer on every home", text: "Weekly photo updates from your site." },
  { icon: ShieldCheck, title: "Materials you can verify", text: "BWP plywood and branded hardware as standard." },
];

/** The four trust points, shared by the homepage and About page. */
export function TrustPoints({ wide = false }: { wide?: boolean }) {
  return (
    <ul className={`${styles.whyList} ${wide ? styles.whyListWide : ""}`}>
      {POINTS.map(({ icon: Icon, title, text }) => (
        <li key={title} className={styles.whyItem}>
          <span className={styles.whyIcon} aria-hidden="true">
            <Icon size={20} />
          </span>
          <div>
            <h3 className={styles.whyTitle}>{title}</h3>
            <p className={styles.whyText}>{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function WhyUs() {
  return (
    <section className="block" aria-labelledby="why-title">
      <div className="container-wide">
        <div className="block-head reveal">
          <h2 id="why-title" className="block-title">
            Why <span className="hl">Design My Nivas</span>
          </h2>
        </div>

        <div className={styles.whyGrid}>
          <figure className={`${styles.founderCard} reveal`}>
            <Image
              src="/Images/founder/benson-cheripelli.webp"
              alt="Benson Cheripelli, founder of Design My Nivas"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
            <figcaption className={styles.founderCaption}>
              <p className={styles.founderQuote}>
                &ldquo;A family trusts us with their home. That deserves complete transparency.&rdquo;
              </p>
              <span className={styles.founderName}>Benson Cheripelli · Founder</span>
            </figcaption>
          </figure>

          <div className="reveal">
            <TrustPoints />
          </div>
        </div>

        <div className="block-cta">
          <BookButton source="home-why-us" />
        </div>
      </div>
    </section>
  );
}
