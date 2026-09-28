import Image from "next/image";

interface TrustedSocialProofProps {
  text?: string;
  className?: string;
}

export default function Demo({
  text = "70+ Happy Families with best interior",
  className = "",
}: TrustedSocialProofProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/10 shadow-xs text-xs font-medium text-neutral-800 transition-transform duration-200 hover:scale-[1.02] ${className}`}
      role="status"
      aria-label={text}
    >
      <div className="flex items-center">
        <div className="relative w-[28px] h-[28px] rounded-full overflow-hidden border-2 border-white shadow-xs z-30">
          <Image
            src="/Images/avatars/telugu-homeowner-1.webp"
            alt="Design My Nivas homeowner customer Hyderabad"
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-[28px] h-[28px] rounded-full overflow-hidden border-2 border-white shadow-xs -ml-2 z-20">
          <Image
            src="/Images/avatars/telugu-homeowner-2.webp"
            alt="Design My Nivas homeowner customer Warangal"
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-[28px] h-[28px] rounded-full overflow-hidden border-2 border-white shadow-xs -ml-2 z-10">
          <Image
            src="/Images/avatars/telugu-homeowner-3.webp"
            alt="Design My Nivas homeowner customer Karimnagar"
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="font-semibold text-neutral-900 tracking-tight select-none">
        {text}
      </p>
    </div>
  );
}

// Named export for flexibility
export { Demo as Example };
