
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SupportForumSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-poppins mb-4">Community Support Forum</h2>
          <p className="text-sahayata-neutralGray max-w-2xl mx-auto">
            Connect with peers and counselors in a safe, anonymous space. Share your experiences and receive support from others who understand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center">
              <div className="flex-1">
                <Badge variant="outline" className="bg-sahayata-purple/20 text-sahayata-blue mb-2">Academic Stress</Badge>
                <h3 className="font-semibold text-lg">Feeling overwhelmed with exam pressure</h3>
              </div>
              <Avatar className="h-9 w-9">
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                I'm struggling with the pressure to perform well in my upcoming exams. My parents expect too much from me and I can't focus anymore. Has anyone else gone through this?
              </p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2 text-sahayata-neutralGray text-sm">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> 12 replies
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" /> 5 supports
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  <span className="bg-green-500 w-2 h-2 rounded-full mr-1.5 inline-block"></span>
                  Counselor responded
                </Badge>
              </div>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center">
              <div className="flex-1">
                <Badge variant="outline" className="bg-sahayata-lightBlue/50 text-sahayata-blue mb-2">Social Anxiety</Badge>
                <h3 className="font-semibold text-lg">Difficulty making friends at new college</h3>
              </div>
              <Avatar className="h-9 w-9">
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                I moved to a new city for college and I'm finding it hard to connect with people. I feel like I don't fit in anywhere. How do I overcome this loneliness?
              </p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2 text-sahayata-neutralGray text-sm">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> 8 replies
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" /> 11 supports
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  <span className="bg-green-500 w-2 h-2 rounded-full mr-1.5 inline-block"></span>
                  Counselor responded
                </Badge>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 bg-sahayata-softGray rounded-xl p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3 space-y-4">
              <h3 className="text-xl font-bold font-poppins">Join our supportive community</h3>
              <p className="text-sahayata-neutralGray">
                Connect anonymously with students facing similar challenges. Our forum is moderated by professional counselors to ensure a safe and helpful environment.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                  <span>Anonymous participation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                  <span>Professional moderation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                  <span>Peer support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sahayata-blue"></span>
                  <span>Counselor responses</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Button size="lg" className="bg-sahayata-blue hover:bg-sahayata-blue/80">
                Browse Forum
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
