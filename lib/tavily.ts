import { tavily } from "@tavily/core";

const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

// Research functions
export async function researchLocation(location: string) {
  try {
    const searchQuery = `${location} real estate market trends, development projects, infrastructure, demographics`;
    const response = await tavilyClient.search(searchQuery, {
      search_depth: "advanced",
      include_answer: true,
    });
    return response;
  } catch (error) {
    console.error("Error researching location:", error);
    throw error;
  }
}

export async function researchPropertyMarket(
  propertyType: string,
  location: string
) {
  try {
    const searchQuery = `${propertyType} property market in ${location} prices trends demand supply`;
    const response = await tavilyClient.searchContext(searchQuery, {
      max_tokens: 2000,
    });
    return response;
  } catch (error) {
    console.error("Error researching property market:", error);
    throw error;
  }
}

export async function getMarketInsights(
  propertyType: string,
  location: string
) {
  try {
    const searchQuery = `${propertyType} real estate ${location} market cap rates vacancy rates absorption new construction`;
    const response = await tavilyClient.searchQNA(searchQuery);
    return response;
  } catch (error) {
    console.error("Error getting market insights:", error);
    throw error;
  }
}

export async function webSearch(query, searchType, options) {
  let results;
  switch (searchType) {
    case "qna":
      results = await tavilyClient.searchQNA(query, options);
      break;
    case "context":
      results = await tavilyClient.searchContext(query, options);
      break;
    default:
      results = await tavilyClient.search(query, options);
  }
  return results;
}
