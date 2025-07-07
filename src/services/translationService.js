import axios from 'axios'

const API_BASE_URL = 'https://api.mymemory.translated.net/get'

/**
 * Translate text using MyMemory Translation API
 * @param {string} text - Text to translate
 * @param {string} sourceLanguage - Source language code
 * @param {string} targetLanguage - Target language code
 * @returns {Promise<string>} - Translated text
 */
export async function translateText(text, sourceLanguage = 'en', targetLanguage = 'hi') {
  try {
    if (!text || !text.trim()) {
      throw new Error('Text is required for translation')
    }

    const params = {
      q: text.trim(),
      langpair: `${sourceLanguage}|${targetLanguage}`
    }

    const response = await axios.get(API_BASE_URL, {
      params,
      timeout: 10000 // 10 second timeout
    })

    if (response.data && response.data.responseData) {
      const translatedText = response.data.responseData.translatedText
      
      // Check if translation was successful
      if (response.data.responseStatus === 200) {
        return translatedText
      } else {
        throw new Error('Translation service returned an error')
      }
    } else {
      throw new Error('Invalid response from translation service')
    }
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(`Translation failed: ${error.response.status} - ${error.response.statusText}`)
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Translation service is currently unavailable. Please check your internet connection.')
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred during translation')
    }
  }
}

/**
 * Get supported languages
 * @returns {Object} - Object containing language codes and names
 */
export function getSupportedLanguages() {
  return {
    'en': 'English',
    'hi': 'Hindi',
    'fr': 'French',
    'es': 'Spanish',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
    'ar': 'Arabic',
    'tr': 'Turkish',
    'nl': 'Dutch',
    'sv': 'Swedish',
    'da': 'Danish',
    'no': 'Norwegian',
    'pl': 'Polish',
    'cs': 'Czech',
    'sk': 'Slovak',
    'hu': 'Hungarian'
  }
}

/**
 * Validate language code
 * @param {string} languageCode - Language code to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidLanguageCode(languageCode) {
  const supportedLanguages = getSupportedLanguages()
  return languageCode in supportedLanguages
}
