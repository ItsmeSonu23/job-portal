import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useEffect } from 'react';
/**
 * TextEditor Component
 * 
 * A rich text editor component built with Mantine and TipTap for creating and editing formatted content.
 * Provides a comprehensive toolbar with text formatting and alignment options.
 * 
 * @component
 * 
 * Features:
 * - Rich text formatting (bold, italic, underline, etc.)
 * - Text alignment controls
 * - Lists and blockquotes
 * - Links and highlighting
 * - Undo/redo functionality
 * - Real-time form integration
 * 
 * Visual Elements:
 * - Sticky toolbar with control groups
 * - Dark theme styling
 * - Content area with custom background
 * - Grouped formatting controls
 * 
 * Extensions:
 * - StarterKit: Basic editor functionality
 * - Underline: Text underlining
 * - Link: Hyperlink support
 * - Superscript/Subscript: Text positioning
 * - Highlight: Text highlighting
 * - TextAlign: Content alignment
 * 
 * Props:
 * @param {Object} props - Component properties
 * @param {Object} props.form - Mantine form instance
 * @param {Function} props.form.getValues - Gets current form values
 * @param {Function} props.form.setFieldValue - Updates form field value
 * 
 * Editor Configuration:
 * - Content synced with form description field
 * - Auto-updates form on content change
 * - Configurable text alignment for headings and paragraphs
 * 
 * Toolbar Groups:
 * 1. Text Formatting
 * 2. Heading Styles
 * 3. Block Elements
 * 4. Link Management
 * 5. Text Alignment
 * 6. History Controls
 * 
 * Styling:
 * - Dark theme with Mine Shaft color palette
 * - Sticky toolbar with 60px offset
 * - Custom background colors
 * 
 * @returns {JSX.Element} A rich text editor with toolbar and content area
 */
export const TextEditor = (props: any) => {
  
  useEffect(()=>{
   editor?.commands.setContent(props.data)
  },[props.data])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: props.form.getValues().description,
    onUpdate({ editor }) {
      props.form.setFieldValue("description", editor.getHTML())
    }
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar bg="var(--color-mine-shaft-950)" sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content bg="var(--color-mine-shaft-950)" />
    </RichTextEditor>
  );
}