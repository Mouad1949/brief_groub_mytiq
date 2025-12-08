export default function Dashboard() {
  
  const cards = [
    {
      id: 1,
      title: "Events",
      count: 10,
      color: "bg-[#00bcd4]", 
      icon: <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    },
    {
      id: 2,
      title: "Tickets",
      count: 10,
      color: "bg-[#00695c]", 
      icon: <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46s-.81-2.77-2-3.46V6h16v2.54z" />
    },
    {
      id: 3,
      title: "Newsletter Subscribe",
      count: 10,
      color: "bg-[#00acc1]",
      icon: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    }
  ];

  return (
    <div className=" p-10 font-sans">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {cards.map((card) => (
          <div 
            key={card.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:-translate-y-1 transition-transform duration-200"
          >
            
            <div className={`${card.color} h-24 px-6 flex justify-between items-center text-white`}>
           
              <svg className="w-10 h-10 fill-current opacity-90" viewBox="0 0 24 24">
                {card.icon}
              </svg>
              <span className="text-4xl font-bold">
                {card.count}
              </span>
            </div>

            <div className="p-5">
              <h2 className="text-lg font-medium text-gray-800">
                {card.title}
              </h2>
            </div>
            
          </div>
        ))}

      </div>
    </div>
  );
}