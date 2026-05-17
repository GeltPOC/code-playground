'use client'

import { useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { php } from '@codemirror/lang-php'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { rust } from '@codemirror/lang-rust'
import type { Language } from '../lib/languages'
import type { Extension } from '@codemirror/state'

type Props = {
  language: Language
  value: string
  onChange: (value: string) => void
}

function getExtension(langId: string): Extension[] {
  switch (langId) {
    case 'php':        return [php()]
    case 'javascript': return [javascript()]
    case 'typescript': return [javascript({ typescript: true })]
    case 'python':     return [python()]
    case 'java':       return [java()]
    case 'cpp':        return [cpp()]
    case 'rust':       return [rust()]
    case 'go':         return [cpp()]   // closest available for Go highlighting
    case 'bash':       return []
    default:           return []
  }
}

export function CodeEditor({ language, value, onChange }: Props) {
  const handleChange = useCallback((val: string) => {
    onChange(val)
  }, [onChange])

  return (
    <CodeMirror
      value={value}
      height="100%"
      theme={oneDark}
      extensions={getExtension(language.id)}
      onChange={handleChange}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        foldGutter: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: false,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true
      }}
      style={{ height: '100%' }}
    />
  )
}
