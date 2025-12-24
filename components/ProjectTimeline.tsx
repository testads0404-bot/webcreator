import React from 'react';
import { Clock, CalendarCheck, Rocket } from 'lucide-react';

interface ProjectTimelineProps {
  duration: number; // in days
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ duration }) => {
  const weeks = Math.ceil(duration / 6); // Assuming 6 working days per week

  // Calculate phases based on total duration
  const designPhase = Math.max(1, Math.floor(duration * 0.3));
  const devPhase = Math.max(1, Math.floor(duration * 0.5));
  const testPhase = Math.max(1, duration - designPhase - devPhase);

  return (
    <div className="mt-8 bg-white/50 border border-slate-200 rounded-xl p-5 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-indigo-600" />
        <h3 className="font-bold text-slate-800">تخمین زمان اجرا</h3>
        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold">
          ~ {duration} روز کاری ({weeks} هفته)
        </span>
      </div>

      <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden flex w-full">
        {/* Design Phase */}
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 relative group cursor-help"
          style={{ width: `${(designPhase / duration) * 100}%` }}
        >
          <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap transition-opacity">
            طراحی UI/UX ({designPhase} روز)
          </div>
        </div>
        {/* Development Phase */}
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 relative group cursor-help"
          style={{ width: `${(devPhase / duration) * 100}%` }}
        >
           <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap transition-opacity">
            کدنویسی و توسعه ({devPhase} روز)
          </div>
        </div>
        {/* Testing Phase */}
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 relative group cursor-help"
          style={{ width: `${(testPhase / duration) * 100}%` }}
        >
           <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap transition-opacity">
            تست و دیباگ ({testPhase} روز)
          </div>
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          شروع پروژه
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          طراحی و ساخت
        </div>
        <div className="flex items-center gap-1">
           <Rocket className="w-3 h-3 text-emerald-600" />
           <span className="text-emerald-600 font-bold">تحویل نهایی</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;