import { cn } from "@/lib/utils";

interface BRELogoProps {
  className?: string;
  height?: string;
}

const BRELogo = ({ className, height = "h-16" }: BRELogoProps) => {
  return (
    <span className={cn("relative inline-block", height, className)} aria-label="Bravado Real Estate">
      {/* Base: inverted image (all white on dark bg) */}
      <img
        src="/attached_assets/smallo_1757979641363.png"
        alt=""
        className={cn("brightness-0 invert", height, "w-auto")}
      />
      {/* Red pipe overlay — positioned over the | in the original image */}
      <span
        className="absolute top-[7%] bg-red-600"
        style={{ left: "35.5%", width: "2.4%", height: "74%" }}
      />
    </span>
  );
};

export default BRELogo;
