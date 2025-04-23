
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Book, Phone, Shield, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n/i18nContext";
import { useToast } from "@/hooks/use-toast";

export function ResourcesSection() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Resource detail content
  const resourceDetails = {
    "stress-management": {
      title: "Stress Management Techniques",
      description: "Comprehensive guide to managing academic stress through evidence-based approaches including mindfulness, deep breathing exercises, and effective time management strategies specifically designed for students.",
      content: [
        {
          title: "Mindfulness Meditation",
          description: "Research shows that just 10 minutes of daily mindfulness practice can significantly reduce stress levels and improve concentration. Start with focusing on your breath and bringing your attention to the present moment without judgment."
        },
        {
          title: "Deep Breathing Exercises",
          description: "The 4-7-8 breathing technique involves inhaling for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds. This practice activates your parasympathetic nervous system, reducing anxiety and promoting calmness."
        },
        {
          title: "Time Management Strategies",
          description: "The Pomodoro Technique involves working for 25 minutes followed by a 5-minute break. After four cycles, take a longer 15-30 minute break. This method maximizes focus while preventing burnout."
        }
      ],
      resources: [
        {
          name: "Headspace Student Plan",
          link: "https://www.headspace.com/studentplan"
        },
        {
          name: "Calm College Program",
          link: "https://www.calm.com/colleges"
        }
      ]
    },
    "self-care": {
      title: "Self-Care Practices",
      description: "Essential self-care practices to maintain your mental well-being, including sleep hygiene, nutrition, and physical activity tailored to student life.",
      content: [
        {
          title: "Sleep Hygiene",
          description: "Consistent sleep and wake times, even on weekends, help regulate your body's internal clock. Aim for 7-9 hours of quality sleep, and create a restful environment by keeping your room dark, quiet, and cool."
        },
        {
          title: "Nutrition for Mental Health",
          description: "Foods rich in omega-3 fatty acids (like fatty fish, flaxseeds, and walnuts) and antioxidants (colorful fruits and vegetables) support brain function and can help reduce symptoms of depression and anxiety."
        },
        {
          title: "Physical Activity Benefits",
          description: "Even brief periods of moderate exercise—like a 20-minute walk—can provide immediate mood-boosting effects by releasing endorphins and reducing stress hormones. Aim for 150 minutes of moderate activity per week."
        }
      ],
      resources: [
        {
          name: "Student Health Services",
          link: "https://www.nimhans.ac.in/student-wellness"
        },
        {
          name: "MyFitnessPal - Free Version",
          link: "https://www.myfitnesspal.com"
        }
      ]
    },
    "thought-management": {
      title: "Thought Management",
      description: "Learn to identify and challenge negative thought patterns with cognitive behavioral techniques and mindfulness practices that can be applied during academic stress.",
      content: [
        {
          title: "Cognitive Behavioral Techniques",
          description: "The ABCD method helps restructure negative thoughts: Adversity (identify the situation), Beliefs (notice your automatic thoughts), Consequences (recognize how these thoughts affect you), and Dispute (challenge unhelpful thoughts with evidence)."
        },
        {
          title: "Reframing Strategies",
          description: "Practice converting negative thoughts like 'I failed this test, I'm a failure' to realistic perspectives such as 'I didn't perform well on this test, but this is one assessment and doesn't define my abilities or future performance.'"
        },
        {
          title: "Journaling Benefits",
          description: "Spend 10-15 minutes daily writing your thoughts without judgment. Research shows this practice reduces rumination and helps identify thought patterns that contribute to stress and anxiety."
        }
      ],
      resources: [
        {
          name: "MoodGym - CBT Skills",
          link: "https://moodgym.com.au"
        },
        {
          name: "Thought Diary App",
          link: "https://thoughtdiary.app"
        }
      ]
    }
  };
  
  const handleLearnMore = (resourceId: string) => {
    setOpenDialog(resourceId);
  };
  
  const handleExploreAll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "All resources available",
      description: "You can browse all resources in the tabs above.",
      duration: 3000,
    });
  };
  
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    toast({
      title: "Opening external resource",
      description: "The resource is opening in a new tab",
      duration: 3000,
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-poppins mb-4">Mental Health Resources</h2>
          <p className="text-sahayata-neutralGray max-w-2xl mx-auto">
            Access a comprehensive collection of resources for mental health support, coping strategies, and professional help.
          </p>
        </div>

        <Tabs defaultValue="coping" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="coping" className="data-[state=active]:bg-sahayata-blue data-[state=active]:text-white">
              Coping Strategies
            </TabsTrigger>
            <TabsTrigger value="professionals" className="data-[state=active]:bg-sahayata-blue data-[state=active]:text-white">
              Professional Help
            </TabsTrigger>
            <TabsTrigger value="educational" className="data-[state=active]:bg-sahayata-blue data-[state=active]:text-white">
              Educational Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="coping" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-sahayata-purple/20 w-10 h-10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-sahayata-blue" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Stress Management Techniques</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Learn practical techniques to manage academic stress and exam anxiety through mindfulness, deep breathing, and time management.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-sahayata-softGray">Meditation</Badge>
                    <Badge variant="outline" className="bg-sahayata-softGray">Deep Breathing</Badge>
                    <Badge variant="outline" className="bg-sahayata-softGray">Time Management</Badge>
                  </div>
                  <Button 
                    variant="link" 
                    className="text-sahayata-blue p-0 h-auto"
                    onClick={() => handleLearnMore("stress-management")}
                  >
                    Learn more
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-sahayata-purple/20 w-10 h-10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-sahayata-blue" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Self-Care Practices</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Discover essential self-care practices to maintain your mental well-being, including sleep hygiene, nutrition, and physical activity.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-sahayata-softGray">Sleep Hygiene</Badge>
                    <Badge variant="outline" className="bg-sahayata-softGray">Physical Activity</Badge>
                    <Badge variant="outline" className="bg-sahayata-softGray">Nutrition</Badge>
                  </div>
                  <Button 
                    variant="link" 
                    className="text-sahayata-blue p-0 h-auto"
                    onClick={() => handleLearnMore("self-care")}
                  >
                    Learn more
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-sahayata-purple/20 w-10 h-10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-sahayata-blue" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Thought Management</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Learn to identify and challenge negative thought patterns with cognitive behavioral techniques and mindfulness practices.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-sahayata-softGray">CBT Techniques</Badge>
                    <Badge variant="outline" className="bg-sahayata-softGray">Reframing</Badge>
                    <Badge variant="outline" className="bg-sahayata-softGray">Journaling</Badge>
                  </div>
                  <Button 
                    variant="link" 
                    className="text-sahayata-blue p-0 h-auto"
                    onClick={() => handleLearnMore("thought-management")}
                  >
                    Learn more
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="professionals" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="mb-4 rounded-full bg-sahayata-purple/20 w-10 h-10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-sahayata-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">National Mental Health Helplines</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Directory of national mental health helplines and crisis intervention services available 24/7.
                      </p>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 mt-0.5 rounded-full bg-sahayata-lightBlue/50 flex items-center justify-center">
                            <span className="h-2.5 w-2.5 rounded-full bg-sahayata-blue"></span>
                          </div>
                          <div>
                            <p className="font-medium">NIMHANS Helpline</p>
                            <p className="text-sahayata-neutralGray">080-26661337</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 mt-0.5 rounded-full bg-sahayata-lightBlue/50 flex items-center justify-center">
                            <span className="h-2.5 w-2.5 rounded-full bg-sahayata-blue"></span>
                          </div>
                          <div>
                            <p className="font-medium">iCall</p>
                            <p className="text-sahayata-neutralGray">022-25521111</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 mt-0.5 rounded-full bg-sahayata-lightBlue/50 flex items-center justify-center">
                            <span className="h-2.5 w-2.5 rounded-full bg-sahayata-blue"></span>
                          </div>
                          <div>
                            <p className="font-medium">Vandrevala Foundation</p>
                            <p className="text-sahayata-neutralGray">9999666555</p>
                          </div>
                        </li>
                      </ul>
                      <Button 
                        variant="link" 
                        className="text-sahayata-blue p-0 h-auto mt-4"
                        onClick={() => toast({
                          title: "Helpline Directory",
                          description: "Full directory coming soon. Please use the numbers listed above for immediate support.",
                          duration: 3000,
                        })}
                      >
                        View full directory
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="mb-4 rounded-full bg-sahayata-purple/20 w-10 h-10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-sahayata-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">University Counseling Centers</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Find mental health services available at universities across India.
                      </p>
                      <div className="bg-sahayata-softGray p-4 rounded-lg mb-4">
                        <p className="text-sm font-medium">Find counseling centers near you</p>
                        <p className="text-xs text-sahayata-neutralGray mt-1 mb-3">
                          Search by city or university name
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs"
                            onClick={() => toast({
                              title: "Location Search",
                              description: "Location-based search coming soon. Please check back later.",
                              duration: 3000,
                            })}
                          >
                            Search by Location
                          </Button>
                          <Button 
                            size="sm" 
                            className="text-xs bg-sahayata-blue hover:bg-sahayata-blue/80"
                            onClick={() => toast({
                              title: "Interactive Map",
                              description: "Interactive map of counseling centers coming soon.",
                              duration: 3000,
                            })}
                          >
                            View Map
                          </Button>
                        </div>
                      </div>
                      <Button 
                        variant="link" 
                        className="text-sahayata-blue p-0 h-auto"
                        onClick={() => toast({
                          title: "University Centers",
                          description: "Comprehensive directory of university counseling centers coming soon.",
                          duration: 3000,
                        })}
                      >
                        Find all university centers
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="educational" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-sahayata-purple/20 w-10 h-10 flex items-center justify-center">
                    <Book className="h-5 w-5 text-sahayata-blue" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Understanding Mental Health</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Educational resources to understand various mental health conditions, their symptoms, and treatments.
                  </p>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                      <span>Depression and anxiety</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                      <span>Stress and burnout</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                      <span>Suicidal ideation</span>
                    </li>
                  </ul>
                  <Button 
                    variant="link" 
                    className="text-sahayata-blue p-0 h-auto"
                    onClick={() => toast({
                      title: "Educational Resources",
                      description: "Detailed educational resources on mental health coming soon.",
                      duration: 3000,
                    })}
                  >
                    Explore resources
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-sahayata-purple/20 w-10 h-10 flex items-center justify-center">
                    <Book className="h-5 w-5 text-sahayata-blue" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Academic Stress Management</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Resources specifically designed to help students cope with academic pressure and exam stress.
                  </p>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                      <span>Exam preparation strategies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                      <span>Managing parental expectations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                      <span>Balancing studies and wellbeing</span>
                    </li>
                  </ul>
                  <Button 
                    variant="link" 
                    className="text-sahayata-blue p-0 h-auto"
                    onClick={() => toast({
                      title: "Academic Resources",
                      description: "Academic stress management resources coming soon.",
                      duration: 3000,
                    })}
                  >
                    Explore resources
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-sahayata-purple/20 w-10 h-10 flex items-center justify-center">
                    <Book className="h-5 w-5 text-sahayata-blue" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Supporting Others</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Learn how to recognize warning signs and support friends or classmates who may be struggling.
                  </p>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                      <span>Recognizing warning signs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                      <span>Starting conversations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                      <span>When and how to get help</span>
                    </li>
                  </ul>
                  <Button 
                    variant="link" 
                    className="text-sahayata-blue p-0 h-auto"
                    onClick={() => toast({
                      title: "Support Resources",
                      description: "Resources for supporting others coming soon.",
                      duration: 3000,
                    })}
                  >
                    Explore resources
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 text-center">
          <Button 
            className="bg-sahayata-blue hover:bg-sahayata-blue/80"
            onClick={handleExploreAll}
          >
            Explore All Resources
          </Button>
        </div>
      </div>
      
      {/* Resource Detail Dialogs */}
      {Object.entries(resourceDetails).map(([id, resource]) => (
        <Dialog key={id} open={openDialog === id} onOpenChange={() => setOpenDialog(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{resource.title}</DialogTitle>
              <DialogDescription>
                {resource.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Accordion type="single" collapsible className="w-full">
                {resource.content.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        {item.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">External Resources</h4>
                <div className="flex flex-col gap-2">
                  {resource.resources.map((item, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="justify-start gap-2 text-sahayata-blue"
                      onClick={() => handleExternalLink(item.link)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {item.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setOpenDialog(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </section>
  );
}
