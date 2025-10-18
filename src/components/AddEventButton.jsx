import { motion } from 'framer-motion';

export default function AddEventButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/20 hover:border-white/40 rounded-xl p-4 text-white/60 hover:text-white/80 transition-all flex items-center justify-center gap-2 font-medium"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      Добавить событие
    </motion.button>
  );
}

