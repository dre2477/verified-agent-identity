"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useRef } from "react";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const ToolbarBtn = ({ onClick, active, title, children }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className="px-2 py-1 rounded text-sm font-medium transition-all hover:opacity-80"
    style={{
      backgroundColor: active ? "rgba(201,168,76,0.2)" : "transparent",
      color: active ? "#c9a84c" : "var(--fg)",
      border: active ? "1px solid rgba(201,168,76,0.4)" : "1px solid transparent",
    }}
  >
    {children}
  </button>
);

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Placeholder.configure({ placeholder: "Start writing your article here…" }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: "tiptap prose max-w-none p-4 min-h-[400px] focus:outline-none" },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-alt)" }}>
        {/* Heading */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">H1</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">H2</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">H3</ToolbarBtn>

        <span className="w-px h-5 mx-1" style={{ backgroundColor: "var(--border)" }} />

        {/* Inline formatting */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><strong>B</strong></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><em>I</em></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><span style={{ textDecoration: "underline" }}>U</span></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><s>S</s></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline code">{"</>"}</ToolbarBtn>

        <span className="w-px h-5 mx-1" style={{ backgroundColor: "var(--border)" }} />

        {/* Lists */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">• List</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">1. List</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">&ldquo; &rdquo;</ToolbarBtn>

        <span className="w-px h-5 mx-1" style={{ backgroundColor: "var(--border)" }} />

        {/* Alignment */}
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align left">⟵</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Center">⊕</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align right">⟶</ToolbarBtn>

        <span className="w-px h-5 mx-1" style={{ backgroundColor: "var(--border)" }} />

        {/* Link & Image */}
        <ToolbarBtn onClick={addLink} active={editor.isActive("link")} title="Add link">🔗</ToolbarBtn>
        <ToolbarBtn onClick={() => fileInputRef.current?.click()} title="Insert image">🖼</ToolbarBtn>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); e.target.value = ""; }} />

        <span className="w-px h-5 mx-1" style={{ backgroundColor: "var(--border)" }} />

        {/* Undo/Redo */}
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">↩</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">↪</ToolbarBtn>

        {/* Char count */}
        <span className="ml-auto text-xs" style={{ color: "var(--muted)" }}>
          {editor.storage.characterCount.words()} words
        </span>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  );
}
