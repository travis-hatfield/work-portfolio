"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  html: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minimal?: boolean;
};

export default function InlineRichText({ html, onChange, placeholder, minimal }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder ?? "Write..." }),
    ],
    content: html,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral dark:prose-invert prose-sm max-w-none focus:outline-none min-h-[2.5rem]",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Link URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const btn = (active: boolean) =>
    `px-1.5 py-0.5 rounded text-xs font-medium ${active ? "bg-accent text-white" : "hover:bg-foreground/[0.06] text-foreground/70"}`;

  return (
    <div className="rounded border border-border bg-background px-3 py-2">
      {!minimal && (
        <div className="mb-1.5 flex items-center gap-0.5 border-b border-border pb-1.5">
          <button type="button" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
            B
          </button>
          <button type="button" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
            I
          </button>
          <button type="button" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
            • List
          </button>
          <button type="button" className={btn(editor.isActive("link"))} onClick={setLink}>
            Link
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
