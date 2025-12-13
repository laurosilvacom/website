'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function NewsletterPopup() {
  const [showBubble, setShowBubble] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [honeypot, setHoneypot] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const dismissed = localStorage.getItem('newsletter-dismissed');
    const subscribed = localStorage.getItem('newsletter-subscribed');
    
    if (dismissed || subscribed) {
      return;
    }

    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShowBubble(false);
    setShowModal(false);
    localStorage.setItem('newsletter-dismissed', 'true');
  };

  const handleAccept = () => {
    setShowBubble(false);
    setShowModal(true);
  };

  const handleDecline = () => {
    setShowBubble(false);
    localStorage.setItem('newsletter-dismissed', 'true');
  };

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
      localStorage.setItem('newsletter-subscribed', 'true');
      
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  if (!showBubble && !showModal) {
    return null;
  }

  return (
    <>
      {/* Speech Bubble */}
      {showBubble && (
        <div
          className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto z-50 max-w-sm"
          style={{
            animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
          role="dialog"
          aria-labelledby="bubble-heading"
          aria-describedby="bubble-description"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            <img 
              src="/newsletter-icon.png" 
              alt="" 
              role="presentation"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain animate-[float_3s_ease-in-out_infinite]"
              style={{ filter: 'none' }}
            />
            <div className="relative w-full rounded-xl border-2 border-border bg-card p-4 sm:p-6 shadow-[4px_4px_0px_0px_var(--border)]">
              <div className="hidden sm:block absolute -left-2 bottom-8 h-4 w-4 rotate-45 border-b-2 border-l-2 border-border bg-card" />
              <p id="bubble-description" className="mb-4 text-sm sm:text-base text-foreground leading-relaxed">
                Hi friend! Hope I didn't startle you. Can I tell you about my newsletter?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAccept}
                  className="rounded-lg bg-primary px-4 py-2.5 sm:py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Accept newsletter subscription"
                >
                  Sure!
                </button>
                <button
                  onClick={handleDecline}
                  className="rounded-lg border-2 border-border bg-card px-4 py-2.5 sm:py-2 text-sm font-medium text-foreground transition-all hover:bg-muted active:scale-95 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Decline newsletter subscription"
                >
                  No thanks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          style={{
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-heading"
          onClick={handleDismiss}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border-2 border-border bg-card shadow-[8px_8px_0px_0px_var(--border)]"
            style={{
              animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleDismiss}
              className="sticky top-4 right-4 ml-auto mr-4 z-10 rounded-lg p-2 text-foreground/60 transition-colors hover:bg-muted hover:text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center"
              aria-label="Close newsletter dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            {/* Header with illustration */}
            <div className="rounded-t-xl bg-gradient-to-br from-primary/20 to-primary/10 px-6 py-12 sm:px-10 sm:py-16 flex justify-center items-center -mt-12">
              <img 
                src="/newsletter-icon.png" 
                alt="" 
                role="presentation"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain animate-[float_3s_ease-in-out_infinite]"
                style={{ filter: 'none' }}
              />
            </div>

            {/* Content */}
            <div className="px-6 pt-6 pb-8 sm:px-10 sm:pt-8 sm:pb-10 bg-card rounded-b-xl">
              {status === 'success' ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="mb-4 sm:mb-6 text-5xl sm:text-6xl" role="img" aria-label="Party popper">🎉</div>
                  <h2 id="modal-heading" className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold text-foreground" style={{ fontFamily: 'Elan ITC Std, serif', letterSpacing: '-0.03em' }}>
                    You're subscribed!
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Thanks for joining the newsletter.
                  </p>
                </div>
              ) : (
                <>
                  {/* Heading */}
                  <h2 id="modal-heading" className="mb-6 sm:mb-8 text-xl sm:text-2xl font-bold text-foreground leading-tight" style={{ fontFamily: 'Elan ITC Std, serif', letterSpacing: '-0.03em' }}>
                    Get insights on software, trails, and community
                  </h2>
                  
                  {/* Description */}
                  <div className="mb-8 sm:mb-10 space-y-4 sm:space-y-5">
                    <p className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
                      I write about building software for the outdoor industry, lessons from the trails, 
                      and what I'm learning about growing inclusive communities. Subscribers get new posts 
                      and occasional insights that don't make it to the blog.
                    </p>

                    <p className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
                      No spam. Just thoughtful writing when I have something worth sharing.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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

                    <div>
                      <label htmlFor="firstName" className="mb-2 sm:mb-2.5 block text-sm font-medium text-foreground">
                        First Name <span className="text-muted-foreground font-normal">(optional)</span>
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded-lg border-2 border-input bg-background px-4 py-3 text-sm sm:text-[15px] text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                        placeholder="Alex"
                        aria-describedby="firstName-description"
                      />
                      <span id="firstName-description" className="sr-only">Your first name is optional</span>
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 sm:mb-2.5 block text-sm font-medium text-foreground">
                        Email <span className="text-destructive" aria-label="required">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="w-full rounded-lg border-2 border-input bg-background px-4 py-3 text-sm sm:text-[15px] text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                        placeholder="antonio@yahoo.com"
                        aria-describedby="email-description"
                        aria-required="true"
                      />
                      <span id="email-description" className="sr-only">Your email address for newsletter subscription</span>
                    </div>

                    {errorMessage && (
                      <div role="alert" className="text-sm text-destructive font-medium pt-1">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm sm:text-[15px] font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-busy={status === 'loading'}
                    >
                      {status === 'loading' ? 'Subscribing...' : 'Subscribe!'}
                    </button>
                  </form>

                  {/* Footer note */}
                  <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground">
                    If you change your mind, it's super easy to unsubscribe. 💨
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
