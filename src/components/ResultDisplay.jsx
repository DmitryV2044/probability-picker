import { motion, AnimatePresence } from 'framer-motion';

export default function ResultDisplay({ result }) {
  return (
    <AnimatePresence mode="wait">
      {result && (
        <motion.div
          key={result.id}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border-2 border-yellow-400/50 rounded-2xl p-6 text-center"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-3"
          >
            🎉
          </motion.div>
          <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">
            Результат
          </h3>
          <p className="text-white text-3xl font-bold mb-2">
            {result.name}
          </p>
          <p className="text-white/60">
            Вероятность: {(result.probability * 100).toFixed(1)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

