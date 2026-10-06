"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Testimonial } from "@/types/testimonial";
import Slider from "@/components/ui/slider";
import BookButton from "@/components/ui/book-button";
import YouTubePlayerModal from "@/components/ui/youtube-player-modal";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import styles from "./home.module.css";

const LIMIT = 12;
const videosOnly = (list: Testimonial[]) => list.filter((t) => Boolean(t.youtube_url));

interface TestimonialsProps {
  initialTestimonials?: Testimonial[];
}

function VideoCard({ item, onPlay }: { item: Testimonial; onPlay: (t: Testimonial) => void }) {
  const ytId = extractYouTubeId(item.youtube_url);
  const [src, setSrc] = useState(ytId ? getYouTubeThumbnail(ytId, "maxres") : "/Images/main-hero.webp");

  return (
    <article className={styles.vidCard}>
      <button
        type="button"
        className={`${styles.vidThumb} zoom-host`}
        onClick={() => onPlay(item)}
        aria-label={`Play video story from ${item.client_name}, ${item.location}`}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 640px) 60vw, (max-width: 1200px) 30vw, 16vw"
          className="zoom-img"
          style={{ objectFit: "cover" }}
          draggable={false}
          onError={() => {
            if (ytId && src !== getYouTubeThumbnail(ytId, "hq")) setSrc(getYouTubeThumbnail(ytId, "hq"));
          }}
        />
        <span className={styles.vidLocation}>{item.location}</span>
        <span className={styles.vidPlay} aria-hidden="true">
          <Play size={16} fill="currentColor" />
        </span>
      </button>
      <p className={styles.vidQuote}>&ldquo;{item.quote}&rdquo;</p>
      <p className={styles.vidName}>{item.client_name}</p>
    </article>
  );
}

export default function Testimonials({ initialTestimonials: propInitial }: TestimonialsProps = {}) {
  const [items, setItems] = useState<Testimonial[]>(() => videosOnly(propInitial ?? []));
  const [prevPropInitial, setPrevPropInitial] = useState(propInitial);
  const [playing, setPlaying] = useState<Testimonial | null>(null);

  if (propInitial !== prevPropInitial) {
    setPrevPropInitial(propInitial);
    setItems(videosOnly(propInitial ?? []));
  }

  useEffect(() => {
    let isMounted = true;
    const fetchLatest = () => {
      import("@/lib/supabase/queries")
        .then(({ getTestimonials }) => getTestimonials(true))
        .then((res) => {
          // An empty list is a real answer (everything was deleted), not a reason to keep stale cards
          if (isMounted) setItems(videosOnly(res));
        })
        .catch(() => {
          // Network hiccup: keep what's on screen
        });
    };

    // The page HTML can be up to a minute old; pick up any edit made since then
    fetchLatest();

    const handleUpdate = () => fetchLatest();
    window.addEventListener("dmn-testimonials-updated", handleUpdate);
    window.addEventListener("focus", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("dmn-testimonials-updated", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
    };
  }, [propInitial]);

  if (items.length === 0) return null;

  return (
    <section className="block" id="stories" aria-labelledby="stories-title">
      <div className="container-wide">
        <div className="block-head reveal">
          <h2 id="stories-title" className="block-title">
            Client <span className="hl">Stories</span>
          </h2>
        </div>

        <div className="reveal">
          <Slider label="Client video stories" perView={[1.7, 3, 4, 6]} arrowTop="38%">
            {items.slice(0, LIMIT).map((item) => (
              <VideoCard key={item.id} item={item} onPlay={setPlaying} />
            ))}
          </Slider>
        </div>

        <div className="block-cta">
          <BookButton source="home-stories" />
        </div>
      </div>

      <YouTubePlayerModal
        isOpen={Boolean(playing)}
        onClose={() => setPlaying(null)}
        videoUrl={playing?.youtube_url}
        title={playing ? `${playing.client_name} · ${playing.location}` : undefined}
        vertical={Boolean(playing?.youtube_url?.includes("/shorts/"))}
      />
    </section>
  );
}
