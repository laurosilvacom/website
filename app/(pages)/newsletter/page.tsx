import { type Metadata } from 'next';
import Container from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { createMetadata } from '@/lib/metadata';
import { baseUrl } from '@/app/sitemap';

export const metadata: Metadata = createMetadata({
  title: 'Newsletter',
  description: 'Get updates on software, trails, and community. Subscribe to receive the latest posts and insights.',
  canonical: `${baseUrl}/newsletter`,
});

export default function NewsletterPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <Container width="base">
          <div className="flex flex-col items-center text-center">
            {/* Illustration */}
            <div className="mb-12 sm:mb-16">
              <img
                src="/newsletter-icon.png"
                alt=""
                role="presentation"
                className="w-40 h-40 sm:w-48 sm:h-48 object-contain animate-[float_3s_ease-in-out_infinite]"
                style={{ filter: 'none' }}
              />
            </div>

            {/* Heading */}
            <h1
              className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-3xl"
              style={{
                fontFamily: 'Elan ITC Std, serif',
                letterSpacing: '-0.04em',
              }}
            >
              Where code meets trails
            </h1>

            {/* Subheading */}
            <p className="mb-12 sm:mb-16 text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl">
              I write about building software for the outdoor industry, lessons from the trails, 
              and what I'm learning about growing inclusive communities. Subscribers get new posts 
              and occasional insights that don't make it to the blog.
            </p>

            {/* Newsletter Form */}
            <NewsletterForm />
          </div>
        </Container>
      </section>

      {/* What You'll Get Section */}
      <section className="py-16 lg:py-24 border-t border-border">
        <Container width="base">
          <h2
            className="mb-12 text-2xl sm:text-3xl font-bold text-foreground text-center"
            style={{
              fontFamily: 'Elan ITC Std, serif',
              letterSpacing: '-0.035em',
            }}
          >
            What you'll get
          </h2>

          <div className="grid gap-8 sm:gap-12 md:grid-cols-3 max-w-5xl mx-auto">
            <div>
              <h3
                className="mb-3 text-lg sm:text-xl font-semibold text-foreground"
                style={{
                  fontFamily: 'Elan ITC Std, serif',
                  letterSpacing: '-0.025em',
                }}
              >
                New posts in your inbox
              </h3>
              <p className="text-[15px] text-foreground/80 leading-relaxed">
                Every time I publish something new, you'll be the first to know. 
                No algorithms, no feeds—just direct delivery of new content.
              </p>
            </div>

            <div>
              <h3
                className="mb-3 text-lg sm:text-xl font-semibold text-foreground"
                style={{
                  fontFamily: 'Elan ITC Std, serif',
                  letterSpacing: '-0.025em',
                }}
              >
                Exclusive insights
              </h3>
              <p className="text-[15px] text-foreground/80 leading-relaxed">
                Occasional thoughts, lessons, and discoveries that don't make it 
                to the blog but are worth sharing with the community.
              </p>
            </div>

            <div>
              <h3
                className="mb-3 text-lg sm:text-xl font-semibold text-foreground"
                style={{
                  fontFamily: 'Elan ITC Std, serif',
                  letterSpacing: '-0.025em',
                }}
              >
                No spam, ever
              </h3>
              <p className="text-[15px] text-foreground/80 leading-relaxed">
                I only email when I have something worth sharing. Your inbox 
                is sacred, and I respect that. Unsubscribe anytime with one click.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
