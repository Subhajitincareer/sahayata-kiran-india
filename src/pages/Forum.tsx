
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const forumDemoThreads = [
  {
    id: "exam-stress",
    badge: "Academic Stress",
    title: "Feeling overwhelmed with exam pressure",
    replies: 12,
    supports: 5,
    author: "AN",
    preview:
      "I'm struggling with the pressure to perform well in my upcoming exams...",
  },
  {
    id: "social-anxiety",
    badge: "Social Anxiety",
    title: "Difficulty making friends at new college",
    replies: 8,
    supports: 11,
    author: "SK",
    preview:
      "I moved to a new city for college and I'm finding it hard to connect with people...",
  },
];

export default function Forum() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Community Support Forum</h1>
      <div className="mb-6 text-gray-700">
        Browse threads and connect with peers or counselors. Click on a thread to read more and join the discussion.
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {forumDemoThreads.map((thread) => (
          <Card key={thread.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center pb-2">
              <div className="flex-1">
                <span className="inline-block bg-sahayata-blue/10 text-sahayata-blue text-xs px-2 py-1 rounded mb-1">
                  {thread.badge}
                </span>
                <h3 className="font-semibold text-lg">{thread.title}</h3>
              </div>
              <Avatar className="h-9 w-9">
                <AvatarFallback>{thread.author}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <div className="text-gray-600 text-sm mb-4">{thread.preview}</div>
              <div className="flex gap-6 text-sahayata-neutralGray text-sm mb-4">
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" /> {thread.replies} replies
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" /> {thread.supports} supports
                </span>
              </div>
              <Link to={`/story/${thread.id}`}>
                <Button variant="link" className="text-sahayata-blue p-0 h-auto">
                  Read full story
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
