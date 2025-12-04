import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full pt-0" style={{ backgroundColor: "#f8f8f8" }}>
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
        
        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-left text-black leading-tight">
          Discover <span className="text-[#0062BD]">Premium</span>{" "}
          <span className="text-[#00B1CA]">Events</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm md:text-base text-left mt-2 max-w-2xl">
          Browse and book tickets to the best conferences and workshops
        </p>

      </div>
    </section>
  );
};

export default HeroSection;