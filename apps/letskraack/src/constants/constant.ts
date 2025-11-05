import { BookA, Compass, LayoutDashboard, Mailbox, User, WandSparkles } from "lucide-react";
import type {
  AiInterviewQuestion,
  CodingLanguage,
  CodingLanguageConfig,
  CodingLanguageOption,
  DifficultyLevel,
  Resume,
} from '@/types/types'

export const SidebarItems = [
  {
    title: "Dashboard",
    href: "/workspace",
    icons: LayoutDashboard
  },
  {
    title: "My Learning",
    href: "/workspace/my-learning",
    icons: BookA
  },
  {
    title: "Explore Courses",
    href: "/workspace/explore-courses",
    icons: Compass
  },
  {
    title: "AI Tools",
    href: "/workspace/ai-tools",
    icons: WandSparkles
  },
  {
    title: "Billing",
    href: "/workspace/billing",
    icons: Mailbox
  },
  {
    title: "Profile",
    href: "/workspace/profile",
    icons: User
  }
]

export const CourseList = [
    {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React.js and build dynamic web applications.",
    instructor: "John Doe",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into advanced JavaScript concepts and techniques.",
    instructor: "Jane Smith",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Understand the principles of user interface and user experience design.",
    instructor: "Alice Johnson",
  },
  {
    id: 4,
    title: "Full-Stack Web Development",
    description: "Become a full-stack web developer by learning both front-end and back-end technologies.",
    instructor: "Bob Brown",
  }
]

export const PromptCourseGeneration = `
Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description,Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name, , Topic under each chapters , Duration for each chapters etc, in JSON format only

Schema:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",

"bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ],
     
      }
    ]
  }
}

, User Input: 
`

export const PromptCourseContentGeneration = `
Depends on Chapter name and Topic Generate content for each topic in HTML 

and give response in JSON format. 

Schema:{

chapterName:<>,

{

topic:<>,

content:<>

}

}

: User Input:

`

export const CoachingExpert = [
  {
    name: "Joanna",
    avatar: "J",
  },
  {
    name: "Matthew",
    avatar: "M",
  },
  {
    name: "Ivy",
    avatar: "I"
  },
  {
    name: "Justin",
    avatar: "J"
  },
  {
    name: "Kendra",
    avatar: "K"
  },
  {
    name: "Salli",
    avatar: "S"
  },
  {
    name: "Kimberly",
    avatar: "K"
  },
  {
    name: "Joey",
    avatar: "J"
  }
]


export const CoachingOptions = [
    {
        name: 'ai-interview',
        prompt: 'You are a friendly AI voice interviewer simulating real interview scenarios for {user_topic}. Keep responses clear and concise. Ask structured, industry-relevant questions and provide constructive feedback to help users improve. Ensure responses stay under 120 characters.',
        summeryPrompt: 'As per conversation give feedback to user along with where is improvment space depends in well structure',
    }
];

export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
   {
    id: "4",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "5",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "6",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
 
}: {
  jobTitle: string;
  jobDescription: string;

}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`;



// -------------------- coding ---------------------------------------------------------------

export const ALLOWED_DIFFICULTIES: DifficultyLevel[] = ["easy", "medium", "hard"];

export const CODING_LANGUAGE_CONFIG: Record<CodingLanguage, CodingLanguageConfig> = {
  javascript: {
    label: "JavaScript",
    promptLabel: "JavaScript",
    starterTemplate: `function solution(): void {\n  // TODO: Implement your solution here\n}\n`,
    fallbackEditorial: `function solution(nums, target) {\n  const lookup = new Map();\n  for (let i = 0; i < nums.length; i += 1) {\n    const complement = target - nums[i];\n    if (lookup.has(complement)) {\n      return [lookup.get(complement), i];\n    }\n    lookup.set(nums[i], i);\n  }\n  return [-1, -1];\n}\n`,
    fallbackExplanation:
      "Iterate once, storing each value in a map. For every number, check if the complement exists. This yields O(n) time and O(n) space.",
  },
  python: {
    label: "Python",
    promptLabel: "Python",
    starterTemplate: `def solution() -> None:\n    \"\"\"TODO: Implement your solution here\"\"\"\n    pass\n`,
    fallbackEditorial: `from typing import List, Tuple\n\n\ndef solution(nums: List[int], target: int) -> Tuple[int, int]:\n    lookup = {}\n    for idx, value in enumerate(nums):\n        complement = target - value\n        if complement in lookup:\n            return lookup[complement], idx\n        lookup[value] = idx\n    return -1, -1\n`,
    fallbackExplanation:
      "Traverse the list while storing seen values in a dictionary. The complement lookup finds the pair in linear time using extra space proportional to the input.",
  },
  cpp: {
    label: "C++",
    promptLabel: "C++",
    starterTemplate: `#include <bits/stdc++.h>\nusing namespace std;\n\nvoid solution() {\n  // TODO: Implement your solution here\n}\n`,
    fallbackEditorial: `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> solution(const vector<int>& nums, int target) {\n  unordered_map<int, int> lookup;\n  for (int i = 0; i < static_cast<int>(nums.size()); ++i) {\n    int complement = target - nums[i];\n    auto it = lookup.find(complement);\n    if (it != lookup.end()) {\n      return {it->second, i};\n    }\n    lookup[nums[i]] = i;\n  }\n  return {-1, -1};\n}\n`,
    fallbackExplanation:
      "Maintain an unordered_map from value to index. While scanning, search for the complement. Found pairs return immediately, giving O(n) time complexity.",
  },
  java: {
    label: "Java",
    promptLabel: "Java",
    starterTemplate: `public class Solution {\n  public void solution() {\n    // TODO: Implement your solution here\n  }\n}\n`,
    fallbackEditorial: `import java.util.HashMap;\nimport java.util.Map;\n\npublic class Solution {\n  public int[] solution(int[] nums, int target) {\n    Map<Integer, Integer> lookup = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n      int complement = target - nums[i];\n      if (lookup.containsKey(complement)) {\n        return new int[] {lookup.get(complement), i};\n      }\n      lookup.put(nums[i], i);\n    }\n    return new int[] {-1, -1};\n  }\n}\n`,
    fallbackExplanation:
      "Use a HashMap to remember seen numbers. For every element, check whether the complement exists. This keeps runtime linear while using extra memory for the map.",
  },
} as const;

export const CODING_LANGUAGE_OPTIONS: CodingLanguageOption[] = Object.entries(CODING_LANGUAGE_CONFIG).map(
  ([value, config]) => ({
    value: value as CodingLanguage,
    label: config.label,
  }),
);

export const ALLOWED_LANGUAGES: CodingLanguage[] = CODING_LANGUAGE_OPTIONS.map((option) => option.value);

export const DEFAULT_CODING_LANGUAGE: CodingLanguage = CODING_LANGUAGE_OPTIONS[0]?.value || 'javascript';

export const DIFFICULTY_TIPS: Record<DifficultyLevel, string> = {
  easy: "Create a warm-up style question that reinforces core programming concepts such as arrays, strings, or basic control flow. Keep the problem approachable for beginners and include at least two explicit constraints.",
  medium: "Design a question that requires intermediate problem-solving with data structures like hash maps, sets, or sorting. Introduce meaningful constraints that force the candidate to consider time and space complexity trade-offs.",
  hard: "Craft an advanced interview challenge that may involve graphs, dynamic programming, or complex optimisations. Provide nuanced constraints or edge cases that stress-test the candidate's reasoning and ability to communicate trade-offs.",
};

export const buildBasePrompt = (language: CodingLanguage): string => {
  const languageLabel = CODING_LANGUAGE_CONFIG[language].promptLabel;

  return `You are an encouraging AI interview coach preparing coding interview questions.\n\nReturn a JSON object that strictly matches this TypeScript interface:\n\ninterface AiInterviewQuestion {\n  id: string; // unique identifier\n  title: string; // concise question title\n  description: string; // readable problem statement\n  difficulty: 'easy' | 'medium' | 'hard'; // must match the requested difficulty\n  constraints: string; // newline separated constraints, no bullet characters\n  note?: string; // optional helpful hint\n  starterCode: string; // ${languageLabel} starter skeleton for the candidate\n  followUpQuestions?: string[]; // optional list of brief follow-up prompts\n  sampleAnswerOutline?: string; // optional short outline in plain text\n  editorialCode: string; // complete ${languageLabel} solution with inline comments\n  editorialExplanation: string; // short explanation (<=120 words) of the approach\n  language: 'javascript' | 'python' | 'cpp' | 'java'; // match the requested language\n}\n\nGuidelines:\n- Use clear, interview-ready language.\n- Provide 2-5 constraints separated by newlines (no numbering or dashes).\n- Ensure starterCode compiles as idiomatic ${languageLabel}.\n- editorialCode must be a full, working ${languageLabel} solution with helpful comments.\n- editorialExplanation should summarise the key idea and complexity in plain text.\n- Avoid Markdown code fences, notes about being an AI, or extraneous commentary.`;
};

export const buildFallbackQuestion = (
  difficulty: DifficultyLevel,
  language: CodingLanguage,
): AiInterviewQuestion => {
  const config = CODING_LANGUAGE_CONFIG[language];

  return {
    id: globalThis.crypto?.randomUUID?.() || Date.now().toString(),
    title: "Two Sum Lookup",
    description:
      "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may not use the same element twice.",
    difficulty,
    constraints: [
      "2 <= nums.length <= 10_000",
      "-1_000_000_000 <= nums[i] <= 1_000_000_000",
      "Exactly one valid answer exists",
    ].join("\n"),
    note: "Aim for a linear-time approach using additional memory.",
    starterCode: config.starterTemplate,
    followUpQuestions: [
      "How would you adapt the solution if multiple answers could exist?",
      "Can you solve it without extra space?",
    ],
    sampleAnswerOutline:
      "Use a hash map to store values and indices while iterating once over the array.",
    editorialCode: config.fallbackEditorial,
    editorialExplanation: config.fallbackExplanation,
    language,
  };
};