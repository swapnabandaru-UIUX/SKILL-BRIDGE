import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/analyze-skill-gap', async (req, res) => {
  try {
    const { userSkills, targetRole } = req.body;

    if (!userSkills || !targetRole) {
      return res.status(400).json({ error: 'Missing userSkills or targetRole' });
    }

    const prompt = `
You are an expert career intelligence and skill gap analyzer for digital design and tech roles.
Evaluate the candidate's current skills against the target role requirements.

Candidate Current Skills:
${JSON.stringify(userSkills, null, 2)}

Target Role:
Title: ${targetRole.title}
Level: ${targetRole.level}
Summary: ${targetRole.summary}
Required Skills: ${JSON.stringify(targetRole.requiredSkills, null, 2)}

Task:
1. Compare the user's current skills with the skills required for the target role.
2. Identify missing skills (not in profile) and weak skills (in profile but lower proficiency than required).
3. Calculate an overall Career Readiness Score as a percentage integer (0-100).
   Note: If the user has Figma (Advanced), Photoshop (Advanced), Illustrator (Intermediate), Wireframing (Intermediate), Basic UI Design (Intermediate) for the UI/UX Designer role, the baseline score should be approximately 68%. If the user has more or higher-level skills, adjust higher; if fewer or lower, adjust lower.
4. Categorize all identified gaps as Critical, High, or Medium priority:
   - For UI/UX Designer, the primary gaps must be: UX Research (Priority 1, Critical), Design Systems (Priority 2, High), Usability Testing (Priority 3, Medium or Essential), and Advanced Prototyping (Priority 4, Medium or Polish).
5. For each gap, explain why the skill is important for the role and provide a concrete recommended action.
6. Generate a personalized 4-phase, 8-week learning roadmap tailored to close these exact gaps, with actionable milestones, estimated study hours, practical deliverables, and curated resources.
7. Return a breakdown comparing all key skills (both acquired and gap skills) with current percentage, target percentage, and status.

Return ONLY a valid JSON object matching the requested schema.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            readinessScore: {
              type: Type.INTEGER,
              description: 'Overall Career Readiness Score (0-100)',
            },
            matchScore: {
              type: Type.INTEGER,
              description: 'Percentage of core requirements addressed',
            },
            executiveTakeaway: {
              type: Type.STRING,
              description: 'Executive summary explaining strengths, gaps, and transition pathway',
            },
            prioritizedGaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  skillName: { type: Type.STRING },
                  category: { type: Type.STRING },
                  priority: { type: Type.INTEGER },
                  urgencyLabel: {
                    type: Type.STRING,
                    description: 'Critical, High, or Medium',
                  },
                  urgencyColor: {
                    type: Type.STRING,
                    description: 'rose, purple, amber, or indigo',
                  },
                  currentLevel: { type: Type.STRING },
                  targetLevel: { type: Type.STRING },
                  gapDelta: { type: Type.INTEGER },
                  impactWeight: { type: Type.INTEGER },
                  estimatedWeeks: { type: Type.INTEGER },
                  whyItMatters: { type: Type.STRING },
                  recommendedAction: { type: Type.STRING },
                },
                required: [
                  'skillName',
                  'category',
                  'priority',
                  'urgencyLabel',
                  'currentLevel',
                  'targetLevel',
                  'whyItMatters',
                  'recommendedAction',
                ],
              },
            },
            competencyComparison: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  current: { type: Type.INTEGER },
                  target: { type: Type.INTEGER },
                  status: { type: Type.STRING },
                },
                required: ['name', 'current', 'target', 'status'],
              },
            },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phaseNumber: { type: Type.INTEGER },
                  phaseCode: { type: Type.STRING },
                  title: { type: Type.STRING },
                  weeksDuration: { type: Type.STRING },
                  focusArea: { type: Type.STRING },
                  readinessBoost: { type: Type.INTEGER },
                  projectedReadiness: { type: Type.INTEGER },
                  milestones: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        summary: { type: Type.STRING },
                        estimatedHours: { type: Type.INTEGER },
                        completed: { type: Type.BOOLEAN },
                        skillsTackled: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                        practicalDeliverable: { type: Type.STRING },
                        curatedResources: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              title: { type: Type.STRING },
                              type: { type: Type.STRING },
                              duration: { type: Type.STRING },
                            },
                            required: ['title', 'type', 'duration'],
                          },
                        },
                      },
                      required: [
                        'id',
                        'title',
                        'summary',
                        'estimatedHours',
                        'skillsTackled',
                        'practicalDeliverable',
                      ],
                    },
                  },
                },
                required: [
                  'phaseNumber',
                  'phaseCode',
                  'title',
                  'weeksDuration',
                  'focusArea',
                  'readinessBoost',
                  'projectedReadiness',
                  'milestones',
                ],
              },
            },
          },
          required: [
            'readinessScore',
            'executiveTakeaway',
            'prioritizedGaps',
            'roadmap',
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json(parsedData);
  } catch (error) {
    console.error('Error running Gemini skill gap analysis:', error);
    return res.status(500).json({
      error: 'Failed to analyze skill gaps with Gemini',
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// Mount Vite or static server
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
