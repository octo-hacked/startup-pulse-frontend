const StatsSection = () => {
  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <p className="text-white text-4xl font-bold mb-2">90%</p>
            <p className="text-blue-100">Funding Success Rate</p>
          </div>
          <div className="p-4">
            <p className="text-white text-4xl font-bold mb-2">200+</p>
            <p className="text-blue-100">Startups Accelerated</p>
          </div>
          <div className="p-4">
            <p className="text-white text-4xl font-bold mb-2">₹100M+</p>
            <p className="text-blue-100">Funding Secured</p>
          </div>
          <div className="p-4">
            <p className="text-white text-4xl font-bold mb-2">50+</p>
            <p className="text-blue-100">Expert Mentors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
