import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2 } from 'lucide-react';

export default function JobDeleteModal({ jobToDelete, onClose, onDelete }) {
  if (!jobToDelete) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-md bg-white border border-black/5 rounded-3xl shadow-xl overflow-hidden z-10">
          <div className="p-5 border-b border-gray-100 bg-red-50 flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-white border border-red-100 flex items-center justify-center text-red-500 shrink-0">
              <Trash2 className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-red-700 tracking-wider uppercase">
                Delete Confirmation
              </h3>
            </div>
          </div>

          <div className="p-5 space-y-3.5 text-left">
            <p className="text-xs font-semibold text-gray-600 leading-relaxed">
              Are you sure want to delete this position{' '}
              <span className="text-[#FF84BA] font-extrabold">
                "{jobToDelete.jobTitle}"
              </span>{' '}
              at{' '}
              <span className="text-[#FF84BA] font-extrabold">
                "{jobToDelete.company}"
              </span>
              ?
            </p>
            <p className="text-[10px] text-gray-400 font-bold tracking-wider bg-gray-50 p-3 rounded-xl border border-gray-100">
              This action will delete data permanently
            </p>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4.5 py-2 border border-black/5 text-gray-500 rounded-xl font-bold tracking-wider bg-white hover:bg-gray-50 text-[10px] cursor-pointer">
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete(jobToDelete._id || jobToDelete.id);
                onClose();
              }}
              className="px-4.5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold tracking-wider text-[10px] flex items-center gap-1.5 cursor-pointer">
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}