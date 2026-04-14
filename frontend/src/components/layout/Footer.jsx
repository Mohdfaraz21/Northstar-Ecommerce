const featureCards = [
  {
    icon: '🚚',
    title: 'Express Delivery',
    text: 'Ships in 24 Hours'
  },
  {
    icon: '🛡',
    title: 'Brand Warranty',
    text: '100% original products'
  },
  {
    icon: '🏷',
    title: 'Exciting Deals',
    text: 'Special offers across categories'
  },
  {
    icon: '💳',
    title: 'Secure Payments',
    text: 'SSL protected checkout'
  }
];

const footerColumns = [
  {
    title: 'Help',
    links: ['Track Order', 'FAQs', 'Cancel Order', 'Return Order', 'Warranty Info']
  },
  {
    title: 'Policies',
    links: ['Return Policy', 'Security', 'Sitemap', 'Privacy Policy', 'Terms & Conditions']
  },
  {
    title: 'Company',
    links: ['About Us', 'Contact Us', 'Service Centres', 'Careers', 'Affiliates']
  }
];

function Footer() {
  return (
    <footer className="mt-16 bg-black text-white">
      <div className="container-page py-10">
        <div className="grid gap-4 lg:grid-cols-4">
          {featureCards.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-[#101010] px-6 py-5 shadow-xl shadow-black/20"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-3xl">
                  <span role="img" aria-label={item.title}>
                    {item.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-10 rounded-[2rem] border border-white/10 bg-[#111111] px-6 py-10 md:grid-cols-[1.1fr_1.9fr] md:px-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-100">Northstar Commerce</p>
            <h2 className="max-w-md text-3xl font-black leading-tight text-white">
              Shop smarter with a smooth experience built for every device.
            </h2>
            <p className="max-w-md text-sm leading-7 text-slate-300">
              Discover trusted products, clean shopping flows, responsive layouts, and a storefront designed to feel premium from homepage to checkout.
            </p>
            <p className="text-base font-semibold text-white">
              made with <span role="img" aria-label="love">💖</span> and developed by Mohd Faraz
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-2xl font-black text-white">{column.title}</h3>
                <div className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <p key={link} className="text-sm font-medium text-slate-300 transition hover:text-white">
                      {link}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-base font-semibold text-white">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
            <span>Terms Of Use</span>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            © 2026 Northstar Commerce. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
