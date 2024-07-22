import React from "react";

const SettingsIdentificationView = () => {
  return (
    <main className="flex h-[calc(100vh-119px)] flex-1 flex-col gap-7 p-8">
      <div className="flex w-[770px] flex-col gap-7">
        <header className="flex flex-col gap-2.5">
          <h2 className="text-2xl font-bold leading-6">Identification</h2>
          <p className="leading-4 text-gray-500">
            Ensure secure identification and establish your personal or
            professional identity with confidence.
          </p>
        </header>
        <hr />
        <div className="flex flex-row gap-4">
          <button className="flex h-[280px] w-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white">
            <p className="text-lg font-bold">
              Upload Front or <span className="text-primary">Browse</span>
            </p>
            <p className="text-gray-400">Supports PNG, JPG, JPEG</p>
          </button>
          <button className="flex h-[280px] w-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white">
            <p className="text-lg font-bold">
              Upload Back or <span className="text-primary">Browse</span>
            </p>
            <p className="text-gray-400">Supports PNG, JPG, JPEG</p>
          </button>
        </div>
      </div>
    </main>
  );
};

export default SettingsIdentificationView;
