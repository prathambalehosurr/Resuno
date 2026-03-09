import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useInterview } from "../hooks/useInterview"
import "../style/interview.scss"
import { useTheme } from "../../../context/ThemeContext"
import Loader from "../../../components/Loader"

const Interview = () => {
    const { interviewId } = useParams()
    const { getReportById, report, loading, getResumePdf } = useInterview()
    const { theme, toggleTheme } = useTheme()

    // UI state
    const [activeTab, setActiveTab] = useState('overview')
    const [expandedCards, setExpandedCards] = useState({})

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <Loader scale={0.3} />
                <h1 style={{ marginTop: '2rem' }}>Loading AI Strategy...</h1>
            </main>
        )
    }

    // Toggle for Q&A flashcards
    const toggleCard = (id) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    // SVG Score Circle Calculation
    const score = report?.matchScore || 0;
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="interview-report-page fade-in">
            
            {/* Top Navigation */}
            <nav className="app-nav">
                <Link to="/" className="app-nav__logo highlight" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Loader scale={0.12} />
                   ← Resuno
                </Link>
                <div className="app-nav__actions">
                    <button onClick={toggleTheme} className="app-nav__theme-btn" title="Toggle theme">
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </nav>

            <header className="report-header">
                <div className="report-header__titles">
                    <h1>
                        <span className="status-dot"></span>
                        Interview Strategy Report
                    </h1>
                    <div className="report-meta">
                        <span>Role: {report?.title || "Software Engineer"}</span>
                        <span>Generated: {new Date().toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="report-header__actions">
                    <button className="button ghost-button" onClick={() => getResumePdf(interviewId)}>⬇ Download Resume</button>
                    <button className="button primary-button">Share Report</button>
                </div>
            </header>

            <div className="report-layout">
                {/* ── LEFT SIDEBAR (Navigation & Inputs) ── */}
                <aside className="sidebar-left">
                    <div className="sidebar-section tab-navigation">
                        <h3>� Sections</h3>
                        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                            Overview & Strengths
                        </button>
                        <button className={`tab-btn ${activeTab === 'technical' ? 'active' : ''}`} onClick={() => setActiveTab('technical')}>
                            Technical Questions
                        </button>
                        <button className={`tab-btn ${activeTab === 'behavioral' ? 'active' : ''}`} onClick={() => setActiveTab('behavioral')}>
                            Behavioral Questions
                        </button>
                        <button className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`} onClick={() => setActiveTab('roadmap')}>
                            Preparation Roadmap
                        </button>
                    </div>

                    <div className="sidebar-section">
                        <h3>�💼 Target Job Description</h3>
                        <div className="content-box">
                            {report?.jobDescription || "Job description was not provided or logged."}
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <h3>👤 Your Profile</h3>
                        <div className="content-box">
                            {report?.resumeText || "Resume data was not provided or logged."}
                        </div>
                    </div>
                </aside>

                {/* ── MAIN CONTENT (Dynamic based on tabs) ── */}
                <main className="main-content">
                    
                    {activeTab === 'overview' && (
                        <div className="tab-pane slide-up">
                            {/* Key Strengths */}
                            <section className="content-section">
                                <div className="content-section__header">
                                    <div className="icon-wrapper icon-wrapper--green">⭐</div>
                                    <h2>Key Strengths to Highlight</h2>
                                </div>
                                <ul className="feature-list">
                                    {report?.keyStrengths?.length > 0 ? report.keyStrengths.map((strength, i) => (
                                        <li key={i}>{strength}</li>
                                    )) : <li>No specific strengths identified. Highlight your eagerness to learn!</li>}
                                </ul>
                            </section>

                            {/* Missing Skills */}
                            <section className="content-section" style={{ marginTop: '2rem' }}>
                                <div className="content-section__header">
                                    <div className="icon-wrapper icon-wrapper--yellow">⚠️</div>
                                    <h2>Skill Gaps & How to Address Them</h2>
                                </div>
                                <ul className="missing-skills-list">
                                    {report?.skillGaps?.length > 0 ? report.skillGaps.map((gap, i) => (
                                        <li key={i}>{gap.skill} <span className="severity-badge">{gap.severity}</span></li>
                                    )) : <li>You are a solid match with no major skill gaps detected!</li>}
                                </ul>
                                <div className="gap-advice">
                                     <strong>Tip:</strong> If asked about these gaps, emphasize your fast learning speed and any related alternative tools you know.
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'roadmap' && (
                        <div className="tab-pane slide-up">
                            {/* Preparation Roadmap */}
                            <section className="content-section">
                                <div className="content-section__header">
                                    <div className="icon-wrapper icon-wrapper--yellow">📅</div>
                                    <h2>7-Day Preparation Roadmap</h2>
                                </div>
                                <div className="roadmap-list">
                                    {report?.preparationPlan?.length > 0 ? report.preparationPlan.map((item, i) => (
                                        <div key={i} className="roadmap-day">
                                            <div className="roadmap-day__header">
                                                <span className="roadmap-day__badge">Day {item.day}</span>
                                                <h3 className="roadmap-day__focus">{item.focus}</h3>
                                            </div>
                                            <ul className="roadmap-day__tasks">
                                                {item.tasks?.map((task, j) => (
                                                    <li key={j}>
                                                        <span className="roadmap-day__bullet"></span>
                                                        {task}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )) : <p>No preparation plan identified. Focus on your foundational skills!</p>}
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'technical' && (
                        <div className="tab-pane slide-up">
                            <section className="content-section">
                                <div className="content-section__header">
                                    <div className="icon-wrapper icon-wrapper--purple">❓</div>
                                    <h2>Technical Questions Flashcards</h2>
                                </div>
                                <p className="instruction-text">Click a card to reveal the intention and suggested answer.</p>
                                <div className="card-grid">
                                    {report?.technicalQuestions?.length > 0 ? report.technicalQuestions.map((q, i) => {
                                        const id = `tech-${i}`
                                        const isExpanded = expandedCards[id]
                                        return (
                                            <div key={i} className={`qa-card interactive-card ${isExpanded ? 'expanded' : ''}`} onClick={() => toggleCard(id)}>
                                                <div className="qa-card__question">
                                                    <h4><span className="q-mark">Q:</span> {q.question}</h4>
                                                    <span className="expand-hint">{isExpanded ? 'Hide Answer' : 'Reveal Answer'}</span>
                                                </div>
                                                {isExpanded && (
                                                    <div className="qa-card__answer fade-in">
                                                        <p><strong>Interviewer's Intention:</strong> {q.intention || q.answer}</p>
                                                        <div className="key-points">
                                                            <strong>Suggested Answer:</strong>
                                                            <ul>
                                                                <li>{q.answer || q.suggestedAnswer || "Be honest and use the STAR method."}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }) : <p>No technical questions found based on the provided profile.</p>}
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'behavioral' && (
                        <div className="tab-pane slide-up">
                            <section className="content-section">
                                <div className="content-section__header">
                                    <div className="icon-wrapper icon-wrapper--blue">💬</div>
                                    <h2>Behavioral Questions Flashcards</h2>
                                </div>
                                <p className="instruction-text">Click a card to reveal the intention and suggested answer.</p>
                                <div className="card-grid">
                                    {report?.behavioralQuestions?.length > 0 ? report.behavioralQuestions.map((q, i) => {
                                        const id = `behav-${i}`
                                        const isExpanded = expandedCards[id]
                                        return (
                                            <div key={i} className={`qa-card interactive-card ${isExpanded ? 'expanded' : ''}`} onClick={() => toggleCard(id)}>
                                                <div className="qa-card__question">
                                                    <h4><span className="q-mark">Q:</span> {q.question}</h4>
                                                    <span className="expand-hint">{isExpanded ? 'Hide Answer' : 'Reveal Answer'}</span>
                                                </div>
                                                {isExpanded && (
                                                    <div className="qa-card__answer fade-in">
                                                        <p><strong>Interviewer's Intention:</strong> {q.intention || q.answer}</p>
                                                        <div className="key-points">
                                                            <strong>Suggested Answer:</strong>
                                                            <ul>
                                                              <li>{q.answer || q.suggestedAnswer || "Focus on your soft skills."}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }) : <p>No behavioral questions found based on the provided profile.</p>}
                                </div>
                            </section>
                        </div>
                    )}

                </main>

                {/* ── RIGHT SIDEBAR (Score & Metrics) ── */}
                <aside className="sidebar-right">
                    <div className="score-widget">
                        <h3>Overall Match</h3>
                        <div className="score-widget__circle">
                            <svg width="140" height="140">
                                <circle className="bg" cx="70" cy="70" r={radius} />
                                <circle 
                                    className="progress" 
                                    cx="70" 
                                    cy="70" 
                                    r={radius} 
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                />
                            </svg>
                            <div className="score-value">
                                <span>{score}%</span>
                                <small>Score</small>
                            </div>
                        </div>
                        <p>Your profile is a strong match. Focus on addressing your skill gaps during the interview.</p>
                    </div>

                    <div className="metrics-section">
                        <h3>Quick Metrics</h3>
                        <div className="metric-item">
                            <span className="label">Tech Questions Ready</span>
                            <span className="value">{report?.technicalQuestions?.length || 0}</span>
                        </div>
                        <div className="metric-item">
                            <span className="label">Behavioral Ready</span>
                            <span className="value">{report?.behavioralQuestions?.length || 0}</span>
                        </div>
                        <div className="metric-item">
                            <span className="label">Gaps to Cover</span>
                            <span className="value">{report?.skillGaps?.length || 0}</span>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    )
}

export default Interview