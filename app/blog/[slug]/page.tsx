import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30;

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == "${slug}"] {
  "currentSlug": slug.current,
    title,
    content,
    titleImage
}[0]`;

  const data = await client.fetch(query);

  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);
  console.log(data);
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-bas text-center text-primary font-semibold tracking-wide uppercase">
          Jeremy Klassen - Blog
        </span>
        <span className="mt-2 block text-3xl text-center loading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        alt={`image for ${data.title}`}
        width={500}
        height={500}
        priority
        className="mx-auto round-lg mt-8 border"
      />
      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
