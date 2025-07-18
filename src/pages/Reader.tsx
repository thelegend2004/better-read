import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Reader() {
  const { id } = useParams();
  const [content, setContent] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/books/${id}`)
      .then((res) => res.text())
      .then((text) => {
        const paragraphs = text
          .split(/\n{2,}/)
          .map((p) => `<p>${p.trim()}</p>`)
          .filter((p) => p.length > 50);
        setContent(paragraphs);
      })
      .catch(() => setError("Could not fetch book information."));
  }, [id]);

  const PAGE_SIZE = 10;
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentPageContent = content.slice(start, end).join("");
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl mb-4">Book Reader</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!error && (
        <>
          <div
            className="prose font-serif text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentPageContent }}
          />
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() => setPage((p) => (end < content.length ? p + 1 : p))}
              disabled={end >= content.length}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Reader;
