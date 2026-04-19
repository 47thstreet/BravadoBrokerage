import { createContext, useContext, useState, type ReactNode } from "react";

export type SiteVersion = "v1" | "v2" | "v3" | "v4";

interface VersionContextType {
  version: SiteVersion;
  setVersion: (v: SiteVersion) => void;
}

const VersionContext = createContext<VersionContextType>({
  version: "v1",
  setVersion: () => {},
});

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<SiteVersion>("v1");
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
  v1: "Original",
  v2: "Emil Kowalski",
  v3: "UI/UX Pro Max",
  v4: "CRO Optimized",
};
