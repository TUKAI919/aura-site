import { useRouterState } from "@tanstack/react-router";

export const CLINIC_DEFAULTS = {
  clinic: "Aura Skin & Hair Clinic",
  doctor: "Dr. Sharma",
  city: "Raipur",
  phone: "919876543210",
  email: "contact@auraclinic.com",
} as const;

const pick = (v: unknown, fallback: string) =>
  typeof v === "string" && v.trim() ? v.trim() : fallback;

/**
 * Reads dynamic branding params from the URL query string, e.g.
 * ?clinic=Glow+Clinic&doctor=Dr.+Mehta&city=Bhopal&phone=919999999999&email=hello@glowclinic.com
 * Falls back to defaults when params are absent.
 */
export function useClinicParams() {
  const search = useRouterState({ select: (s) => s.location.search }) as Record<string, unknown>;
  return {
    clinic: pick(search?.clinic, CLINIC_DEFAULTS.clinic),
    doctor: pick(search?.doctor, CLINIC_DEFAULTS.doctor),
    city: pick(search?.city, CLINIC_DEFAULTS.city),
    phone: pick(search?.phone, CLINIC_DEFAULTS.phone).replace(/[^\d]/g, "") || CLINIC_DEFAULTS.phone,
    email: pick(search?.email, CLINIC_DEFAULTS.email),
  };
}
