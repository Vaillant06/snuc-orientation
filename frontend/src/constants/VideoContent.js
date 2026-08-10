const VIDEO_PATHS = {
  "1_male": "orientation_1_male",
  "1_female": "orientation_1_female",
  "2_male": "orientation_2_male",
  "2_female": "orientation_2_female",
  "3_male": "orientation_3_male",
  "3_female": "orientation_3_female",
  "4_male": "orientation_4_male",
  "4_female": "orientation_4_female",
};

export function getVideoUrl(videoPath, cloudName) {
  if (!cloudName) return null;
  return `https://res.cloudinary.com/${cloudName}/video/upload/${videoPath}`;
}

const videoContent = [
  {
    id: 1,
    title: "Module 1 - Welcome & Introduction",
    file: { male: VIDEO_PATHS["1_male"], female: VIDEO_PATHS["1_female"] },
    questions: [
      {
        id: 1,
        question: "Who is the founder of the HCL group",
        options: [
          "Shikhar Malhotra",
          "Mr. Shiv Nadar",
          "Mrs. Kiran Nadar",
          "Mrs. Roshni Nadar Malhotra",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Which year did Mr. Shiv Nadar receive Padma Bhushan Award",
        options: [
          "2004",
          "2006",
          "2008",
          "2012",
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "Who is the CEO of HCL Corporation",
        options: [
          "Mrs. Kiran Nadar",
          "Mrs. Roshni Nadar Malhotra",
          "Dr. N. Nallusamy",
          "Mr. Shikhar Malhotra",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "Who is the Chancellor of Shiv Nadar University",
        options: [
          "Mr. Shiv Nadar",
          "Dr. S.K. Bhattacharyya",
          "Mr. R. Srinivasan",
          "Dr. N. Nallusamy"
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "Who is the Vice Chancellor of Shiv Nadar University",
        options: [
          "Prof. N. Nallusamy",
          "Prof. Sriman Kumar Bhattacharyya",
          "Mr. R. Srinivasan",
          "Dr. Pushpa Trivedi",
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: "Who is the Registrar of Shiv Nadar University",
        options: [
          "Dr. N. Nallusamy",
          "Dr. Rajesh Kumar",
          "Prof. Sathish Kumar K",
          "Mr. Samuel Giftson",
        ],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: "Which of the following schools is there in the University",
        options: [
          "School of Medicine",
          "School of Law",
          "School of Agriculture",
          "School of Architecture",
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: "Which department is headed by Mr. Samuel Giftson according to the organagram?",
        options: [
          "Admissions",
          "Placements",
          "Finance",
          "Controller of Examinations",
        ],
        correctAnswer: 3,
      },
      {
        id: 9,
        question: "What is one of the key focuses of the university's vision?",
        options: [
          "Innovation and research",
          "Sports development",
          "Industrial production",
          "Financial management",
        ],
        correctAnswer: 0,
      },
      {
        id: 10,
        question: "According to the mission, the university aims to produce",
        options: [
          "Knowledge leaders of tomorrow",
          "Government officials",
          "Corporate managers",
          "Professional athletes",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 2,
    title: "Module 2 - Policies & Guidelines",
    file: { male: VIDEO_PATHS["2_male"], female: VIDEO_PATHS["2_female"] },
    questions: [
      {
        id: 1,
        question: "What are the normal working hours for faculty and staff?",
        options: [
          "8:00 AM - 3:40 PM",
          "9:00 AM - 5:00 PM",
          "8:30 AM - 4:30 PM",
          "9:30 AM - 5:10 PM",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "How much lunch time is provided during the normal working hours?",
        options: [
          "15 minutes",
          "20 minutes",
          "30 minutes",
          "45 minutes",
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What flexible working time is mentioned for faculty?",
        options: [
          "8:00 AM - 3:40 PM",
          "9:30 AM - 5:10 PM",
          "10:00 AM - 6:00 PM",
          "9:00 AM - 5:30 PM",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "How many minutes of grace period are permitted for clock-in?",
        options: [
          "5 minutes",
          "10 minutes",
          "15 minutes",
          "20 minutes",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "How many working days are followed at SNUC?",
        options: [
          "4 days",
          "5 days",
          "6 days",
          "7 days",
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: "How should attendance be marked?",
        options: [
          "Only through biometric attendance",
          "Only through a physical register",
          "Through both physical register and biometric attendance",
          "Through email",
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        question: "What happens if an employee logs in beyond the stipulated time after exhausting the two-hour permission?",
        options: [
          "Warning is issued",
          "Half-day leave must be applied",
          "Full-day leave is applied",
          "No action is taken",
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: "During probation, employees are eligible for how many days of Casual Leave per calendar year?",
        options: [
          "10 days",
          "12 days",
          "15 days",
          "22.5 days",
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: "What is the maximum number of Restricted Holidays mentioned?",
        options: [
          "1",
          "2",
          "5",
          "10",
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: "Who approves confirmation of services?",
        options: [
          "Registrar",
          "HR",
          "Vice Chancellor",
          "Dean",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Module 3 - Employee Services & Benefits",
    file: { male: VIDEO_PATHS["3_male"], female: VIDEO_PATHS["3_female"] },
    questions: [
      {
        id: 1,
        question: "For an employee joining on or before the 15th of the month, when is salary processed?",
        options: [
          "Next financial year",
          "Current month's payroll",
          "After three months",
          "Following month's payroll",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "When is salary credited?",
        options: [
          "1st of every month",
          "15th of every month",
          "Last day of the month",
          "First Monday of every month",
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "After how many months do employees undergo assessment for confirmation?",
        options: [
          "6 months",
          "12 months",
          "18 months",
          "24 months",
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: "What does PAF stand for in the confirmation process?",
        options: [
          "Payroll Approval Form",
          "Probation Assessment Form",
          "Performance Analysis Framework",
          "Personnel Approval File",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "Which is the highest performance rating mentioned?",
        options: [
          "Good Performer",
          "Excellent Performer",
          "Distinguished Performer",
          "Threshold Performer",
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        question: "After completing how many years of service as of April 1 are employees eligible for the annual increment?",
        options: [
          "6 months",
          "1 year",
          "18 months",
          "2 years",
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: "What determines the type of campus housing allocated to an employee?",
        options: [
          "Age only",
          "Grade/level and availability",
          "Department only",
          "Length of commute",
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: "What happens when a housing unit is occupied on or before the 15th of the month?",
        options: [
          "Half-month rent is charged",
          "No rent is charged",
          "Full month's rent and maintenance are charged",
          "Rent is charged from the next month",
        ],
        correctAnswer: 2,
      },
      {
        id: 9,
        question: "What is the institution's monthly PF contribution limit mentioned in the video?",
        options: [
          "₹1,000",
          "₹1,500",
          "₹1,800",
          "₹2,500",
        ],
        correctAnswer: 2,
      },
      {
        id: 10,
        question: "What is the gift amount mentioned for a newborn child?",
        options: [
          "₹500",
          "₹1,000",
          "₹2,000",
          "₹3,000",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
  id: 4,
  title: "Module 4 - Support and Information Resources",
  file: {
    male: VIDEO_PATHS["4_male"],
    female: VIDEO_PATHS["4_female"]
  },
  questions: [
    {
      id: 1,
      question: "What approval is required before the HR Department handles quarters allotment?",
      options: [
        "Registrar approval",
        "SQAC approval",
        "Vice Chancellor approval",
        "Dean approval",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "What is the purpose of the POSH Internal Committee?",
      options: [
        "Handle payroll issues",
        "Address sexual-harassment-related grievances",
        "Manage student admissions",
        "Organize campus events",
      ],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Which of the following is handled by the HR Department after SQAC approval?",
      options: [
        "Meal coupons",
        "Quarters allotment",
        "ID cards",
        "Electricity charges",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "Who is listed as the Director & Head of Human Resources?",
      options: [
        "Mr. Samson Premkumar S",
        "Mr. Jakir Hussain",
        "Mr. Vamsi Kiran Somayajula",
        "Dr. Rajesh N P",
      ],
      correctAnswer: 0,
    },
    {
      id: 5,
      question: "How many days of Casual Leave are provided per year?",
      options: [
        "10",
        "12",
        "15",
        "22.5",
      ],
      correctAnswer: 1,
    },
    {
      id: 6,
      question: "What is the maximum Earned Leave entitlement mentioned?",
      options: [
        "12 days",
        "15 days",
        "22.5 days",
        "30 days",
      ],
      correctAnswer: 2,
    },
    {
      id: 7,
      question: "What is the maximum duration of a Sabbatical Leave mentioned?",
      options: [
        "6 months",
        "1 year",
        "2 years",
        "3 years",
      ],
      correctAnswer: 2,
    },
    {
      id: 8,
      question: "What is the maximum duration of the Winter Teaching Break?",
      options: [
        "5 days",
        "10 days",
        "20 days",
        "35 days",
      ],
      correctAnswer: 1,
    },
    {
      id: 9,
      question: "What is the maximum duration of the Summer Teaching Break?",
      options: [
        "10 days",
        "20 days",
        "30 days",
        "35 days",
      ],
      correctAnswer: 3,
    },
    {
      id: 10,
      question: "What is InfoHub primarily described as?",
      options: [
        "An online examination system",
        "A secure online space for communication, collaboration and knowledge sharing",
        "A payroll application",
        "A student attendance system",
      ],
      correctAnswer: 1,
    },
  ],
}
];

export default videoContent;
