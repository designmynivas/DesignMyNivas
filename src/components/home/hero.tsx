import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { TextWordCarousel } from "@/components/ui/text-word-carousel";
import Demo from "@/components/ui/demo";
import HeroBookingButton from "./hero-booking-button";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection} aria-label="Design My Nivas — Turnkey Residential Interior Design">
      {/* 100% Height & 100% Width Edge-to-Edge Hero Image */}
      <div className={styles.heroBackdrop}>
        <Image
          src="/Images/main-hero.webp"
          alt="Luxury turnkey residential interior by Design My Nivas in Hyderabad, Warangal and Karimnagar"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={styles.heroImage}
          style={{
            objectFit: "cover",
            objectPosition: "right center",
          }}
        />
        {/* Calibrated Bottom-Left Scrim: Maximum Contrast for Text while Preserving Room Render Clarity */}
        <div className={styles.heroScrim} aria-hidden="true" />
      </div>

      {/* Hero Content Overlay — Strictly Anchored to Left Bottom */}
      <div className={styles.heroContentWrapper}>
        <div className={styles.heroContent}>
          {/* High-Converting Social Proof Badge: 70+ Happy Families with Telugu Homeowner Faces */}
          <div className={styles.heroSocialProofWrap}>
            <Demo text="70+ Happy Families with best interior" />
          </div>

          {/* Dynamic Rotating Location Line: Homeowners planning interiors in [MapPin] [Karimnagar -> Hyderabad -> Warangal] */}
          <div
            className={styles.heroLocationBar}
            role="text"
            aria-label="Homeowners planning interiors in Karimnagar, Hyderabad, Warangal"
          >
            <span className={styles.locationServiceTag}>Homeowners planning interiors in</span>
            <span className={styles.locationChangingWord}>
              <MapPin size={15} className={styles.locPinIcon} strokeWidth={2.4} aria-hidden="true" />
              <TextWordCarousel
                words={["Karimnagar", "Hyderabad", "Warangal"]}
                interval={2.5}
                className={styles.rotatingLocationText}
              />
            </span>
          </div>

          {/* Authoritative Architectural Headline */}
          <h1 className={styles.heroHeadline}>
            Your home, delivered<br />
            exactly as designed.
          </h1>

          {/* High-Conversion, Trust-Building Supporting Copy */}
          <p className={styles.heroSupporting}>
            End-to-end interior design and turnkey execution for premium flats, villas, and penthouses across Telangana. Benson Cheripelli and our senior site team guarantee 100% itemized pricing, BWP marine-grade woodwork, and on-time handover — with zero surprise costs.
          </p>

          {/* Rectangular Dual Action Buttons */}
          <div className={styles.heroActions}>
            {/* Primary Button with Directional Arrow (pivots to top-right on hover) */}
            <HeroBookingButton
              className={styles.heroBtnGlow}
              arrowClassName={styles.btnArrow}
            />

            {/* Clean Rectangular Secondary Button — No WhatsApp Icon */}
            <Link
              href="#projects"
              className={styles.heroBtnSecondary}
              aria-label="Explore Selected Homes"
            >
              <span>Explore Selected Homes</span>
              <span className={styles.secondaryArrow} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
