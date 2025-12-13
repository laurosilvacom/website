'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [honeypot, setHoneypot] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (honeypot) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setEmail('');
      setFirstName('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full max-w-md text-center py-12">
        <div className="mb-6 text-6xl" role="img" aria-label="Party popper">
          🎉
        </div>
        <h2
          className="mb-3 text-2xl font-bold text-foreground"
          style={{
            fontFamily: 'Elan ITC Std, serif',
            letterSpacing: '-0.03em',
          }}
        >
          You're subscribed!
        </h2>
        <p className="text-base text-muted-foreground">
          Check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
      {/* Honeypot */}
      <input
        type="checkbox"
        name="accept-terms"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        checked={honeypot}
        onChange={(e) => setHoneypot(e.target.checked)}
        aria-hidden="true"
      />

      {/* First Name */}
      <div>
        <label
          htmlFor="newsletter-firstName"
          className="mb-2.5 block text-sm font-medium text-foreground"
        >
          First Name{' '}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <input
          id="newsletter-firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-lg border-2 border-input bg-background px-4 py-3 text-[15px] text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          placeholder="Alex"
          aria-describedby="firstName-description"
        />
        <span id="firstName-description" className="sr-only">
          Your first name is optional
        </span>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="newsletter-email"
          className="mb-2.5 block text-sm font-medium text-foreground"
        >
          Email <span className="text-destructive" aria-label="required">*</span>
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full rounded-lg border-2 border-input bg-background px-4 py-3 text-[15px] text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          placeholder="you@example.com"
          aria-describedby="email-description"
          aria-required="true"
        />
        <span id="email-description" className="sr-only">
          Your email address for newsletter subscription
        </span>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div role="alert" className="text-sm text-destructive font-medium">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-lg bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>

      {/* Privacy Note */}
      <p className="text-center text-sm text-muted-foreground pt-2">
        I respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}
