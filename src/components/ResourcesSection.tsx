
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Book, Phone, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ResourcesSection() {
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
                  <Button variant="link" className="text-sahayata-blue p-0 h-auto">Learn more</Button>
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
                  <Button variant="link" className="text-sahayata-blue p-0 h-auto">Learn more</Button>
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
                  <Button variant="link" className="text-sahayata-blue p-0 h-auto">Learn more</Button>
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
                      <Button variant="link" className="text-sahayata-blue p-0 h-auto mt-4">View full directory</Button>
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
                          <Button variant="outline" size="sm" className="text-xs">Search by Location</Button>
                          <Button size="sm" className="text-xs bg-sahayata-blue hover:bg-sahayata-blue/80">View Map</Button>
                        </div>
                      </div>
                      <Button variant="link" className="text-sahayata-blue p-0 h-auto">Find all university centers</Button>
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
                  <Button variant="link" className="text-sahayata-blue p-0 h-auto">Explore resources</Button>
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
                  <Button variant="link" className="text-sahayata-blue p-0 h-auto">Explore resources</Button>
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
                  <Button variant="link" className="text-sahayata-blue p-0 h-auto">Explore resources</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 text-center">
          <Button className="bg-sahayata-blue hover:bg-sahayata-blue/80">Explore All Resources</Button>
        </div>
      </div>
    </section>
  );
}
