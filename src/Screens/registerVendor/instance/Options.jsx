import React, { useState } from 'react';

const Options = () => {
  const allOptions = [
    "Business Type 1",
    "Business Type 2",
    "Business Type 3",
    "Business Type 4",
    "Business Type 5",
    "Business Type 6",
    "Business Type 7",
    "Business Type 8",
    "Business Type 9",
    "Business Type 10"
  ];

  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(allOptions);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter options based on the input value
    const newFilteredOptions = allOptions.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(newFilteredOptions);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setFilteredOptions(allOptions); // Reset options list
    setIsDropdownOpen(false); // Collapse the dropdown
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <div className='relative w-72'>
      <div className='flex items-center flex-col'>
        <label>select catagory of type by your self </label>
        <input
          className='w-full h-10 p-3 border-spacing-5 border-2 mt-2'
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search..."
          onClick={toggleDropdown}
        />
        <svg
          onClick={toggleDropdown}
          className={`w-6 h-6 ml-2 cursor-pointer ${isDropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isDropdownOpen && filteredOptions.length > 0 && (
        <ul className='absolute w-full mt-1 border border-gray-300 bg-white max-h-40 overflow-auto'>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className='p-2 hover:bg-blue-500 hover:text-white cursor-pointer'
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Options;
