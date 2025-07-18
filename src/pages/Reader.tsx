import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Reader() {
  const { id } = useParams();
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    fetch(`https://gutendex.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const formats = data.formats;

        const textUrl =
          formats["text/plain; charset=utf-8"] ||
          formats["text/plain"] ||
          formats["text/html"] ||
          formats["text/html; charset=utf-8"];

        if (textUrl) {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
            textUrl
          )}`;
          fetch(proxyUrl)
            .then((res) => res.text())
            .then(setContent)
            .catch((err) => {
              console.error("Failed to load book text:", err);
              setError("Failed to load book content.");
            });
        } else {
          setError("Book format not supported");
        }
      })
      .catch((err) => {
        console.error("Failed to load book metada:", err);
        setError("Could not fetch book information.");
      });
  }, [id]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl mb-4">Book Reader</h1>
      <pre className="whitespace-pre-wrap font-serif leading-relaxed text-lg">
        {content || (!error ? "Loading..." : error)}
      </pre>
    </div>
  );
}

export default Reader;
