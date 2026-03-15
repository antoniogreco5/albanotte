'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type Answer = { label: string; value: string };
type Question = { question: string; sub: string; answers: Answer[] };

const QUESTIONS: Question[] = [
  { question: 'WHEN DO YOU REACH FOR COFFEE?', sub: 'Pick the moment that feels most like you.', answers: [
    { label: 'First thing in the morning', value: 'morning' },
    { label: 'Midday pick-me-up', value: 'midday' },
    { label: 'Afternoon ritual', value: 'afternoon' },
    { label: 'Evening wind-down', value: 'evening' },
  ]},
  { question: 'HOW DO YOU LIKE YOUR COFFEE?', sub: 'No wrong answers.', answers: [
    { label: 'Bright and fruity', value: 'bright' },
    { label: 'Smooth and balanced', value: 'smooth' },
    { label: 'Rich and chocolatey', value: 'rich' },
    { label: 'Bold and intense', value: 'bold' },
  ]},
  { question: 'HOW DO YOU BREW?', sub: "We'll match your grind too.", answers: [
    { label: 'Pour over or drip', value: 'pourover' },
    { label: 'French press', value: 'frenchpress' },
    { label: 'Espresso', value: 'espresso' },
    { label: 'I keep it simple', value: 'simple' },
  ]},
  { question: 'CAFFEINE?', sub: 'Last one.', answers: [
    { label: 'Always', value: 'caf' },
    { label: 'Sometimes decaf', value: 'decaf' },
  ]},
];

type BlendResult = { name: string; handle: string; tagline: string; description: string; color: string };

const BLENDS: Record<string, BlendResult> = {
  buongiorno: { name: 'Buongiorno', handle: 'buongiorno-ethiopia-medium-light', tagline: 'Your morning just got brighter.', description: 'A medium-light Ethiopian roast. Dark chocolate, dried fruit, bright and energizing.', color: '#BFA343' },
  'ciao-a-tutti': { name: 'Ciao a Tutti', handle: 'ciao-a-tutti-brazil-medium-espresso', tagline: 'The crowd-pleaser. Every time.', description: 'A smooth Brazilian medium roast. Brown sugar, chocolate, citrus finish.', color: '#5C9E8F' },
  'la-dolce-vita': { name: 'La Dolce Vita', handle: 'la-dolce-vita-guatemala-medium', tagline: 'Rich, comforting, indulgent.', description: 'A Guatemalan medium roast. Chocolate, hazelnut, the sweetest part of your day.', color: '#B87333' },
  'senza-fretta': { name: 'Senza Fretta', handle: 'senza-fretta-colombia-decaf', tagline: 'No rush. No compromise.', description: 'A sugar cane processed Colombian decaf. Deep dark chocolate, zero caffeine.', color: '#5C6B4F' },
  mezzanotte: { name: 'Mezzanotte', handle: 'mezzanotte-rwanda-dark', tagline: 'Bold. Complex. The final chapter.', description: 'A dark Rwandan roast. Black tea, dried cherry, baking spice.', color: '#F2F0EA' },
};

function getResult(answers: string[]): BlendResult {
  const [time, taste, , caffeine] = answers;
  if (caffeine === 'decaf') return BLENDS['senza-fretta'];
  if (taste === 'bold') return BLENDS.mezzanotte;
  if (taste === 'rich') return BLENDS['la-dolce-vita'];
  if (taste === 'bright' || time === 'morning') return BLENDS.buongiorno;
  return BLENDS['ciao-a-tutti'];
}

export default function BlendQuiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<BlendResult | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setResult(getResult(newAnswers));
  };

  const reset = () => { setStarted(false); setStep(0); setAnswers([]); setResult(null); };

  return (
    <section className="py-16 md:py-24 bg-alb-black relative overflow-hidden">
      <div className="alb-container relative z-10">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!started && !result && (
              <motion.div key="start" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="flex-1 text-center md:text-left">
                  <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-2">Not Sure Where to Start?</p>
                  <h2 className="font-heading text-section-lg font-bold text-alb-off-white mb-3">FIND YOUR ROAST</h2>
                  <p className="font-body text-body-sm text-alb-muted mb-6">4 questions. 30 seconds. We match you with the perfect blend.</p>
                  <button onClick={() => setStarted(true)} className="alb-btn-primary px-8 py-3.5 text-sm">Take the Quiz</button>
                </div>
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-white/[0.06] flex items-center justify-center relative shrink-0">
                  <div className="absolute inset-4 rounded-full border border-alb-olive/20" />
                  <span className="font-heading text-4xl font-bold text-alb-olive/20">?</span>
                </div>
              </motion.div>
            )}

            {started && !result && (
              <motion.div key={`q-${step}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-alb-olive' : 'w-4 bg-white/[0.08]'}`} />
                  ))}
                </div>
                <p className="text-body-xs text-alb-muted mb-1">{step + 1} of {QUESTIONS.length}</p>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-alb-off-white mb-1">{QUESTIONS[step].question}</h3>
                <p className="text-body-sm text-alb-muted mb-8">{QUESTIONS[step].sub}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {QUESTIONS[step].answers.map((a) => (
                    <button key={a.value} onClick={() => handleAnswer(a.value)}
                      className="group flex items-center gap-3 px-5 py-4 bg-alb-surface border border-white/[0.06] rounded-alb text-left hover:border-alb-olive/40 hover:bg-alb-olive/[0.05] transition-all">
                      <span className="w-2 h-2 rounded-full border border-alb-muted/30 group-hover:border-alb-olive group-hover:bg-alb-olive/30 transition-all shrink-0" />
                      <span className="font-body text-body-md text-alb-off-white/80 group-hover:text-alb-off-white transition-colors">{a.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center">
                <p className="text-[0.6875rem] font-body uppercase tracking-[0.18em] text-alb-olive mb-2">Your Match</p>
                <h3 className="font-heading text-4xl md:text-5xl font-bold text-alb-off-white uppercase mb-2">{result.name}</h3>
                <p className="font-heading text-body-md font-medium mb-3" style={{ color: result.color }}>{result.tagline}</p>
                <p className="font-body text-body-sm text-alb-muted max-w-md mx-auto mb-8">{result.description}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href={`/products/${result.handle}`} className="alb-btn-primary px-8 py-3.5" style={{ background: result.color }}>
                    Shop {result.name}
                  </Link>
                  <button onClick={reset} className="text-body-sm text-alb-muted hover:text-alb-off-white transition-colors underline underline-offset-4 decoration-white/20">Retake</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
