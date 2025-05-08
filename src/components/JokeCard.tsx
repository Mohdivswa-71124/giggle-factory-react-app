
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { formatJokeContent } from '@/services/jokeService';

interface JokeCardProps {
  jokeData: {
    joke?: string;
    setup?: string;
    delivery?: string;
    error?: boolean;
  } | null;
  isLoading: boolean;
  onFetchJoke: () => void;
  error: string | null;
}

const JokeCard: React.FC<JokeCardProps> = ({ jokeData, isLoading, onFetchJoke, error }) => {
  // Format the joke content for display
  const jokeContent = jokeData ? formatJokeContent(jokeData) : '';
  
  // Replace newlines with <br> tags for proper HTML display
  const formattedJokeContent = jokeContent.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < jokeContent.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out">
      <div className="p-8">
        <div className="min-h-[200px] flex flex-col">
          <div className="flex-grow flex items-center justify-center">
            {error ? (
              <p className="text-red-500 text-center animate-fade-in">
                {error}<br />Please try again!
              </p>
            ) : isLoading ? (
              <div className="animate-pulse text-joke-text/50 text-lg text-center">
                Loading a good one...
              </div>
            ) : (
              <p className="text-joke-text text-lg text-center leading-relaxed animate-fade-in">
                {formattedJokeContent}
              </p>
            )}
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={onFetchJoke}
              disabled={isLoading}
              className="bg-joke-blue hover:bg-opacity-80 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-joke-blue focus:ring-opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Get Another Joke"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokeCard;
