import { motion } from 'framer-motion';

export default function EventItem({ event, onUpdate, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 hover:bg-white/15 transition-all"
    >
      <div className="flex-1">
        <input
          type="text"
          value={event.name}
          onChange={(e) => onUpdate(event.id, { name: e.target.value })}
          placeholder="Название события"
          className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-white/40 font-medium"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={event.probability}
          onChange={(e) => onUpdate(event.id, { probability: parseFloat(e.target.value) || 0 })}
          step="0.01"
          min="0"
          max="1"
          className="w-24 bg-white/10 rounded-lg px-3 py-2 text-white text-center outline-none focus:ring-2 focus:ring-purple-400 transition-all"
        />
        <span className="text-white/60 text-sm">({(event.probability * 100).toFixed(0)}%)</span>
      </div>

      <button
        onClick={() => onDelete(event.id)}
        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </motion.div>
  );
}

