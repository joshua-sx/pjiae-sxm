
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pjiae-lightgray p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-pjiae-blue">404</h1>
        <h2 className="text-2xl font-bold text-gray-700">Page Not Found</h2>
        <p className="text-gray-600">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Button onClick={() => navigate("/")} className="px-6">
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
