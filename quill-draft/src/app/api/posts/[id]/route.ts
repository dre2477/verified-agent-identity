import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { slugify, calcReadTime } from "@/lib/utils";
import type { Database } from "@/lib/supabase/types";

type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];
type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(id,name,slug,created_at)")
    .eq("id", params.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: Params) {
  const supabase = createAdminClient();
  const body = await req.json();
  const { title, content, excerpt, featured_image_url, category_id, status } = body;

  const updates: PostUpdate = { updated_at: new Date().toISOString() };
  if (title !== undefined) { updates.title = title; updates.slug = slugify(title); }
  if (content !== undefined) { updates.content = content; updates.read_time = calcReadTime(content); }
  if (excerpt !== undefined) updates.excerpt = excerpt || null;
  if (featured_image_url !== undefined) updates.featured_image_url = featured_image_url || null;
  if (category_id !== undefined) updates.category_id = category_id || null;
  if (status !== undefined) updates.status = status;

  const { data, error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: Params) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("posts").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
