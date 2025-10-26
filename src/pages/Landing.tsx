import { Link } from "react-router-dom";

const features = [
  {
    title: "Fast Ticket Management",
    desc: "Create, view, and resolve tickets instantly with a smooth, intuitive interface.",
    icon: "📨",
  },
  {
    title: "Secure & Reliable",
    desc: "All your data is encrypted and stored safely, accessible anytime you need it.",
    icon: "🔒",
  },
  {
    title: "Real-time Updates",
    desc: "Stay on top of every task and ticket with instant synchronization across devices.",
    icon: "⚡",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-700 relative overflow-hidden flex flex-col items-center">
      {/* hero section */}
      <section className="relative w-full flex flex-col items-center justify-center text-center py-24 px-6 md:py-32 md:px-8">
        {/* Decorative circles that blend with background */}
        <div className="hidden md:block absolute top-16 left-10 w-40 h-40 bg-white rounded-full blur-3xl z-0"></div>
        <div className="hidden md:block absolute top-1/3 right-20 w-40 h-52 bg-white rounded-full blur-3xl z-0"></div>

        {/* Hero content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-6">
            Kendall Manager Pro
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 leading-relaxed">
            Streamline your workflow, manage tickets seamlessly, and keep your
            entire support process organized. Kendall Manager Pro empowers teams
            to stay efficient, responsive, and ahead all from one elegant
            dashboard.
          </p>
          <div className="flex gap-6 mt-4 flex-wrap justify-center">
            <Link
              to="/auth/signup"
              className="px-6 py-3 bg-white text-blue-700 font-bold rounded-lg shadow hover:bg-blue-800 transition">
              Get Started
            </Link>
          </div>
        </div>

        {/* Wavy SVG background at the bottom of hero */}
        <svg
          className="absolute bottom-0 left-0 w-full h-40 md:h-56"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none">
          <path
            fill="#ffffff"
            fillOpacity="0.6"
            d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,181.3C672,192,768,192,864,176C960,160,1056,128,1152,138.7C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </section>

      {/* feature section*/}
      <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-20 px-6 bg-white relative z-10">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-blue-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Landing;
