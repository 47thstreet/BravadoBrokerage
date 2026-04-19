import { createContext, useContext, useState, type ReactNode } from "react";

export type SiteVersion = "v1" | "v2" | "v3" | "v4" | "v5";

interface VersionContextType {
  version: SiteVersion;
  setVersion: (v: SiteVersion) => void;
}

const VersionContext = createContext<VersionContextType>({
  version: "v5",
  setVersion: () => {},
});

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<SiteVersion>("v5");
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
};
