export default function ResultsTable({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <div className="overflow-x-auto mt-5 p-5">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Assessment Name</th>
            <th className="border px-4 py-2 text-left">URL</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{r.name}</td>
              <td className="border px-4 py-2 text-blue-600 underline">
                <a href={r.url} target="_blank">{r.url}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
