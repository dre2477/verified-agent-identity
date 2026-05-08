import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export default function BlogPostContent({ content }: { content: string }) {
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
