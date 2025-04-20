
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export function SurvivorStoriesSection() {
  return (
    <section className="py-16 bg-sahayata-lightBlue/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-poppins mb-4">Stories of Hope</h2>
          <p className="text-sahayata-neutralGray max-w-2xl mx-auto">
            Read inspirational stories from students who overcame mental health challenges and found their path to healing and resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-100 relative">
              <div className="absolute top-4 left-4 rounded-full bg-white p-2">
                <Quote className="h-5 w-5 text-sahayata-blue" />
              </div>
              <img 
                src="/placeholder.svg" 
                alt="Student's journey" 
                className="w-full h-full object-cover" 
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Finding my strength during depression</h3>
              <p className="text-sm text-gray-600 mb-4">
                "I struggled with depression during my second year of college. The academic pressure combined with being away from home led me to a dark place. With the right support and therapy, I learned to manage my emotions and rebuild my confidence."
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Arjun R.</p>
                  <p className="text-sahayata-neutralGray">Engineering Student, Delhi</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-sahayata-softGray p-4">
              <Button variant="link" className="text-sahayata-blue p-0 h-auto">Read full story</Button>
            </CardFooter>
          </Card>

          <Card className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-100 relative">
              <div className="absolute top-4 left-4 rounded-full bg-white p-2">
                <Quote className="h-5 w-5 text-sahayata-blue" />
              </div>
              <img 
                src="/placeholder.svg" 
                alt="Student's journey" 
                className="w-full h-full object-cover" 
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Overcoming anxiety and finding my voice</h3>
              <p className="text-sm text-gray-600 mb-4">
                "My anxiety was so severe I couldn't speak in class. Every presentation was a nightmare. Through counseling and gradual exposure, I learned to manage my fears. Now I even participate in debates!"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Shreya P.</p>
                  <p className="text-sahayata-neutralGray">Arts Student, Mumbai</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-sahayata-softGray p-4">
              <Button variant="link" className="text-sahayata-blue p-0 h-auto">Read full story</Button>
            </CardFooter>
          </Card>

          <Card className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-100 relative">
              <div className="absolute top-4 left-4 rounded-full bg-white p-2">
                <Quote className="h-5 w-5 text-sahayata-blue" />
              </div>
              <img 
                src="/placeholder.svg" 
                alt="Student's journey" 
                className="w-full h-full object-cover" 
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">From suicidal thoughts to helping others</h3>
              <p className="text-sm text-gray-600 mb-4">
                "I once thought ending my life was the only solution. A late-night call to a crisis helpline saved me. Today, I volunteer to support other students and show them there is always hope."
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>KT</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Kiran T.</p>
                  <p className="text-sahayata-neutralGray">Medical Student, Bangalore</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-sahayata-softGray p-4">
              <Button variant="link" className="text-sahayata-blue p-0 h-auto">Read full story</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sahayata-neutralGray mb-4">
            Every story represents a journey of courage and resilience. Your story matters too.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">Read More Stories</Button>
            <Button className="bg-sahayata-blue hover:bg-sahayata-blue/80">Share Your Journey</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
