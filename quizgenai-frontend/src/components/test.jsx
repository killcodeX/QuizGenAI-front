import {
  Wand2,
  CheckCircle2,
  ListChecks,
  BarChart,
  Lock,
  Layers,
  Brain,
} from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
    <div className="text-blue-500">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export const QuizAppFeatures = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Unlock Your Knowledge with [Your App Name]
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Wand2 size={48} />}
            title="Instant Quiz Generation"
            description="Dive into quizzes on any topic imaginable! Powered by Gemini AI, simply enter your interest and instantly generate a unique set of challenging questions."
          />
          <FeatureCard
            icon={<CheckCircle2 size={48} />}
            title="Real-time Feedback & Scoring"
            description="Get immediate feedback on your answers as you progress. Our intelligent scoring system tracks your performance in real-time, keeping you engaged and informed."
          />
          <FeatureCard
            icon={<ListChecks size={48} />}
            title="Comprehensive Quiz History"
            description="Review your past quiz attempts with detailed records. Analyze your performance on each question and track your learning journey over time."
          />
          <FeatureCard
            icon={<BarChart size={48} />}
            title="Insightful Performance Statistics"
            description="Visualize your progress with interactive graphs. Understand your strengths and weaknesses across different topics, helping you focus your learning efforts."
          />
          <FeatureCard
            icon={<Lock size={48} />}
            title="Secure User Authentication"
            description="Your progress and data are securely stored. With Auth.js integration, enjoy a seamless and protected login experience."
          />
          <FeatureCard
            icon={<Layers size={48} />}
            title="Flexible and Scalable Architecture"
            description="Built with cutting-edge technologies like Next.js, Tailwind CSS, Shadcn UI, Node.js, Express, PostgreSQL, Docker, and Prisma, our app delivers a fast, responsive, and scalable experience."
          />
          <FeatureCard
            icon={<Brain size={48} />}
            title="Powered by Gemini AI"
            description="Experience the power of Google's Gemini AI, providing intelligent quiz generation and ensuring a dynamic and engaging learning experience."
          />
          {/* Add more features as needed */}
        </div>
      </div>
    </div>
  );
};

export default QuizAppFeatures;