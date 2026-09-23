/**
 * Minimal Supabase REST client — no SDK dependency, mirrors the verified v1
 * integration (POST to /rest/v1/<table> with the anon/publishable key, RLS
 * restricts every table below to insert-only for anonymous visitors).
 *
 * Two tables:
 * - `leads`: the Contact page's dedicated table (name, email, phone,
 *   company, city, country, subject, message, source, status).
 * - `inquiries`: the older table (name, email, phone, company, message,
 *   source only) still used by product-detail enquiries. It has no
 *   dedicated column for product context, so that folds into the message
 *   body — see buildContextualMessage.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super("Supabase environment variables are not configured.");
    this.name = "SupabaseNotConfiguredError";
  }
}

async function postToTable(table: string, payload: object): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new SupabaseNotConfiguredError();
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Submission to ${table} failed: ${res.status}`);
  }
}

export interface LeadPayload {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  country?: string;
  subject?: string;
  message: string;
  /** Identifies which form/page the lead originated from. */
  source: string;
}

/** Contact page — writes to the dedicated `leads` table. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  return postToTable("leads", payload);
}

export interface EnquiryPayload {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  message: string;
  /** Identifies which form/page the enquiry originated from. */
  source: string;
}

/** Product-detail enquiries — writes to the older `inquiries` table. */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  return postToTable("inquiries", payload);
}

/** Folds extra context (product, profession, location...) into a labelled message body. */
export function buildContextualMessage(lines: (string | false | undefined)[], userMessage: string): string {
  const context = lines.filter((l): l is string => Boolean(l));
  return [...context, "", userMessage.trim()].join("\n");
}
