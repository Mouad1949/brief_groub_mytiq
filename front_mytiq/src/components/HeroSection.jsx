import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-[#f7f7f7] py-14 mt-[80px]">
      <div className="max-w-6xl mx-auto px-5">
        <h1 className="text-4xl font-bold text-black leading-tight">
          Discover <span className="text-[#0084c7]">Premium Events</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 mt-2 max-w-md">
          Browse and book tickets to the best conferences and workshops.
        </p>

      </div>
    </section>
  );
};

export default HeroSection;
