import { BookA, BrickWallFire, Compass, Heart, icons, LayoutDashboard, Mailbox, User, WandSparkles } from "lucide-react";

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
    name: "Sally",
    avatar: "S",
  },
  {
    name: "Miame",
    avatar: "M"
  }
]