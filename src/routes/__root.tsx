import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/ThemeProvider";

const themeInitScript = `(function(){try{var t=localStorage.getItem('aesthetique-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://premium-aesthetics-pro.lovable.app";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Aura Skin & Hair Clinic",
  url: SITE_URL,
  description:
    "Premium hair restoration and aesthetic clinic offering FUE, FUT and PRP therapy in a serene, world-class environment.",
  medicalSpecialty: ["Dermatology", "PlasticSurgery"],
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aura Skin & Hair Clinic — Hair Transplant & Skin Care in Raipur" },
      {
        name: "description",
        content:
          "Bespoke hair transplant and aesthetic treatments by board-certified surgeons. FUE, FUT and PRP therapy in a serene, world-class clinic.",
      },
      { property: "og:site_name", content: "Aura Skin & Hair Clinic" },
      { property: "og:title", content: "Aura Skin & Hair Clinic — Hair Transplant & Skin Care in Raipur" },
      {
        property: "og:description",
        content:
          "Bespoke hair transplant and aesthetic treatments by board-certified surgeons. FUE, FUT and PRP therapy in a serene, world-class clinic.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@auraclinic" },
      { name: "twitter:title", content: "Aura Skin & Hair Clinic — Hair Transplant & Skin Care in Raipur" },
      { name: "twitter:description", content: "Bespoke hair transplant and aesthetic treatments by board-certified surgeons. FUE, FUT and PRP therapy in a serene, world-class clinic." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b08da571-a985-4d35-be68-e5169271efb3/id-preview-19fb18c7--0bfe193c-8dcc-4eb9-a769-f773b756a5ed.lovable.app-1785856921453.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b08da571-a985-4d35-be68-e5169271efb3/id-preview-19fb18c7--0bfe193c-8dcc-4eb9-a769-f773b756a5ed.lovable.app-1785856921453.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}
