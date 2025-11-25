import React, { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ value, prefix = '$', suffix = '', duration = 1500 }) => {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    const end = Number(String(value).replace(/[^0-9.-]+/g, '')) || 0;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const current = Math.floor(progress * end);
      if (el) el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else if (el) el.textContent = prefix + end.toLocaleString() + suffix;
    };

    requestAnimationFrame(step);
  }, [value, prefix, suffix, duration]);

  return <div ref={ref} className="counter text-2xl md:text-3xl" />;
};

/* ------------------ LIVE ACTIVITY HELPERS ------------------ */

const countries = [
  '🇺🇸', '🇨🇦', '🇬🇧', '🇦🇺', '🇩🇪', '🇫🇷',
  '🇮🇹', '🇧🇷', '🇸🇦', '🇯🇵', '🇸🇬', '🇦🇪',
];

const depositAmounts = ['$100 BTC', '$200 BTC', '$500 BTC', '$1,000 BTC', '$5,000 BTC'];
const withdrawalAmounts = [
  '$50 BTC', '$100 BTC', '$150 BTC', '$300 BTC',
  '$500 BTC', '$1,000 BTC', '$2,000 BTC', '$5,000 BTC',
];

const randomEmail = () => {
  const names = ['crypto', 'shark', 'invest', 'trade', 'alpha', 'btc', 'profit', 'boost', 'moon', 'flash', 'elite'];
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'proton.me'];

  const name = names[Math.floor(Math.random() * names.length)];
  const digits = Math.floor(100 + Math.random() * 900);
  const domain = domains[Math.floor(Math.random() * domains.length)];

  return `${name[0]}***${digits}@${domain}`;
};

const generateDeposit = () => {
  const amount = depositAmounts[Math.floor(Math.random() * depositAmounts.length)];
  return {
    email: randomEmail(),
    country: countries[Math.floor(Math.random() * countries.length)],
    amount,
    glow: amount === '$5,000 BTC',
  };
};

const generateWithdrawal = () => {
  const amount = withdrawalAmounts[Math.floor(Math.random() * withdrawalAmounts.length)];
  return {
    email: randomEmail(),
    country: countries[Math.floor(Math.random() * countries.length)],
    amount,
    glow: amount === '$5,000 BTC' || amount === '$2,000 BTC',
  };
};

const DepositFeed = ({ interval = 3000 }) => {
  const [deposits, setDeposits] = useState(() =>
    Array.from({ length: 20 }, () => generateDeposit())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDeposits((prev) => {
        const next = generateDeposit();
        return [next, ...prev].slice(0, 20);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-4 overflow-hidden h-48">
      <div className="flex flex-col gap-1 text-sm">
        {deposits.map((d, i) => (
          <div
            key={i}
            className={`flex justify-between py-1 px-2 border-b border-gray-900 ${
              d.glow
                ? 'text-gold font-semibold drop-shadow-[0_0_8px_rgba(183,155,76,0.8)]'
                : 'text-gray-300'
            }`}
          >
            <span>
              {d.country} {d.email}
            </span>
            <span>{d.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const WithdrawalFeed = ({ interval = 5000 }) => {
  const [withdrawals, setWithdrawals] = useState(() =>
    Array.from({ length: 15 }, () => generateWithdrawal())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setWithdrawals((prev) => {
        const next = generateWithdrawal();
        return [next, ...prev].slice(0, 15);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-4 overflow-hidden h-48">
      <div className="flex flex-col gap-1 text-sm">
        {withdrawals.map((w, i) => (
          <div
            key={i}
            className={`flex justify-between py-1 px-2 border-b border-gray-900 ${
              w.glow
                ? 'text-red-400 font-semibold drop-shadow-[0_0_8px_rgba(255,50,50,0.9)]'
                : 'text-gray-300'
            }`}
          >
            <span>
              {w.country} {w.email}
            </span>
            <span>-{w.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------ MAIN COMPONENT ------------------ */

export default function CryptoSharkLanding() {
  const stats = { funds: 367000, profits: 411767, investors: 1866 };

  const [dailyCount, setDailyCount] = useState(
    () => 80 + Math.floor(Math.random() * 40) // random base for "today"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDailyCount((c) => c + 1);
    }, 3000); // matches deposit interval
    return () => clearInterval(interval);
  }, []);

  const team = [
  { name: 'Nadia Cherkasova', role: 'Head of Trading', img: '/images/team/team3.png' },
  { name: 'Bdtayev Valery', role: 'Lead Quant', img: '/images/team/team4.png' },
  { name: 'Nikita Shilenko', role: 'AI Architect', img: '/images/team/team5.png' },
  { name: 'Oleg Gaidukov', role: 'Risk Manager', img: '/images/team/team6.png' },
];


  const reviews = [
    {
      img: '/images/reviews/review1.png',
      name: 'Daniel R.',
      country: 'UK',
      text: 'I started investing before launch and the weekly profit updates are incredible. The AI bot is a beast.',
    },
    {
      img: '/images/reviews/review2.png',
      name: 'Sophia M.',
      country: 'Canada',
      text: 'CryptoShark is the first project where I actually saw returns BEFORE token launch. Legendary.',
    },
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* HEADER */}
      <header className="py-6 header">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Whale eating BTC logo */}
            <img
              src="/images/whale-logo.png"
              alt="CryptoShark"
              className="h-24 object-contain"
            />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-gray-300">
            <a href="#features">Why SHRK</a>
            <a href="#tokenomics">Tokenomics</a>
            <a href="#team">Team</a>
            <a
              href="https://crypto-sharks.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 btn-gold rounded-md"
            >
              Buy SHRK
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4 inline-block">
                <div className="px-4 py-2 rounded-md text-xs font-semibold text-white bg-black border border-gray-800">
                  LAUNCH: March 8, 2026
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  Early investors can deposit BTC now — profits start immediately and
                  are injected into SHRK at launch.
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-6">
                CryptoShark (SHRK)
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-xl">
                A high-performance token backed by an AI trading bot — early investors
                deposit BTC, the bot trades it, and profits are injected into SHRK’s
                market cap at launch.
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href="https://crypto-sharks.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 btn-gold font-semibold rounded-md"
                >
                  Invest Now
                </a>
                <a
                  href="/whitepaper.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-gray-800 text-gray-300 rounded-md"
                >
                  Whitepaper
                </a>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-gray-400 flex-wrap">
                <div className="stat-label">AI trading live 24/7</div>
                <div className="stat-label">Profits injected into SHRK at launch</div>
                <div className="stat-label">Investors earn before token launch</div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                <div className="bg-[#070707] p-4 rounded-lg text-center">
                  <div className="text-sm stat-label">Managed Funds</div>
                  <AnimatedCounter value={stats.funds} />
                </div>
                <div className="bg-[#070707] p-4 rounded-lg text-center">
                  <div className="text-sm stat-label">Profits This Year</div>
                  <AnimatedCounter value={stats.profits} />
                </div>
                <div className="bg-[#070707] p-4 rounded-lg text-center">
                  <div className="text-sm stat-label">Investors</div>
                  <AnimatedCounter value={stats.investors} prefix="" />
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-2xl p-6 bg-gradient-to-br from-[#0b0b0b] to-[#060606] border border-[#111111]">
                <div
                  className="relative overflow-hidden rounded-xl"
                  style={{ height: '360px' }}
                >
                  <svg
                    className="w-full h-full hero-chart"
                    viewBox="0 0 800 360"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="800" height="360" fill="#050505" />
                    <path
                      d="M30 320 L120 240 L210 280 L300 200 L390 230 L480 160 L570 190 L660 140 L750 180"
                      stroke="#b79b4c"
                      strokeWidth="4"
                      fill="none"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="1000"
                        to="0"
                        dur="2s"
                        fill="freeze"
                      />
                    </path>
                    <g transform="translate(520,60)">
                      <circle cx="60" cy="60" r="60" fill="#b79b4c" />
                      <circle cx="60" cy="60" r="42" fill="#050505" />
                      <text
                        x="60"
                        y="70"
                        textAnchor="middle"
                        fill="#b79b4c"
                        fontSize="20"
                        fontWeight="700"
                      >
                        SHRK
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="mt-4 text-gray-300 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400">Market Cap (target)</div>
                    <div className="text-xl font-semibold text-white">$1,200,000</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Live Bot Profit (24h)</div>
                    <div className="text-xl font-semibold text-white">$15,432</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-16">
          <div className="container mx-auto px-6">
            <h3 className="text-2xl font-bold text-white mb-6">Why CryptoShark</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#070707] p-6 rounded-xl text-center">
                <div className="text-3xl text-gold mb-4">🤖</div>
                <h4 className="font-semibold text-white">AI Bot Trading</h4>
                <p className="mt-2 text-sm text-gray-400">
                  Proprietary AI strategies execute trades 24/7 on BTC deposited by
                  early investors.
                </p>
              </div>
              <div className="bg-[#070707] p-6 rounded-xl text-center">
                <div className="text-3xl text-gold mb-4">📈</div>
                <h4 className="font-semibold text-white">Profits Before Launch</h4>
                <p className="mt-2 text-sm text-gray-400">
                  Investors can earn trading profits even before SHRK is live — those
                  profits are injected into the token at launch.
                </p>
              </div>
              <div className="bg-[#070707] p-6 rounded-xl text-center">
                <div className="text-3xl text-gold mb-4">🔒</div>
                <h4 className="font-semibold text-white">Transparency &amp; Security</h4>
                <p className="mt-2 text-sm text-gray-400">
                  On-chain audits, performance dashboards, and transparent reporting of
                  managed funds, profits, and investor counts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE ACTIVITY FEEDS (between FEATURES & TOKENOMICS) */}
        <section className="py-12 bg-black border-y border-[#111111]">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">Live Activity</h3>
              <span className="flex items-center gap-1 text-red-500 font-bold text-sm animate-pulse">
                🔴 LIVE
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Real-time deposits and withdrawals flowing through the CryptoShark AI trading engine.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg text-gold font-semibold">Live Deposits</h4>
                  <span className="text-gray-400 text-xs">
                    Deposits today:{' '}
                    <span className="text-gold font-semibold">
                      {dailyCount.toLocaleString()}
                    </span>
                  </span>
                </div>
                <DepositFeed interval={3000} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg text-red-400 font-semibold">Live Withdrawals</h4>
                  <span className="text-gray-500 text-xs">Updated in real-time</span>
                </div>
                <WithdrawalFeed interval={5000} />
              </div>
            </div>
          </div>
        </section>

        {/* TOKENOMICS */}
        <section id="tokenomics" className="py-12 bg-[#050505]">
          <div className="container mx-auto px-6">
            <h3 className="text-2xl font-bold text-white mb-6">Tokenomics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-gradient-to-tr from-[#0e0e0e] to-[#080808] p-6 rounded-xl border border-[#121212]">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-gray-400">Total Supply</div>
                      <div className="text-xl font-semibold text-white">
                        1,000,000,000 SHRK
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">ICO Price</div>
                      <div className="text-xl font-semibold text-white">0.02 USD</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Allocation: Product 30% · Marketing 20% · Biz Dev 18% · Legal 14% ·
                    Ops 8% · Partners 6% · Contingency 4%. Early investor BTC profits are
                    injected into liquidity and market cap at launch.
                  </p>
                </div>
              </div>
              <div>
                <div className="rounded-xl p-6 bg-gradient-to-br from-[#0b0b0b] to-[#060606] border border-[#111111]">
                  <div className="text-sm text-gray-400">Raised so far</div>
                  <div className="mt-3 text-3xl font-bold text-white">
                    Ξ 12,345 · ₿ 678
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Headline metrics: $367,000 managed funds, $411,767 trading profits
                    this year, 1,866 investors.
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Live Stats</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#070707] p-4 rounded-lg text-center">
                  <div className="text-sm stat-label">Managed Funds</div>
                  <AnimatedCounter value={stats.funds} />
                </div>
                <div className="bg-[#070707] p-4 rounded-lg text-center">
                  <div className="text-sm stat-label">Profits This Year</div>
                  <AnimatedCounter value={stats.profits} />
                </div>
                <div className="bg-[#070707] p-4 rounded-lg text-center">
                  <div className="text-sm stat-label">Investors</div>
                  <AnimatedCounter value={stats.investors} prefix="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section id="team" className="py-16">
          <div className="container mx-auto px-6">
            <h3 className="text-2xl font-bold text-white mb-6">Meet the Team</h3>
            <p className="text-sm text-gray-400 mb-6">
              Core team and advisors backed by the CryptoShark AI trading stack.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {team.map((m, i) => (
                <div
                  key={i}
                  className="bg-[#070707] border border-[#151515] rounded-xl p-4 text-center"
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className="mx-auto w-28 h-28 rounded-full object-cover mb-3 border border-[#b79b4c]/40"
                  />
                  <div className="text-white font-semibold text-sm">{m.name}</div>
                  <div className="text-xs text-gray-400">{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>


      </main>

      {/* FOOTER */}
      <footer className="py-10 bg-black">
        <div className="container mx-auto px-6 text-gray-400">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            <div>
              <img
                src="/images/whale-logo.png"
                alt="CryptoShark"
                className="h-20 object-contain"
              />
              <p className="mt-4 text-sm text-gray-500">
                © CryptoShark. All rights reserved.
                <br />
                Contact:{' '}
                <a href="mailto:support@crypto-sharks.com" className="text-gold">
                  support@crypto-sharks.com
                </a>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h5 className="text-white font-semibold">Company</h5>
                <ul className="mt-3 text-sm text-gray-400">
                  <li>About</li>
                  <li>Team</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold">Resources</h5>
                <ul className="mt-3 text-sm text-gray-400">
                  <li>Whitepaper</li>
                  <li>Tech Paper</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
