const SearchFilterBar = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-gray-900 border border-gray-800 p-4 rounded-xl">

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white outline-none focus:border-blue-500 transition"
      />

      {/* STATUS FILTER */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white outline-none focus:border-blue-500 transition"
      >
        <option value="">All</option>
        <option value="Applied">Applied</option>
        <option value="OA">OA</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Selected">Selected</option>
      </select>

    </div>
  );
};

export default SearchFilterBar;