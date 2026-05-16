"use client";

import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { useTransitionContext } from "./TransitionContext";

const items = [
  { id: "home", label: "Overview", href: "/" },
  { id: "engagements", label: "Engagements", href: "/engagements" },
  { id: "services", label: "Services", href: "/services" },
  { id: "cases", label: "Case studies", href: "/case-studies" },
  { id: "insights", label: "Insights", href: "/insights" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  const { navigate } = useTransitionContext();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (pathname !== href) {
      navigate(href);
    }
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <a
          href="/"
          className="nav-brand"
          onClick={(e) => handleNav(e, "/")}
        >
          <Wordmark />
        </a>

        <nav className="nav-links">
          {items.map((item) => (
            <Magnetic key={item.id} strength={0.2}>
              <a
                href={item.href}
                className={`nav-link${pathname === item.href ? " active" : ""}`}
                onClick={(e) => handleNav(e, item.href)}
              >
                {item.label}
              </a>
            </Magnetic>
          ))}
        </nav>

        <div className="nav-cta">
          <Button onClick={() => navigate("/contact")}>
            Book a consultation
          </Button>
        </div>
      </div>

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(10, 10, 10, 0.85);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
        }

        .nav-brand {
          text-decoration: none;
          color: inherit;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }

        .nav-link {
          position: relative;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8125rem;
          font-weight: 400;
          letter-spacing: 0.02em;
          transition: color 0.25s ease;
          padding-bottom: 2px;
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 1);
        }

        .nav-link.active {
          color: #fff;
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 1.5px;
          background: var(--color-gold, #c9a84c);
          border-radius: 1px;
        }

        .nav-cta {
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
