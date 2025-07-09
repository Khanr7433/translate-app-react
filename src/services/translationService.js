import axios from "axios";

const API_BASE_URL = "https://api.mymemory.translated.net/get";

export async function translateText(
  text,
  sourceLanguage = "en",
  targetLanguage = "hi"
) {
  try {
    if (!text || !text.trim()) {
      throw new Error("Text is required for translation");
    }

    const params = {
      q: text.trim(),
      langpair: `${sourceLanguage}|${targetLanguage}`,
    };

    const response = await axios.get(API_BASE_URL, {
      params,
      timeout: 10000,
    });

    if (response.data && response.data.responseData) {
      const translatedText = response.data.responseData.translatedText;

      if (response.data.responseStatus === 200) {
        return translatedText;
      } else {
        throw new Error("Translation service returned an error");
      }
    } else {
      throw new Error("Invalid response from translation service");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Translation failed: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      throw new Error(
        "Translation service is currently unavailable. Please check your internet connection."
      );
    } else {
      throw new Error(
        error.message || "An unexpected error occurred during translation"
      );
    }
  }
}

export function getSupportedLanguages() {
  return {
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
}

export function isValidLanguageCode(languageCode) {
  const supportedLanguages = getSupportedLanguages();
  return languageCode in supportedLanguages;
}
