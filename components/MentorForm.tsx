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

const STAGE_OPTIONS = [
  { value: "rising", label: "Rising leader (3–7 yrs experience)" },
  { value: "senior", label: "Senior leader (8–15 yrs experience)" },
  { value: "executive", label: "Executive / founder" },
  { value: "author", label: "Author or speaker building a platform" },
];

const FOCUS_OPTIONS = [
  { value: "story", label: "Narrative & speaker brand" },
  { value: "career", label: "Career direction / next chapter" },
  { value: "book", label: "Book or speaking platform" },
  { value: "voice", label: "Communication & executive voice" },
];

export function MentorForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-[color:var(--color-purple-200)] bg-[color:var(--color-purple-50)] p-8">
        <p className="font-display text-2xl text-ink">Application received.</p>
        <p className="mt-2 text-ink-soft leading-relaxed">
          We review applications in cohort cycles. You&apos;ll hear from us with
          next steps and interview windows within ten business days.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus("idle")}
          type="button"
        >
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldShell label="Full name" htmlFor="mentor-name" required>
          <TextField
            id="mentor-name"
            name="name"
            required
            autoComplete="name"
          />
        </FieldShell>
        <FieldShell label="Email" htmlFor="mentor-email" required>
          <TextField
            id="mentor-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </FieldShell>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldShell label="Current role" htmlFor="mentor-role" required>
          <TextField
            id="mentor-role"
            name="role"
            required
            placeholder="VP, founder, partner…"
          />
        </FieldShell>
        <FieldShell label="LinkedIn or website" htmlFor="mentor-link">
          <TextField
            id="mentor-link"
            name="link"
            type="url"
            placeholder="https://"
          />
        </FieldShell>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldShell label="Career stage" htmlFor="mentor-stage" required>
          <SelectField
            id="mentor-stage"
            name="stage"
            required
            options={STAGE_OPTIONS}
          />
        </FieldShell>
        <FieldShell label="Primary focus" htmlFor="mentor-focus" required>
          <SelectField
            id="mentor-focus"
            name="focus"
            required
            options={FOCUS_OPTIONS}
          />
        </FieldShell>
      </div>
      <FieldShell
        label="What are you working toward in the next twelve months?"
        htmlFor="mentor-goal"
        required
      >
        <TextArea
          id="mentor-goal"
          name="goal"
          required
          rows={4}
          placeholder="The visible thing you want true a year from now."
        />
      </FieldShell>
      <FieldShell
        label="Where do you keep getting stuck?"
        htmlFor="mentor-stuck"
        required
      >
        <TextArea
          id="mentor-stuck"
          name="stuck"
          required
          rows={4}
          placeholder="Be honest. We read these carefully."
        />
      </FieldShell>
      {error ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
          {error}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-xs text-muted">
          Cohorts open twice a year. Applications close 30 days before each
          start.
        </p>
        <Button type="submit" disabled={status === "submitting"} size="lg">
          {status === "submitting" ? "Submitting…" : "Apply"}
        </Button>
      </div>
    </form>
  );
}
