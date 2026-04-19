import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVersion, VERSION_LABELS, type SiteVersion } from "@/lib/versionContext";

const Navigation = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { version, setVersion } = useVersion();
  const [versionOpen, setVersionOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigation = [
    { name: "About", href: "/about" },
    { 
      name: "Services", 
      hasDropdown: true,
      dropdownSections: [
        {
          name: "Services",
          items: [
            { name: "Commercial Services", href: "/services/commercial" }
          ]
        }
      ]
    },
    { name: "Agents", href: "/agents" },
    { name: "Properties", href: "/listings/commercial" },
    { name: "Apply Now", href: "/apply-now" },
  ];

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-neutral-950 dark:bg-neutral-950 hairline-bottom sticky top-0 z-50" data-testid="navigation">
      <div className="w-full mx-auto px-2 lg:px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center" onClick={scrollToTop} data-testid="logo-link">
              <img
                src="/attached_assets/smallo_1757979641363.png"
                alt="Bravado Real Estate"
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            {/* Version Switcher */}
            <div className="relative"
              onMouseEnter={() => setVersionOpen(true)}
              onMouseLeave={() => setVersionOpen(false)}
            >
              <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-400 hover:text-white border border-neutral-700 rounded transition-colors">
                {VERSION_LABELS[version]}
                <ChevronDown className="h-3 w-3" />
              </button>
              {versionOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-neutral-900 border border-neutral-700 rounded shadow-xl z-50">
                  {(Object.keys(VERSION_LABELS) as SiteVersion[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => { setVersion(v); setVersionOpen(false); }}
                      className={cn(
                        "block w-full text-left px-3 py-2 text-xs transition-colors",
                        version === v
                          ? "text-accent bg-neutral-800"
                          : "text-white hover:text-accent hover:bg-neutral-800"
                      )}
                    >
                      {VERSION_LABELS[v]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex ml-auto">
            <div className="flex items-baseline gap-4">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div 
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => {
                        setTimeout(() => setOpenDropdown(null), 100);
                      }}
                    >
                      <button
                        className="px-1 py-2 text-body-sm font-medium hover:text-accent transition-colors flex items-center text-white dark:text-white"
                        data-testid={`nav-link-${item.name.toLowerCase().replace(" ", "-")}`}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      
                      {openDropdown === item.name && (
                        <div 
                          className="absolute top-full left-0 w-56 bg-neutral-900 dark:bg-neutral-900 border border-neutral-700 dark:border-neutral-700 rounded-md shadow-xl z-50 transition-all duration-200"
                          onMouseEnter={() => setOpenDropdown(item.name)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          {item.dropdownSections ? (
                            item.dropdownSections.map((section, sectionIndex) => (
                              <div key={section.name}>
                                {sectionIndex > 0 && <div className="border-t border-neutral-300 dark:border-neutral-300 my-1"></div>}
                                <div className="px-4 py-2 text-caption font-semibold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider">
                                  {section.name}
                                </div>
                                {section.items.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="block px-6 py-2 text-body-sm text-white dark:text-white hover:text-accent hover:bg-neutral-800 dark:hover:bg-neutral-800 transition-colors"
                                    onClick={() => { setOpenDropdown(null); scrollToTop(); }}
                                    data-testid={`nav-dropdown-${section.name.toLowerCase()}-${dropdownItem.name.toLowerCase().replace(" ", "-")}`}
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                ))}
                              </div>
                            ))
                          ) : (
                            (item as any).dropdownItems?.map((dropdownItem: any) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-sm text-white hover:text-primary hover:bg-gray-800 transition-colors"
                                onClick={() => { setOpenDropdown(null); scrollToTop(); }}
                                data-testid={`nav-dropdown-${dropdownItem.name.toLowerCase().replace(" ", "-")}`}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        "px-1 py-2 text-body-sm font-medium hover:text-accent transition-colors",
                        isActive(item.href) ? "text-accent" : "text-white dark:text-white"
                      )}
                      onClick={scrollToTop}
                      data-testid={`nav-link-${item.name.toLowerCase().replace(" ", "-")}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white dark:text-white hover:text-accent"
              data-testid="mobile-menu-button"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden" data-testid="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-white border-t border-neutral-300 dark:border-neutral-300">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      className="block px-3 py-2 text-body-md font-medium w-full text-left hover:text-accent transition-colors text-black dark:text-black"
                      data-testid={`mobile-nav-link-${item.name.toLowerCase().replace(" ", "-")}`}
                    >
                      {item.name}
                    </button>
                    {item.dropdownSections ? (
                      item.dropdownSections.map((section) => (
                        <div key={section.name}>
                          <div className="px-6 py-2 text-caption font-semibold text-neutral-600 dark:text-neutral-600 uppercase tracking-wider">
                            {section.name}
                          </div>
                          {section.items.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-8 py-2 text-body-sm text-neutral-700 dark:text-neutral-700 hover:text-accent transition-colors"
                              onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
                              data-testid={`mobile-nav-dropdown-${section.name.toLowerCase()}-${dropdownItem.name.toLowerCase().replace(" ", "-")}`}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      ))
                    ) : (
                      (item as any).dropdownItems?.map((dropdownItem: any) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-6 py-2 text-sm text-gray-300 hover:text-primary transition-colors"
                          onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
                          data-testid={`mobile-nav-dropdown-${dropdownItem.name.toLowerCase().replace(" ", "-")}`}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "block px-3 py-2 text-body-md font-medium w-full text-left hover:text-accent transition-colors",
                      isActive(item.href) ? "text-accent" : "text-black dark:text-black"
                    )}
                    onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
                    data-testid={`mobile-nav-link-${item.name.toLowerCase().replace(" ", "-")}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
