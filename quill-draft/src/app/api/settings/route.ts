import { NextResponse } from "next/server";
import { createAdminClient, createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data } = await supabase.from("site_settings").select("*");
    const settings: Record<string, string> = {};
    (data ?? []).forEach((row: { key: string; value: string }) => {
      settings[row.key] = row.value;
    });
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({});
  }
}

export async function PUT(req: Request) {
  const supabase = createAdminClient();
  const body: Record<string, string> = await req.json();
  for (const [key, value] of Object.entries(body)) {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
