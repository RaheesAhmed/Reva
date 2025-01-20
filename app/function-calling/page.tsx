"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather } from "../../utils/weather";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import { webSearch } from "../../lib/tavily";

interface ResearchData {
  location?: string;
  temperature?: number;
  conditions?: string;
}

const FunctionCalling = () => {
  const [researchData, setResearchData] = useState<ResearchData>({});
  const [researchResult, setResearchResult] = useState<string>("");
  const isEmpty = Object.keys(researchData).length === 0;

  const functionCallHandler = async (call: RequiredActionFunctionToolCall) => {
    if (call?.function?.name !== "webSearch") return;
    const args = JSON.parse(call.function.arguments);
    const data = await webSearch(args.query, args.search_type, args.options);
    setResearchResult(JSON.stringify(data));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <WeatherWidget
            location={researchData.location || "---"}
            temperature={researchData.temperature?.toString() || "---"}
            conditions={researchData.conditions || "Sunny"}
            isEmpty={isEmpty}
          />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
