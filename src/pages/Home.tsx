"use client";
import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Typewriter from "typewriter-effect";
import axios from "axios";

function Home() {
  const [username, setUserName] = useState<string>("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const val = username.trim();
    if (!val) {
      toast.error("Please enter a valid username.");
      return;
    }

    if (username.trim()) {
      try {
        const response = await axios.post("/api/github_profile", { username: username.trim() }, { timeout: 5000 });

        if (response.status === 200) {
          const data = response.data;
          if (data.config.repo_count > 0) {
            router.push(`/${username.trim()}`);
          } else {
            toast.error("Username does not exist on GitHub");
          }
        } else {
          toast.error("Error verifying username. Please try again.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.error || "An unexpected error occurred. Please try again.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    } else {
      toast.error("Please enter a username.");
    }
  };

  const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserName(val);
  };

  return (
      <div className="flex flex-col justify-between min-h-[100%]">
        {/* Main Content */}
        <main className="flex flex-col justify-center items-center flex-grow px-8 sm:px-4">
          <>
            <h1 className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-widest mb-8">
              <Typewriter
                options={{
                  cursor: "<span style='color: #fff; animation: blink 1s infinite;'>|</span>",
                }}
                onInit={(typewriter) => {
                  const animate = () => {
                    typewriter
                      .typeString("Let's, Begin...")
                      .pauseFor(1000)
                      .deleteAll()
                      .pauseFor(1000)
                      .start();
                    setTimeout(animate, 2000);
                  };
                  animate();
                }}
              />
            </h1>
            <form
              className="flex items-center w-full sm:w-2/3 lg:w-1/3 h-1/3"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center bg-white rounded-full shadow-md p-2 w-full">
                {/* GitHub Logo inside search bar */}
                <div className="px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.172c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.238 1.838 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.588 8.199-6.084 8.199-11.385 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>

                {/* Search input */}
                <input
                  type="text"
                  placeholder="Enter GitHub username"
                  className="w-full px-4 py-2 text-gray-700 bg-white focus:outline-none"
                  value={username}
                  onChange={handleUser}
                  ref={inputRef}
                />

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600  focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </>
        </main>
        <Toaster />
      </div>
  );
}

export default Home;
