export interface HasData {
  hasData: boolean;
}

export interface Topic {
  name: string;
  count: number;
}

export interface Performance {
  totalQuestions: number;
  correctAnswers: number;
  completionRate: number;
}

export interface Quiz {
  id: string;
  title?: string;
  topic: { name: string };
  description?: string;
}

export interface UserData {
  performance: Performance;
  topicDistribution: Topic[];
  recommendedQuizzes: Quiz[];
  quizHistory: Array<{
    id: string;
    quiz: Quiz;
    score: number;
    completedAt: string;
  }>;
  favoriteTopics: Topic[];
}
