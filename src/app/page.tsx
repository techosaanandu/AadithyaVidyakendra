import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gray-50 font-[family-name:var(--font-geist-sans)] bg-cover bg-center"
      style={{ backgroundImage: "url('/backgroundd.jpg')" }}
    >
      {/* ✅ Navbar */}
      <nav className="w-full bg-transparent backdrop-blur-lg fixed top-0 left-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold text-white font-mono">Techosa.</h1>
          <Link
            href="/downloader"
            className="text-sm sm:text-base font-semibold text-white border border-white px-4 py-2 rounded-full flex items-center justify-center h-10 sm:h-12 w-36 sm:w-40 hover:bg-white hover:text-black transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ✅ Main Section */}
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pt-32 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start pl-10 sm:pl-80">
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <h1 className="text-white font-bold text-4xl">
              Download Your Report Card
            </h1>
            <br />
            <li className="mb-2 text-white">
              Get started by searching{" "}
              <code className="bg-white/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                the School Name
              </code>
              .
            </li>
            <li className="text-white">
              Fill in the details and download your PDF instantly.
            </li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-400 text-white gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/downloader"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Get Started
            </Link>
          </div>
        </main>
      </div>

      {/* ✅ Footer */}
      <footer className="fixed bottom-4 right-4">
        <a
          className="flex items-center gap-2 text-white text-sm hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Powered By <span className="font-bold text-white">Techosa</span>
        </a>
      </footer>
    </div>
  );
}
