
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Activity, Brain, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const AssessmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate fetching assessment data
    const assessments = {
      depression: {
        title: "Depression Screening",
        description: "PHQ-9 assessment tool",
        icon: <BookOpen className="h-6 w-6 text-sahayata-blue" />,
        details: "The Patient Health Questionnaire (PHQ-9) is a validated self-report tool used to screen for the presence and severity of depression.",
        questions: [
          "Little interest or pleasure in doing things?",
          "Feeling down, depressed, or hopeless?",
          "Trouble falling or staying asleep, or sleeping too much?",
          "Feeling tired or having little energy?",
          "Poor appetite or overeating?",
          "Feeling bad about yourself or that you are a failure?",
          "Trouble concentrating on things?",
          "Moving or speaking so slowly that other people could have noticed?",
          "Thoughts that you would be better off dead, or of hurting yourself?"
        ]
      },
      anxiety: {
        title: "Anxiety Assessment",
        description: "GAD-7 screening tool",
        icon: <Activity className="h-6 w-6 text-sahayata-blue" />,
        details: "The Generalized Anxiety Disorder-7 (GAD-7) is a seven-item instrument used to measure or assess the severity of generalized anxiety disorder.",
        questions: [
          "Feeling nervous, anxious, or on edge?",
          "Not being able to stop or control worrying?",
          "Worrying too much about different things?",
          "Trouble relaxing?",
          "Being so restless that it's hard to sit still?",
          "Becoming easily annoyed or irritable?",
          "Feeling afraid, as if something awful might happen?"
        ]
      },
      stress: {
        title: "Stress Evaluation",
        description: "PSS-10 assessment",
        icon: <Brain className="h-6 w-6 text-sahayata-blue" />,
        details: "The Perceived Stress Scale (PSS-10) is a widely used psychological instrument for measuring the perception of stress in your life.",
        questions: [
          "Been upset because of something that happened unexpectedly?",
          "Felt unable to control the important things in your life?",
          "Felt nervous and stressed?",
          "Felt confident about your ability to handle personal problems?",
          "Felt that things were going your way?",
          "Found that you could not cope with all the things you had to do?",
          "Been able to control irritations in your life?",
          "Felt that you were on top of things?",
          "Been angered because of things that happened that were outside of your control?",
          "Felt difficulties were piling up so high that you could not overcome them?"
        ]
      },
      trauma: {
        title: "Trauma Screening",
        description: "PCL-5 assessment",
        icon: <BookOpen className="h-6 w-6 text-sahayata-blue" />,
        details: "The PCL-5 is a 20-item self-report measure that assesses the presence and severity of PTSD symptoms.",
        questions: [
          "Repeated, disturbing, and unwanted memories of the stressful experience?",
          "Repeated, disturbing dreams of the stressful experience?",
          "Suddenly feeling or acting as if the stressful experience were actually happening again?",
          "Feeling very upset when something reminded you of the stressful experience?",
          "Having strong physical reactions when something reminded you of the stressful experience?"
        ]
      },
      bipolar: {
        title: "Bipolar Disorder Screening",
        description: "MDQ assessment tool",
        icon: <Activity className="h-6 w-6 text-sahayata-blue" />,
        details: "The Mood Disorder Questionnaire (MDQ) is a screening tool for bipolar disorder.",
        questions: [
          "Has there ever been a period of time when you were not your usual self and...",
          "You felt so good or so hyper that other people thought you were not your normal self?",
          "You were so irritable that you shouted at people or started fights or arguments?",
          "You felt much more self-confident than usual?",
          "You got much less sleep than usual and found you didn't really miss it?"
        ]
      },
      sleep: {
        title: "Sleep Quality Assessment",
        description: "PSQI screening tool",
        icon: <Brain className="h-6 w-6 text-sahayata-blue" />,
        details: "The Pittsburgh Sleep Quality Index (PSQI) is an effective instrument used to measure the quality and patterns of sleep in adults.",
        questions: [
          "During the past month, what time have you usually gone to bed at night?",
          "How long (in minutes) has it usually taken you to fall asleep each night?",
          "What time have you usually gotten up in the morning?",
          "How many hours of actual sleep did you get at night?",
          "During the past month, how often have you had trouble sleeping because you cannot get to sleep within 30 minutes?"
        ]
      }
    };

    // Get the assessment data based on the ID
    const selectedAssessment = id ? (assessments as any)[id] : null;
    
    setTimeout(() => {
      setAssessment(selectedAssessment);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleStartAssessment = () => {
    setStarted(true);
    setProgress(5); // Initial progress
    toast({
      title: "Assessment Started",
      description: "Please answer all questions honestly.",
    });
  };

  const handleAnswerSelect = (value: string) => {
    const numValue = parseInt(value);
    
    setAnswers({
      ...answers,
      [currentQuestionIndex]: numValue
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      // Calculate progress percentage
      const newProgress = Math.floor(((currentQuestionIndex + 2) / assessment.questions.length) * 100);
      setProgress(newProgress);
    } else {
      // Assessment completed
      const score = Object.values(answers).reduce((sum: number, val: any) => sum + val, 0);
      
      toast({
        title: "Assessment Completed",
        description: `Thank you for completing the assessment. Your score: ${score}`,
      });
      
      // Reset for demonstration purposes
      setStarted(false);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setProgress(100);
    }
  };

  if (loading) {
    return (
      <div className="font-poppins">
        <Header />
        <main className="min-h-screen py-16">
          <div className="container">
            <div className="text-center">
              <p>Loading assessment...</p>
            </div>
          </div>
        </main>
        <Footer />
        <LanguageSelector />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="font-poppins">
        <Header />
        <main className="min-h-screen py-16">
          <div className="container">
            <div className="text-center">
              <h1 className="text-3xl font-bold font-poppins mb-4">Assessment Not Found</h1>
              <p className="text-sahayata-neutralGray mb-6">
                We couldn't find the assessment you're looking for.
              </p>
              <Button onClick={() => navigate('/all-assessments')}>
                Return to All Assessments
              </Button>
            </div>
          </div>
        </main>
        <Footer />
        <LanguageSelector />
      </div>
    );
  }

  return (
    <div className="font-poppins">
      <Header />
      <main className="min-h-screen py-16">
        <div className="container">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/all-assessments')} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to All Assessments
            </Button>
          </div>

          {!started ? (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="bg-sahayata-purple/20 p-3 rounded-full">
                      {assessment.icon}
                    </span>
                    {assessment.title}
                  </CardTitle>
                  <p className="text-sahayata-neutralGray mt-2">{assessment.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">About this assessment</h3>
                    <p className="text-gray-700">{assessment.details}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Sample questions</h3>
                    <ul className="space-y-3">
                      {assessment.questions.slice(0, 3).map((question: string, index: number) => (
                        <li key={index} className="bg-gray-50 p-3 rounded-md">
                          {question}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm text-gray-500">
                      ...and {assessment.questions.length - 3} more questions
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Estimated completion time</span>
                      <span>3-5 minutes</span>
                    </div>
                    <Progress value={0} className="h-2 bg-gray-200" />
                  </div>

                  <Button 
                    className="w-full bg-sahayata-blue hover:bg-sahayata-blue/80" 
                    onClick={handleStartAssessment}
                  >
                    Start Assessment
                  </Button>

                  <p className="mt-4 text-xs text-center text-gray-500">
                    This assessment is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="bg-sahayata-purple/20 p-3 rounded-full">
                      {assessment.icon}
                    </span>
                    {assessment.title} - Question {currentQuestionIndex + 1}/{assessment.questions.length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Progress value={progress} className="h-2 mb-4" />
                    <h3 className="text-lg font-medium mb-4">
                      {assessment.questions[currentQuestionIndex]}
                    </h3>
                    
                    <RadioGroup 
                      className="space-y-4 mt-6"
                      value={answers[currentQuestionIndex]?.toString()}
                      onValueChange={handleAnswerSelect}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="option1" />
                        <Label htmlFor="option1">Not at all</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="option2" />
                        <Label htmlFor="option2">Several days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="option3" />
                        <Label htmlFor="option3">More than half the days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id="option4" />
                        <Label htmlFor="option4">Nearly every day</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button 
                    className="w-full bg-sahayata-blue hover:bg-sahayata-blue/80 mt-4" 
                    onClick={handleNextQuestion}
                    disabled={answers[currentQuestionIndex] === undefined}
                  >
                    {currentQuestionIndex < assessment.questions.length - 1 ? "Next Question" : "Complete Assessment"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default AssessmentDetail;
