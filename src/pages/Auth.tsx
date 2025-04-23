
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please fill out all fields.");
      setLoading(false);
      return;
    }

    try {
      let result;
      if (isLogin) {
        result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error) throw result.error;
        toast.success("Logged in!");
      } else {
        result = await supabase.auth.signUp({ email, password });
        if (result.error) throw result.error;
        toast.success("Sign up successful! Please check your email to confirm.");
      }
      setTimeout(() => navigate(location.state?.redirect || "/"), 1000);
    } catch (err: any) {
      toast.error(err.message ?? "Authentication error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="mb-2">
            {isLogin ? "Sign In" : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              autoComplete="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="link"
            className="px-0"
            type="button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin 
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
