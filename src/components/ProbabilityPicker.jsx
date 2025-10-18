import { motion } from 'framer-motion';

export default function ProbabilityPicker({ onClick, disabled, totalProbability }) {
  const isValid = Math.abs(totalProbability - 1) < 0.001;

  return (
    <div className="space-y-3">
      <div className="bg-white/5 rounded-xl p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/60 text-sm">Сумма вероятностей</span>
          <span className={`font-bold ${isValid ? 'text-green-400' : 'text-red-400'}`}>
            {totalProbability.toFixed(3)}
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(totalProbability * 100, 100)}%` }}
            className={`h-full rounded-full ${
              isValid ? 'bg-green-400' : totalProbability > 1 ? 'bg-red-400' : 'bg-yellow-400'
            }`}
          />
        </div>
      </div>

      <motion.button
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={onClick}
        disabled={disabled}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          disabled
            ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {disabled ? 'Добавьте события' : '🎲 Выбрать случайное событие'}
      </motion.button>
    </div>
  );
}

