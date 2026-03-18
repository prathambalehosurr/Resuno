const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")



const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


//this schema is for Ai to generate the answers

const interviewReportSchema = z.object({
    title: z
        .string()
        .describe("The title of the job for which the interview report is generated"),

    matchScore: z
        .number()
        .describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),

    technicalQuestions: z.array(
        z.object({
            question: z
                .string()
                .describe("The technical question can be asked in the interview"),

            intention: z
                .string()
                .describe("The intention of interviewer behind asking this question"),

            answer: z
                .string()
                .describe("How to answer this question, what points to cover, what approach to take etc.")
        }).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

    ),

    behavioralQuestions: z.array(
        z.object({
            question: z
                .string()
                .describe("The behavioral question can be asked in the interview"),


            intention: z
                .string()
                .describe("The intention of interviewer behind asking this question"),

            answer: z
                .string()
                .describe(
                    "How to answer this question, what points to cover, what approach to take etc.",
                )
        }).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),


    ),

    skillGaps: z.array(
        z.object({
            skill: z
                .string()
                .describe("The skill which the candidate is lacking"),

            severity: z
                .enum(["low", "medium", "high"])
                .describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
        }).describe("List of skill gaps in the candidate's profile along with their severity"),


    ),

    preparationPlan: z.array(
        z.object({
            day: z
                .number()
                .describe("The day number in the preparation plan, starting from 1"),


            focus: z
                .string()
                .describe(
                    "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."
                ),

            tasks: z
                .array(z.string())
                .describe(
                    "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc."
                )


        })
    ).describe(
        "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"
    ),


})




async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
You are an expert technical interviewer.

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

"technicalQuestions":[
{
"question": string,
"intention": string,
"answer": string
}
],

"behavioralQuestions":[
{
"question": string,
"intention": string,
"answer": string
}
],

"skillGaps":[
{
"skill": string,
"severity": "low | medium | high"
}
],

"preparationPlan":[
{
"day": number,
"focus": string,
"tasks": [string]
}
]
}

Rules:
- Return ONLY a valid JSON object
- technicalQuestions must be an array of objects with keys: question, intention, answer
- behavioralQuestions must be an array of objects with keys: question, intention, answer
- skillGaps must be an array of objects with keys: skill, severity (only "low", "medium", or "high")
- preparationPlan must be an array of objects with keys: day (number), focus (string), tasks (array of strings)
- 4 technical questions
- 2 behavioral questions
- 4 skill gaps
- 7 preparation days
- NO plain strings in any array — always use objects
- Return ONLY JSON, no markdown, no explanation
`;

    const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    })

    const rawText = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()

    return JSON.parse(rawText)



}



async function generatePdfContent(htmlcontent) {

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.setContent(htmlcontent, { waitUntil: "networkidle0" })


    const pdfbuffer = await page.pdf({ 
        format: "A4",margin:{
            top:"20mm",
            bottom:"20mm",
            left:"15mm",
            right:"15mm"
        }
        
    })

    await browser.close()

    return pdfbuffer
}



async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                        CRITICAL RULE: DO NOT use literal newline characters like "\\n" or "\n" in the text or HTML markup. ALWAYS use proper HTML elements like <p>, <br>, <ul>, and <li> for formatting and line breaks.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })

    const jsonContent = JSON.parse(response.text)

    // Sanitize any remaining literal newlines with <br> tags
    const sanitizedHtml = jsonContent.html.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');

    const pdfBuffer = await generatePdfContent(sanitizedHtml)


    return pdfBuffer
}



module.exports = { generateInterviewReport, generateResumePdf }



