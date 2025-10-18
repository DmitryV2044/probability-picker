import { motion } from 'framer-motion';

export default function ProbabilityPicker({ onClick, disabled, totalProbability }) {
  const isValid = Math.abs(totalProbability - 1) < 0.001;

  return (
    <div className="space-y-4">
      <div className="relative border border-amber-600/30 bg-slate-800/50 p-5">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-500"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500"></div>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-slate-400 text-xs uppercase tracking-widest">Сумма вероятностей</span>
          <span className={`font-bold font-mono text-lg ${isValid ? 'text-amber-400' : 'text-slate-500'}`}>
            {totalProbability.toFixed(3)}
          </span>
        </div>
        <div className="relative w-full bg-slate-900/50 h-2 border border-amber-600/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(totalProbability * 100, 100)}%` }}
            className={`h-full ${
              isValid ? 'bg-gradient-to-r from-amber-600 to-amber-400' : 'bg-slate-600'
            }`}
          />
        </div>
      </div>

      <motion.button
        whileHover={!disabled ? { scale: 1.01 } : {}}
        whileTap={!disabled ? { scale: 0.99 } : {}}
        onClick={onClick}
        disabled={disabled}
        className={`relative w-full py-6 font-bold text-base uppercase tracking-widest transition-all ${
          disabled
            ? 'bg-slate-800/50 border-2 border-slate-700/50 text-slate-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-400 hover:to-amber-500 text-slate-900 border-2 border-amber-400'
        }`}
        style={{ fontFamily: 'serif' }}
      >
        {disabled ? 'Добавьте события' : 'Выбрать событие'}
      </motion.button>
    </div>
  );
}

