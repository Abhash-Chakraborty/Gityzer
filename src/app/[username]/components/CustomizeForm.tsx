"use client";

import { themeOptions, fontOptions, patternOptions } from "@/libs/utils";

export default function CustomizeForm({ config, handleChange }) {
  return (
    <div className="max-w-6xl mx-auto mb-2 bg-slate-800 bg-opacity-80 rounded-xl p-8 shadow-lg h-fit w-[50vw] items-center justify-center font-medium">
      <form className="flex flex-col gap-8">
        <div className="grid grid-cols-3 gap-7">
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="theme">Theme</label>
              <select
                name="theme"
                id="theme"
                value={config.theme || ""}
                onChange={handleChange}
                className="bg-slate-600 p-1 rounded-md border-white border-[1px] w-[100px]"
              >
                {themeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="font">Font</label>
              <select
                name="font"
                id="font"
                value={config.font || ""}
                onChange={handleChange}
                className="bg-slate-600 p-1 rounded-md border-white border-[1px] w-[100px]"
              >
                {fontOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="pattern">Pattern</label>
              <select
                name="pattern"
                id="pattern"
                value={config.pattern || ""}
                onChange={handleChange}
                className="bg-slate-600 p-1 rounded-md border-white border-[1px] w-[100px]"
              >
                {patternOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center col-span-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="image">Image URL (Optional)</label>
              <input
                type="text"
                name="image"
                id="image"
                placeholder="Enter image URL"
                value={config.image || ""}
                onChange={handleChange}
                className="bg-slate-600 p-1 rounded-md border-white border-[1px] w-[40vw] h-8 resize-none break-normal"
                style={{
                  overflowX: "scroll",
                  overflowY: "hidden",
                  scrollbarWidth: "none", 
                  msOverflowStyle: "none" 
                }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-7">
          <div className="flex gap-1 items-center justify-center">
            <input
              type="checkbox"
              name="star"
              checked={config.star || false}
              onChange={handleChange}
              className="accent-blue-500"
            />
            <label htmlFor="username">Star</label>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <input
              type="checkbox"
              name="fork"
              checked={config.fork || false}
              onChange={handleChange}
              className="accent-blue-500"
            />
            <label htmlFor="username">Fork</label>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <input
              type="checkbox"
              name="repo"
              checked={config.repo || false}
              onChange={handleChange}
              className="accent-blue-500"
            />
            <label htmlFor="username">Repo</label>
          </div>
        </div>
      </form>
    </div>
  );
}