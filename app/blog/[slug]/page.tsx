import { notFound } from "next/navigation";
import { formatDate, getBlogPosts } from "app/blog/utils";
import type { Metadata } from "next";
import { CustomMDX } from "app/components/mdx";

const baseUrl = "https://yourwebsite.example.com/";

interface PageMetadata extends Metadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    publishedTime: string;
    url: string;
    images: { url: string }[];
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
}

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  props: Props,
): Promise<PageMetadata | null> {
  const params = await props.params;

  if (!params || !params.slug) {
    return null;
  }

  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    return null;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage = image
    ? `${baseUrl}${image}`
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog(props: Props) {
  const params = await props.params;

  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
