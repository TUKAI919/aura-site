import { Phone } from "lucide-react";
import { useClinicParams } from "@/hooks/useClinicParams";

export function MobileActionBar() {
  const { clinic, phone, city } = useClinicParams();
  const waText = encodeURIComponent(
    `Hi ${clinic}, I'd like to book a consultation in ${city}.`
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2.5 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur md:hidden">
      <a
        href={`tel:+${phone}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-900"
      >
        <Phone className="h-4 w-4" />
        Call Clinic
      </a>
      <a
        href={`https://wa.me/${phone}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.05-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.42-9.41a9.36 9.36 0 0 1 6.65 2.76 9.33 9.33 0 0 1 2.76 6.66c0 5.19-4.23 9.41-9.42 9.41z" />
        </svg>
        WhatsApp Consult
      </a>
    </div>
  );
}
