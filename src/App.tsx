import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`;
  const [meanings, setMeanings] = useState([]);
  const searchword = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMeanings(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <div className="min-h-screen p-6">
        <nav className="font-extrabold text-3xl">MyDictionary</nav>
        <div className="divider"></div>
        <section className="flex gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={searchword}>Search</button>
        </section>
        <section className="py-2">
          {meanings.map((meaning: any, index: any) => {
            return (
              <div className="" key={index}>
                <h2 className="text-2xl font-bold mb-2">{meaning.word}</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  {meaning.meanings.map((mean: any, index: number) => {
                    return (
                      <div key={index} className="my-2 glass p-3 text-white rounded-lg">
                        <h3 className="text-2xl font-bold">
                          {mean.partOfSpeech}
                        </h3>
                        {mean.definitions.map((def: any, index: number) => {
                          return (
                            <div key={index} className="mb-2">
                              <h4 className="font-bold">- {def.definition}</h4>
                              <h5>{def.example}</h5>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-end gap-3">
                {meaning.phonetics.map((phon: any, index: number) => {
                  return (
                    <div key={index} className="my-2">
                      <h3 className="text-xl font-bold">{phon.text}</h3>
                      <audio controls className="mt-2">
                        <source src={phon.audio} type="audio/mpeg" />
                      </audio>
                    </div>
                  );
                })}</div>
                <div>
                  Source Urls:
                  <a
                    href={meaning.sourceUrls}
                    className="text-blue-500 hover:underline"
                  >
                    {meaning.sourceUrls}
                  </a>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    );
  

 
}

export default App;
