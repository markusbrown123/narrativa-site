"use client";

import { useState } from "react";
import { Button } from "./Button";
import {
  FieldShell,
  SelectField,
  TextArea,
  TextField,
} from "./FormField";

type Status = "idle" | "submitting" | "ok" | "error";

const NETLIFY_FORM_NAME = "contact";
const NETLIFY_FORM_PATH = "/__forms.html";

const INQUIRY_OPTIONS = [
  { value: "speaking", label: "Speaking inquiry" },
  { value: "media", label: "Press / media" },
  { value: "consulting", label: "Consulting" },
  { value: "book", label: "Book event" },
  { value: "general", label: "Something else" },
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => {
      if (typeof value === "string") body.append(key, value);
    });

    try {
      // Netlify Forms stores every submission (Netlify → Forms → contact) and
      // emails it to the notification address set there. The form is
      // registered by public/__forms.html, so it must post to that file.
      const res = await fetch(NETLIFY_FORM_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Form returned ${res.status}`);
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
      setError(
        "Your note didn't go through. Please try again in a moment.",
      );
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-[color:var(--color-purple-200)] bg-[color:var(--color-purple-50)] p-8">
        <p className="font-display text-2xl text-ink">Thank you.</p>
        <p className="mt-2 text-ink-soft leading-relaxed">
          Your note is in. Nicole reads every message personally and will be in
          touch. For time-sensitive media, please mark your subject line
          accordingly.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus("idle")}
          type="button"
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      name={NETLIFY_FORM_NAME}
      method="POST"
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      {/* Honeypot: hidden from people, filled in by bots, dropped by Netlify. */}
      <p className="sr-only" aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldShell label="Your name" htmlFor="contact-name" required>
          <TextField
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Nicole Stephenson"
          />
        </FieldShell>
        <FieldShell label="Email" htmlFor="contact-email" required>
          <TextField
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </FieldShell>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldShell label="Organization" htmlFor="contact-org">
          <TextField
            id="contact-org"
            name="organization"
            autoComplete="organization"
            placeholder="Where you're writing from"
          />
        </FieldShell>
        <FieldShell label="Inquiry type" htmlFor="contact-type" required>
          <SelectField
            id="contact-type"
            name="inquiry_type"
            required
            options={INQUIRY_OPTIONS}
          />
        </FieldShell>
      </div>
      <FieldShell
        label="Tell us about the moment"
        htmlFor="contact-message"
        hint="Date, audience, dream guest, deadline — whatever helps."
        required
      >
        <TextArea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="What's the room, the goal, and the deadline?"
        />
      </FieldShell>
      {error ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-muted">
          Nicole reads every message personally.
        </p>
        <Button type="submit" disabled={status === "submitting"} size="lg">
          {status === "submitting" ? "Sending…" : "Send note"}
        </Button>
      </div>
    </form>
  );
}
