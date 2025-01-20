import axios from 'axios';

interface SearchParams {
  query: string;
  region?: string;
  time?: 'd' | 'w' | 'm' | 'y'; // day, week, month, year
  max_results?: number;
}

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  published?: string;
}

export const performWebSearch = async (params: SearchParams): Promise<SearchResult[]> => {
  const { query, region = 'us-en', time = 'm', max_results = 5 } = params;
  console.log("calling search");
  try {
    // Using DuckDuckGo's HTML API endpoint
    const response = await axios.get('https://html.duckduckgo.com/html/', {
      params: {
        q: query,
        kl: region,
        df: time,
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Parse the HTML response to extract search results
    const results: SearchResult[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/html');
    const searchResults = doc.querySelectorAll('.result');

    searchResults.forEach((result, index) => {
      if (index >= max_results) return;

      const titleElement = result.querySelector('.result__title');
      const linkElement = result.querySelector('.result__url');
      const snippetElement = result.querySelector('.result__snippet');

      if (titleElement && linkElement && snippetElement) {
        results.push({
          title: titleElement.textContent?.trim() || '',
          link: linkElement.getAttribute('href') || '',
          snippet: snippetElement.textContent?.trim() || '',
        });
      }
    });

    return results;
  } catch (error) {
    console.error('Error performing web search:', error);
    return [];
  }
}; 