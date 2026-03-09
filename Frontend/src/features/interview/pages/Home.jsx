import React, { useState, useRef } from "react"
import "../style/home.scss"
import { useInterview } from "../hooks/useInterview"
import { useAuth } from "../../auth/hooks/useAuth"
import { useNavigate, Link } from "react-router-dom"
import { useTheme } from "../../../context/ThemeContext"
import Loader from "../../../components/Loader"

const Home = () => {
    const { loading: interviewLoading, generateReport, reports } = useInterview()
    const { handleLogout } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (interviewLoading) {
        return (
            <main className='loading-screen'>
                <Loader scale={0.3} />
                <h1 style={{ marginTop: '2rem' }}>Generating Interview Strategy...</h1>
            </main>
        )
    }

    return (
        <>
            {/* Top Navigation */}
            <nav className="app-nav">
                <Link to="/" className="app-nav__logo highlight" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Loader scale={0.12} /> 
                    Resuno
                </Link>
                <div className="app-nav__actions">
                    <button onClick={toggleTheme} className="app-nav__theme-btn" title="Toggle theme">
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    <button onClick={handleLogout} className="button ghost-button" style={{ padding: '0.4rem 1rem' }}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className='home-page'>
                <header className='page-header'>
                    <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                    <p>Let our AI analyze your job requirements and unique profile to build a winning strategy.</p>
                </header>

                <div className='interview-card'>
                    <div className='interview-card__body'>
                        
                        {/* LEFT: Target Job Description */}
                        <div className='panel panel--left'>
                            <div className='panel__header'>
                                <span className='panel__icon'>💼</span>
                                <h2>Target Job Description</h2>
                            </div>
                            <textarea
                                className='panel__textarea'
                                placeholder="Paste the full job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                            <div className='char-counter'>
                                {jobDescription.length} chars
                            </div>
                        </div>

                        <div className='panel-divider' />

                        {/* RIGHT: Your Profile */}
                        <div className='panel panel--right'>
                            <div className='panel__header'>
                                <span className='panel__icon'>👤</span>
                                <h2>Your Profile</h2>
                            </div>

                            <div className='upload-section'>
                                <div className='section-label'>Upload Resume</div>
                                <label className='dropzone'>
                                    <input 
                                        type='file' 
                                        ref={resumeInputRef} 
                                        style={{ display: "none" }} 
                                        accept=".pdf,.docx,.txt"
                                    />
                                    <span className='dropzone__icon'>☁️</span>
                                    <p className='dropzone__title'>Click to upload PDF or DOCX</p>
                                    <p className='dropzone__subtitle'>Max file size: 5MB</p>
                                </label>
                            </div>

                            <div className='or-divider'>
                                <span>OR</span>
                            </div>

                            <div className='self-description'>
                                <div className='section-label'>Write a Self Description</div>
                                <textarea
                                    className='panel__textarea panel__textarea--short'
                                    placeholder="Briefly describe your experience and skills..."
                                    value={selfDescription}
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='interview-card__footer'>
                        <span className='footer-info'>
                            <span style={{ color: "var(--accent-main)", fontWeight: "bold" }}>✨ AI-Powered</span> • Takes ~30s
                        </span>
                        <button className='button primary-button' onClick={handleGenerateReport}>
                            Generate Interview Strategy
                        </button>
                    </div>
                </div>

                {/* Recent Reports history section */}
                {reports && reports.length > 0 && (
                    <div className="recent-reports">
                        <h3>My Recent Interview Plans</h3>
                        <div className="reports-list">
                            {reports.map((report) => (
                                <div key={report._id} className="report-item" onClick={() => navigate(`/interview/${report._id}`)}>
                                    <div style={{ fontWeight: 600 }}>{report?.title || "Interview"} </div>
                                    <div className="match-score">Score: {report?.matchScore}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home