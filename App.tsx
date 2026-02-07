
import React, { useState, useEffect } from 'react';
import { Heart, Mail } from 'lucide-react';
import Proposal from './components/Proposal';
import Quiz from './components/Quiz';
import Celebration from './components/Celebration';

type Step = 'start' | 'proposal' | 'quiz' | 'final';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('start');
  const [bgHearts, setBgHearts] = useState<{ id: number; x: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setBgHearts(hearts);
  }, []);

  return (
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated Background */}
      <div className="heart-bg">
        {bgHearts.map(h => (
          <div
            key={h.id}
            className="absolute text-rose-200 animate-pulse"
            style={{
              left: `${h.x}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${h.delay}s`,
              opacity: 0.4
            }}
          >
            <Heart size={h.size} fill="currentColor" strokeWidth={0} />
          </div>
        ))}
      </div>

      <main className="w-full max-w-md z-10">
        {step === 'start' && (
          <div 
            onClick={() => setStep('proposal')}
            className="flex flex-col items-center justify-center space-y-6 cursor-pointer animate-in fade-in zoom-in duration-700"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-rose-200 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-full shadow-2xl animate-float">
                <Mail size={80} className="text-rose-500" strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-romantic text-rose-600 font-bold">You have a message!</h1>
              <p className="text-rose-400 font-medium animate-pulse">Tap to open, Latika ✨</p>
            </div>
          </div>
        )}

        {step === 'proposal' && (
          <Proposal onAccepted={() => setStep('quiz')} />
        )}

        {step === 'quiz' && (
          <div className="bg-white/80 backdrop-blur-lg rounded-[2.5rem] p-8 shadow-2xl border border-white">
            <Quiz onFinished={() => setStep('final')} />
          </div>
        )}

        {step === 'final' && (
          <Celebration />
        )}
      </main>

      <footer className="absolute bottom-4 text-rose-300 text-[10px] tracking-[0.2em] uppercase font-bold">
        Purely for Latika
      </footer>
    </div>
  );
};

export default App;
