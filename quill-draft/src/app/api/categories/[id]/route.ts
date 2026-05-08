import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  const supabase = createAdminClient();
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const { data, error } = await supabase
    .from("categories")
    .update({ name, slug: slugify(name) })
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: Params) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("categories").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
