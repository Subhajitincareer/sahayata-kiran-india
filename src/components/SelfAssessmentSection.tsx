
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function SelfAssessmentSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-poppins mb-4">Mental Health Self-Assessment</h2>
          <p className="text-sahayata-neutralGray max-w-2xl mx-auto">
            Our scientifically validated assessment tools help you understand your mental health status and provide personalized guidance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-sahayata-purple/20 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-sahayata-blue" />
                </span>
                Depression Screening
              </CardTitle>
              <CardDescription>PHQ-9 assessment tool</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                The PHQ-9 is a validated tool that helps identify depression symptoms and their severity.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-xs">
                  <span>Completion time</span>
                  <span>2-3 minutes</span>
                </div>
                <Progress value={33} className="h-2 bg-gray-200" />
              </div>
              <Button variant="outline" className="w-full">Begin Assessment</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-sahayata-purple/20 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-sahayata-blue" />
                </span>
                Anxiety Assessment
              </CardTitle>
              <CardDescription>GAD-7 screening tool</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                The GAD-7 helps identify and measure the severity of generalized anxiety disorder.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-xs">
                  <span>Completion time</span>
                  <span>2-3 minutes</span>
                </div>
                <Progress value={33} className="h-2 bg-gray-200" />
              </div>
              <Button variant="outline" className="w-full">Begin Assessment</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-sahayata-purple/20 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-sahayata-blue" />
                </span>
                Stress Evaluation
              </CardTitle>
              <CardDescription>PSS-10 assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                The Perceived Stress Scale measures your level of perceived stress in the last month.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-xs">
                  <span>Completion time</span>
                  <span>3-4 minutes</span>
                </div>
                <Progress value={33} className="h-2 bg-gray-200" />
              </div>
              <Button variant="outline" className="w-full">Begin Assessment</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 max-w-lg mx-auto mb-4">
            All assessments are anonymous and confidential. Results are for guidance only and do not replace professional diagnosis.
          </p>
          <Button className="bg-sahayata-blue hover:bg-sahayata-blue/80">View All Assessments</Button>
        </div>
      </div>
    </section>
  );
}
