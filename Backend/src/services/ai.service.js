const OpenAI = require("openai")
const puppeteer = require("puppeteer")

// OpenRouter uses an OpenAI-compatible API
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.FRONTEND_URL || "https://resuno-frontend.vercel.app",
        "X-Title": "Resuno - AI Interview Prep",
    },
})

const MODEL = "meta-llama/llama-3.3-70b-instruct"


// ─── Interview Report ─────────────────────────────────────────────────────────

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {
    try {
        const prompt = `You are an expert technical interviewer.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

Generate an interview preparation report.

Return ONLY valid JSON with this exact structure:

{
  "title": string,
  "matchScore": number,

  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],

  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],

  "skillGaps": [
    {
      "skill": string,
      "severity": "low | medium | high"
    }
  ],

  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": [string]
    }
  ]
}

Rules:
- Return ONLY a valid JSON object, no markdown fences, no explanation
- technicalQuestions: exactly 4 items, each with keys: question, intention, answer
- behavioralQuestions: exactly 2 items, each with keys: question, intention, answer
- skillGaps: exactly 4 items, each with keys: skill, severity (only "low", "medium", or "high")
- preparationPlan: exactly 7 items (one per day), each with keys: day (number), focus (string), tasks (array of strings)
- matchScore: integer 0–100
- NO plain strings in any array — always use objects as described above`

        console.log(`Starting AI Content Generation with model ${MODEL}...`)

        const completion = await openai.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            response_format: { type: "json_object" },
        })

        const rawText = completion.choices[0].message.content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim()

        console.log("AI Generation Successful. Parsing JSON...")
        return JSON.parse(rawText)

    } catch (error) {
        console.error("CRITICAL ERROR in generateInterviewReport:", error)
        throw error
    }
}


// ─── Resume PDF ───────────────────────────────────────────────────────────────

async function generatePdfContent(htmlcontent) {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })
    const page = await browser.newPage()
    await page.setContent(htmlcontent, { waitUntil: "networkidle0" })

    const pdfbuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm",
        },
    })

    await browser.close()
    return pdfbuffer
}


async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate a resume for a candidate with the following details:

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY a valid JSON object with a single field "html" containing the full HTML of the resume.
Requirements:
- The resume must be tailored for the given job description and highlight the candidate's strengths and relevant experience.
- The HTML must be well-formatted, visually appealing, and ATS-friendly.
- The content should NOT sound AI-generated; write in natural, human tone.
- Use modest colors or font styles for emphasis but keep the overall design simple and professional.
- Target 1–2 pages when printed to PDF.
- CRITICAL: Do NOT use literal "\\n" escape sequences in HTML. Use proper HTML elements (<p>, <br>, <ul>, <li>) for all formatting.
- Return ONLY the JSON object, no markdown fences, no extra text.`

    console.log(`Generating resume PDF with model ${MODEL}...`)

    const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        response_format: { type: "json_object" },
    })

    const rawText = completion.choices[0].message.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()

    const jsonContent = JSON.parse(rawText)

    // Sanitise any stray literal newlines
    const sanitizedHtml = jsonContent.html
        .replace(/\\n/g, "<br>")
        .replace(/\n/g, "<br>")

    const pdfBuffer = await generatePdfContent(sanitizedHtml)
    return pdfBuffer
}


module.exports = { generateInterviewReport, generateResumePdf }
