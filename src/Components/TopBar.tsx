import React from 'react';
import PastResult from './PastResult';
import usePopup from './usePopup';

function TopBar() {
  const { component, openPopup } = usePopup();
  return (
    <div className="w-full h-20 flex justify-between items-center px-8 gap-8 flex-shrink-0">
      {component}
      <h1 className="font-bold text-2xl">CoTEver</h1>
      <input
        type="text"
        className="w-full border-2 border-blue-300 rounded-full outline-none focus:border-blue-800 text-center px-8 py-2"
        placeholder="검색 명제를 입력하세요"
      />
      <button
        className=" shrink-0 cursor-pointer"
        onClick={() => openPopup(<PastResult />)}
      >
        과거 검색결과
      </button>
    </div>
  );
}

export default TopBar;
