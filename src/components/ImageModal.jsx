import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageModal = ({ src, isOpen, onClose }) => {
  if (!src) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
        >
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            src={src} 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10 object-contain"
            onClick={(e) => e.stopPropagation()} 
          />
          <div className="absolute bottom-10 px-4 py-2 bg-white/10 rounded-full text-white/70 text-xs font-bold uppercase tracking-widest">
             Cliquez pour fermer
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
