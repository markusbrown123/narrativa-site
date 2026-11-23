# Contact form

The contact form on `/contact` is delivered by **Netlify Forms**. There is no
server code and no mail server to maintain: Netlify stores every submission and
emails a copy to the notification address set in the Netlify dashboard.

## How it works

- `public/__forms.html` is a hidden, static copy of the form. Netlify reads it at
  deploy time and registers a form called `contact`.
- `components/ContactForm.tsx` is the form visitors see. It posts the same field
  names to `/__forms.html`. The two files must keep identical field names.
- A hidden `bot-field` honeypot drops most spam before it reaches the inbox.
- If Netlify does not accept a submission, the visitor sees "Your note didn't go
  through" instead of a false "Thank you". Nothing is silently discarded.

## One-time Netlify setup

1. **Site configuration → Forms → Enable form detection.** Then trigger a new
   deploy (Deploys → Trigger deploy → Deploy site) so Netlify registers the form.
2. Check **Forms** in the Netlify dashboard: a form named `contact` should be
   listed.
3. **Site configuration → Notifications → Emails and webhooks → Form submission
   notifications → Add notification → Email notification.** Choose the
   `contact` form and enter the inbox Nicole confirms.
4. Send a test from the live `/contact` page and confirm it arrives in both the
   Netlify Forms list and the inbox.

Until step 3 is done, submissions are still kept safely in Netlify → Forms →
`contact`, so nothing sent in the meantime is lost.

## Testing locally

`npm run dev` and `npm start` cannot accept Netlify form posts, so a local
submission shows the "didn't go through" message. That is expected. Use a
Netlify deploy preview, or `netlify dev`, to test delivery.
