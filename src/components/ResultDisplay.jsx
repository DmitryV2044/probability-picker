import { motion, AnimatePresence } from 'framer-motion';

export default function ResultDisplay({ result }) {
  return (
    <AnimatePresence mode="wait">
      {result && (
        <motion.div
          key={result.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative border-2 border-amber-500 bg-gradient-to-br from-amber-900/20 to-slate-900/50 p-8 text-center mt-6"
        >
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-amber-400"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-amber-400"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-amber-400"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-amber-400"></div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-4"
          >
            <div className="w-16 h-16 mx-auto border-4 border-amber-500 flex items-center justify-center">
              <div className="w-8 h-8 bg-amber-500 rotate-45"></div>
            </div>
          </motion.div>
          
          <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-3">
            Результат выбора
          </h3>
          <p className="text-amber-300 text-4xl font-bold mb-3 uppercase tracking-wide" style={{ fontFamily: 'serif' }}>
            {result.name}
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-600"></div>
            <p className="text-slate-400 text-sm font-mono">
              {(result.probability * 100).toFixed(1)}%
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-600"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

