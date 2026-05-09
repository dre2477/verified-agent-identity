export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#0f0f20" }}>

      <aside style={{
        width: "224px",
        minHeight: "100vh",
        flexShrink: 0,
        backgroundColor: "#1a1a2e",
        borderRight: "1px solid rgba(201,168,76,0.2)",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
          <a href="/" style={{ color: "#c9a84c", fontWeight: "bold", fontSize: "18px", textDecoration: "none", fontFamily: "Georgia,serif" }}>
            ✒ The Quill
          </a>
          <p style={{ color: "rgba(245,240,232,0.4)", fontSize: "12px", margin: "4px 0 0" }}>Admin Dashboard</p>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          <a href="/admin" style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", marginBottom:"2px", borderRadius:"8px", color:"rgba(245,240,232,0.75)", textDecoration:"none", fontSize:"14px", fontWeight:500 }}>
            <span>◈</span> Dashboard
          </a>
          <a href="/admin/posts" style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", marginBottom:"2px", borderRadius:"8px", color:"rgba(245,240,232,0.75)", textDecoration:"none", fontSize:"14px", fontWeight:500 }}>
            <span>✍</span> Posts
          </a>
          <a href="/admin/posts/new" style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", marginBottom:"2px", borderRadius:"8px", color:"rgba(245,240,232,0.75)", textDecoration:"none", fontSize:"14px", fontWeight:500 }}>
            <span>+</span> New Post
          </a>
          <a href="/admin/categories" style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", marginBottom:"2px", borderRadius:"8px", color:"rgba(245,240,232,0.75)", textDecoration:"none", fontSize:"14px", fontWeight:500 }}>
            <span>⊞</span> Categories
          </a>
          <a href="/admin/settings" style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", marginBottom:"2px", borderRadius:"8px", color:"rgba(245,240,232,0.75)", textDecoration:"none", fontSize:"14px", fontWeight:500 }}>
            <span>⚙</span> Settings
          </a>
        </nav>

        {/* Bottom links */}
        <div style={{ padding: "12px", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
          <a href="/" style={{ display:"flex", alignItems:"center", gap:"10px", padding:"8px 12px", borderRadius:"8px", color:"rgba(245,240,232,0.5)", textDecoration:"none", fontSize:"14px" }}>
            <span>←</span> View Site
          </a>
          <form action="/api/auth/signout" method="POST" style={{ margin: 0 }}>
            <button type="submit" style={{ display:"flex", alignItems:"center", gap:"10px", width:"100%", padding:"8px 12px", marginTop:"2px", borderRadius:"8px", color:"rgba(245,240,232,0.5)", background:"none", border:"none", cursor:"pointer", fontSize:"14px", textAlign:"left" }}>
              <span>⏻</span> Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8" style={{ color: "#f5f0e8" }}>
        {children}
      </main>
    </div>
  );
}
