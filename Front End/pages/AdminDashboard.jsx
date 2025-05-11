import { FaUser, FaBriefcase, FaFileAlt, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0
  });

  const[messages, setMessages] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/admin/stats")
      .then(res => setCounts(res.data))
      .catch(err => console.error("Error fetching counts:", err));

    axios.get("http://localhost:3000/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));

    axios.get("http://localhost:3000/admin/messages")
    .then(res => setMessages(res.data))
    .catch(err => console.error("Error fetching message:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3000/admin/users/${id}`);
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      alert("Failed to delete user");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-end gap-2 p-4">
        
        <Link to="/">
          <button className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-800">Back to Website</button>
        </Link>
      </div>

      <header className="text-center py-10">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <p className="text-gray-600">Manage users, job postings, and applications efficiently.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <DashboardCard icon={<FaUser />} title="Total Users" count={counts.totalUsers} />
        <DashboardCard icon={<FaBriefcase />} title="Job Posts" count={counts.totalJobs} />
        <DashboardCard icon={<FaFileAlt />} title="Applications Submitted" count={counts.totalApplications} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-bold mb-4">Contact Messages</h3>
                {messages.length === 0 ? (
                <p className="text-sm text-gray-500">No messages found.</p>
            ) : (
                            <ul className="divide-y">
                                {messages.map(msg => (
                                    <li key={msg._id} className="py-3">
                                    <p className="font-semibold">{msg.name} <span className="text-sm text-gray-400">({msg.email})</span></p>
                                    <p className="text-gray-700 text-sm">{msg.message}</p>
                                    </li>
                    ))}
                            </ul>
            )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <FaUser className="text-violet-800 text-4xl" />
            <div>
              <h3 className="text-lg font-bold">Manage Users</h3>
              <p className="text-gray-600">Remove users from the system.</p>
            </div>
          </div>

          {users.length === 0 ? (
            <p className="text-sm text-gray-500">No users found.</p>
          ) : (
            <ul className="divide-y">
              {users.map(user => (
                <li key={user._id} className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, count }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
      <div className="text-violet-800 text-4xl">{icon}</div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-3xl font-bold text-violet-800">{count}</p>
      </div>
    </div>
  );
}

export default AdminDashboard;