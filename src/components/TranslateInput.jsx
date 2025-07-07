import { useState, useEffect, useRef } from 'react'

const TranslateInput = ({ loading, error, onTranslate, onClear }) => {
  const [inputText, setInputText] = useState('')
  const textareaRef = useRef(null)

  const translate = () => {
    if (inputText.trim()) {
      onTranslate(inputText.trim())
    }
  }

  const clear = () => {
    setInputText('')
    onClear()
  }

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      translate()
    }
  }

  const handleInput = () => {
    // Auto-resize textarea
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
    }
  }

  useEffect(() => {
    handleInput()
  }, [inputText])

  return (
    <div className="relative h-full">
      <div className="relative h-full flex flex-col">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={loading}
          placeholder="Enter text"
          className="w-full min-h-[150px] max-h-[200px] p-4 border-none outline-none font-inherit text-base leading-6 resize-none bg-transparent text-gray-800 flex-1 placeholder-google-gray disabled:bg-google-light-gray disabled:cursor-not-allowed"
          maxLength={5000}
        />
        
        <div className="flex justify-between items-center px-4 py-2 border-t border-google-border bg-google-light-gray">
          <div className="flex items-center gap-2">
            {inputText && (
              <button 
                onClick={clear}
                className="bg-none border-none text-google-gray cursor-pointer p-2 rounded transition-all hover:bg-google-border hover:text-gray-800"
                title="Clear text"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {inputText && (
              <div className="text-xs text-google-gray px-2 py-1">
                {inputText.length}/5000
              </div>
            )}
            
            <button 
              onClick={translate}
              disabled={loading || !inputText.trim()}
              className="bg-google-blue border-none text-white px-4 py-2 rounded cursor-pointer text-sm font-medium flex items-center gap-1 transition-all hover:bg-google-blue-hover hover:shadow-lg disabled:bg-google-border-hover disabled:text-google-gray disabled:cursor-not-allowed"
              title="Translate"
            >
              {loading ? (
                <span>⏳</span>
              ) : (
                <span>↗️</span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 text-sm border-t border-google-border">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}

export default TranslateInput
