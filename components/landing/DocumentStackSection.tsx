"use client";

export default function DocumentStackSection() {
  return (
    <section className="w-full bg-[#fafafa] py-16 grid-background">
      <div className="max-w-4xl mx-auto px-6 flex justify-center">
        <div className="relative" style={{ perspective: '1000px' }}>
          <div className="relative w-80 h-48">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute bg-white border border-gray-200 rounded shadow-sm"
                style={{
                  width: '280px',
                  height: '180px',
                  transform: `rotateX(60deg) rotateZ(-45deg) translateZ(${i * 12}px)`,
                  transformStyle: 'preserve-3d',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-140px',
                  marginTop: '-90px',
                }}
              >
                <div className="p-4 h-full">
                  <div className="grid grid-cols-6 gap-1 h-full opacity-30">
                    {Array.from({ length: 30 }).map((_, j) => (
                      <div key={j} className="bg-gray-300 rounded-sm" />
                    ))}
                  </div>
                </div>
                {i === 4 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-sm opacity-60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
