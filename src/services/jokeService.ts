
interface Joke {
  joke?: string;
  setup?: string;
  delivery?: string;
  error?: boolean;
}

// Function to fetch a random joke
export const fetchRandomJoke = async (): Promise<Joke> => {
  try {
    // We're using the JokeAPI which provides clean jokes
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single,twopart');
    
    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching joke:', error);
    throw error;
  }
};

// Function to format joke content from the API response
export const formatJokeContent = (jokeData: Joke): string => {
  if (jokeData.joke) {
    // Single-line joke
    return jokeData.joke;
  } else if (jokeData.setup && jokeData.delivery) {
    // Two-part joke (setup and punchline)
    return `${jokeData.setup}\n\n${jokeData.delivery}`;
  } else {
    // Fallback message if joke format is unexpected
    return "Something went wrong with this joke. Try another one!";
  }
};
