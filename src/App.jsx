import { useState, useEffect } from "react";
import {
  LanguageSelector,
  TranslationHistory,
  TranslationResult,
  TranslateInput,
} from "../src/components";
import { translateText } from "./services/translationService";

function App() {
  const [currentOriginalText, setCurrentOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [history, setHistory] = useState([]);
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("hi");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadHistoryFromStorage();
  }, []);

  const handleTranslate = async (text) => {
    if (!text.trim()) {
      setErrorMessage("Please enter some text to translate");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setCurrentOriginalText(text);

    try {
      const translation = await translateText(text, fromLanguage, toLanguage);
      setTranslatedText(translation);
      addToHistory(text, translation);
    } catch (error) {
      setErrorMessage(error.message);
      setTranslatedText("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFromLanguageChange = (language) => {
    setFromLanguage(language);
  };

  const handleToLanguageChange = (language) => {
    setToLanguage(language);
  };

  const handleSwapLanguages = () => {
    const temp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(temp);
  };

  const swapLanguages = () => {
    handleSwapLanguages();
  };

  const addToHistory = (original, translated) => {
    const entry = {
      id: Date.now(),
      original,
      translated,
      fromLanguage: fromLanguage,
      toLanguage: toLanguage,
      timestamp: new Date().toLocaleString(),
    };

    setHistory((prev) => {
      const newHistory = [entry, ...prev];
      if (newHistory.length > 10) {
        newHistory.pop();
      }
      return newHistory;
    });

    const newHistory = [entry, ...history];
    if (newHistory.length > 10) {
      newHistory.pop();
    }
    saveHistoryToStorage(newHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistoryToStorage([]);
  };

  const clearTranslation = () => {
    setTranslatedText("");
    setCurrentOriginalText("");
    setErrorMessage("");
  };

  const speakTranslation = (text) => {
    speakText(text);
  };

  const speakHistoryItem = (text) => {
    speakText(text);
  };

  const speakText = (text) => {
    if (!text) {
      return;
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;

      speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis not supported in this browser");
    }
  };

  const saveHistoryToStorage = (historyData) => {
    localStorage.setItem("translateAppHistory", JSON.stringify(historyData));
  };

  const loadHistoryFromStorage = () => {
    const saved = localStorage.getItem("translateAppHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  };

  const getLanguageName = (code) => {
    const languages = {
      en: "English",
      hi: "Hindi",
      fr: "French",
      es: "Spanish",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ru: "Russian",
      ja: "Japanese",
      ko: "Korean",
      zh: "Chinese",
      ar: "Arabic",
      tr: "Turkish",
      nl: "Dutch",
      sv: "Swedish",
      da: "Danish",
      no: "Norwegian",
      pl: "Polish",
      cs: "Czech",
      sk: "Slovak",
      hu: "Hungarian",
    };
    return languages[code] || "Unknown";
  };

  const getLanguageFlag = (code) => {
    const flags = {
      en: "🇺🇸",
      hi: "🇮🇳",
      fr: "🇫🇷",
      es: "🇪🇸",
      de: "🇩🇪",
      it: "🇮🇹",
      pt: "🇵🇹",
      ru: "🇷🇺",
      ja: "🇯🇵",
      ko: "🇰🇷",
      zh: "🇨🇳",
      ar: "🇸🇦",
      tr: "🇹🇷",
      nl: "🇳🇱",
      sv: "🇸🇪",
      da: "🇩🇰",
      no: "🇳🇴",
      pl: "🇵🇱",
      cs: "🇨🇿",
      sk: "🇸🇰",
      hu: "🇭🇺",
    };
    return flags[code] || "🏳️";
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="w-full shadow-lg ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">🌐</span>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Translate App
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full  text-gray-200 py-4 lg:py-8">
        <div className="max-w-7xl mx-auto space-y-4 lg:space-y-8">
          <div className="text-center mb-4 lg:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Translate Any Language
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Simple and fast translation between languages. Connect with people
              around the world.
            </p>
          </div>

          <div className="flex justify-center items-baseline-last px-4">
            <div className="w-full max-w-5xl">
              <LanguageSelector
                fromLanguage={fromLanguage}
                toLanguage={toLanguage}
                onFromLanguageChange={handleFromLanguageChange}
                onToLanguageChange={handleToLanguageChange}
                onSwapLanguages={handleSwapLanguages}
              />
            </div>
          </div>

          <div className="flex justify-center px-4">
            <div className="w-full max-w-6xl">
              <div className="bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] min-h-[400px] lg:min-h-[500px]">
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-800 px-6 sm:px-8 py-4 sm:py-5 border-b border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-base font-semibold text-gray-200 flex items-center gap-2">
                          {getLanguageFlag(fromLanguage)}{" "}
                          {getLanguageName(fromLanguage)}
                        </span>
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <TranslateInput
                      loading={isLoading}
                      error={errorMessage}
                      onTranslate={handleTranslate}
                      onClear={clearTranslation}
                    />
                  </div>

                  <div className="w-20 bg-gradient-to-b from-gray-800 to-gray-800 relative items-center justify-center flex-shrink-0 hidden lg:flex border-l border-r border-gray-700/50">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                      <button
                        className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none rounded-lg w-16 h-16 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={swapLanguages}
                        title="Swap languages"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="group-hover:rotate-180 transition-transform duration-200"
                        >
                          <path
                            d="M16 3L21 8L16 13M21 8H3M8 21L3 16L8 11M3 16H21"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-20 bg-gradient-to-r from-gray-800 to-gray-800 relative flex items-center justify-center lg:hidden border-t border-b border-gray-700/50 mt-15">
                    <button
                      className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none rounded-lg w-16 h-16 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 shadow-lg z-0"
                      onClick={swapLanguages}
                      title="Swap languages"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="rotate-90 group-hover:rotate-180 transition-transform duration-200"
                      >
                        <path
                          d="M16 3L21 8L16 13M21 8H3M8 21L3 16L8 11M3 16H21"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="relative min-h-[400px] lg:min-h-[500px]">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-800 px-6 sm:px-8 py-4 sm:py-5 border-b border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-base font-semibold text-gray-200 flex items-center gap-2">
                          {getLanguageFlag(toLanguage)}{" "}
                          {getLanguageName(toLanguage)}
                        </span>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <TranslationResult
                      originalText={currentOriginalText}
                      translatedText={translatedText}
                      targetLanguage={toLanguage}
                      onSpeak={speakTranslation}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center px-4 mb-5">
                <div className="w-full max-w-6xl">
                  <TranslationHistory
                    history={history}
                    onClearHistory={clearHistory}
                    onSpeakItem={speakHistoryItem}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
