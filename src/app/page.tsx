import {JSX} from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

const HomePage: () => JSX.Element = () => {
  return (
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-sky-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                Welcome to Perspectrix
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Explore, visualize, and analyze your data with our interactive mapping tools
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link href="/map">
                    <Button variant="primary" className="w-full">
                      Open Map
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/upload">
                    <Button variant="secondary" className="w-full">
                      Upload Data
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Interactive Mapping */}
              <div className="p-6 bg-sky-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900">Interactive Mapping</h3>
                <p className="mt-2 text-gray-600">
                  Visualize your data geographically with our interactive mapping tools.
                </p>
              </div>

              {/* Data Analysis */}
              <div className="p-6 bg-sky-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900">Data Analysis</h3>
                <p className="mt-2 text-gray-600">
                  Generate comprehensive reports and gain insights from your uploaded data.
                </p>
              </div>

              {/* Search Capabilities */}
              <div className="p-6 bg-sky-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900">Search Capabilities</h3>
                <p className="mt-2 text-gray-600">
                  Quickly find and access your data with our powerful search functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-sky-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Begin exploring your data today with our interactive tools.
              </p>
              <div className="mt-6">
                <Link href="/map">
                  <Button variant="primary">
                    Start Exploring
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
};

export default HomePage;
