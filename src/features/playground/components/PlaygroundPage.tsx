'use client'

import { useState, useCallback } from 'react'
import { LanguageSelector } from './LanguageSelector'
import { CodeEditor } from './CodeEditor'
import { OutputPanel } from './OutputPanel'
import { LANGUAGES, type Language } from '../lib/languages'

export type ExecutionResult = {
  stdout: string
  stderr: string
  compile_output: string
  status: string
  status_id: number
  time?: string
  memory?: number
  error?: string
}

const BASE_PATH = '/code-playground'

export function PlaygroundPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0])
  const [code, setCode] = useState<string>(LANGUAGES[0].defaultCode)
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleLanguageChange = useCallback((lang: Language) => {
    setSelectedLanguage(lang)
    setCode(lang.defaultCode)
    setResult(null)
  }, [])

  const handleRun = useCallback(async () => {
    if (isRunning || !code.trim()) return
    setIsRunning(true)
    setResult(null)

    try {
      const res = await fetch(`${BASE_PATH}/api/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: code,
          language_id: selectedLanguage.judgeId
        })
      })

      const data: ExecutionResult = await res.json()
      setResult(data)
    } catch (err) {
      setResult({
        stdout: '',
        stderr: '',
        compile_output: '',
        status: 'Error',
        status_id: -1,
        error: err instanceof Error ? err.message : 'Error de red'
      })
    } finally {
      setIsRunning(false)
    }
  }, [code, selectedLanguage, isRunning])

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-[#e6edf3]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d] shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
            <span className="w-3 h-3 rounded-full bg-[#febc2e]"></span>
            <span className="w-3 h-3 rounded-full bg-[#28c840]"></span>
          </div>
          <h1 className="text-sm font-semibold text-[#e6edf3] tracking-wide">Code Playground</h1>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector
            languages={LANGUAGES}
            selected={selectedLanguage}
            onChange={handleLanguageChange}
          />

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Ejecutando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Ejecutar
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="flex flex-col flex-1 min-w-0 border-r border-[#30363d]">
          <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-[#30363d] text-xs text-[#8b949e]">
            <span className="flex items-center gap-1.5">
              <span className="text-[#58a6ff]">{selectedLanguage.icon}</span>
              {selectedLanguage.fileName}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              language={selectedLanguage}
              value={code}
              onChange={setCode}
            />
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col w-[420px] shrink-0">
          <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-[#30363d] text-xs text-[#8b949e]">
            <span>Output</span>
            {result && (
              <span className={`ml-auto font-medium ${
                result.status_id === 3 ? 'text-[#3fb950]' : 'text-[#f85149]'
              }`}>
                {result.status}
              </span>
            )}
          </div>
          <OutputPanel result={result} isRunning={isRunning} />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#161b22] border-t border-[#30363d] text-xs text-[#8b949e] shrink-0">
        <span>{selectedLanguage.name}</span>
        {result?.time && <span>Tiempo: {result.time}s</span>}
        {result?.memory && <span>Memoria: {Math.round(result.memory / 1024)}KB</span>}
      </div>
    </div>
  )
}
