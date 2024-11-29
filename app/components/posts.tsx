import Link from "next/link";
import Image from "next/image";
import { formatDate, getBlogPosts } from "app/blog/utils";

export async function BlogPosts() {
  const allBlogs = await getBlogPosts();

  return (
    <div className="space-y-6">
      {allBlogs
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime(),
        )
        .map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <div className="flex items-center space-x-4 p-4 bg-card rounded-default hover:bg-muted transition">
              {post.metadata.icon && (
                <Image
                  src={post.metadata.icon}
                  alt={`${post.metadata.title} icon`}
                  width={40}
                  height={40}
                  quality={100}
                  className="rounded-default flex-shrink-0"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {post.metadata.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
