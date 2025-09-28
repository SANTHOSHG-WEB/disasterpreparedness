export interface Module {
  id: string;
  title: string;
  videoId: string;
  videoUrl: string;
  duration: string;
  description: string;
  quizQuestions: QuizQuestion[];
  gameType: 'drag-drop' | 'maze' | 'spot-hazard' | 'memory-match';
  gameData: any;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export const modules: Module[] = [
  {
    id: '1',
    title: 'Introduction',
    videoId: 'FVwvbS-0q18',
    videoUrl: 'https://youtu.be/FVwvbS-0q18?si=RUbBWNqRwTmKkDlE',
    duration: '5:53',
    description: 'Learn the fundamentals of disaster management and why preparedness is crucial for everyone.',
    gameType: 'drag-drop',
    gameData: {
      instruction: 'Drag disaster types to their correct preparation categories',
      items: [
        { id: 1, text: 'Earthquake', category: 'natural' },
        { id: 2, text: 'Fire', category: 'human-made' },
        { id: 3, text: 'Flood', category: 'natural' },
        { id: 4, text: 'Chemical Spill', category: 'human-made' }
      ],
      categories: [
        { id: 'natural', label: 'Natural Disasters' },
        { id: 'human-made', label: 'Human-Made Disasters' }
      ]
    },
    quizQuestions: [
      {
        id: '1-1',
        question: 'What is the primary goal of disaster management?',
        type: 'multiple-choice',
        options: [
          'To predict all disasters',
          'To reduce risks and minimize impacts',
          'To completely prevent disasters',
          'To rebuild after disasters'
        ],
        correctAnswer: 'To reduce risks and minimize impacts',
        explanation: 'Disaster management focuses on reducing risks and minimizing impacts through preparedness, response, and recovery.'
      },
      {
        id: '1-2',
        question: 'India has a high disaster vulnerability index.',
        type: 'true-false',
        correctAnswer: 'true',
        explanation: 'India is highly vulnerable to various natural disasters due to its geographical location and climate conditions.'
      },
      {
        id: '1-3',
        question: 'Which phase comes first in disaster management?',
        type: 'multiple-choice',
        options: ['Response', 'Recovery', 'Preparedness', 'Mitigation'],
        correctAnswer: 'Mitigation',
        explanation: 'Mitigation is the first phase, focused on reducing or eliminating disaster risks before they occur.'
      }
    ]
  },
  {
    id: '2',
    title: 'Earthquake 1',
    videoId: 'MllUVQM3KVk',
    videoUrl: 'https://youtu.be/MllUVQM3KVk?si=3HdAsFBebG0aI5NW',
    duration: '5:54',
    description: 'Understanding earthquakes, their causes, and immediate safety responses.',
    gameType: 'spot-hazard',
    gameData: {
      instruction: 'Click on the earthquake hazards in this classroom scene',
      imageUrl: '/images/classroom-hazards.jpg', // Placeholder - would need actual image
      hazards: [
        { x: 20, y: 30, label: 'Unsecured bookshelf' },
        { x: 60, y: 45, label: 'Heavy ceiling fan' },
        { x: 40, y: 80, label: 'Glass windows' }
      ]
    },
    quizQuestions: [
      {
        id: '2-1',
        question: 'During an earthquake, what should you do first?',
        type: 'multiple-choice',
        options: [
          'Run outside immediately',
          'Drop, Cover, and Hold On',
          'Stand in a doorway',
          'Hide under a bed'
        ],
        correctAnswer: 'Drop, Cover, and Hold On',
        explanation: 'Drop to hands and knees, take cover under a desk/table, and hold on until shaking stops.'
      },
      {
        id: '2-2',
        question: 'The "Triangle of Life" theory is recommended for earthquake safety.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'The "Triangle of Life" theory is not recommended. "Drop, Cover, and Hold On" is the official safety method.'
      },
      {
        id: '2-3',
        question: 'If you are outdoors during an earthquake, you should:',
        type: 'multiple-choice',
        options: [
          'Run to the nearest building',
          'Stay away from buildings, trees, and power lines',
          'Lie flat on the ground',
          'Find a car to hide under'
        ],
        correctAnswer: 'Stay away from buildings, trees, and power lines',
        explanation: 'Stay in an open area away from anything that could fall on you.'
      }
    ]
  },
  {
    id: '3',
    title: 'Earthquake 2',
    videoId: 'BLEPakj1YTY',
    videoUrl: 'https://youtu.be/BLEPakj1YTY?si=vxHU_WqvoBw9JrfZ',
    duration: '3:38',
    description: 'Post-earthquake procedures, aftershock preparedness, and recovery steps.',
    gameType: 'memory-match',
    gameData: {
      instruction: 'Match earthquake terms with their correct actions',
      pairs: [
        { id: 1, term: 'Aftershock', action: 'Be prepared for additional shaking' },
        { id: 2, term: 'Evacuation', action: 'Leave building if structurally damaged' },
        { id: 3, term: 'First Aid', action: 'Help injured people immediately' },
        { id: 4, term: 'Gas Leak', action: 'Turn off gas and avoid electrical switches' }
      ]
    },
    quizQuestions: [
      {
        id: '3-1',
        question: 'After an earthquake stops, what should you check first?',
        type: 'multiple-choice',
        options: [
          'Your phone for messages',
          'Yourself and others for injuries',
          'The TV for news',
          'Your valuables'
        ],
        correctAnswer: 'Yourself and others for injuries',
        explanation: 'Immediately check for injuries and provide first aid as needed.'
      },
      {
        id: '3-2',
        question: 'Aftershocks are always weaker than the main earthquake.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'While usually weaker, aftershocks can sometimes be as strong or stronger than the initial quake.'
      }
    ]
  },
  {
    id: '4',
    title: 'Flood 1',
    videoId: 'pi_nUPcQz_A',
    videoUrl: 'https://youtube.com/watch?v=pi_nUPcQz_A&feature=shared',
    duration: '9:15',
    description: 'Understanding flood types, early warning signs, and preparation strategies.',
    gameType: 'maze',
    gameData: {
      instruction: 'Navigate to safety through the flooded area',
      startX: 0,
      startY: 0,
      endX: 9,
      endY: 9,
      obstacles: [[2,2], [3,2], [4,2], [2,5], [6,7], [7,7]]
    },
    quizQuestions: [
      {
        id: '4-1',
        question: 'How much water can knock you down while walking?',
        type: 'multiple-choice',
        options: ['2 inches', '6 inches', '12 inches', '18 inches'],
        correctAnswer: '6 inches',
        explanation: 'Just 6 inches of fast-moving water can knock you down.'
      },
      {
        id: '4-2',
        question: 'It is safe to drive through flooded roads if you go slowly.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'Never drive through flooded roads. Turn Around, Don\'t Drown!'
      },
      {
        id: '4-3',
        question: 'During a flood warning, you should:',
        type: 'multiple-choice',
        options: [
          'Wait to see how bad it gets',
          'Move to higher ground immediately',
          'Try to save your belongings first',
          'Go outside to watch the water'
        ],
        correctAnswer: 'Move to higher ground immediately',
        explanation: 'Act quickly when flood warnings are issued - move to higher ground without delay.'
      }
    ]
  },
  {
    id: '5',
    title: 'Flood 2',
    videoId: '43M5mZuzHF8',
    videoUrl: 'https://youtu.be/43M5mZuzHF8?si=JmzXjONwaCRquaj2',
    duration: '8:00',
    description: 'Advanced flood safety, rescue procedures, and post-flood recovery.',
    gameType: 'drag-drop',
    gameData: {
      instruction: 'Arrange flood response actions in correct order',
      items: [
        { id: 1, text: 'Monitor weather alerts', order: 1 },
        { id: 2, text: 'Move to higher ground', order: 2 },
        { id: 3, text: 'Call for rescue if trapped', order: 3 },
        { id: 4, text: 'Return only when declared safe', order: 4 }
      ]
    },
    quizQuestions: [
      {
        id: '5-1',
        question: 'If trapped in a building during a flood, you should:',
        type: 'multiple-choice',
        options: [
          'Go to the basement',
          'Go to the highest floor',
          'Stay on the ground floor',
          'Go outside'
        ],
        correctAnswer: 'Go to the highest floor',
        explanation: 'Move to the highest floor and signal for help from there.'
      },
      {
        id: '5-2',
        question: 'Flood water is always clean and safe.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'Flood water often contains contaminants, sewage, and debris making it dangerous.'
      }
    ]
  },
  {
    id: '6',
    title: 'Fire Safety',
    videoId: '6qH6fjLxgrU',
    videoUrl: 'https://youtube.com/watch?v=Xgc90CoJbDI&feature=shared',
    duration: '7:30',
    description: 'Fire safety, prevention, evacuation procedures, and firefighting basics.',
    gameType: 'spot-hazard',
    gameData: {
      instruction: 'Identify fire hazards in this home scene',
      hazards: [
        { x: 15, y: 25, label: 'Overloaded electrical outlet' },
        { x: 45, y: 60, label: 'Candle near curtains' },
        { x: 75, y: 40, label: 'Blocked exit door' }
      ]
    },
    quizQuestions: [
      {
        id: '6-1',
        question: 'What number do you call for Fire Department in India?',
        type: 'multiple-choice',
        options: ['100', '101', '102', '108'],
        correctAnswer: '101',
        explanation: 'Fire Department emergency number in India is 101.'
      },
      {
        id: '6-2',
        question: 'You should use elevators during a fire emergency.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'Never use elevators during a fire - always use stairs.'
      },
      {
        id: '6-3',
        question: 'If your clothes catch fire, you should:',
        type: 'multiple-choice',
        options: [
          'Run to get help',
          'Stop, Drop, and Roll',
          'Pour water on yourself',
          'Remove clothes quickly'
        ],
        correctAnswer: 'Stop, Drop, and Roll',
        explanation: 'Stop, drop to the ground, and roll to smother the flames.'
      }
    ]
  },
  {
    id: '7',
    title: 'Landslide',
    videoId: 'krJLnXpemtQ',
    videoUrl: 'https://youtu.be/krJLnXpemtQ?si=XSKk_NG0IYQ0RWNx',
    duration: '6:45',
    description: 'Understanding landslide risks, warning signs, and safety measures.',
    gameType: 'memory-match',
    gameData: {
      instruction: 'Match landslide warning signs with their descriptions',
      pairs: [
        { id: 1, term: 'Ground cracks', action: 'Visible fissures in the earth' },
        { id: 2, term: 'Tilting trees', action: 'Trees leaning in new directions' },
        { id: 3, term: 'Spring changes', action: 'New springs or water flow changes' },
        { id: 4, term: 'Fence displacement', action: 'Fences or poles moving position' }
      ]
    },
    quizQuestions: [
      {
        id: '7-1',
        question: 'Landslides are most common during:',
        type: 'multiple-choice',
        options: [
          'Dry seasons',
          'Heavy rainfall',
          'Winter months',
          'Full moon'
        ],
        correctAnswer: 'Heavy rainfall',
        explanation: 'Heavy rainfall saturates soil and increases landslide risk.'
      },
      {
        id: '7-2',
        question: 'Small landslides always lead to bigger ones.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'While small landslides can indicate instability, they don\'t always lead to larger ones.'
      }
    ]
  },
  {
    id: '8',
    title: 'Hurricane',
    videoId: 'xHRbnuB9F1I',
    videoUrl: 'https://youtu.be/xHRbnuB9F1I?si=McasRTDIWs-66JF4',
    duration: '8:20',
    description: 'Hurricane preparedness, safety during storms, and post-hurricane actions.',
    gameType: 'drag-drop',
    gameData: {
      instruction: 'Sort hurricane preparation items by priority',
      items: [
        { id: 1, text: 'Emergency water supply', priority: 'high' },
        { id: 2, text: 'Board up windows', priority: 'high' },
        { id: 3, text: 'Charge electronic devices', priority: 'medium' },
        { id: 4, text: 'Secure outdoor furniture', priority: 'medium' },
        { id: 5, text: 'Download movies', priority: 'low' }
      ],
      categories: [
        { id: 'high', label: 'High Priority' },
        { id: 'medium', label: 'Medium Priority' },
        { id: 'low', label: 'Low Priority' }
      ]
    },
    quizQuestions: [
      {
        id: '8-1',
        question: 'The eye of a hurricane is:',
        type: 'multiple-choice',
        options: [
          'The most dangerous part',
          'The calmest part',
          'The fastest moving part',
          'The coldest part'
        ],
        correctAnswer: 'The calmest part',
        explanation: 'The eye is the calm center, but dangerous winds return as it passes.'
      },
      {
        id: '8-2',
        question: 'You should evacuate immediately when the hurricane arrives.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'Evacuation should happen well before the hurricane arrives, not during it.'
      }
    ]
  },
  {
    id: '9',
    title: 'Forest Fire',
    videoId: '_bNLtjHG9dM',
    videoUrl: 'https://youtu.be/_bNLtjHG9dM?si=6SkguPkfFEE7zFPg',
    duration: '7:10',
    description: 'Forest fire behavior, prevention, evacuation, and firefighting support.',
    gameType: 'maze',
    gameData: {
      instruction: 'Escape the forest fire by finding the safe evacuation route',
      startX: 1,
      startY: 8,
      endX: 8,
      endY: 1,
      obstacles: [[3,3], [4,3], [5,3], [3,4], [3,5], [6,6], [7,6]]
    },
    quizQuestions: [
      {
        id: '9-1',
        question: 'Most forest fires are caused by:',
        type: 'multiple-choice',
        options: [
          'Lightning',
          'Human activities',
          'Animals',
          'Spontaneous combustion'
        ],
        correctAnswer: 'Human activities',
        explanation: 'About 90% of forest fires are caused by human activities like campfires and discarded cigarettes.'
      },
      {
        id: '9-2',
        question: 'You should drive through smoke to escape a forest fire.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'Never drive through smoke - visibility is zero and it\'s extremely dangerous.'
      }
    ]
  },
  {
    id: '10',
    title: 'Conclusion',
    videoId: 'OGWxPR5V-5U',
    videoUrl: 'https://youtube.com/watch?v=OGWxPR5V-5U&feature=shared',
    duration: '9:00',
    description: 'Course summary, key takeaways, and continuing your disaster preparedness journey.',
    gameType: 'memory-match',
    gameData: {
      instruction: 'Match emergency numbers with their services',
      pairs: [
        { id: 1, term: '100', action: 'Police' },
        { id: 2, term: '101', action: 'Fire Department' },
        { id: 3, term: '102', action: 'Ambulance' },
        { id: 4, term: '108', action: 'Disaster Helpline' }
      ]
    },
    quizQuestions: [
      {
        id: '10-1',
        question: 'The most important aspect of disaster management is:',
        type: 'multiple-choice',
        options: [
          'Having expensive equipment',
          'Being prepared and informed',
          'Living in a safe area',
          'Having insurance'
        ],
        correctAnswer: 'Being prepared and informed',
        explanation: 'Knowledge and preparation are the most valuable tools for disaster management.'
      },
      {
        id: '10-2',
        question: 'Disaster preparedness is only important for adults.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'Everyone, including children, should be educated about disaster preparedness.'
      },
      {
        id: '10-3',
        question: 'After completing this course, you should:',
        type: 'multiple-choice',
        options: [
          'Forget about disasters',
          'Share knowledge with family and friends',
          'Only worry during disaster season',
          'Wait for emergencies to happen'
        ],
        correctAnswer: 'Share knowledge with family and friends',
        explanation: 'Spread disaster preparedness knowledge to create safer communities.'
      }
    ]
  }
];