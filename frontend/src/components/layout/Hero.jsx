import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-block bg-blue-50 text-[#0052FF] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Trusted by 100K+ users worldwide
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Jump start your crypto portfolio
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:ml-0">
              The easiest place to buy, sell, and trade cryptocurrency. Sign up and get started today.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:ml-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0052FF] text-gray-900"
              />

              <Link
                to="/register"
                className="bg-[#0052FF] hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Get started
              </Link>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#0052FF] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-50 blur-2xl"></div>
              <img 
                src="https://images.ctfassets.net/o10es7wu5gm1/4lbSrfvF333XkPz7WycixQ/afbeefb68eab9405594b2e9bfbb9a152/Hero__4_.png" 
                alt="Crypto App" 
                className="relative w-full sm:max-w-[350px] md:max-w-[420px] rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;