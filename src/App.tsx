import React from 'react';
import TopBar from './Components/TopBar';
import Result from './Pages/Result';
function App() {
  return (
    <div className="w-full h-screen flex flex-col">
      <TopBar />
      <Result />
    </div>
  );
}

export default App;
