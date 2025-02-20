import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
export default function Input({
  text,
  setText,
  output,
  lang,
  setLang,
  translate,
  summarizeText,
  detectLanguage,
  textLang,
  summary,
  loading,
  error,
  count,
  setCount,
}) {
  const [translation, setTranslation] = useState(false);
  const [chatText, setChatText] = useState('');

  useEffect(() => {
    setCount(count);
    setText(text);
    translate(text, lang);
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
  };

  return (
    <div className="bg-white/90 text-black/80 h-[550px] w-full">
      <div className="m-4 flex flex-col items-center justify-center my-[5%] mx-[10%]">
        {chatText && (
          <>
            <p className="self-end font-roboto bg-black/2 text-black rounded-3xl px-6 py-4 w-[80%] sm:w-[50%] text-[14px]">
              {chatText}
            </p>
          </>
        )}
        {chatText && (
          <div className="self-start bg-black/10 font-roboto rounded-2xl px-6 py-4 my-4">
            <p className=" my-4">{`Your text is in ${textLang}`}</p>
            <p className="mb-2">What will you like to do?</p>
            <div className="grid grid-cols-2 gap-4">
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
          </div>
        )}

        {translation && (
          <div className="flex items-center gap-2 self-start font-roboto bg-black/10 rounded-2xl px-6 py-4 ">
            <p className="">Choose a language</p>
            <select
              className="mr-4 border rounded-lg py-[2px] outline-none"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Portugese">Portugese</option>
              <option value="Spanish">Spanish</option>
              <option value="Russian">Russian</option>
              <option value="Turkish">Turkish</option>
              <option value="French">French</option>
            </select>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 self-start font-roboto bg-black/10 rounded-2xl px-6 py-4 my-4">
            {count < 150 && textLang == 'English' ? (
              <p>
                Your text has to be more than <span>150 words</span> to
                summarize
              </p>
            ) : (
              <p>There is no translation available in this language</p>
            )}
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
            <p className="font-roboto bg-black text-white/90 rounded-3xl px-6 py-4 text-[14px]">
              {summary}
            </p>
          </div>
        )}
        {output && (
          <div className="self-end my-4 w-[50%]">
            <p className="font-roboto bg-black/2 text-black rounded-3xl px-6 py-4 text-[14px]">
              {output}
            </p>
          </div>
        )}
        {output && (
          <div className="self-start bg-black/2 text-black font-roboto rounded-2xl px-6 py-4 my-4">
            <p className=" my-4">{`Your text is in ${lang}`}</p>
            <p className="mb-2">What will you like to do?</p>
            <div className="grid grid-cols-2 gap-4">
              {lang == 'English' && (
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
          </div>
        )}
      </div>

      <div className="flex items-center justify-center  w-full h-[550px] relative">
        {/* <h3 className="">What text do you want to process?</h3> */}
        <textarea
          className=" h-[150px] w-[50%] border border-black/20 shadow-xl p-6 rounded-4xl bottom-8 outline-none fixed z-50 bg-white "
          placeholder="Type or paste your text here"
          value={text}
          onChange={(e) => setText(e.target.value)}
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
      </div>
    </div>
  );
}
