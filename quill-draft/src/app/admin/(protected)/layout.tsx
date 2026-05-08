import AdminNav from "@/components/admin/AdminNav";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#0f0f20" }}>
      <AdminNav />
      <main className="flex-1 overflow-auto p-8" style={{ color: "#f5f0e8" }}>
        {children}
      </main>
    </div>
  );
}
