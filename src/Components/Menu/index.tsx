import Image from "next/image";
import React from "react";

const CafeMenu = () => {
  return (
    <div className="w-full max-w-7xl mx-auto pt-5 pb-5 px-4 sm:px-6 lg:px-8">
      {/* First Section - Coffee */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Image - Coffee setup with milk */}
        <div className="relative w-full">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-amber-50 to-stone-100 rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center p-6 rounded">
              <Image
                src="/16.jpg"
                alt="Space Cafe Bar "
                fill
                className="object-cover rounded"
              />
            </div>
          </div>
        </div>

        {/* Center - Coffee Menu */}
        <div className="flex flex-col justify-center px-4 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-light tracking-[0.3em] text-gray-800 mb-6 sm:mb-8 text-center">
            COFFEE
          </h2>
          <div className="space-y-6">
            {[
              { name: "Espresso", price: "$3" },
              { name: "Double Espresso", price: "$6" },
              { name: "Cappuccino", price: "$8" },
              { name: "Café Latte", price: "$10" },
              { name: "Vanilla Latte", price: "$14" },
              { name: "Americano", price: "$12" },
              { name: "Mocha Coffee", price: "$15" },
              { name: "Macchiato", price: "$16" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-sm sm:text-base"
              >
                <span className="text-gray-700">{item.name}</span>
                <span className="text-gray-800 font-medium">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image - Iced Coffee */}
        <div className="relative w-full">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/15.jpg"
                alt="Space Cafe Bar "
                fill
                className="object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Sweets Tea*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sweets Section */}
        <div>
          <h3 className="text-xl sm:text-2xl font-light tracking-[0.2em] text-gray-800 mb-4 sm:mb-6 text-center">
            SWEETS
          </h3>
          <div className="space-y-6 text-sm sm:text-base">
            {[
              { name: "Apple Pie", price: "$20" },
              { name: "Cannoli", price: "$12" },
              { name: "Carrot Cake", price: "$14" },
              { name: "Cheesecake", price: "$16" },
              { name: "Chocolate Cake", price: "$10" },
              { name: "Caramel Apple", price: "$17" },
              { name: "Coconut Cake", price: "$13" },
              { name: "Blueberry Muffin", price: "$14" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-800 font-medium">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Waffle Image */}
        <div className="flex items-center justify-center w-full">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden shadow-lg relative rounded-lg">
            <Image
              src="/14.jpg"
              alt="Space Cafe Bar "
              fill
              className="object-cover rounded"
            />
          </div>
        </div>

        {/* Tea Section */}
        <div>
          <h3 className="text-xl sm:text-2xl font-light tracking-[0.2em] text-gray-800 mb-4 sm:mb-6 text-center">
            TEA
          </h3>
          <div className="space-y-6 text-sm sm:text-base pb-3">
            {[
              { name: "Black tea", price: "$6" },
              { name: "Green tea", price: "$6" },
              { name: "Fruit tea", price: "$7" },
              { name: "White tea", price: "$8" },
              { name: "Ginger tea", price: "$5" },
              { name: "Mint tea", price: "$7" },
              { name: "Masala chai tea", price: "$6" },
              { name: "Matcha", price: "$7" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-800 font-medium">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Section - Smoothies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Image - Smoothie setup */}
        <div className="relative w-full">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center p-6 rounded">
              <Image
                src="/12.jpg"
                alt="Smoothie Left"
                fill
                className="object-cover rounded"
              />
            </div>
          </div>
        </div>

        {/* Center - Smoothie Menu */}
        <div className="flex flex-col justify-center px-4 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-light tracking-[0.3em] text-gray-800 mb-6 sm:mb-8 text-center">
            SMOOTHIES
          </h2>
          <div className="space-y-6">
            {[
              { name: "Strawberry Banana", price: "$8" },
              { name: "Mango Pineapple", price: "$9" },
              { name: "Mixed Berry", price: "$10" },
              { name: "Green Detox", price: "$11" },
              { name: "Peach Passion", price: "$9" },
              { name: "Chocolate Peanut Butter", price: "$12" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-sm sm:text-base"
              >
                <span className="text-gray-700">{item.name}</span>
                <span className="text-gray-800 font-medium">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image - Smoothie Glass */}
        <div className="relative w-full">
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/11.jpg"
                alt="Smoothie Right"
                fill
                className="object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeMenu;
