"use client";

import { Wordmark } from "./Wordmark";
import { FooterMega } from "./FooterMega";
import { useTransitionContext } from "./TransitionContext";

const siteLinks = [
  { label: "Overview", href: "/" },
  { label: "Engagements", href: "/engagements" },
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
];

const contactLinks = [
  { label: "hello@hartwellseo.com", href: "mailto:hello@hartwellseo.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter / X", href: "https://x.com" },
];

const indexLinks = [
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  const { navigate } = useTransitionContext();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-gold-line" />

      <div className="footer-content">
        <div className="footer-grid">
          {/* Left column: brand + description */}
          <div className="footer-brand">
            <Wordmark size={20} />
            <p className="footer-desc">
              Strategic SEO consulting for brands that demand measurable growth.
              Data-driven methodology, premium execution.
            </p>
          </div>

          {/* Right column: 3-col links */}
          <div className="footer-links-grid">
            <div className="footer-link-col">
              <h4 className="footer-link-heading">Site</h4>
              <ul className="footer-link-list">
                {siteLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNav(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-link-col">
              <h4 className="footer-link-heading">Contact</h4>
              <ul className="footer-link-list">
                {contactLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      onClick={(e) => handleNav(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-link-col">
              <h4 className="footer-link-heading">Index</h4>
              <ul className="footer-link-list">
                {indexLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNav(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <FooterMega />

        {/* Copyright row */}
        <div className="footer-copyright">
          <span>&copy; {new Date().getFullYear()} Hartwell SEO. All rights reserved.</span>
          <span className="footer-copyright-sub">New York</span>
        </div>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
          padding: 4rem 2rem 2rem;
          background: var(--color-bg, #0a0a0a);
        }

        .footer-gold-line {
          position: absolute;
          top: 0;
          left: 2rem;
          right: 2rem;
          height: 1px;
          background: var(--color-gold, #c9a84c);
          opacity: 0.4;
        }

        .footer-content {
          max-width: 1440px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-desc {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          line-height: 1.6;
          max-width: 320px;
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .footer-link-heading {
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .footer-link-list a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.8125rem;
          transition: color 0.2s ease;
        }

        .footer-link-list a:hover {
          color: #fff;
        }

        .footer-copyright {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.35);
        }

        .footer-copyright-sub {
          letter-spacing: 0.05em;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .footer-links-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
