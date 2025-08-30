import React, { useState } from 'react'

export default function App() {
  const [code, setCode] = useState(`# Example:\nprint('Hello from Python')`)
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  async function runCode() {
    setRunning(true)
    setOutput('Running...')
    try {
      const res = await fetch(`${apiUrl}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, timeout: 6 })
      })
      const j = await res.json()
      if (!res.ok) {
        setOutput('Error: ' + (j.detail || JSON.stringify(j)))
      } else {
        setOutput('--- STDOUT ---\n' + j.stdout + '\n--- STDERR ---\n' + j.stderr + '\nExit: ' + j.exit_code)
      }
    } catch (err) {
      setOutput('Request failed: ' + err.message)
    } finally {
      setRunning(false)
    }
  }

  function downloadCode() {
    const blob = new Blob([code], { type: 'text/x-python' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'script.py'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{fontFamily: 'system-ui, Arial', padding: 20}}>
      <h1>🐍 AI Python Runner</h1>
      <p>Type Python code and press Run. Backend executes and returns stdout/stderr.</p>
      <textarea value={code} onChange={e=>setCode(e.target.value)} rows={12} cols={80} style={{fontFamily:'monospace', fontSize:14}} />
      <br />
      <button onClick={runCode} disabled={running} style={{marginTop:10, padding:'8px 12px'}}> {running ? 'Running...' : 'Run'} </button>
      <button onClick={downloadCode} style={{marginLeft:8, padding:'8px 12px'}}>Download .py</button>
      <h3>Output</h3>
      <pre style={{whiteSpace:'pre-wrap', background:'#f6f8fa', padding:12}}>{output}</pre>
    </div>
  )
}
