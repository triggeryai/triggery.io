import { buttonVariants } from "@/components/ui/button";
import { PortfolioMdxFrontmatter, getAllPortfolios } from "@/lib/markdown";
import { formatDate2, stringToDate } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Triggery - Portfolio",
};

export default async function PortfolioIndexPage() {
  const portfolios = (await getAllPortfolios()).sort(
    (a, b) =>
      stringToDate(b.frontmatter.date).getTime() -
      stringToDate(a.frontmatter.date).getTime()
  );
  return (
    <div className="w-full flex flex-col gap-1 sm:min-h-[91vh] min-h-[88vh] md:pt-6 pt-2">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">
          The latest projects in our portfolio
        </h1>
        <p className="text-muted-foreground">
          Explore the latest projects developed by our team.
        </p>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {portfolios.map((portfolio) => (
          <PortfolioCard {...portfolio.frontmatter} slug={portfolio.slug} key={portfolio.slug} />
        ))}
      </div>
    </div>
  );
}

function PortfolioCard({
  date,
  title,
  description,
  thumbnail,
  downloadUrl,
  demoUrl,
  slug,
}: PortfolioMdxFrontmatter & { slug: string }) {
  return (
    <div className="flex flex-col gap-2 items-start border rounded-md p-5 pt-7 dark:bg-stone-900 bg-stone-50">
      <Link href={`/portfolio/${slug}`} className="sm:text-lg text-lg font-semibold -mt-1">
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
            Read about Website
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
            Visit Website
          </Link>
        )}
      </div>
    </div>
  );
}
