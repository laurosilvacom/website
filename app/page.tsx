import Link from "next/link";
import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <main className="max-w-screen-lg mx-auto py-12 bg-background text-foreground">
      <section className="mb-20">
        <h1 className="text-4xl font-semibold mb-8 tracking-tight">
          My Portfolio
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
          {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
          Vim's keystroke commands and tabs' flexibility for personal viewing
          preferences. This extends to my support for static typing, where its
          early error detection ensures cleaner code, and my preference for dark
          mode, which eases long coding sessions by reducing eye strain.`}
        </p>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {`On this site, you can check out all the `}
          <Link
            href="/blog"
            className="underline text-primary hover:text-primary-foreground transition-colors"
          >
            articles
          </Link>
          {` I've written or learn more `}
          <Link
            href="/about"
            className="underline text-primary hover:text-primary-foreground transition-colors"
          >
            about me
          </Link>
          {`.`}
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-4xl font-semibold mb-8 tracking-tight">Articles</h2>
        <BlogPosts />
        <div className="mt-10">
          <Link
            href="/blog"
            className="text-primary font-medium underline hover:text-primary-foreground transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-4xl font-semibold mb-8 tracking-tight">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Example Project */}
          <div className="bg-card p-8 rounded-default shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4">Project Title</h3>
            <p className="text-muted-foreground mb-6">
              Brief description of the project.
            </p>
            <Link
              href="/projects/project-slug"
              className="text-primary font-medium underline hover:text-primary-foreground transition-colors"
            >
              Learn More
            </Link>
          </div>
          {/* Add more project cards as needed */}
        </div>
        <div className="mt-10">
          <Link
            href="/projects"
            className="text-primary font-medium underline hover:text-primary-foreground transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
