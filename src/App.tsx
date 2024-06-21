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
    <>
      <div className="App p-6">
        <header className="App-header">
          <h1 className="text-3xl font-bold mb-4">Dictionary</h1>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 mr-4"
          />
          <button
            onClick={searchword}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
          <div className="flex md:flex-row flex-col">
            {meanings.map((meaning: any, index: any) => {
              return (
                <div key={index} className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">{meaning.word}</h2>
                  <div>
                    {meaning.meanings.map((mean: any, index: number) => {
                      return (
                        <>
                          <div key={index} className="my-2">
                            <h3 className="text-xl font-bold">
                              {mean.partOfSpeech}
                            </h3>
                            {mean.definitions.map((def: any, index: number) => {
                              return (
                                <div key={index} className="mb-2">
                                  <h4 className="font-bold">
                                    {def.definition}
                                  </h4>
                                  <h5>{def.example}</h5>
                                </div>
                              );
                            })}
                          </div>

                          <h6 className="mb-2">{mean.usage}</h6>
                        </>
                      );
                    })}
                  </div>
                  {meaning.phonetics.map((phon: any, index: number) => {
                    return (
                      <div key={index} className="my-2">
                        <h3 className="text-xl font-bold">{phon.text}</h3>
                        <audio controls className="my-2">
                          <source src={phon.audio} type="audio/mpeg" />
                        </audio>
                      </div>
                    );
                  })}
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
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
