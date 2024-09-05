const LIMIT = 10;

export function SkeletonTable() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Pokémon List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md">
          <caption className="mb-2 caption-bottom text-sm text-gray-600">
            Loading ...
          </caption>
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/3 border-b p-2 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="w-1/3 border-b p-2 text-left font-semibold text-gray-700">
                Image
              </th>
              <th className="w-1/3 border-b p-2 text-left font-semibold text-gray-700">
                Types
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: LIMIT }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="w-1/3 border-b p-2">
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                </td>
                <td className="w-1/3 border-b p-2">
                  <div className="h-12 w-12 animate-pulse rounded bg-gray-200"></div>
                </td>
                <td className="w-1/3 border-b p-2">
                  <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
