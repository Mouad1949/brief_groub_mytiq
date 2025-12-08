export default function DashboardHeader() {
  return (
   
    <div className="w-full bg-gradient-to-r from-indigo-50 to-orange-50 p-8 rounded-lg mb-6">
      
      <h1 className="text-3xl font-bold mb-2 text-left">
        <span className="text-[#311b92]">Admin</span>{' '}
        <span className="text-[#00bcd4]">Dashboard</span>
      </h1>

      <p className="text-gray-500 text-sm font-medium text-left">
        Manage and create events for your platform
      </p>
      
    </div>
  );
}