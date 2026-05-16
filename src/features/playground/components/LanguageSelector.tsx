'use client'

import { useState, useRef, useEffect } from 'react'
import type { Language } from '../lib/languages'

type Props = {
  languages: Language[]
  selected: Language
  onChange: (lang: Language) => void
}

export function LanguageSelector({ languages, selected, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-sm text-[#e6edf3] transition-colors"
      >
        <span>{selected.icon}</span>
        <span>{selected.name}</span>
        <svg className={`w-3 h-3 ml-1 transition-transform ${open ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl z-50 overflow-hidden">
          {languages.map(lang => (
            <button
              key={lang.id}
              onClick={() => { onChange(lang); setOpen(false) }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors hover:bg-[#21262d] ${
                lang.id === selected.id ? 'bg-[#21262d] text-[#58a6ff]' : 'text-[#e6edf3]'
              }`}
            >
              <span>{lang.icon}</span>
              <span>{lang.name}</span>
              {lang.id === selected.id && (
                <svg className="ml-auto w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
