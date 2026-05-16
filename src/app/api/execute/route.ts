import { NextRequest, NextResponse } from 'next/server'

const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com'
const API_KEY = process.env.JUDGE0_API_KEY ?? ''

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function POST(req: NextRequest) {
  try {
    const { source_code, language_id, stdin } = await req.json()

    if (!source_code || !language_id) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 })
    }

    if (!API_KEY) {
      return NextResponse.json({ error: 'API key de Judge0 no configurada. Añade JUDGE0_API_KEY a tu .env.local' }, { status: 500 })
    }

    // Enviar submission
    const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        source_code,
        language_id,
        stdin: stdin ?? ''
      })
    })

    if (!submitRes.ok) {
      const errText = await submitRes.text()
      return NextResponse.json({ error: `Error al enviar a Judge0: ${errText}` }, { status: 502 })
    }

    const { token } = await submitRes.json()

    // Polling para obtener resultado
    let attempts = 0
    const maxAttempts = 10

    while (attempts < maxAttempts) {
      await sleep(1000)
      attempts++

      const resultRes = await fetch(
        `${JUDGE0_URL}/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status,compile_output,time,memory`,
        {
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        }
      )

      if (!resultRes.ok) {
        const errText = await resultRes.text()
        return NextResponse.json({ error: `Error al obtener resultado: ${errText}` }, { status: 502 })
      }

      const result = await resultRes.json()
      const statusId = result?.status?.id

      // Status 1 = In Queue, 2 = Processing
      if (statusId === 1 || statusId === 2) {
        continue
      }

      return NextResponse.json({
        stdout: result.stdout ?? '',
        stderr: result.stderr ?? '',
        compile_output: result.compile_output ?? '',
        status: result.status?.description ?? 'Unknown',
        status_id: statusId,
        time: result.time,
        memory: result.memory
      })
    }

    return NextResponse.json({ error: 'Timeout: el código tardó demasiado en ejecutarse' }, { status: 408 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
