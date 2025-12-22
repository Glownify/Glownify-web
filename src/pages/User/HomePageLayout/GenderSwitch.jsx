export const GenderSwitch = ({ gender, setGender }) => {
  return (
    <div className="flex justify-center mt-12">
      <div className="flex p-1.5 bg-slate-100 rounded-[2rem] border border-slate-200 shadow-inner">
        {['women', 'men'].map((tab) => (
          <button
            key={tab}
            onClick={() => setGender(tab)}
            className={`px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              gender === tab
                ? 'bg-white text-rose-600 shadow-md'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};
