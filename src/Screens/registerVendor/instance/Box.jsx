import React from 'react';

const Box = ({ range, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-14 h-10 flex items-center justify-center cursor-pointer border-2 ${
        isSelected ? 'bg-blue-500 text-white' : 'bg-white'
      } border-gray-300 rounded`}
    >
      {range}
    </div>
  );
};

export default Box;
