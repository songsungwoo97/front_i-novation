import PropTypes from "prop-types";

export const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="search"
        value={value}
        onChange={onChange}
        className="flex-1 p-2 border rounded"
        placeholder="검색어를 입력하세요"
        aria-label="뉴스 검색"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        검색
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
