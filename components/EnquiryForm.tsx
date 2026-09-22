"use client";

import { useState, type FormEvent } from "react";
import { submitEnquiry, SupabaseNotConfiguredError } from "@/lib/supabase";

/**
 * Shared enquiry form used by /booking, /contact and product detail pages.
 * Submits to the SAME real Supabase `inquiries` table verified for v1 — this
 * is a live backend, not a mock handler, so the success state reflects an
 * actual received enquiry.
 *
 * The `inquiries` table has no dedicated columns for subject/city/country/
 * profession/product — those are folded into the `message` field as
 * labelled lines so nothing the visitor enters is lost, while the schema
 * stays untouched. Swap in a richer backend later without changing the UI.
 */

type Variant = "booking" | "contact" | "product";

interface EnquiryFormProps {
  variant: Variant;
  source: string;
  product?: { name: string; productCode: string };
  productOptions?: string[];
}

const PROFESSIONS = [
  "Architect",
  "Interior Designer",
  "Contractor",
  "Dealer / Distributor",
  "Builder / Developer",
  "Homeowner",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({ variant, source, product, productOptions }: EnquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    country: "",
    profession: "",
    productInterest: product?.name ?? "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState(false);

  function update<K extends keyof typeof values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  const nameError = touched && !values.name.trim() ? "Name is required." : null;
  const messageError = touched && !values.message.trim() ? "Please tell us about your requirement." : null;
  const emailError =
    touched && values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
      ? "Enter a valid email address."
      : null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (!values.name.trim() || !values.message.trim() || emailError) {
      return;
    }

    setStatus("submitting");
    setError(null);

    const contextLines = [
      product && `Product enquiry: ${product.name} (${product.productCode})`,
      variant === "booking" && values.profession && `Profession: ${values.profession}`,
      values.productInterest && !product && `Product interest: ${values.productInterest}`,
      variant === "contact" && values.subject && `Subject: ${values.subject}`,
      (values.city || values.country) &&
        `Location: ${[values.city, values.country].filter(Boolean).join(", ")}`,
    ].filter(Boolean);

    const fullMessage = [...contextLines, "", values.message.trim()].filter((l) => l !== undefined).join("\n");

    try {
      await submitEnquiry({
        name: values.name.trim(),
        email: values.email.trim() || undefined,
        phone: values.phone.trim() || undefined,
        company: values.company.trim() || undefined,
        message: fullMessage,
        source,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      if (err instanceof SupabaseNotConfiguredError) {
        setError("This form is not yet connected to a backend in this environment.");
      } else {
        setError("Something went wrong. Please try again, or contact us directly by phone.");
      }
    }
  }

  if (status === "success") {
    return (
      <div className="border border-stone-300 bg-stone-50 px-6 py-10 text-center" role="status">
        <p className="font-display text-[22px] text-stone-900">Thank you — received.</p>
        <p className="mt-2 text-[15px] text-stone-600">
          Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {product && (
        <div className="border border-stone-300 bg-stone-50 px-4 py-3 text-[14px] text-stone-700">
          Enquiring about <strong className="font-semibold">{product.name}</strong> ({product.productCode})
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name *" error={nameError}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(!!nameError)}
            autoComplete="name"
          />
        </Field>
        <Field label="Company">
          <input
            type="text"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass(false)}
            autoComplete="organization"
          />
        </Field>
        <Field label="Email" error={emailError}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(!!emailError)}
            autoComplete="email"
          />
        </Field>
        <Field label="Phone">
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(false)}
            autoComplete="tel"
          />
        </Field>

        {(variant === "booking" || variant === "contact") && (
          <>
            <Field label="City">
              <input
                type="text"
                value={values.city}
                onChange={(e) => update("city", e.target.value)}
                className={inputClass(false)}
                autoComplete="address-level2"
              />
            </Field>
            <Field label="Country">
              <input
                type="text"
                value={values.country}
                onChange={(e) => update("country", e.target.value)}
                className={inputClass(false)}
                autoComplete="country-name"
              />
            </Field>
          </>
        )}

        {variant === "booking" && (
          <Field label="Profession">
            <select
              value={values.profession}
              onChange={(e) => update("profession", e.target.value)}
              className={inputClass(false)}
            >
              <option value="">Select…</option>
              {PROFESSIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>
        )}

        {variant === "booking" && !product && (
          <Field label="Product Interest">
            <select
              value={values.productInterest}
              onChange={(e) => update("productInterest", e.target.value)}
              className={inputClass(false)}
            >
              <option value="">Select…</option>
              {(productOptions ?? []).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>
        )}

        {variant === "contact" && (
          <Field label="Subject" className="sm:col-span-2">
            <input
              type="text"
              value={values.subject}
              onChange={(e) => update("subject", e.target.value)}
              className={inputClass(false)}
            />
          </Field>
        )}
      </div>

      <Field label={variant === "booking" ? "Your Requirement *" : "Message *"} error={messageError}>
        <textarea
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          className={`${inputClass(!!messageError)} resize-y`}
          placeholder="Tell us about your project — finishes, quantity, location, timeline…"
        />
      </Field>

      {status === "error" && error && (
        <p className="text-[14px] text-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center bg-stone-900 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-stone-50 transition-colors hover:bg-ember disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string | null;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-stone-500">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-[13px] text-error">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full border bg-white px-4 py-3 text-[15px] text-stone-900 transition-colors focus:border-stone-900 ${
    hasError ? "border-error" : "border-stone-300"
  }`;
}
