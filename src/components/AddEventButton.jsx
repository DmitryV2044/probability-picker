import { motion } from 'framer-motion';

export default function AddEventButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="relative w-full border-2 border-dashed border-amber-600/30 hover:border-amber-500/50 bg-slate-800/30 hover:bg-slate-800/50 p-5 text-slate-400 hover:text-amber-400 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
      style={{ fontFamily: 'serif' }}
    >
      <div className="w-6 h-6 border-2 border-current flex items-center justify-center">
        <div className="text-xl leading-none">+</div>
      </div>
      Добавить событие
    </motion.button>
  );
}

