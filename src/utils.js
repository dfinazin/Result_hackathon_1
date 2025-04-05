export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export async function fetchRandomProgrammingJoke() {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
    const jokes = await response.json();
    return jokes[0];
  } catch (error) {
    console.error('Error fetching joke:', error);
    throw new Error('Failed to load joke. Please try again later.');
  }
}