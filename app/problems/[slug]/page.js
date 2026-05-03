'use client';
import { useState, useEffect, use } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { getProblemBySlug, PROBLEMS } from '@/lib/problems';
import { supabase, markProblemSolved, unmarkProblemSolved, getSolvedProblems } from '@/lib/supabase';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const STARTER_CODE = {
  python: `class Solution:
    def solve(self):
        # Write your solution here
        pass
`,
  java: `class Solution {
    public int solve() {
        // Write your solution here
        return 0;
    }
}
`,
  cpp: `class Solution {
public:
    int solve() {
        // Write your solution here
        return 0;
    }
};
`,
  javascript: `/**
 * @return {number}
 */
var solve = function() {
    // Write your solution here
};
`,
};

const SOLUTION_STEPS = {
  default: [
    { title: 'Understand the Problem', desc: 'Read the problem carefully. Identify inputs, outputs, and constraints. Think about edge cases before coding.', code: '' },
    { title: 'Choose the Right Pattern', desc: 'Identify which DSA pattern applies — Two Pointers, Sliding Window, BFS/DFS, DP, etc.', code: '' },
    { title: 'Write Brute Force First', desc: 'Start with a brute force O(n²) or O(n³) solution to verify correctness, then optimize.', code: '// Brute force approach\nfor (int i = 0; i < n; i++)\n  for (int j = i+1; j < n; j++)\n    // check condition' },
    { title: 'Optimize with the Pattern', desc: 'Apply the identified pattern to reduce time complexity. Think about what information you can precompute or reuse.', code: '// Optimized approach\n// Use HashMap / Two Pointers / DP table\nMap<Integer, Integer> map = new HashMap<>();' },
    { title: 'Analyze Complexity', desc: 'Verify your solution\'s Time and Space complexity. Make sure it fits within constraints.', code: '// Time: O(n) | Space: O(n)' },
  ]
};

export default function ProblemPage({ params }) {
  const { slug } = use(params);
  const problem = getProblemBySlug(slug);

  const [activeTab, setActiveTab] = useState('problem');
  const [lang, setLang] = useState('python');
  const [code, setCode] = useState(STARTER_CODE.python);
  const [testTab, setTestTab] = useState('cases');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [solved, setSolved] = useState(false);
  const [user, setUser] = useState(null);
  const [activeCase, setActiveCase] = useState(0);
  const [notes, setNotes] = useState('');

  const steps = SOLUTION_STEPS.default;

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) {
        const s = await getSolvedProblems(u.id);
        setSolved(s.some(x => x.problem_slug === slug));
      } else {
        const local = JSON.parse(localStorage.getItem('svit_solved') || '[]');
        setSolved(local.includes(slug));
      }
    });
  }, [slug]);

  useEffect(() => {
    setCode(STARTER_CODE[lang]);
  }, [lang]);

  useEffect(() => {
    if (!playing) return;
    if (stepIdx >= steps.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStepIdx(i => i + 1), 2000);
    return () => clearTimeout(t);
  }, [playing, stepIdx, steps.length]);

  async function handleToggleSolved() {
    const next = !solved;
    setSolved(next);
    if (user) {
      next ? await markProblemSolved(user.id, slug) : await unmarkProblemSolved(user.id, slug);
    } else {
      const local = JSON.parse(localStorage.getItem('svit_solved') || '[]');
      const updated = next ? [...local, slug] : local.filter(x => x !== slug);
      localStorage.setItem('svit_solved', JSON.stringify(updated));
    }
  }

  async function runCode() {
    setRunning(true);
    setTestTab('output');
    setOutput('Running your code...');

    // Map our lang selector to Judge0 language IDs
    const langMap = {
      python: 71, // Python (3.8.1)
      java: 62,   // Java (OpenJDK 13.0.1)
      cpp: 54,    // C++ (GCC 9.2.0)
      javascript: 63, // JavaScript (Node.js 12.14.0)
    };

    const language_id = langMap[lang];

    try {
      // 1. Submit the code to Judge0 API
      const options = {
        method: 'POST',
        url: 'https://ce.judge0.com/submissions',
        params: { base64_encoded: 'false', fields: '*' },
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          language_id: language_id,
          source_code: code,
          // We feed the first test case input to stdin for testing
          stdin: exampleCases[activeCase]?.input || ''
        }
      };

      const response = await axios.request(options);
      const token = response.data.token;

      // 2. Poll the API for the result
      let resultResponse;
      let statusId = 1; // 1 = In Queue, 2 = Processing
      
      while (statusId === 1 || statusId === 2) {
        await new Promise(r => setTimeout(r, 1000)); // Wait 1s between polls
        const getOptions = {
          method: 'GET',
          url: \`https://ce.judge0.com/submissions/\${token}\`,
          params: { base64_encoded: 'false', fields: '*' },
        };
        resultResponse = await axios.request(getOptions);
        statusId = resultResponse.data.status.id;
      }

      // 3. Display the output
      const data = resultResponse.data;
      if (data.status.id === 3) {
        // Accepted
        setOutput(\`Status: Accepted\\n\\nTime: \${data.time}s\\nMemory: \${data.memory} KB\\n\\nOutput:\\n\${data.stdout || ''}\`);
      } else if (data.status.id === 6) {
        // Compilation Error
        setOutput(\`Compilation Error:\\n\\n\${data.compile_output}\`);
      } else {
        // Other errors (Runtime, Time Limit, etc)
        setOutput(\`Status: \${data.status.description}\\n\\nError:\\n\${data.stderr || data.message || ''}\`);
      }

    } catch (error) {
      console.error(error);
      setOutput(\`Error connecting to code execution server.\\n\\nPlease try again later or use the LeetCode button to submit.\\n\\nDetails: \${error.message}\`);
    } finally {
      setRunning(false);
    }
  }

  if (!problem) return (
    <>
      <Navbar />
      <div style={{ padding:'4rem', textAlign:'center' }}>
        <h2>Problem not found</h2>
        <Link href="/" style={{ color:'var(--accent-teal)' }}>← Back to Dashboard</Link>
      </div>
    </>
  );

  const exampleCases = [
    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
    { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6' },
  ];

  return (
    <>
      <Navbar />
      <div className="problem-page">
        {/* LEFT: Problem Description */}
        <div className="problem-desc-pane">
          <Link href="/" className="back-btn">← Back</Link>
          <div className="problem-tabs">
            {['problem', 'solution', 'notes'].map(tab => (
              <button key={tab} className={`problem-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}>
                {tab === 'problem' ? '📄 Problem' : tab === 'solution' ? '💡 Solution' : '📝 Notes'}
              </button>
            ))}
          </div>

          <div className="problem-content">
            {activeTab === 'problem' && (
              <>
                <h1>{problem.title}</h1>
                <div className="problem-meta">
                  <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                  {problem.topics?.slice(0, 3).map(t => (
                    <span key={t} style={{
                      padding:'3px 10px', borderRadius:'100px',
                      background:'var(--bg-elevated)', color:'var(--text-secondary)',
                      fontSize:'0.75rem', fontWeight:500
                    }}>{t}</span>
                  ))}
                  <a href={problem.leetcode} target="_blank" rel="noopener" className="leetcode-link">
                    LeetCode ↗
                  </a>
                </div>

                <p>Given a problem of type <strong>{problem.pattern.replace('-', ' ')}</strong>, solve the following:</p>
                <p style={{ background:'var(--bg-elevated)', padding:'1rem', borderRadius:'var(--radius)', border:'1px solid var(--border)', marginBottom:'1rem' }}>
                  {problem.title} — see full description and test cases on{' '}
                  <a href={problem.leetcode} target="_blank" rel="noopener" style={{ color:'var(--accent-teal)' }}>
                    LeetCode #{problem.id}
                  </a>
                </p>

                <h3 style={{ marginBottom:'0.75rem', fontSize:'1rem' }}>Examples</h3>
                {exampleCases.map((ex, i) => (
                  <div className="example-box" key={i}>
                    <div className="example-label">Example {i + 1}</div>
                    <div className="example-content">
                      <div><strong style={{ color:'var(--text-secondary)' }}>Input:</strong> {ex.input}</div>
                      <div><strong style={{ color:'var(--text-secondary)' }}>Output:</strong> {ex.output}</div>
                      {ex.explanation && <div><strong style={{ color:'var(--text-secondary)' }}>Explanation:</strong> {ex.explanation}</div>}
                    </div>
                  </div>
                ))}

                <div style={{ marginTop:'1.5rem' }}>
                  <button onClick={handleToggleSolved} style={{
                    padding:'10px 20px', borderRadius:'var(--radius)',
                    background: solved ? 'var(--easy-bg)' : 'var(--bg-elevated)',
                    border: solved ? '1px solid var(--easy)' : '1px solid var(--border)',
                    color: solved ? 'var(--easy)' : 'var(--text-primary)',
                    fontWeight:600, cursor:'pointer', transition:'all 0.2s', fontSize:'0.9rem'
                  }}>
                    {solved ? '✅ Solved' : '☐ Mark as Solved'}
                  </button>
                </div>
              </>
            )}

            {activeTab === 'solution' && (
              <div className="solution-container" style={{ padding:0 }}>
                <div style={{ marginBottom:'1rem' }}>
                  <h2 style={{ marginBottom:'0.25rem', fontSize:'1.2rem', fontWeight:700 }}>Step-by-Step Solution</h2>
                  <p style={{ color:'var(--text-muted)', fontSize:'0.85rem' }}>
                    Follow the animated walkthrough to understand the approach.
                  </p>
                </div>
                <div className="solution-controls">
                  <button className="sol-btn" onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}>◂</button>
                  <button className={`sol-btn ${playing ? '' : 'play'}`}
                    onClick={() => { if (stepIdx >= steps.length - 1) setStepIdx(0); setPlaying(!playing); }}>
                    {playing ? '⏸' : '▶'}
                  </button>
                  <button className="sol-btn" onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))}>▸</button>
                  <div className="sol-progress">
                    <div className="sol-progress-fill" style={{ width: ((stepIdx + 1) / steps.length * 100) + '%' }} />
                  </div>
                  <span className="sol-step-label">Step {stepIdx + 1} / {steps.length}</span>
                </div>

                {steps.map((step, i) => (
                  <div key={i} className="step-card animate-fade-in"
                    style={{
                      opacity: i === stepIdx ? 1 : 0.35,
                      transform: i === stepIdx ? 'scale(1.01)' : 'scale(1)',
                      border: i === stepIdx ? '1px solid var(--accent-teal)' : '1px solid var(--border)',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onClick={() => setStepIdx(i)}
                  >
                    <div className="step-number">{i + 1}</div>
                    <div className="step-title">{step.title}</div>
                    <div className="step-desc">{step.desc}</div>
                    {step.code && <pre className="step-code">{step.code}</pre>}
                  </div>
                ))}

                <div className="complexity-box" style={{ marginTop:'1.5rem' }}>
                  <div className="complexity-item">
                    <div className="complexity-label">Time Complexity</div>
                    <div className="complexity-value">O(n)</div>
                  </div>
                  <div className="complexity-item">
                    <div className="complexity-label">Space Complexity</div>
                    <div className="complexity-value">O(n)</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h3 style={{ marginBottom:'0.75rem' }}>📝 My Notes</h3>
                <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', marginBottom:'0.75rem' }}>
                  Write your personal notes, approach, or reminders for this problem.
                </p>
                <textarea
                  className="notes-area"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g., Key insight: use a HashMap to track indices..."
                />
                <button style={{
                  marginTop:'0.75rem', padding:'8px 20px',
                  borderRadius:'var(--radius-sm)', background:'var(--accent-teal)',
                  border:'none', color:'white', fontWeight:600, cursor:'pointer'
                }} onClick={() => localStorage.setItem('note_' + slug, notes)}>
                  Save Notes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Code Editor */}
        <div className="problem-editor-pane">
          <div className="editor-toolbar">
            <select className="lang-select" value={lang} onChange={e => setLang(e.target.value)}>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="javascript">JavaScript</option>
            </select>
            <div className="editor-actions">
              <a href={problem.leetcode} target="_blank" rel="noopener" style={{
                padding:'6px 12px', borderRadius:'var(--radius-sm)',
                background:'var(--accent-amber-dim)', color:'var(--accent-amber)',
                fontSize:'0.82rem', fontWeight:600, display:'flex', alignItems:'center', gap:4
              }}>⚡ Submit on LC</a>
              <button className="btn-run" onClick={runCode} disabled={running}>
                {running ? '⏳' : '▶'} Run
              </button>
              <button className="btn-submit" onClick={() => window.open(problem.leetcode, '_blank')}>
                ✓ Submit
              </button>
            </div>
          </div>

          <div className="editor-wrapper">
            <MonacoEditor
              height="100%"
              language={lang === 'cpp' ? 'cpp' : lang}
              theme="vs-dark"
              value={code}
              onChange={v => setCode(v || '')}
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                glyphMargin: false,
                folding: false,
                padding: { top: 16 },
                automaticLayout: true,
                tabSize: 4,
              }}
            />
          </div>

          <div className="test-panel">
            <div className="test-panel-tabs">
              {['cases', 'output'].map(t => (
                <button key={t} className={`test-tab ${testTab === t ? 'active' : ''}`}
                  onClick={() => setTestTab(t)}>
                  {t === 'cases' ? '🧪 Test Cases' : '📤 Output'}
                </button>
              ))}
            </div>
            <div className="test-content">
              {testTab === 'cases' && (
                <>
                  <div className="test-case-row">
                    {exampleCases.map((_, i) => (
                      <button key={i} className={`test-case-label ${activeCase === i ? 'active' : ''}`}
                        onClick={() => setActiveCase(i)}>
                        Case {i + 1}
                      </button>
                    ))}
                  </div>
                  <div className="test-io">
                    <div className="test-io-label">Input</div>
                    <div className="test-io-value">{exampleCases[activeCase]?.input}</div>
                    <div className="test-io-label">Expected Output</div>
                    <div className="test-io-value">{exampleCases[activeCase]?.output}</div>
                  </div>
                </>
              )}
              {testTab === 'output' && (
                <div className={`output-result ${output.includes('Error') ? 'output-error' : ''}`}>
                  {output || 'Click "Run" to execute your code.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
