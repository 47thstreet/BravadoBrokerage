import { cn } from "@/lib/utils";

interface BRELogoProps {
  className?: string;
  height?: string;
  invertColors?: boolean; // true for dark backgrounds (default), false for light
}

const BRELogo = ({ className, height = "h-16", invertColors = true }: BRELogoProps) => {
  const filter = invertColors ? "brightness-0 invert" : "";

  return (
    <span className={cn("inline-flex items-center", className)} aria-label="Bravado Real Estate">
      <img
        src="/attached_assets/logo-b.png"
        alt=""
        className={cn(height, "w-auto", filter)}
        draggable={false}
      />
      <img
        src="/attached_assets/logo-pipe.png"
        alt=""
        className={cn(height, "w-auto")}
        draggable={false}
      />
      <img
        src="/attached_assets/logo-re.png"
        alt=""
        className={cn(height, "w-auto", filter)}
        draggable={false}
      />
    </span>
  );
};

export default BRELogo;
