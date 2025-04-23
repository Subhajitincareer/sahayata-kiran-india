
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const stories = {
  "exam-stress": {
    title: "Feeling overwhelmed with exam pressure",
    full:
      "I'm struggling with the pressure to perform well in my upcoming exams. My parents expect too much from me and I can't focus anymore. Sometimes it feels like nobody understands. I tried talking to my friends but they are also stressed. This forum made me realize I'm not alone...",
    author: "Ananya N.",
    badge: "Academic Stress",
    location: "Student, Lucknow",
    avatar: "AN",
  },
  "social-anxiety": {
    title: "Difficulty making friends at new college",
    full:
      "I moved to a new city for college and I'm finding it hard to connect with people. I feel like I don't fit in anywhere. It's been a few months and the loneliness is difficult to handle. Reading others' stories helps me feel less isolated. Any advice is welcome.",
    author: "Sumit K.",
    badge: "Social Anxiety",
    location: "First-year, Pune",
    avatar: "SK",
  },
};

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const data = id && stories[id as keyof typeof stories];

  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="container py-12">
        <p className="text-center text-lg">Story not found.</p>
        <div className="flex justify-center mt-6">
          <Button onClick={() => navigate(-1)} className="bg-sahayata-blue">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Button
        variant="link"
        className="text-sahayata-blue p-0 mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to forum
      </Button>
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardHeader className="pb-2 flex flex-row items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{data.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{data.author}</div>
            <div className="text-sahayata-neutralGray text-xs">{data.location}</div>
            <span className="inline-block bg-sahayata-blue/10 text-sahayata-blue text-xs px-2 py-1 rounded mt-1">
              {data.badge}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-2 pb-6">
          <h1 className="text-2xl font-bold mb-3">{data.title}</h1>
          <p className="text-gray-700">{data.full}</p>
        </CardContent>
      </Card>
      <div className="text-center mt-8">
        <Link to="/forum">
          <Button variant="outline">Back to Forum</Button>
        </Link>
      </div>
    </div>
  );
}
