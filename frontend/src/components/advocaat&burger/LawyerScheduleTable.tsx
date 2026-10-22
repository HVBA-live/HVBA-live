import StatusBadge from "./LawyerStatusBadge";

const LawyerScheduleTable = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-10">
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-600">
              <th className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <span>Uur</span>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <span>Kamer</span>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <span>Rolnummer</span>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <span>Vaststellingscode</span>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <span>Status</span>
                </div>
              </th>
              <th className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <span>Notificaties</span>

                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-100 bg-[#edf7f2]">
              <td className="px-4 py-3.5 font-bold text-gray-800">09:00</td>
              <td className="px-4 py-3.5 text-gray-700">B4E3</td>
              <td className="px-4 py-3.5 text-gray-700">
                <div className="flex items-center gap-1.5 text-[#003d66]">
                  <span className="font-medium">2024/AR/1835</span>
                </div>
              </td>
              <td className="px-4 py-3.5 text-gray-700">747§2 al.3 Ger.W.</td>
              <td className="px-4 py-3.5">
                <StatusBadge status="Bezig" />
              </td>
              <td className="px-4 py-3.5 text-right">
                <button className="w-32 py-1.5 px-3 bg-[#005a9c] text-white rounded-md text-xs font-semibold">
                  Abonneren
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-100 bg-[#fefce8]">
              <td className="px-4 py-3.5 font-bold text-gray-800">11:30</td>
              <td className="px-4 py-3.5 text-gray-700">B4E3</td>
              <td className="px-4 py-3.5 text-gray-700">
                <div className="flex items-center gap-1.5 text-[#003d66]">
                  <span className="font-medium">2024/AR/1836</span>
                </div>
              </td>
              <td className="px-4 py-3.5 text-gray-700">612§1 Ger.W.</td>
              <td className="px-4 py-3.5">
                <StatusBadge status="Start binnenkort" />
              </td>
              <td className="px-4 py-3.5 text-right">
                <button className="w-32 py-1.5 px-3 bg-[#005a9c] text-white rounded-md text-xs font-semibold">
                  Abonneren
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-100 bg-white">
              <td className="px-4 py-3.5 font-bold text-gray-800">14:00</td>
              <td className="px-4 py-3.5 text-gray-700">A2D1</td>
              <td className="px-4 py-3.5 text-gray-700">
                <div className="flex items-center gap-1.5 text-[#003d66]">
                  <span className="font-medium">2024/AR/1837</span>
                </div>
              </td>
              <td className="px-4 py-3.5 text-gray-700">420 BW</td>
              <td className="px-4 py-3.5">
                <StatusBadge status="Gepland" />
              </td>
              <td className="px-4 py-3.5 text-right">
                <button className="w-32 py-1.5 px-3 bg-[#005a9c] text-white rounded-md text-xs font-semibold">
                  Abonneren
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-100 bg-white">
              <td className="px-4 py-3.5 font-bold text-gray-800">16:30</td>
              <td className="px-4 py-3.5 text-gray-700">A2D1</td>
              <td className="px-4 py-3.5 text-gray-700">
                <div className="flex items-center gap-1.5 text-[#003d66]">
                  <span className="font-medium">2024/AR/1838</span>
                </div>
              </td>
              <td className="px-4 py-3.5 text-gray-700">310§1 Sw.</td>
              <td className="px-4 py-3.5">
                <StatusBadge status="Gepland" />
              </td>
              <td className="px-4 py-3.5 text-right">
                <button className="w-32 py-1.5 px-3 border border-gray-200 text-gray-700 rounded-md text-xs font-semibold">
                  Geabonneerd
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LawyerScheduleTable;