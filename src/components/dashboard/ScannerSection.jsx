import React, { useRef } from 'react';
import { ImageIcon, FileText, Trash2, Upload, Loader2, RefreshCw } from 'lucide-react';

export default function ScannerSection({
  activeTab,
  setActiveTab,
  selectedImage,
  setSelectedImage,
  inputText,
  setInputText,
  isExtracting,
  error,
  onExtract,
}) {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="bg-white/85 backdrop-blur-md rounded-3xl border border-black/5 p-6 shadow-sm space-y-5">
      <div>
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">
          Scan Screenshot or Input Your Raw Text
        </h2>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-2xl border border-black/5">
        <button
          onClick={() => setActiveTab('image')}
          className={`flex-1 py-2.5 text-xs font-extrabold capitalize flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'image'
              ? 'bg-white text-[#FF84BA] shadow-xs'
              : 'text-gray-500'
          }`}>
          <ImageIcon className="w-3.5 h-3.5" /> Image
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-2.5 text-xs font-extrabold capitalize flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'text'
              ? 'bg-white text-[#FF84BA] shadow-xs'
              : 'text-gray-500'
          }`}>
          <FileText className="w-3.5 h-3.5" /> Text
        </button>
      </div>

      {activeTab === 'image' ? (
        <div
          onClick={() => !selectedImage && fileInputRef.current?.click()}
          className="relative h-56 rounded-2xl border border-dashed border-gray-200 hover:border-[#FF84BA] bg-gray-50 flex flex-col items-center justify-center gap-3 cursor-pointer">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          {selectedImage ? (
            <div className="relative w-full h-full p-2">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-full object-contain rounded-xl"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-xl cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-center px-4">
              <Upload className="w-5 h-5 mx-auto text-gray-400 mb-2" />
              <p className="text-xs font-bold capitalize text-gray-700">
                Click to Upload Your Image
              </p>
            </div>
          )}
        </div>
      ) : (
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Copy Your Detail Job Application Here"
          className="w-full h-56 p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#FF84BA] resize-none text-xs font-medium text-gray-700"
        />
      )}

      <button
        disabled={
          isExtracting ||
          (activeTab === 'image' ? !selectedImage : !inputText)
        }
        onClick={onExtract}
        className="w-full py-3.5 bg-[#FF84BA] hover:bg-[#FF84BA]/95 disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-2xl font-bold text-xs capitalize tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all">
        {isExtracting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <RefreshCw className="w-4 h-4" />
        )}
        <span>
          {isExtracting ? 'Analyse' : 'Job Application Extract'}
        </span>
      </button>

      {error && (
        <p className="text-red-500 text-[10px] font-bold capitalize text-center mt-2">
          {error}
        </p>
      )}
    </section>
  );
}