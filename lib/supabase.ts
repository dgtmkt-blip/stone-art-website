/**
 * Minimal Supabase REST client for the enquiry system — no SDK dependency,
 * mirrors the verified v1 integration (POST to /rest/v1/inquiries with the
 * anon/publishable key, RLS restricts it to insert-only).
 *
 * The `inquiries` table only has: name, email, phone, company, message,
 * source. There is no dedicated "product" column, so product-context
 * enquiries (from a product detail page) fold the product name/code into
 * the message body and tag `source` accordingly — this keeps the schema
 * untouched while still being traceable in the data.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface EnquiryPayload {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  message: string;
  /** Identifies which form/page the enquiry originated from. */
  source: string;
}

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super("Supabase environment variables are not configured.");
    this.name = "SupabaseNotConfiguredError";
  }
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new SupabaseNotConfiguredError();
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
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
    throw new Error(`Enquiry submission failed: ${res.status}`);
  }
}

/** Builds a message body that folds product context into the free-text field. */
export function buildProductEnquiryMessage(
  userMessage: string,
  product: { name: string; productCode: string }
): string {
  const header = `Product enquiry: ${product.name} (${product.productCode})`;
  return userMessage.trim() ? `${header}\n\n${userMessage.trim()}` : header;
}
