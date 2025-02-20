export default function ChatText({
  textLang,
  summarizeText,
  text,
  setTranslation,
}) {
  return (
    <div>
      <div>
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
    </div>
  );
}
