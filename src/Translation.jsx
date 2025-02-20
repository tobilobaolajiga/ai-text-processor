export default function Translation({ lang, setLang }) {
  return (
    <div className="flex gap-2">
      <p className="">Choose a language</p>
      <select
        className="mr-4 border rounded-lg py-[2px] outline-none"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        <option></option>
        <option value="English">English</option>
        <option value="Portugese">Portugese</option>
        <option value="Spanish">Spanish</option>
        <option value="Russian">Russian</option>
        <option value="Turkish">Turkish</option>
        <option value="French">French</option>
      </select>
    </div>
  );
}
