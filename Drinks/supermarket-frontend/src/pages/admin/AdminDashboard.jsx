const AdminDashboard = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
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

