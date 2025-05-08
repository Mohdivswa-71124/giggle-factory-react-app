
import React, { useState, useEffect } from 'react';
import JokeCard from '@/components/JokeCard';
import { fetchRandomJoke } from '@/services/jokeService';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [jokeData, setJokeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to fetch a new joke
  const handleFetchJoke = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newJoke = await fetchRandomJoke();
      // Small timeout to make the transition smoother
      setTimeout(() => {
        setJokeData(newJoke);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setIsLoading(false);
      setError("Oops! Couldn't fetch a joke.");
      toast({
        title: "Error",
        description: "Failed to fetch joke. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Fetch joke on initial load
  useEffect(() => {
    handleFetchJoke();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md mb-8 text-center">
        <h1 className="text-3xl font-bold text-joke-text mb-2">Random Joke Generator</h1>
        <p className="text-gray-600">Need a laugh? We've got you covered!</p>
      </div>
      
      <JokeCard 
        jokeData={jokeData}
        isLoading={isLoading}
        onFetchJoke={handleFetchJoke}
        error={error}
      />
      
      <footer className="mt-8 text-gray-500 text-sm text-center">
        <p>Powered by JokeAPI • Click for more jokes!</p>
      </footer>
    </div>
  );
};

export default Index;
