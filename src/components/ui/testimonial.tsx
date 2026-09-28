"use client";

import Image from "next/image";

export default function TestimonialCards() {
  const testimonials = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
      quote: "“Design My Nivas delivered our 3BHK flat in Hyderabad on time with 100% itemized pricing.”",
      author: "Rajesh Varma",
      designation: "Gachibowli, Hyderabad",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
      quote: "“The modular kitchen and bedroom woodwork finish is superb. Benson was directly involved throughout.”",
      author: "Sneha Reddy",
      designation: "Hanamkonda, Warangal",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
      quote: "“Very transparent design process and zero surprise costs. Best turnkey interior experience.”",
      author: "Kiran Rao",
      designation: "Collectorate Road, Karimnagar",
    },
  ];

  return (
    <div className="testimonial-section flex flex-wrap items-center justify-center gap-6 py-6">
      {testimonials.map((t) => (
        <div
          key={t.id}
          className="max-w-80 bg-neutral-950 text-white rounded-2xl overflow-hidden shadow-xl border border-neutral-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="relative -mt-px overflow-hidden rounded-2xl h-[270px]">
            <Image
              src={t.image}
              alt={t.author}
              fill
              sizes="320px"
              className="rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
            />
            <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-neutral-950 to-transparent"></div>
          </div>
          <div className="px-4 pb-5 pt-1">
            <p className="font-medium text-sm text-neutral-200 border-b border-neutral-700/80 pb-4 line-clamp-3">
              {t.quote}
            </p>
            <div className="flex items-center justify-between pt-4">
              <div>
                <h4 className="font-semibold text-sm text-white">{t.author}</h4>
                <p className="text-xs text-neutral-400">{t.designation}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
