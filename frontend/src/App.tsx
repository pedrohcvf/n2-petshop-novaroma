import { useState } from 'react'

function App() {
  return (
    <div className="bg-[#dfe8f3] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl flex flex-col items-center">

        {/* Title */}
        <h1 className="text-7xl font-bold text-slate-800 mb-14">
          Login
        </h1>

        {/* Card */}
        <div className="bg-[#f3f5f7] w-full rounded-3xl shadow-xl p-12">

          <form className="flex flex-col gap-6">

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full h-24 rounded-2xl border border-gray-300 px-7 text-4xl text-slate-700 outline-none focus:ring-4 focus:ring-blue-300"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full h-24 rounded-2xl border border-gray-300 px-7 text-4xl text-slate-700 outline-none focus:ring-4 focus:ring-blue-300"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full h-24 bg-blue-500 hover:bg-blue-600 transition rounded-2xl text-white text-4xl font-semibold"
            >
              LOG IN
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App
