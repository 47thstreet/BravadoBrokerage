import { cn } from "@/lib/utils";

interface BRELogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "text-3xl",
  md: "text-5xl",
  lg: "text-7xl",
};

const BRELogo = ({ className, size = "md" }: BRELogoProps) => {
  return (
    <span
      className={cn("font-display tracking-tight select-none inline-flex items-baseline leading-none", sizes[size], className)}
      aria-label="Bravado Real Estate"
    >
      <span className="font-bold text-white">B</span>
      <span className="font-light text-red-600 mx-[0.04em]">|</span>
      <span className="font-extralight text-white">RE</span>
    </span>
  );
};

export default BRELogo;
