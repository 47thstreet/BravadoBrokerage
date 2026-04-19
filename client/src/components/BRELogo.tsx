import { cn } from "@/lib/utils";

interface BRELogoProps {
  className?: string;
  height?: string;
}

const BRELogo = ({ className, height = "h-16" }: BRELogoProps) => {
  return (
    <span className={cn("relative inline-block", height, className)} aria-label="Bravado Real Estate">
      {/* Layer 1: B portion — left ~35% of image, inverted to white */}
      <img
        src="/attached_assets/smallo_1757979641363.png"
        alt=""
        className={cn("brightness-0 invert", height, "w-auto")}
        style={{ clipPath: "inset(0 65% 0 0)" }}
      />
      {/* Layer 2: RE portion — right ~62% of image, inverted to white */}
      <img
        src="/attached_assets/smallo_1757979641363.png"
        alt=""
        className={cn("absolute top-0 left-0 brightness-0 invert", height, "w-auto")}
        style={{ clipPath: "inset(0 0 0 38%)" }}
      />
      {/* Red pipe — positioned in the gap between B and RE */}
      <span
        className="absolute top-[7%] bg-red-600"
        style={{ left: "35.5%", width: "2.4%", height: "74%" }}
      />
    </span>
  );
};

export default BRELogo;
