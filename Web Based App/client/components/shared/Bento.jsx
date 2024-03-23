import React from "react";

function Bento() {
  return (
    <div className="max-w-3xl mx-auto px-10">
      <div className="my-10">
        <div className="grid auto-rows-[192px] grid-cols-3 gap-4">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-red-500 p-4 dark:bg-neutral-900 ${
                i === 3 || i === 6 ? "col-span-2" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bento;
