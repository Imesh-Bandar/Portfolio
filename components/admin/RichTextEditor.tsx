'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { useCallback, useEffect } from 'react';
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiCode,
  FiList,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiLink,
  FiImage,
  FiType,
} from 'react-icons/fi';
import './RichTextEditor.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing your blog content...',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[400px] p-4',
        'data-placeholder': placeholder,
      },
    },
  });

  // Update editor content when external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;

    const url = window.prompt('Image URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all duration-200 hover:bg-[#C1BFBE]/20 ${
        isActive ? 'bg-[#C1BFBE]/30 text-[#2E2622]' : 'text-[#5F5F60] hover:text-[#2E2622]'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border-2 border-[#5F5F60]/30 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-[#F5F5F5] to-[#FAFAFA] border-b border-[#5F5F60]/20 p-2 flex flex-wrap gap-1">
        {/* Text Styles */}
        <div className="flex gap-1 border-r border-[#5F5F60]/20 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <FiBold className="w-5 h-5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <FiItalic className="w-5 h-5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
          >
            <FiUnderline className="w-5 h-5" />
          </ToolbarButton>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-[#5F5F60]/20 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <span className="font-bold text-lg">H1</span>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <span className="font-bold">H2</span>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <span className="font-semibold text-sm">H3</span>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive('paragraph')}
            title="Paragraph"
          >
            <FiType className="w-5 h-5" />
          </ToolbarButton>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-[#5F5F60]/20 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <FiList className="w-5 h-5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <span className="font-bold">1.</span>
          </ToolbarButton>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r border-[#5F5F60]/20 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <FiAlignLeft className="w-5 h-5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <FiAlignCenter className="w-5 h-5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <FiAlignRight className="w-5 h-5" />
          </ToolbarButton>
        </div>

        {/* Code & Quote */}
        <div className="flex gap-1 border-r border-[#5F5F60]/20 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="Inline Code"
          >
            <FiCode className="w-5 h-5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <span className="font-mono text-sm font-bold">{'{ }'}</span>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <span className="font-bold text-lg">"</span>
          </ToolbarButton>
        </div>

        {/* Links & Images */}
        <div className="flex gap-1 border-r border-[#5F5F60]/20 pr-2">
          <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} title="Insert Link">
            <FiLink className="w-5 h-5" />
          </ToolbarButton>

          <ToolbarButton onClick={addImage} title="Insert Image">
            <FiImage className="w-5 h-5" />
          </ToolbarButton>
        </div>

        {/* Text Colors */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().setColor('#000000').run()}
            title="Black"
            className="w-8 h-8 rounded-lg bg-black border-2 border-[#5F5F60]/30 hover:scale-110 transition-transform"
          />
          <button
            type="button"
            onClick={() => editor.chain().focus().setColor('#DC2626').run()}
            title="Red"
            className="w-8 h-8 rounded-lg bg-red-600 border-2 border-[#5F5F60]/30 hover:scale-110 transition-transform"
          />
          <button
            type="button"
            onClick={() => editor.chain().focus().setColor('#2563EB').run()}
            title="Blue"
            className="w-8 h-8 rounded-lg bg-blue-600 border-2 border-[#5F5F60]/30 hover:scale-110 transition-transform"
          />
          <button
            type="button"
            onClick={() => editor.chain().focus().setColor('#16A34A').run()}
            title="Green"
            className="w-8 h-8 rounded-lg bg-green-600 border-2 border-[#5F5F60]/30 hover:scale-110 transition-transform"
          />
        </div>

        {/* Clear Formatting */}
        <div className="flex gap-1 ml-auto">
          <ToolbarButton
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            title="Clear Formatting"
          >
            <span className="text-xs font-bold">Clear</span>
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-white">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>

      {/* Info Bar */}
      <div className="bg-[#F5F5F5] border-t border-[#5F5F60]/20 px-4 py-2 text-xs text-[#5F5F60] flex justify-between items-center">
        <span className="font-medium">Rich text editor with full formatting support</span>
        <div className="flex gap-4">
          <span>Use toolbar above for formatting</span>
        </div>
      </div>
    </div>
  );
}
