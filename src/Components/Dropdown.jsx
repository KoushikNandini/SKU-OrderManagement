import { useEffect ,useState ,useRef} from "react";

const Dropdown = ({ options = [], onSearch, onSelect }) => {
  const [visibleOptions, setVisibleOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit] = useState(10);
  const listRef = useRef();

  useEffect(() => {
    setVisibleOptions(options.slice(0, limit));
  }, [options]);

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        const next = options.slice(0, visibleOptions.length + limit);
        setVisibleOptions(next);
      }
    }
  };
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="dropdown">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search SKU..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div
        className="border rounded p-2"
        ref={listRef}
        style={{ maxHeight: "200px", overflowY: "auto" }}
        onScroll={handleScroll}
      >
        {visibleOptions.map((item, index) => (
          <div
            key={index}
            className="dropdown-item py-2 px-3"
            onClick={() => onSelect(item)}
            style={{ cursor: "pointer" }}
          >
            <strong>{item.SKUName}</strong> – {item.SKUCode}
          </div>
        ))}
        {visibleOptions.length === 0 && (
          <div className="text-muted">No results</div>
        )}
      </div>
    </div>
  );
};

export default Dropdown