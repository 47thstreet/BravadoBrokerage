import { createContext, useContext, useState, type ReactNode } from "react";

export type SiteVersion = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7" | "v8" | "v9";

interface VersionContextType {
  version: SiteVersion;
  setVersion: (v: SiteVersion) => void;
}

const VersionContext = createContext<VersionContextType>({
  version: "v8",
  setVersion: () => {},
});

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<SiteVersion>("v8");
  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  return useContext(VersionContext);
}

export const VERSION_LABELS: Record<SiteVersion, string> = {
  v1: "v1",
  v2: "v2",
  v3: "v3",
  v4: "v4",
  v5: "v5",
  v6: "v6",
  v7: "v7",
  v8: "v8 (Definitive)",
  v9: "v9 (All Skills)",
};
