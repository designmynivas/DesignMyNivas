import Link from "next/link";
import { ArrowLeft, Home, Compass, FolderKanban, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Design My Nivas",
  description: "The requested residential interior design page could not be found. Explore our services, projects, or return to the homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-16 bg-[#F7F5F0] text-center">
      <div className="max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#29ABE2]/10 border border-[#29ABE2]/25 text-xs font-bold text-[#29ABE2] uppercase tracking-wider mb-6">
          Error 404
        </span>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#181818] tracking-tight leading-tight mb-4">
          Space Not Found
        </h1>

        <p className="font-body text-base sm:text-lg text-[#475569] leading-relaxed mb-8 max-w-md mx-auto">
          The page or project you are looking for has been relocated or is no longer available. Let us guide you back to our curated interior designs.
        </p>

        {/* Quick Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white border border-[#E5E5E5] text-[#181818] hover:border-[#29ABE2] hover:text-[#29ABE2] transition-colors shadow-xs group"
          >
            <Home size={20} className="text-[#29ABE2] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Home</span>
          </Link>

          <Link
            href="/services"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white border border-[#E5E5E5] text-[#181818] hover:border-[#29ABE2] hover:text-[#29ABE2] transition-colors shadow-xs group"
          >
            <Compass size={20} className="text-[#29ABE2] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Services</span>
          </Link>

          <Link
            href="/projects"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white border border-[#E5E5E5] text-[#181818] hover:border-[#29ABE2] hover:text-[#29ABE2] transition-colors shadow-xs group"
          >
            <FolderKanban size={20} className="text-[#29ABE2] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Projects</span>
          </Link>

          <Link
            href="/about#contact"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white border border-[#E5E5E5] text-[#181818] hover:border-[#29ABE2] hover:text-[#29ABE2] transition-colors shadow-xs group"
          >
            <Phone size={20} className="text-[#29ABE2] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Contact</span>
          </Link>
        </div>

        {/* Primary Action Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#29ABE2] text-white font-semibold text-sm shadow-md hover:bg-[#1fa0d6] transition-all"
          >
            <ArrowLeft size={16} />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
