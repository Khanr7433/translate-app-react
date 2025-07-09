import { useState, useEffect } from "react";
import LanguageSelector from "./components/LanguageSelector";
import TranslateInput from "./components/TranslateInput";
import TranslationResult from "./components/TranslationResult";
import TranslationHistory from "./components/TranslationHistory";
import { translateText } from "./services/translationService";

function App() {
  const [currentOriginalText, setCurrentOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [history, setHistory] = useState([]);
  const [fromLanguage, setFromLanguage] = useState("en"); // Default to English
  const [toLanguage, setToLanguage] = useState("hi"); // Default to Hindi
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
          <div className="logo">
            <h1 className="text-3xl font-semibold text-google-blue">
              🌐 Translate
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex justify-center px-4">
            <div className="w-full max-w-4xl">
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
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] overflow-hidden border border-gray-100">
              <div className="min-h-[360px]">
                <div className="bg-gray-50 px-8 py-5 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                    {getLanguageFlag(fromLanguage)}{" "}
                    {getLanguageName(fromLanguage)}
                  </span>
                </div>
                <TranslateInput
                  loading={isLoading}
                  error={errorMessage}
                  onTranslate={handleTranslate}
                  onClear={clearTranslation}
                />
              </div>

              <div className="w-20 bg-gray-50 relative items-center justify-center flex-shrink-0 hidden lg:flex border-l border-r border-gray-200">
                <button
                  className="bg-google-blue hover:bg-google-blue-hover border-none rounded-full w-16 h-16 flex items-center justify-center text-white transition-all hover:scale-110 shadow-lg z-10"
                  onClick={swapLanguages}
                  title="Swap languages"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

              <div className="w-full h-20 bg-gray-50 relative flex items-center justify-center lg:hidden border-t border-b border-gray-200">
                <button
                  className="bg-google-blue hover:bg-google-blue-hover border-none rounded-full w-16 h-16 flex items-center justify-center text-white transition-all hover:scale-110 shadow-lg"
                  onClick={swapLanguages}
                  title="Swap languages"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="rotate-90"
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

              <div className="min-h-[360px]">
                <TranslationResult
                  originalText={currentOriginalText}
                  translatedText={translatedText}
                  targetLanguage={toLanguage}
                  onSpeak={speakTranslation}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center px-4">
            <div className="w-full max-w-6xl">
              <TranslationHistory
                history={history}
                onClearHistory={clearHistory}
                onSpeakItem={speakHistoryItem}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
