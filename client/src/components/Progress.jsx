import React from 'react';
import progress from '../assets/progress.gif'

function Progress() {
  return (
    <div className="flex justify-center items-center">
      <img src={progress} alt="Loading..." />
    </div>
  );
}

export default Progress;
