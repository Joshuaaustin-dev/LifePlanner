import AIExample from "./AI/AIExample";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI prompt window */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">AI Example</h2>
          <AIExample />
        </div>

        {/* Placeholder for other widgets when we decide to add them */}
        <div className=""></div>
      </main>
    </div>
  );
};

export default Dashboard;
