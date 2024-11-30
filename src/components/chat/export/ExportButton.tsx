import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExportButtonProps {
  onClick: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
    title="Export chat history"
  >
    <Download className="w-5 h-5 text-white/90" />
  </motion.button>
);

export default ExportButton;