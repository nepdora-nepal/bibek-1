const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "5000+", label: "Students Placed" },
  { value: "100+", label: "Partner Universities" },
  { value: "98%", label: "Visa Success Rate" },
];

const StatsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-primary/5 border-y-2 border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
