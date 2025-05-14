
import { RatingDisplay } from "@/components/organization/RatingDisplay";

interface Ratings {
  [key: string]: number;
  overall?: number;
}

interface PerformanceRatingsProps {
  ratings: Ratings;
}

const PerformanceRatings = ({ ratings }: PerformanceRatingsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Performance Ratings</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(ratings)
          .filter(([key]) => key !== 'overall')
          .map(([category, rating]) => (
            <div key={category} className="flex items-center justify-between border rounded p-3">
              <span className="font-medium capitalize">{category}</span>
              <RatingDisplay rating={rating} />
            </div>
          ))}
        {ratings.overall && (
          <div className="col-span-2 flex items-center justify-between border rounded p-3 bg-gray-50">
            <span className="font-medium">Overall Rating</span>
            <RatingDisplay rating={ratings.overall} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceRatings;
