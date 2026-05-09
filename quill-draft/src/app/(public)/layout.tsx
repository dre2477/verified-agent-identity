import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { createServerClient } from "@/lib/supabase/server";

async function getSettings(): Promise<Record<string, string>> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase.from("site_settings").select("*");
    const settings: Record<string, string> = {};
    (data ?? []).forEach((row: { key: string; value: string }) => {
      settings[row.key] = row.value;
    });
    return settings;
  } catch {
    return {};
  }
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Navbar logoUrl={settings.logo_url ?? ""} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
