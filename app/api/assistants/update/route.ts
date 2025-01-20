import { openai } from "@/app/openai";
import { assistantId } from "@/app/assistant-config";
import { NextResponse } from "next/server";

// Update assistant instructions
export async function PATCH(request: Request) {
  try {
    
    
    const assistant = await openai.beta.assistants.update(assistantId, {
      
      name: "Reva",
      model: "gpt-4o-mini",
      description:`You are REVA, a specialized real estate analysis and sales assistant with advanced research capabilities. You have access to files, specialized functions, and real-time market research to provide comprehensive real estate insights.`,
      instructions: `You are REVA, a specialized real estate analysis and sales assistant with advanced research capabilities. You have access to files, specialized functions, and real-time market research to provide comprehensive real estate insights.
  
        Your primary functions include:
        1. Sales Support with Market Intelligence:
           - Generate customized sales scripts incorporating current market data
           - Handle objections using real-time market insights
           - Provide comparable property analysis with trending data
           - Create data-driven property value propositions
           - Assist with evidence-based negotiation strategies
  
        2. Advanced Market Analysis:
           - Analyze property metrics and real-time market data
           - Provide location value insights using current demographics
           - Calculate and track financial metrics (CAP rates, ROI, etc.)
           - Monitor and report on infrastructure projects
           - Evaluate current tenant credit ratings and market stability
           
        3. Comprehensive Data Integration:
           - Process and interpret current market statistics
           - Analyze ongoing DOT project impacts
           - Evaluate current traffic patterns and changes
           - Assess real-time economic indicators
           - Incorporate web research for up-to-date insights`,
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" },
      
        {
          type: "function",
          function: {
            name: "web_search",
            description: "Perform a real-time web search using DuckDuckGo to get current market data and information",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query to find real estate market information",
                },
                region: {
                  type: "string",
                  description: "Region for search results (e.g., us-en, uk-en)",
                  enum: ["us-en", "uk-en", "ca-en", "au-en"],
                },
                time: {
                  type: "string",
                  description: "Time range for search results",
                  enum: ["d", "w", "m", "y"],
                },
                max_results: {
                  type: "number",
                  description: "Maximum number of search results to return",
                  minimum: 1,
                  maximum: 10,
                },
              },
              required: ["query"],
            },
          },
        },
        {
          type: "function",
          function: {
            name: "generate_sales_script",
            description:
              "Generate a customized sales script based on property type and target audience",
            parameters: {
              type: "object",
              properties: {
                property_type: {
                  type: "string",
                  description:
                    "Type of property (e.g., commercial, residential, industrial)",
                  enum: [
                    "commercial",
                    "residential",
                    "industrial",
                    "mixed-use",
                    "land",
                  ],
                },
                target_audience: {
                  type: "string",
                  description: "Target audience for the sales pitch",
                  enum: ["investor", "owner-occupant", "developer", "tenant"],
                },
                key_features: {
                  type: "array",
                  items: { type: "string" },
                  description: "List of key property features to highlight",
                },
                market_research: {
                  type: "object",
                  description:
                    "Market research data to incorporate into the script",
                  properties: {
                    trends: { type: "string" },
                    metrics: { type: "object" },
                    competition: { type: "string" },
                  },
                },
              },
              required: ["property_type", "target_audience"],
            },
          },
        },
        {
          type: "function",
          function: {
            name: "handle_objection",
            description:
              "Provide strategic responses to common sales objections",
            parameters: {
              type: "object",
              properties: {
                objection_type: {
                  type: "string",
                  description: "Type of sales objection",
                  enum: [
                    "price",
                    "location",
                    "condition",
                    "timing",
                    "competition",
                  ],
                },
                property_context: {
                  type: "object",
                  properties: {
                    price: { type: "number" },
                    location: { type: "string" },
                    property_type: { type: "string" },
                    market_data: { type: "object" },
                  },
                },
              },
              required: ["objection_type"],
            },
          },
        },
        {
          type: "function",
          function: {
            name: "generate_comparables",
            description:
              "Generate detailed property comparables analysis with market research",
            parameters: {
              type: "object",
              properties: {
                property_type: {
                  type: "string",
                  enum: [
                    "commercial",
                    "residential",
                    "industrial",
                    "mixed-use",
                    "land",
                  ],
                },
                location: {
                  type: "string",
                  description: "Property location (city, state)",
                },
                radius_miles: {
                  type: "number",
                  description: "Search radius in miles",
                },
                price_range: {
                  type: "object",
                  properties: {
                    min: { type: "number" },
                    max: { type: "number" },
                  },
                },
                include_market_analysis: {
                  type: "boolean",
                  description: "Include detailed market analysis in results",
                },
              },
              required: ["property_type", "location"],
            },
          },
        },
        {
          type: "function",
          function: {
            name: "research_location",
            description:
              "Research location-specific real estate data and trends",
            parameters: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "Location to research (city, state)",
                },
                property_type: {
                  type: "string",
                  enum: [
                    "commercial",
                    "residential",
                    "industrial",
                    "mixed-use",
                    "land",
                  ],
                },
                metrics: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: [
                      "market_trends",
                      "demographics",
                      "infrastructure",
                      "economic_indicators",
                    ],
                  },
                },
              },
              required: ["location"],
            },
          },
        },
      ],
      tool_resources: {
      file_search: {
        vector_store_ids: ["vs_746axb41w80RUzGzPHPoMMEW"]
      },
      
    },
    
    });

    console.log("Assistant updated successfully:", assistant.id);
    return NextResponse.json({ success: true, assistant });
  } catch (error: any) {
    console.error(
      "Error updating assistant:",
      error.message,
      error.response?.data
    );
    return NextResponse.json(
      { error: "Failed to update assistant", details: error.message },
      { status: 500 }
    );
  }
}
