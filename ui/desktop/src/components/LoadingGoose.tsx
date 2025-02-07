import React from 'react';
import GooseLogo from './GooseLogo';

const LoadingGoose = () => {
  return (
    <div className="w-full pb-[2px]">
      <div className="flex items-center text-xs text-textStandard mb-1 mt-1 pl-4 animate-[appear_250ms_ease-in_forwards]">
        <GooseLogo className="mr-2" size="small" hover={false} />
        goose is working on it..
      </div>
    </div>
  );
};

export default LoadingGoose;
