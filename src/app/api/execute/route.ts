import { NextRequest, NextResponse } from 'next/server'

// Piston API — 100% gratuita, sin API key, sin límite de uso razonable
// Docs: https://github.com/engineer-man/piston
const PISTON_URL = 'https://emkc.org/api/v2/piston/execute'

export async function POST(req: NextRequest) {
  try {
    const { source_code, language, version, stdin, fileName } = await req.json()

    if (!source_code || !language) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 })
    }

    const pistonRes = await fetch(PISTON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        version: version ?? '*',
        files: [
          {
            name: fileName ?? 'main',
            content: source_code
          }
        ],
        stdin: stdin ?? '',
        args: [],
        compile_timeout: 10000,
        run_timeout: 5000
      })
    })

    if (!pistonRes.ok) {
      const errText = await pistonRes.text()
      return NextResponse.json(
        { error: `Error en Piston API: ${errText}` },
        { status: 502 }
      )
    }

    const data = await pistonRes.json()

    // Piston devuelve { run: { stdout, stderr, code, signal, output }, compile?: { ... } }
    const run = data.run ?? {}
    const compile = data.compile ?? null

    const stdout = run.stdout ?? ''
    const stderr = run.stderr ?? ''
    const compileOutput = compile ? (compile.stderr ?? compile.stdout ?? '') : ''
    const exitCode = run.code ?? 0
    const success = exitCode === 0 && !compile?.code

    return NextResponse.json({
      stdout,
      stderr,
      compile_output: compileOutput,
      status: success ? 'Accepted' : 'Error',
      status_id: success ? 3 : 6,
      time: null,
      memory: null
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
