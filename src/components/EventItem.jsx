import { motion } from 'framer-motion';

export default function EventItem({ event, onUpdate, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="relative border border-amber-600/20 bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-5 flex items-center gap-4 hover:border-amber-500/40 transition-all group"
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex-1">
        <input
          type="text"
          value={event.name}
          onChange={(e) => onUpdate(event.id, { name: e.target.value })}
          placeholder="Название события"
          className="w-full bg-transparent border-none outline-none text-amber-100 text-base placeholder-slate-500 uppercase tracking-wide"
          style={{ fontFamily: 'serif' }}
        />
      </div>
      
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={event.probability}
          onChange={(e) => onUpdate(event.id, { probability: parseFloat(e.target.value) || 0 })}
          step="0.01"
          min="0"
          max="1"
          className="w-24 bg-slate-900/50 border border-amber-600/30 px-3 py-2 text-amber-400 text-center outline-none focus:border-amber-500 transition-all"
        />
        <span className="text-slate-500 text-sm font-mono w-12 text-right">
          {(event.probability * 100).toFixed(0)}%
        </span>
      </div>

      <button
        onClick={() => onDelete(event.id)}
        className="text-slate-500 hover:text-amber-500 p-2 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </motion.div>
  );
}

