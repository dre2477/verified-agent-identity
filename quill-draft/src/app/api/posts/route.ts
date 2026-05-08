import { NextResponse } from "next/server";
import { createAdminClient, createServerClient } from "@/lib/supabase/server";
import { slugify, calcReadTime } from "@/lib/utils";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(id,name,slug,created_at)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createAdminClient();
  const body = await req.json();
  const { title, content, excerpt, featured_image_url, category_id, status } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const slug = slugify(title);
  const read_time = calcReadTime(content);

  const { data, error } = await supabase
    .from("posts")
    .insert({ title, slug, content, excerpt: excerpt || null, featured_image_url: featured_image_url || null, category_id: category_id || null, status: status || "draft", read_time })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
