import { useState, useEffect, useRef } from "react";
import { getSupportedLanguages } from "../services/translationService";

const LanguageSelector = ({
  fromLanguage,
  toLanguage,
  onFromLanguageChange,
  onToLanguageChange,
  onSwapLanguages,
}) => {
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const popularLanguages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
  ];

  const allLanguages = getSupportedLanguages();

  const languageFlags = {
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

  const getLanguageName = (code) => {
    return allLanguages[code] || "Unknown";
  };

  const getLanguageFlag = (code) => {
    return languageFlags[code] || "🏳️";
  };

  const selectFromLanguage = (languageCode) => {
    onFromLanguageChange(languageCode);
    setFromDropdownOpen(false);
  };

  const selectToLanguage = (languageCode) => {
    onToLanguageChange(languageCode);
    setToDropdownOpen(false);
  };

  const toggleFromDropdown = () => {
    setFromDropdownOpen(!fromDropdownOpen);
    setToDropdownOpen(false);
  };

  const toggleToDropdown = () => {
    setToDropdownOpen(!toDropdownOpen);
    setFromDropdownOpen(false);
  };

  const swapLanguages = () => {
    onSwapLanguages();
    setFromDropdownOpen(false);
    setToDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFromDropdownOpen(false);
        setToDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-12" ref={dropdownRef}>
      <div className="flex items-center justify-center gap-8 p-8 bg-white rounded-3xl border border-gray-200 shadow-lg lg:p-10 mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <span className="text-sm text-gray-500 font-bold uppercase tracking-wide text-center">
            From
          </span>
          <div className="relative">
            <div className={`relative ${fromDropdownOpen ? "z-50" : ""}`}>
              <button
                className={`flex items-center gap-4 px-6 py-4 border-2 rounded-2xl transition-all w-full min-w-[160px] font-semibold text-lg ${
                  fromLanguage
                    ? "bg-blue-50 border-google-blue text-google-blue"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-700"
                }`}
                onClick={toggleFromDropdown}
              >
                <span className="text-base">
                  {getLanguageFlag(fromLanguage)}
                </span>
                <span className="flex-1 text-left font-normal">
                  {getLanguageName(fromLanguage)}
                </span>
                <svg
                  className={`text-google-gray transition-transform ${
                    fromDropdownOpen ? "rotate-180" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {fromDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto mt-3">
                  <div className="py-3">
                    <div className="px-6 py-4 text-xs text-gray-500 font-bold uppercase tracking-wide border-b border-gray-100">
                      Popular languages
                    </div>
                    <div className="flex flex-col">
                      {popularLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => selectFromLanguage(lang.code)}
                          className={`flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                            fromLanguage === lang.code
                              ? "bg-blue-50 text-google-blue font-semibold"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 py-2">
                    <div className="px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                      All languages
                    </div>
                    <div className="flex flex-col">
                      {Object.entries(allLanguages).map(([code, name]) => (
                        <button
                          key={code}
                          onClick={() => selectFromLanguage(code)}
                          className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            fromLanguage === code
                              ? "bg-blue-50 text-google-blue font-medium"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span className="text-base">
                            {getLanguageFlag(code)}
                          </span>
                          <span>{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mx-6 flex-shrink-0">
          <button
            className="bg-google-blue hover:bg-google-blue-hover border-none rounded-full w-16 h-16 flex items-center justify-center text-white transition-all hover:scale-110 shadow-xl"
            onClick={swapLanguages}
            title="Swap languages"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 3L21 8L16 13M21 8H3M8 21L3 16L8 11M3 16H21"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <span className="text-sm text-gray-500 font-bold uppercase tracking-wide text-center">
            To
          </span>
          <div className="relative">
            <div className={`relative ${toDropdownOpen ? "z-50" : ""}`}>
              <button
                className={`flex items-center gap-4 px-6 py-4 border-2 rounded-2xl transition-all w-full min-w-[160px] font-semibold text-lg ${
                  toLanguage
                    ? "bg-blue-50 border-google-blue text-google-blue"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-700"
                }`}
                onClick={toggleToDropdown}
              >
                <span className="text-base">{getLanguageFlag(toLanguage)}</span>
                <span className="flex-1 text-left font-normal">
                  {getLanguageName(toLanguage)}
                </span>
                <svg
                  className={`text-google-gray transition-transform ${
                    toDropdownOpen ? "rotate-180" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {toDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto mt-2">
                  <div className="py-2">
                    <div className="px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide border-b border-gray-100">
                      Popular languages
                    </div>
                    <div className="flex flex-col">
                      {popularLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => selectToLanguage(lang.code)}
                          className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            toLanguage === lang.code
                              ? "bg-blue-50 text-google-blue font-medium"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 py-2">
                    <div className="px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                      All languages
                    </div>
                    <div className="flex flex-col">
                      {Object.entries(allLanguages).map(([code, name]) => (
                        <button
                          key={code}
                          onClick={() => selectToLanguage(code)}
                          className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            toLanguage === code
                              ? "bg-blue-50 text-google-blue font-medium"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span className="text-base">
                            {getLanguageFlag(code)}
                          </span>
                          <span>{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
