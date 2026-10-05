export function BrandHero() {
  return (
    <section className="flex flex-col items-center justify-center py-4">
      <div className="relative flex items-center justify-center w-36 h-28">
        <div className="relative z-10 w-28 h-24 flex items-center justify-center" aria-hidden="true">
          <svg
            className="w-full h-full drop-shadow-lg"
            fill="none"
            viewBox="0 0 200 160"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              fill="#1e293b"
              points="100,20 185,55 100,90 15,55"
              stroke="#334155"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <polygon
              fill="#334155"
              opacity="0.5"
              points="100,20 185,55 100,65 15,55"
            />
            <path
              d="M50,70 L50,98 C50,118 150,118 150,98 L150,70"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="2"
            />
            <ellipse cx="100" cy="55" fill="#e2e8f0" rx="5" ry="3" />
            <path
              d="M100,55 Q135,70 145,95"
              fill="none"
              stroke="#f8fafc"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
            <path
              d="M145,95 L142,122 C142,125 150,125 150,122 L147,95 Z"
              fill="#f8fafc"
            />
            <g transform="translate(115, 60) rotate(22)">
              <rect
                fill="#fef08a"
                height="24"
                rx="6"
                stroke="#ca8a04"
                strokeWidth="2"
                width="48"
              />
              <line stroke="#facc15" strokeWidth="1.5" x1="8" x2="8" y1="4" y2="20" />
              <rect fill="#ef4444" height="24" width="7" x="22" />
              <path d="M22,24 L18,34 L25.5,30 L33,34 L29,24 Z" fill="#ef4444" />
            </g>
            <path
              d="M165,22 L168,12 L171,22 L181,25 L171,28 L168,38 L165,28 L155,25 Z"
              fill="#fbbf24"
            />
            <path
              d="M30,35 L32,27 L34,35 L42,37 L34,39 L32,47 L30,39 L22,37 Z"
              fill="#fbbf24"
              opacity="0.85"
            />
            <circle cx="185" cy="48" fill="#fde047" r="2.5" />
          </svg>
        </div>
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1 flex items-center gap-0.5">
        Mentor<span className="text-amber-300">.ia</span>
      </h2>
      <p className="text-xs sm:text-[13px] text-blue-100 font-medium text-center mt-1 max-w-[210px] leading-snug opacity-95">
        Tecnologia que entende como você aprende.
      </p>
    </section>
  );
}