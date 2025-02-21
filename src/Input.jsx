import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
export default function Input({
  text,
  setText,

  setLoading,
  setOutput,
  output,
  lang,
  setLang,
  translate,
  summarizeText,
  detectLanguage,
  textLang,
  summary,
  loading,

  count,
  setCount,
  chatText,
  setChatText,
  currentLang,
}) {
  const [translation, setTranslation] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const languages = [
    'French',
    'English',
    'Spanish',
    'Turkish',
    'Portugese',
    'Russian',
  ];
  const chatRef = useRef(null);

  useEffect(() => {
    setCount(count);
    setText(text);
  }, [text, lang]);

  const countWords = (input) => {
    const inputt = localStorage.getItem('inputChat');
    console.log(input);
    const countt = inputt.trim() ? inputt.trim().split(/\s+/).length : 0;
    setCount(countt);
    console.log(count);
  };

  const send = (text) => {
    localStorage.setItem('inputChat', text);
    setChatText(localStorage.getItem('inputChat'));
    const textOrigin = localStorage.getItem('inputChat');
    countWords(textOrigin);
    detectLanguage(textOrigin);
    setText('');
    console.log(languages.includes(textLang));
  };

  const sendKey = (e, text) => {
    console.log(e);
    if (e.key === 'Enter') {
      send(text);
    }
  };
  const refresh = () => {
    setText('');
    setChatText('');
    localStorage.removeItem('inputChat');
    setTranslation(false);
    setLoading(false);
    setOutput(false);
  };

  const trans = (lang, textLang) => {
    const textOrigin = localStorage.getItem('inputChat');
    if (lang != 'English' && textLang != 'English') {
      toast.error('No translation available');
    } else {
      translate(lang);
    }
    console.log(textOrigin, lang);
  };
  return (
    <div
      className="bg-white/90 text-black/80 h-[450px] w-full overflow-auto styled-scrollbar"
      ref={chatRef}
    >
      <div className="p-4 flex flex-col items-center justify-center py-[5%] mx-[10%] ">
        {chatText && (
          <>
            <p className="self-end font-roboto bg-[#f0fff0] shadow-lg rounded-3xl px-6 py-4 w-[80%] sm:w-[50%] text-[14px] leading-8">
              {chatText}
            </p>

            {textLang && (
              <div className="self-start bg-[#00fa9a] font-roboto font-medium rounded-2xl shadow-lg px-6 py-4 my-4">
                <p className=" my-4">{`Your text is in ${textLang}`}</p>
                <>
                  <p className="mb-2">What will you like to do?</p>
                  <div className="grid grid-cols-2 gap-4 items-start">
                    {textLang == 'English' && (
                      <button
                        className="border rounded-xl p-2 cursor-pointer"
                        onClick={() => {
                          summarizeText(text);
                        }}
                      >
                        Summarize
                      </button>
                    )}
                    <button
                      className="border rounded-xl p-2 cursor-pointer"
                      onClick={() => setTranslation(true)}
                    >
                      Translate
                    </button>
                  </div>
                </>
              </div>
            )}
          </>
        )}

        {translation && (
          <div className=" self-start  shadow-lg bg-[#00fa9a] font-roboto font-medium rounded-2xl px-6 py-4 ">
            <div className="flex items-center gap-2 justify-center">
              <select
                className="border rounded-lg py-[2px] outline-none"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <option>Choose a language</option>
                <option value="English">English</option>
                <option value="Portugese">Portugese</option>
                <option value="Spanish">Spanish</option>
                <option value="Russian">Russian</option>
                <option value="Turkish">Turkish</option>
                <option value="French">French</option>
              </select>
            </div>
            <div className="flex items-center justify-center my-4">
              <button
                className="border rounded-xl px-2 py-[4px] cursor-pointer"
                onClick={() => trans(lang, textLang)}
              >
                Translate
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex space-x-2 self-end mx-[10%] my-4">
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:0s]"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
        {summary && (
          <div className="self-end my-4 w-[50%]">
            <p className="font-roboto bg-[#f0fff0]  shadow-lg  rounded-3xl px-6 py-4 text-[14px]">
              {summary}
            </p>
          </div>
        )}
        {output && (
          <div className="self-end my-4 w-[80%] sm:w-[50%]">
            <p className="font-roboto bg-[#f0fff0]  shadow-lg leading-8 rounded-3xl px-6 py-4 text-[14px]">
              {output}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center  w-full h-[550px] relative">
        {!text && !chatText && (
          <h3 className="font-bold font-roboto text-xl sm:text-3xl -mb-4 fixed">
            What text would you like to process today?
          </h3>
        )}
        <textarea
          className=" h-[150px] w-[50%] border border-black/20 shadow-xl p-6 rounded-4xl bottom-8 outline-none fixed z-50 bg-white "
          placeholder="Type or paste your text here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={sendKey(text)}
        ></textarea>

        <button
          className="bg-black border rounded-full w-[50px] h-[50px] fixed bottom-[8%] right-[26%] cursor-pointer z-50"
          onClick={() => {
            send(text);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="absolute bottom-[20%] right-[18%] w-[30px] "
          >
            <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
          </svg>
        </button>
        {!text && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="fixed bottom-[8%] left-[27%] w-[30px] z-50 cursor-pointer"
            onClick={refresh}
          >
            <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
          </svg>
        )}
      </div>
    </div>
  );
}
