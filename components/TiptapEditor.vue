<template>
  <div v-if="editor" class="">
    <div class="control-group">
      <div class="button-group">
        <button
          @click="
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          "
        >
          Insert table
        </button>
        <button
          @click="
            editor
              .chain()
              .focus()
              .insertContent(tableHTML, {
                parseOptions: { preserveWhitespace: false },
              })
              .run()
          "
        >
          Insert HTML table
        </button>
        <button
          @click="editor.chain().focus().addColumnBefore().run()"
          :disabled="!editor.can().addColumnBefore()"
        >
          Add column before
        </button>
        <button
          @click="editor.chain().focus().addColumnAfter().run()"
          :disabled="!editor.can().addColumnAfter()"
        >
          Add column after
        </button>
        <button
          @click="editor.chain().focus().deleteColumn().run()"
          :disabled="!editor.can().deleteColumn()"
        >
          Delete column
        </button>
        <button
          @click="editor.chain().focus().addRowBefore().run()"
          :disabled="!editor.can().addRowBefore()"
        >
          Add row before
        </button>
        <button
          @click="editor.chain().focus().addRowAfter().run()"
          :disabled="!editor.can().addRowAfter()"
        >
          Add row after
        </button>
        <button
          @click="editor.chain().focus().deleteRow().run()"
          :disabled="!editor.can().deleteRow()"
        >
          Delete row
        </button>
        <button
          @click="editor.chain().focus().deleteTable().run()"
          :disabled="!editor.can().deleteTable()"
        >
          Delete table
        </button>
        <button
          @click="editor.chain().focus().mergeCells().run()"
          :disabled="!editor.can().mergeCells()"
        >
          Merge cells
        </button>
        <button
          @click="editor.chain().focus().splitCell().run()"
          :disabled="!editor.can().splitCell()"
        >
          Split cell
        </button>
        <button
          @click="editor.chain().focus().toggleHeaderColumn().run()"
          :disabled="!editor.can().toggleHeaderColumn()"
        >
          Toggle header column
        </button>
        <button
          @click="editor.chain().focus().toggleHeaderRow().run()"
          :disabled="!editor.can().toggleHeaderRow()"
        >
          Toggle header row
        </button>
        <button
          @click="editor.chain().focus().toggleHeaderCell().run()"
          :disabled="!editor.can().toggleHeaderCell()"
        >
          Toggle header cell
        </button>
        <button
          @click="editor.chain().focus().mergeOrSplit().run()"
          :disabled="!editor.can().mergeOrSplit()"
        >
          Merge or split
        </button>
        <button
          @click="
            editor
              .chain()
              .focus()
              .setCellAttribute('backgroundColor', '#FAF594')
              .run()
          "
          :disabled="
            !editor.can().setCellAttribute('backgroundColor', '#FAF594')
          "
        >
          Set cell attribute
        </button>
        <button
          @click="editor.chain().focus().fixTables().run()"
          :disabled="!editor.can().fixTables()"
        >
          Fix tables
        </button>
        <button
          @click="editor.chain().focus().goToNextCell().run()"
          :disabled="!editor.can().goToNextCell()"
        >
          Go to next cell
        </button>
        <button
          @click="editor.chain().focus().goToPreviousCell().run()"
          :disabled="!editor.can().goToPreviousCell()"
        >
          Go to previous cell
        </button>
      </div>
    </div>
    <div class="">
      <editor-content
        :editor="editor"
        class="editor__content 
        flex justify-center 
        items-start min-h-screen bg-gray-100"
      />
    </div>
  </div>
</template>

<script>
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      //    borderStyle: {
      //   default: '2px solid #ced4da',
      //   parseHTML: element => element.style.borderStyle || '2px solid #ced4da',
      //   renderHTML: attributes => {
      //     return {
      //       style: `border: ${attributes.borderStyle}`,
      //     };
      //   },
      // },
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
      },
    };
  },
});

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      tableHTML: `
  <table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
  </table>`,
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        // Default TableCell
        // TableCell,
        // Custom TableCell with backgroundColor attribute
        CustomTableCell,
      ],
      content: `
        <h3>
          Have you seen our tables? They are amazing!
        </h3>
        <ul>
          <li>Tables with rows, cells and headers (optional)</li>
          <li>Support for <code>colgroup</code> and <code>rowspan</code></li>
          <li>And even resizable columns (optional)</li>
        </ul>
        <p>
          Here is an example:
        </p>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
            <tr>
              <td>Marie Curie</td>
              <td>Scientist</td>
              <td>Chemist</td>
              <td>Physicist</td>
            </tr>
            <tr>
              <td>Indira Gandhi</td>
              <td>Prime minister</td>
              <td colspan="2">Politician</td>
            </tr>
          </tbody>
        </table>
      `,
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style  lang="scss">
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  /* Table-specific styling */
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: 1px solid var(--gray-3);
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: var(--gray-1);
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: var(--gray-2);
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: var(--purple);
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}

.editor__content {
  min-height: 300px;
  margin: 30px;
  // padding: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  font-family: "Inter", "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  overflow-wrap: break-word;
  outline: none;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.editor__content:focus-within {
  border-color: #3b82f6; /* Tailwind blue-500 */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.editor__content p {
  margin-bottom: 1rem;
}

.editor__content h1,
.editor__content h2,
.editor__content h3 {
  font-weight: 600;
  margin: 1.2em 0 0.5em;
}

.editor__content ul,
.editor__content ol {
  padding-left: 2rem;
  margin-bottom: 1rem;
}

.editor__content blockquote {
  border-left: 4px solid #ddd;
  padding-left: 1rem;
  color: #666;
  margin: 1rem 0;
  font-style: italic;
}

.editor__content pre {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
}

.editor__content table td,
.editor__content table th {
  min-width: 1em;
  border: 2px solid #ddd;
  padding: 3px 5px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}
</style>
