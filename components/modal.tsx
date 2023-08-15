
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  body: string;
}

export const Modal = ({ show, onClose, title, body }: ModalProps) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-indigo-700 p-6 rounded-lg shadow-md w-1/3">
        <div className="flex justify-between items-center">
          <h2 style={{color:'white'}} className="text-lg font-semibold mb-4 text-center w-full">{title}</h2>
          <IconButton aria-label="close" onClick={onClose} className="text-white">
            <CloseIcon />
          </IconButton>
        </div>
        <p className="text-lg text-white">{body}</p>
      </div>
    </div>
  );
};

