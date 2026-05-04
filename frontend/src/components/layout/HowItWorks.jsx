import { Link } from 'react-router-dom'

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create your account',
      description: 'Sign up with your email and verify your identity in minutes.'
    },
    {
      number: '02',
      title: 'Add payment method',
      description: 'Link your bank account or debit card to fund your account.'
    },
    {
      number: '03',
      title: 'Start trading',
      description: 'Buy crypto instantly and manage your portfolio from anywhere.'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/register"
            className="inline-block bg-[#0052FF] hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks