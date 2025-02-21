import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
export default function Cover({ cover }) {
  const navigate = useNavigate();
  return (
    <div>
      {cover && (
        <div className="flex justify-between bg-[url('/public/assets/soothing.jpeg')] bg-cover bg-center h-screen absolute inset-0">
          <div className="flex items-center justify-center flex-col w-full h-full gap-8">
            <h1 className="text-black/80 font-bold font-exo text-7xl text-center">
              Free AI Text Processor
            </h1>
            <p className=" font-normal text-black/80 text-[24px] font-sans-serif text-center">
              Summarize and translate texts now.
            </p>

            <button
              className="text-black rounded-full py-4 px-6 text-[24px] border cursor-pointer hover:bg-black/70 hover:text-white hover:border-none"
              onClick={() => navigate('/processor')}
            >
              Get Started for free
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
