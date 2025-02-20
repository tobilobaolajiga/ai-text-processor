import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Input from './Input';
import Cover from './Cover';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [cover, setCover] = useState(true);
  const [input, setInput] = useState(false);
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [lang, setLang] = useState('');
  const [currentLang, setCurrentLang] = useState('English');
  const [textLang, setTextLang] = useState('English');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);

  const translate = async (text, lang) => {
    const textOrigin = localStorage.getItem('inputChat');
    console.log(currentLang);
    console.log(lang);
    if ('ai' in self && 'translator' in self.ai) {
      if (lang == 'French') {
        if (textLang != 'English') {
          setError(true);
          return;
        }
        setLoading(true);
        const translator = await self.ai.translator.create({
          sourceLanguage: 'en',
          targetLanguage: 'fr',
        });
        const result = await translator.translate(textOrigin);
        setLoading(false);
        setCurrentLang('French');
        setOutput(result);
      } else if (lang == 'Russian') {
        if (textLang != 'English') {
          setError(true);
          return;
        }
        setLoading(true);
        const translator = await self.ai.translator.create({
          sourceLanguage: 'en',
          targetLanguage: 'ru',
        });
        const result = await translator.translate(textOrigin);
        console.log(result);
        setLoading(false);
        setCurrentLang('Russian');
        setOutput(result);
      } else if (lang == 'Spanish') {
        if (textLang != 'English') {
          setError(true);
          return;
        }
        setLoading(true);
        const translator = await self.ai.translator.create({
          sourceLanguage: 'en',
          targetLanguage: 'es',
        });
        const result = await translator.translate(textOrigin);
        setLoading(false);
        setCurrentLang('Spanish');
        setOutput(result);
      } else if (lang == 'Portugese') {
        if (textLang != 'English') {
          setError(true);
          return;
        }
        setLoading(true);
        const translator = await self.ai.translator.create({
          sourceLanguage: 'en',
          targetLanguage: 'pt',
        });
        const result = await translator.translate(textOrigin);
        setLoading(false);
        setCurrentLang('Portugese');
        setOutput(result);
      } else if (lang == 'Turkish') {
        if (textLang != 'English') {
          setError(true);
          return;
        }
        setLoading(true);
        const translator = await self.ai.translator.create({
          sourceLanguage: 'en',
          targetLanguage: 'tr',
        });
        const result = await translator.translate(textOrigin);
        setLoading(false);
        setCurrentLang('Turkish');
        setOutput(result);
      } else if (lang == 'English' && currentLang == 'French') {
        setLoading(true);
        const translator = await self.ai.translator.create({
          sourceLanguage: 'fr',
          targetLanguage: 'en',
        });
        const result = await translator.translate(textOrigin);
        setLoading(false);
        setCurrentLang('English');
        setOutput(result);
      } else if (lang == 'English' && currentLang == 'Spanish') {
        setLoading(true);
        const translator = await self.ai.translator.create({
          sourceLanguage: 'es',
          targetLanguage: 'en',
        });
        const result = await translator.translate(textOrigin);
        setLoading(false);
        setCurrentLang('English');
        setOutput(result);
      } else if (lang == 'English' && currentLang == 'Russian') {
        setLoading(true);
        const translator = await self.ai.translator.create({
          sourceLanguage: 'ru',
          targetLanguage: 'en',
        });
        const result = await translator.translate(textOrigin);
        setLoading(false);
        setCurrentLang('English');
        setOutput(result);
      } else if (lang == 'English' && currentLang == 'Portugese') {
        setLoading(true);
        const translator = await self.ai.translator.create({
          sourceLanguage: 'pt',
          targetLanguage: 'en',
        });
        const result = await translator.translate(textOrigin);
        setLoading(false);
        setCurrentLang('English');
        setOutput(result);
      }
    } else if (lang == 'English' && currentLang == 'Turkish') {
      console.log('yes');
      setLoading(true);
      const translator = await self.ai.translator.create({
        sourceLanguage: 'tr',
        targetLanguage: 'en',
      });
      const result = await translator.translate(textOrigin);
      setLoading(false);
      setCurrentLang('English');
      setOutput(result);
    } else {
      setOutput('Translation not available');
    }
  };

  const detectLanguage = async () => {
    const languageMap = {
      en: 'English',
      fr: 'French',
      es: 'Spanish',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      zh: 'Chinese',
      ja: 'Japanese',
      ru: 'Russian',
      ar: 'Arabic',
      hi: 'Hindi',
      tr: 'Turkish',
    };
    const getLanguageName = (code) => {
      return languageMap[code.toLowerCase()] || 'Unknown Language';
    };

    const textOrigin = localStorage.getItem('inputChat');

    if ('ai' in self && 'languageDetector' in self.ai) {
      const languageDetectorCapabilities =
        await self.ai.languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;
      let detector;
      if (canDetect === 'no') {
        // The language detector isn't usable.

        console.log('no');
        return;
      }
      if (canDetect === 'readily') {
        console.log(textOrigin);
        // The language detector can immediately be used.
        detector = await self.ai.languageDetector.create();

        // const text = 'Hallo und herzlich willkommen!';
        const results = await detector.detect(textOrigin);
        console.log(results);
        let firstLang = null;
        for (const result of results) {
          firstLang = result.detectedLanguage;
          if (firstLang == '') setTextLang(firstLang);

          break;
        }
      } else {
        console.log(textOrigin);
        // The language detector can be used after model download.
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });

        // const text = 'Hallo und herzlich willkommen!';
        const results = await detector.detect(textOrigin);
        console.log(results);
        let firstLang = null;
        for (const result of results) {
          firstLang = result.detectedLanguage;
          const languageName = getLanguageName(firstLang);
          setTextLang(languageName);
          setCurrentLang(languageName);

          break;
        }
      }
    }
  };
  const summarizeText = async (text) => {
    console.log(count);
    if (count < 150) {
      setError(true);
      return;
    }
    setLoading(true);
    if ('ai' in self && 'summarizer' in self.ai) {
      const options = {
        sharedContext: 'This is a scientific article',
        type: 'headline',
        format: 'plain-text',
        length: 'short',
      };

      const available = (await self.ai.summarizer.capabilities()).available;

      let summarizer;
      if (available === 'no') {
        // The Summarizer API isn't usable.
        console.log('not available');
      }
      if (available === 'readily') {
        // The Summarizer API can be used immediately .
        summarizer = await self.ai.summarizer.create(options);
        console.log('available');
        console.log(summarizer);
        const summary = await summarizer.summarize(text, {
          context: 'This article is intended for a tech-savvy audience.',
        });
        console.log(summary);
        setLoading(false);
        setSummary(summary);
      } else {
        // The Summarizer API can be used after the model is downloaded.
        summarizer = await self.ai.summarizer.create(options);
        summarizer.addEventListener('downloadprogress', (e) => {
          console.log(e.loaded, e.total);
        });
      }
    } else {
      console.log('yeppppppppp');
    }
  };

  // useEffect(() => {
  //   translate(text, lang);
  //   // detectLanguage(text);
  //   summarizeText(text);
  // }, [text, lang]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Cover
              cover={cover}
              setCover={setCover}
              input={input}
              setInput={setInput}
            />
          }
        />
        <Route
          path="/processor"
          element={
            <Input
              text={text}
              setText={setText}
              output={output}
              lang={lang}
              setLang={setLang}
              translate={translate}
              detectLanguage={detectLanguage}
              summarizeText={summarizeText}
              textLang={textLang}
              summary={summary}
              loading={loading}
              error={error}
              count={count}
              setCount={setCount}
            />
          }
        />
      </Routes>
    </Router>
  );
}
