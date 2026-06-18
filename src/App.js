import React, { useState } from 'react';
import ExamForm from './components/ExamForm';
import PlanDashboard from './components/PlanDashboard';
import { generateStudyPlan } from './services/gemini';

function App() {
  const [exams, setExams] = useState([]);
  const [hours, setHours] = useState(4);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddExam = (exam) => {
    setExams([...exams, exam]);
  };

  const handleRemoveExam = (index) => {
    setExams(exams.filter((_, i) => i !== index));
  };

  const handleCreatePlan = async () => {
    if (exams.length === 0) return setError('Please add at least one exam.');
    setLoading(true);
    setError('');
    try {
      const generatedPlan = await generateStudyPlan(exams, hours);
      setPlan(generatedPlan);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6 shadow-md mb-8">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">🎓 AI Exam Planner</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Form & Settings */}
        <div className="md:col-span-1 space-y-6">
          <ExamForm onAddExam={handleAddExam} exams={exams} onRemoveExam={handleRemoveExam} />
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-lg mb-3">Daily Study Capacity</h3>
            <label className="text-sm text-slate-600 block mb-2">Available hours per day:</label>
            <input 
              type="number" 
              min="1" max="16" 
              value={hours} 
              onChange={(e) => setHours(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCreatePlan}
              disabled={loading}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:bg-slate-400"
            >
              {loading ? 'Generating...' : '🚀 Generate Study Plan'}
            </button>
          </div>
          {error && <div className="text-red-600 bg-red-50 p-3 rounded-md text-sm border border-red-200">{error}</div>}
        </div>

        {/* Right Column: Dynamic Dashboard Display */}
        <div className="md:col-span-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-slate-600 animate-pulse font-medium">Gemini is curating your optimized timetable...</p>
            </div>
          ) : (
            <PlanDashboard plan={plan} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;