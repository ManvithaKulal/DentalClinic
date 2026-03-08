import { useEffect, useState } from "react";
import { getAllPatients } from "../../api/galleryApi";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllPatients();
        setPatients(res.data);
      } catch {
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Patients</h1>

      {patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  #
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  Phone
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <tr
                  key={p._id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-3 text-sm text-gray-700">{i + 1}</td>
                  <td className="px-6 py-3 text-sm text-gray-900 font-medium">
                    {p.name || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{p.email}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {p.phone || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Patients;
