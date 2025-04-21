
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Activity, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export function AssessmentList() {
  const assessments = [
    {
      id: "depression",
      title: "Depression Screening",
      description: "PHQ-9 assessment tool",
      icon: <BookOpen className="h-5 w-5 text-sahayata-blue" />,
      details: "The PHQ-9 is a validated tool that helps identify depression symptoms and their severity.",
      time: "2-3 minutes",
      progress: 33
    },
    {
      id: "anxiety",
      title: "Anxiety Assessment",
      description: "GAD-7 screening tool",
      icon: <Activity className="h-5 w-5 text-sahayata-blue" />,
      details: "The GAD-7 helps identify and measure the severity of generalized anxiety disorder.",
      time: "2-3 minutes",
      progress: 33
    },
    {
      id: "stress",
      title: "Stress Evaluation",
      description: "PSS-10 assessment",
      icon: <Brain className="h-5 w-5 text-sahayata-blue" />,
      details: "The Perceived Stress Scale measures your level of perceived stress in the last month.",
      time: "3-4 minutes",
      progress: 33
    },
    {
      id: "trauma",
      title: "Trauma Screening",
      description: "PCL-5 assessment",
      icon: <BookOpen className="h-5 w-5 text-sahayata-blue" />,
      details: "The PCL-5 helps identify symptoms of trauma and PTSD in individuals.",
      time: "4-5 minutes",
      progress: 0
    },
    {
      id: "bipolar",
      title: "Bipolar Disorder Screening",
      description: "MDQ assessment tool",
      icon: <Activity className="h-5 w-5 text-sahayata-blue" />,
      details: "The Mood Disorder Questionnaire helps identify symptoms of bipolar disorder.",
      time: "3-4 minutes",
      progress: 0
    },
    {
      id: "sleep",
      title: "Sleep Quality Assessment",
      description: "PSQI screening tool",
      icon: <Brain className="h-5 w-5 text-sahayata-blue" />,
      details: "The Pittsburgh Sleep Quality Index measures the quality and patterns of sleep.",
      time: "4-5 minutes",
      progress: 0
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {assessments.map((assessment) => (
        <Card key={assessment.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="bg-sahayata-purple/20 p-2 rounded-full">
                {assessment.icon}
              </span>
              {assessment.title}
            </CardTitle>
            <CardDescription>{assessment.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              {assessment.details}
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-xs">
                <span>Completion time</span>
                <span>{assessment.time}</span>
              </div>
              <Progress value={assessment.progress} className="h-2 bg-gray-200" />
            </div>
            <Button variant="outline" className="w-full">Begin Assessment</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
