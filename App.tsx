import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Briefcase, Lightbulb, StickyNote, Check, Upload, Command, Type, X } from 'lucide-react';
import { OnboardingStep, UserGoal, UserData } from './types';
import OtterAvatar from './components/OtterAvatar';

const App: React.FC = () => {
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.WELCOME);
  const [userData, setUserData] = useState<UserData>({ nickname: '', goal: null });
  const [isDropped, setIsDropped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Handle Step Transitions
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  
  // Handlers for inputs
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, nickname: e.target.value });
  };

  const handleGoalSelect = (goal: UserGoal) => {
    setUserData({ ...userData, goal });
  };

  // Step 3: Drag and Drop Logic
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropped(true);
    setShowConfetti(true);
    setTimeout(() => {
        nextStep(); // Auto advance after a brief "success" moment
        setShowConfetti(false);
    }, 2000);
  };

  // Render Functions for each step
  const renderStepContent = () => {
    switch (step) {
      case OnboardingStep.WELCOME:
        return (
          <div className="flex flex-col items-center text-center animate-fade-in space-y-8">
            <OtterAvatar size="xl" className="animate-float" />
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold text-[#5D5148] tracking-tight">念念不忘，必有回响</h1>
              <p className="text-xl text-[#8C7E74]">你好，我是念念，你的AI信息伙伴</p>
            </div>
            <button 
              onClick={nextStep}
              className="mt-8 bg-[#8B7E74] hover:bg-[#6D6158] text-white text-lg font-bold py-3 px-10 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              开始领养 <ChevronRight size={20} />
            </button>
          </div>
        );

      case OnboardingStep.INTRO:
        return (
          <div className="flex flex-col items-center w-full max-w-md animate-fade-in space-y-8">
            <div className="flex items-center gap-4 w-full bg-white p-4 rounded-2xl shadow-sm border border-[#EBE3DB]">
              <OtterAvatar size="sm" />
              <div className="bg-[#F5F1ED] p-3 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl text-[#5D5148] font-medium text-lg relative">
                 <div className="absolute w-3 h-3 bg-[#F5F1ED] -left-1.5 top-4 transform rotate-45"></div>
                 怎么称呼你呢？
              </div>
            </div>

            <div className="w-full">
              <input
                type="text"
                value={userData.nickname}
                onChange={handleNameChange}
                placeholder="输入你的昵称..."
                className="w-full bg-transparent border-b-2 border-[#D4C5B0] text-2xl text-center py-2 focus:outline-none focus:border-[#8B7E74] text-[#5D5148] placeholder-[#C4B5A5] transition-colors"
                autoFocus
              />
            </div>

            {userData.nickname && (
               <div className="flex items-center gap-4 w-full bg-white p-4 rounded-2xl shadow-sm border border-[#EBE3DB] animate-fade-in-up">
               <OtterAvatar size="sm" />
               <div className="bg-[#F5F1ED] p-3 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl text-[#5D5148] font-medium text-lg relative">
                  <div className="absolute w-3 h-3 bg-[#F5F1ED] -left-1.5 top-4 transform rotate-45"></div>
                  我主要能在什么方面帮到你呢？
               </div>
             </div>
            )}

            {userData.nickname && (
              <div className="grid grid-cols-1 gap-4 w-full animate-fade-in-up delay-100">
                <GoalCard 
                  icon={<Briefcase size={24} />}
                  title="工作/学习"
                  subtitle="管理文档、资料"
                  selected={userData.goal === UserGoal.WORK_STUDY}
                  onClick={() => handleGoalSelect(UserGoal.WORK_STUDY)}
                />
                <GoalCard 
                  icon={<Lightbulb size={24} />}
                  title="灵感收集"
                  subtitle="记录想法、灵感"
                  selected={userData.goal === UserGoal.INSPIRATION}
                  onClick={() => handleGoalSelect(UserGoal.INSPIRATION)}
                />
                <GoalCard 
                  icon={<StickyNote size={24} />}
                  title="日常备忘"
                  subtitle="提醒、琐事管理"
                  selected={userData.goal === UserGoal.MEMO}
                  onClick={() => handleGoalSelect(UserGoal.MEMO)}
                />
              </div>
            )}

            <div className="h-16 flex items-center justify-center w-full">
              {userData.nickname && userData.goal && (
                <button 
                  onClick={nextStep}
                  className="bg-[#8B7E74] hover:bg-[#6D6158] text-white font-bold py-3 px-12 rounded-full shadow-md transition-all animate-bounce-short"
                >
                  继续
                </button>
              )}
            </div>
          </div>
        );

      case OnboardingStep.DROP_ZONE:
        return (
          <div className="flex flex-col items-center w-full text-center animate-fade-in relative h-full justify-center">
             {!isDropped ? (
               <>
                <h2 className="text-2xl font-bold text-[#5D5148] mb-2">太棒了，{userData.nickname}！</h2>
                <p className="text-[#8C7E74] mb-12">现在让我展示最实用的功能 ——</p>
                
                <div 
                  className="relative group cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="absolute inset-0 bg-[#8B7E74] rounded-full opacity-0 group-hover:opacity-10 scale-150 transition-all duration-500 animate-pulse"></div>
                  
                  {/* Dashed border circle indicating drop zone */}
                  <div className="absolute -inset-8 border-2 border-dashed border-[#8B7E74] rounded-full opacity-40 animate-spin-slow pointer-events-none"></div>
                  
                  <OtterAvatar size="xl" className="transform transition-transform group-hover:scale-105" />
                  
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-64 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-[#EBE3DB] pointer-events-none">
                     <div className="flex items-center justify-center gap-2 text-[#5D5148] font-bold">
                       <Upload size={18} />
                       试试把任意文件拖到我身上
                     </div>
                  </div>
                </div>
               </>
             ) : (
               <div className="flex flex-col items-center justify-center space-y-6">
                 <OtterAvatar size="xl" emotion="happy" />
                 <div className="bg-[#E6F4EA] text-[#1E4620] px-6 py-3 rounded-2xl font-bold text-xl shadow-sm flex items-center gap-2 animate-pop-in">
                   <Check size={24} />
                   搞定！你刚刚完成了第一次信息投喂
                 </div>
               </div>
             )}
          </div>
        );

      case OnboardingStep.FEATURES:
        return (
          <div className="flex flex-col items-center w-full max-w-2xl animate-fade-in space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-[#5D5148]">除了拖拽投喂...</h2>
              <p className="text-[#8C7E74]">我还有这两种超快的方式</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <FeatureCard 
                icon={<div className="flex gap-1 font-mono font-bold text-sm bg-gray-800 text-white px-2 py-1 rounded"><span>Ctrl</span><span>+</span><span>Shift</span><span>+</span><span>S</span></div>}
                title="快速截图"
                description="看到好内容？一个快捷键，我帮你记住。"
              />
              <FeatureCard 
                icon={<Type size={32} className="text-[#8B7E74]" />}
                title="直接输入"
                description="点击悬浮窗，随时随地记录想法。"
              />
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs pt-8">
              <button 
                onClick={nextStep}
                className="w-full bg-[#8B7E74] hover:bg-[#6D6158] text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform active:scale-95"
              >
                立即体验
              </button>
              <button 
                onClick={nextStep}
                className="w-full text-[#8C7E74] hover:text-[#5D5148] font-medium py-2 transition-colors"
              >
                稍后再说
              </button>
            </div>
          </div>
        );

      case OnboardingStep.FINISH:
        return (
          <div className="flex flex-col items-center w-full text-center animate-fade-in space-y-8">
             <div className="relative">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-200 rounded-full opacity-50 blur-2xl"></div>
                <OtterAvatar size="lg" emotion="happy" />
             </div>
             
             <div className="space-y-4">
                <h2 className="text-3xl font-extrabold text-[#5D5148]">一切就绪！</h2>
                <p className="text-xl text-[#8C7E74] max-w-md mx-auto">
                  我会常驻在桌面角落，随时等你投喂。<br/>
                  <span className="text-sm opacity-75 mt-2 block">记得，我是念念。</span>
                </p>
             </div>

             <div className="bg-white/60 backdrop-blur border border-[#EBE3DB] p-4 rounded-xl flex flex-col items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#8C7E74] font-bold">主要快捷键</span>
                <div className="flex gap-4 text-[#5D5148] font-mono text-sm">
                   <span className="bg-[#F5F1ED] px-2 py-1 rounded border border-[#D4C5B0]">截图: Ctrl+Shift+S</span>
                   <span className="bg-[#F5F1ED] px-2 py-1 rounded border border-[#D4C5B0]">唤起: Alt+Space</span>
                </div>
             </div>

             <button 
                onClick={() => alert("Welcome to NianNian! App initialization would happen here.")}
                className="mt-4 bg-[#5D5148] hover:bg-[#4A403A] text-white text-xl font-bold py-4 px-16 rounded-full shadow-xl transform transition hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                开始使用
              </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f0eadd] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFE4D6] rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#E8DCCF] rounded-full blur-[100px] opacity-70"></div>
      </div>

      {/* Main Window Container */}
      <div className="relative z-10 w-full max-w-5xl h-[85vh] max-h-[800px] bg-[#FFF8F3]/90 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/50 flex flex-col overflow-hidden transition-all duration-700">
        
        {/* Window Controls (Simulated) */}
        <div className="absolute top-6 right-6 flex gap-2 z-50">
           <button className="p-2 rounded-full hover:bg-black/5 text-[#8C7E74] transition-colors"><X size={20}/></button>
        </div>

        {/* Progress Indicator (Subtle) */}
        {step > 1 && step < 5 && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#EBE3DB]">
            <div 
              className="h-full bg-[#8B7E74] transition-all duration-500 ease-out" 
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Dynamic Content Area */}
        <div className="flex-1 w-full flex flex-col items-center justify-center p-8 md:p-16 transition-all duration-500">
          {renderStepContent()}
        </div>

      </div>

      {/* Confetti Effect (Simple Implementation) */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50 flex justify-center pt-20">
           {/* In a real app, use a canvas confetti library. Here simulated with dots */}
           <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
           <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
           <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
           <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}
    </div>
  );
};

// Helper Components
interface GoalCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  selected: boolean;
  onClick: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ icon, title, subtitle, selected, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left p-4 rounded-xl flex items-center gap-4 border-2 transition-all duration-200 group
      ${selected 
        ? 'border-[#8B7E74] bg-[#F5F1ED] shadow-md' 
        : 'border-transparent bg-white hover:bg-[#FAF8F6] hover:border-[#EBE3DB]'
      }`}
  >
    <div className={`p-3 rounded-full ${selected ? 'bg-[#8B7E74] text-white' : 'bg-[#F0EBE5] text-[#8C7E74] group-hover:bg-[#EBE3DB]'}`}>
      {icon}
    </div>
    <div>
      <h3 className={`font-bold text-lg ${selected ? 'text-[#5D5148]' : 'text-[#6D6158]'}`}>{title}</h3>
      <p className="text-sm text-[#9CA3AF] font-medium">{subtitle}</p>
    </div>
    {selected && <div className="ml-auto text-[#8B7E74]"><Check /></div>}
  </button>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white border border-[#EBE3DB] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4 p-4 bg-[#F5F1ED] rounded-full text-[#5D5148]">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#5D5148] mb-2">{title}</h3>
    <p className="text-[#8C7E74] leading-relaxed">{description}</p>
  </div>
);

export default App;