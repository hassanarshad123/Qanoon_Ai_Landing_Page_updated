"use client";

export default function LogosSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-gray-200 pt-16">
          <p className="text-center text-gray-500 text-base mb-12">
            Empowering Pakistan&apos;s legal ecosystem — from{" "}
            <span className="text-[#A21CAF] font-medium">district courts</span>{" "}
            to the Supreme Court.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight">
              Supreme Court of Pakistan
            </div>

            <div className="text-lg md:text-xl font-semibold text-[#0E7490] tracking-tight">
              High Courts
            </div>

            <div className="text-lg md:text-xl font-semibold text-gray-700 tracking-tight">
              120,000+ Lawyers
            </div>

            <div className="text-lg md:text-xl font-semibold text-gray-700 tracking-tight">
              5,000+ Judges
            </div>

            <div className="text-lg md:text-xl font-semibold text-[#A21CAF] tracking-tight">
              220M+ Citizens
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
