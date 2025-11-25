export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6">AI Travel Planner</h1>
      <a
        href="/preferences"
        className="px-6 py-3 bg-white text-black rounded-lg shadow-lg"
      >
        Start Planning
      </a>
    </div>
  );
}
