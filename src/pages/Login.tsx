
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("Employee");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setRole } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Set the selected role in our context
      setRole(selectedRole);
      
      // For demo purposes, simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Login successful",
        description: `Welcome to the PJIAE Digital Appraisal System as ${selectedRole}`,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pjiae-lightgray to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pjiae-blue">PJIAE</h1>
          <p className="text-xl font-semibold text-gray-700">Digital Appraisal System</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Select your role for this demo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@pjiae.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="#" 
                    className="text-xs text-pjiae-blue hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Password Reset",
                        description: "Please contact HR to reset your password.",
                      });
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              
              <div className="space-y-3">
                <Label>Select Role for Demo</Label>
                <RadioGroup 
                  value={selectedRole} 
                  onValueChange={(value) => setSelectedRole(value as UserRole)} 
                  className="grid grid-cols-2 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="HR Officer" id="hr" />
                    <Label htmlFor="hr" className="cursor-pointer">HR Officer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Director" id="director" />
                    <Label htmlFor="director" className="cursor-pointer">Director</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Supervisor" id="supervisor" />
                    <Label htmlFor="supervisor" className="cursor-pointer">Supervisor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Employee" id="employee" />
                    <Label htmlFor="employee" className="cursor-pointer">Employee</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <div className="text-center text-sm text-gray-500">
              Having trouble signing in? Contact <span className="text-pjiae-blue">HR Support</span>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Princess Juliana International Airport Operating Co. N.V.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
