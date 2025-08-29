/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, { useState, useMemo } from 'react';

import ReactQuill from 'react-quill-new';

import Box from '@components/general/Box';
import Label from '@components/general/Label';
import RequiredOptionalLabel from '@components/general/RequiredOptionalLabel';

import 'react-quill-new/dist/quill.snow.css';

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
  className?: string;
  label?: string;
  required?: boolean;
  withoutOptionalText?: boolean;
  withoutImageFormat?: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value = '',
  onChange,
  placeholder,
  readOnly = false,
  className,
  label,
  required,
  withoutOptionalText,
  height = '10rem',
  withoutImageFormat = false,
}) => {
  const [content, setContent] = useState<string>(value);

  const modules = useMemo(
    () => ({
      toolbar: readOnly
        ? false
        : [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'image'].filter(
              (format) => !withoutImageFormat || format !== 'image'
            ),
            ['blockquote', 'code-block'],
            ['clean'],
          ],
      clipboard: {
        matchVisual: false,
      },
    }),
    [readOnly]
  );

  const handleChange = (newValue: string) => {
    setContent(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box
      className={`markdown-editor flex flex-col space-y-1 w-full ${className}`}
      style={{ height: `calc(${height} + 4.15rem)` }}
    >
      {label && (
        <Box className="flex items-center space-x-1">
          <Label>{label}</Label>
          <RequiredOptionalLabel
            required={Boolean(required)}
            withoutOptionalText={withoutOptionalText}
          />
        </Box>
      )}

      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'color',
          'background',
          'list',
          'align',
          'link',
          'image',
          'blockquote',
          'code-block',
        ].filter((format) => !withoutImageFormat || format !== 'image')}
        placeholder={placeholder}
        readOnly={readOnly}
        theme="snow"
        style={{ height: height }}
      />
    </Box>
  );
};

export default MarkdownEditor;
