import React, { useState } from 'react';

export default function ExamForm({ onAddExam, exams, onRemoveExam }) {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !date) return;
    onAddExam({ subject, date, difficulty });
    setSubject('');
    setDate('');
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold text-slate-900 mb-4">📚 Add Your Exams</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500 block mb-1">Subject Name</label>
          <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Data Structures" className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500 block mb-1">Exam Date</label>
            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500 block mb-1">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-1.5 text-sm font-medium rounded-md transition-colors">+ Add Exam</button>
      </form>

      {/* Added Exams List Summary */}
      {exams.length > 0 && (
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <p className="text-xs font-bold tracking-wider uppercase text-slate-400">Current Exams List</p>
          {exams.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-slate-50 p-2 rounded text-xs">
              <div>
                <span className="font-semibold block">{item.subject}</span>
                <span className="text-slate-500">{item.date} • {item.difficulty}</span>
              </div>
              <button onClick={() => onRemoveExam(idx)} className="text-red-500 hover:text-red-700 font-bold px-1">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}