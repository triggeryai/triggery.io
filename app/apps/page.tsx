import { buttonVariants } from "@/components/ui/button";
import { BlogMdxFrontmatter, getAllBlogs } from "@/lib/markdown";
import { formatDate2, stringToDate } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AriaDocs - Blog",
};

export default async function BlogIndexPage() {
  const blogs = (await getAllBlogs()).sort(
    (a, b) =>
      stringToDate(b.frontmatter.date).getTime() -
      stringToDate(a.frontmatter.date).getTime()
  );
  return (
    <div className="w-full flex flex-col gap-1 sm:min-h-[91vh] min-h-[88vh] md:pt-6 pt-2">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">
          The latest blogs of this product
        </h1>
        <p className="text-muted-foreground">
          All the latest blogs and news, straight from the team.
        </p>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {blogs.map((blog) => (
          <BlogCard {...blog.frontmatter} slug={blog.slug} key={blog.slug} />
        ))}
      </div>
    </div>
  );
}

function BlogCard({
  date,
  title,
  description,
  thumbnail,
  downloadUrl,
  demoUrl,
  slug,
}: BlogMdxFrontmatter & { slug: string }) {
  return (
    <div className="flex flex-col gap-2 items-start border rounded-md p-5 pt-7 dark:bg-stone-900 bg-stone-50">
      <Link href={`/blog/${slug}`} className="sm:text-lg text-lg font-semibold -mt-1">
        {title}
      </Link>

      {/* Thumbnail Image */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={`${title} thumbnail`}
          className="w-full h-auto rounded-md"
        />
      )}

      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-[13px] text-muted-foreground mb-1">
        Published on {formatDate2(date)}
      </p>

      <div className="flex gap-2 w-full mt-auto">
        {downloadUrl && (
          <Link
            href={downloadUrl}
            className={`${buttonVariants({
              className: "w-full",
              variant: "primary",
              size: "sm",
            })} hover:bg-blue-600 hover:text-white transition duration-300`}
          >
            Download App
          </Link>
        )}
        {demoUrl && (
          <Link
            href={demoUrl}
            className={`${buttonVariants({
              className: "w-full",
              variant: "outline",
              size: "sm",
            })} hover:bg-gray-200 hover:text-black transition duration-300`}
          >
            Visit Live DEMO
          </Link>
        )}
      </div>
    </div>
  );
}

