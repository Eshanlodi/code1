import React from 'react';

export default function PlanDashboard({ plan }) {
  if (!plan) {
    return (
      <div className="bg-dashed border-2 border-dashed border-slate-300 rounded-xl p-12 text-center text-slate-400">
        <p className="text-lg">No schedule generated yet.</p>
        <p className="text-sm mt-1">Fill out your exam details and click generate to populate your custom roadmap.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Subject Priorities block */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-3">🎯 AI Strategy & Priorities</h2>
        <div className="grid grid-cols-1 gap-3">
          {plan.priorities?.map((p, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-indigo-50/50 rounded-lg text-sm">
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase shrink-0 ${
                p.level === 'High' ? 'bg-red-100 text-red-700' : p.level === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {p.level} Focus
              </span>
              <div>
                <strong className="text-slate-900">{p.subject}:</strong> <span className="text-slate-600">{p.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date-wise Timetable block */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-4">📅 Your Daily Study Schedule</h2>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Subject</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Session Hours</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Target Tasks / Revision Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {plan.schedule?.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{item.date}</td>
                  <td className="px-4 py-3 font-medium text-indigo-600">{item.subject}</td>
                  <td className="px-4 py-3 text-slate-500">{item.hours} hrs</td>
                  <td className="px-4 py-3 text-slate-700">{item.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}