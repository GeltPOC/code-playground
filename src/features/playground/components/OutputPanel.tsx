'use client'

import type { ExecutionResult } from './PlaygroundPage'

type Props = {
  result: ExecutionResult | null
  isRunning: boolean
}

export function OutputPanel({ result, isRunning }: Props) {
  if (isRunning) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0d1117] p-4">
        <div className="flex flex-col items-center gap-3 text-[#8b949e]">
          <svg className="animate-spin w-8 h-8 text-[#58a6ff]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm">Ejecutando código...</span>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0d1117] p-4">
        <div className="flex flex-col items-center gap-2 text-[#8b949e]">
          <svg className="w-10 h-10 opacity-30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-sm">Pulsa Ejecutar para ver el resultado</span>
        </div>
      </div>
    )
  }

  const hasError = result.error || result.stderr || result.compile_output
  const output = result.stdout || ''
  const errorText = result.error || result.compile_output || result.stderr || ''

  return (
    <div className="flex-1 flex flex-col bg-[#0d1117] overflow-hidden font-mono text-sm">
      {/* Status badge */}
      <div className="px-4 py-2 border-b border-[#30363d] flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
          result.status_id === 3
            ? 'bg-[#1b4721] text-[#3fb950]'
            : 'bg-[#3b1219] text-[#f85149]'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            result.status_id === 3 ? 'bg-[#3fb950]' : 'bg-[#f85149]'
          }`}></span>
          {result.status}
        </span>
        {result.time && (
          <span className="text-xs text-[#8b949e]">⏱ {result.time}s</span>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        {output && (
          <div className="p-4">
            <div className="text-xs text-[#8b949e] mb-2 uppercase tracking-wider">Salida</div>
            <pre className="text-[#e6edf3] whitespace-pre-wrap break-words leading-relaxed">{output}</pre>
          </div>
        )}

        {hasError && errorText && (
          <div className="p-4 border-t border-[#30363d]">
            <div className="text-xs text-[#f85149] mb-2 uppercase tracking-wider">Error</div>
            <pre className="text-[#ffa198] whitespace-pre-wrap break-words leading-relaxed">{errorText}</pre>
          </div>
        )}

        {!output && !errorText && (
          <div className="p-4 text-[#8b949e] text-sm">
            Sin salida
          </div>
        )}
      </div>
    </div>
  )
}
