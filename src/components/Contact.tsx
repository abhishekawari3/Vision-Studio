import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react';
import { useSectionReveal } from '../lib/gsap';
import { EMAIL, enquiryTypes, socials } from '../lib/data';
import { Lines } from './ui';

type Fields = { name: string; email: string; company: string; message: string };
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMPTY: Fields = { name: '', email: '', company: '', message: '' };

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

const inputClass =
  'mt-2 block w-full border-2 border-line bg-ink px-4 py-3 text-base text-white placeholder:text-fog/70 transition-colors focus:border-sun focus:outline-none aria-[invalid=true]:border-alert';

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [topics, setTopics] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState<{ href: string; text: string } | null>(null);
  const [copied, setCopied] = useState<'email' | 'draft' | null>(null);

  useSectionReveal(root);

  // Service rows elsewhere on the page can pre-select what the enquiry is about
  useEffect(() => {
    const onEnquiry = (e: Event) => {
      const topic = (e as CustomEvent<string>).detail;
      setDraft(null);
      setTopics((prev) => (prev.includes(topic) ? prev : [...prev, topic]));
    };
    window.addEventListener('vision:enquiry', onEnquiry);
    return () => window.removeEventListener('vision:enquiry', onEnquiry);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(null), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleTopic = (t: string) =>
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!fields.name.trim()) next.name = 'Tell us who you are.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Enter an email we can reply to.';
    if (fields.message.trim().length < 10) next.message = 'Give us a sentence or two about the idea.';
    setErrors(next);

    const first = (['name', 'email', 'message'] as const).find((k) => next[k]);
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    const company = fields.company.trim();
    const subject = `Project enquiry from ${fields.name.trim()}${company ? ` (${company})` : ''}`;
    const lines = [`Name: ${fields.name.trim()}`, `Email: ${fields.email.trim()}`];
    if (company) lines.push(`Company: ${company}`);
    if (topics.length > 0) lines.push(`Looking for: ${topics.join('; ')}`);
    lines.push('', fields.message.trim());
    const text = lines.join('\n');

    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    setDraft({ href, text });
    window.location.href = href;
  };

  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-ink text-white">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="wrap relative py-24 lg:py-32">
        <h2
          data-head
          className="font-display text-[clamp(2.25rem,9.4vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.05em]"
        >
          <Lines lines={['Have an idea', <span className="text-sun">worth building?</span>]} />
        </h2>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p data-reveal className="max-w-md text-xl leading-relaxed text-white">
              Let&rsquo;s turn your vision into something real. Partner with engineers and product designers who
              treat your software like their own.
            </p>

            <dl data-stagger className="mt-12 border-t border-line">
              <div className="grid gap-2 border-b border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="pt-1 font-mono text-xs font-bold uppercase tracking-[0.18em] text-sky">Email</dt>
                <dd className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-display text-2xl font-bold tracking-[-0.02em] text-white underline decoration-sun decoration-2 underline-offset-[6px] transition-colors hover:text-sun"
                  >
                    {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={async () => {
                      if (await copyText(EMAIL)) setCopied('email');
                    }}
                    className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1.5 font-mono text-xs text-fog transition-colors hover:border-sun hover:text-sun"
                  >
                    {copied === 'email' ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                    <span aria-live="polite">{copied === 'email' ? 'Copied' : 'Copy'}</span>
                  </button>
                </dd>
              </div>
              <div className="grid gap-2 border-b border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="pt-1 font-mono text-xs font-bold uppercase tracking-[0.18em] text-sky">Studio</dt>
                <dd className="text-lg leading-relaxed text-white">
                  <address className="not-italic">
                    VISION Studio
                    <br />
                    Sangamner, Ahilyanagar
                    <br />
                    Maharashtra, India 422605
                  </address>
                </dd>
              </div>
              <div className="grid gap-2 border-b border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="pt-1 font-mono text-xs font-bold uppercase tracking-[0.18em] text-sky">Social</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1 text-lg font-semibold text-white transition-colors hover:text-sun"
                        >
                          {s.label}
                          <ArrowUpRight
                            className="h-4 w-4 text-sky transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                            aria-hidden="true"
                          />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div data-reveal className="lg:col-span-7">
            <div className="border-2 border-line bg-ink-2 p-5 sm:p-8 lg:p-10">
              {draft ? (
                <div role="status">
                  <span className="grid h-12 w-12 place-items-center bg-sun text-ink">
                    <Check className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white">
                    Your enquiry is drafted.
                  </h3>
                  <p className="mt-3 max-w-lg text-lg leading-relaxed text-fog">
                    Your email app should have opened with the message below addressed to {EMAIL}. Press send
                    there to deliver it. If nothing opened, copy the text and email it to us directly.
                  </p>
                  <pre className="mt-6 max-h-56 overflow-auto whitespace-pre-wrap border border-line bg-ink p-4 font-mono text-sm leading-relaxed text-white">
                    {draft.text}
                  </pre>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={draft.href}
                      className="inline-flex items-center gap-2 bg-sun px-5 py-3 text-[15px] font-bold text-ink transition-colors hover:bg-white"
                    >
                      Open email again
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={async () => {
                        if (await copyText(draft.text)) setCopied('draft');
                      }}
                      className="inline-flex items-center gap-2 border-2 border-white/25 px-5 py-2.5 text-[15px] font-bold text-white transition-colors hover:border-sky hover:text-sky"
                    >
                      {copied === 'draft' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                      <span aria-live="polite">{copied === 'draft' ? 'Copied' : 'Copy enquiry text'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDraft(null)}
                      className="px-3 py-2.5 text-[15px] font-bold text-fog underline underline-offset-4 transition-colors hover:text-white"
                    >
                      Edit enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h3 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white">
                    Tell us what you&rsquo;re building
                  </h3>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="text-sm font-bold text-white">
                        Your name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        value={fields.name}
                        onChange={set('name')}
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={inputClass}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-2 text-sm font-medium text-alert">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-sm font-bold text-white">
                        Work email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        value={fields.email}
                        onChange={set('email')}
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={inputClass}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-2 text-sm font-medium text-alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-company" className="text-sm font-bold text-white">
                        Company <span className="font-normal text-fog">(optional)</span>
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        autoComplete="organization"
                        value={fields.company}
                        onChange={set('company')}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <fieldset className="mt-7">
                    <legend className="text-sm font-bold text-white">
                      What do you need? <span className="font-normal text-fog">Pick any that apply.</span>
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {enquiryTypes.map((t) => {
                        const on = topics.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleTopic(t)}
                            className={`inline-flex items-center gap-2 border-2 px-3 py-2 text-left text-sm font-semibold transition-colors duration-200 ${
                              on
                                ? 'border-sun bg-sun text-ink'
                                : 'border-line text-white hover:border-sky hover:text-sky'
                            }`}
                          >
                            {on && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-7">
                    <label htmlFor="contact-message" className="text-sm font-bold text-white">
                      About the idea
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={fields.message}
                      onChange={set('message')}
                      placeholder="What are you building, who is it for, and when do you need it?"
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`${inputClass} resize-y`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-2 text-sm font-medium text-alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <button
                      type="submit"
                      className="group/btn inline-flex items-center gap-2.5 bg-sun px-7 py-4 text-base font-bold text-ink transition-colors duration-200 hover:bg-white"
                    >
                      Send enquiry
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
                    </button>
                    <p className="max-w-xs text-sm leading-snug text-fog">
                      Opens a ready-to-send draft in your email app, addressed to {EMAIL}.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
