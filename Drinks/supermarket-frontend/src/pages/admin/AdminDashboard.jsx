const AdminDashboard = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-teal-100 flex flex-col items-center justify-center px-4">
      {/* Supermarket Name & Tagline */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">FreshDrinks Supermarket</h1>
        <p className="text-gray-600 mt-2">
          Your one-stop choice for refreshing drinks
        </p>
      </div>

      {/* Dashboard Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Admin Dashboard
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => onNavigate("restock")}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium
                       hover:bg-green-700 transition"
          >
            Restock Inventory
          </button>

          <button
            onClick={() => onNavigate("inventory")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium
                       hover:bg-blue-700 transition"
          >
            View Inventory
          </button>

          <button
            onClick={() => onNavigate("reports")}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium
                       hover:bg-purple-700 transition"
          >
            View Sales Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
