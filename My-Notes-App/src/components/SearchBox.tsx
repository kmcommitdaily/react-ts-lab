import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [input, setInput] = useState<string>('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };
  return (
    <>
      <input
        id="search-input"
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="search.."></input>
    </>
  );
};

export default SearchBox;
