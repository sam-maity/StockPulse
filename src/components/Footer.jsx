const Footer = () => {
  return (
    <footer className="mt-40 border-t border-white/10">

      <div className="max-w-6xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              StockPulse
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              AI powered market intelligence platform analyzing financial
              news with FinBERT to uncover sentiment, narrative signals,
              and emerging market themes.
            </p>
          </div>


          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-zinc-200">
              Platform
            </h4>

            <ul className="space-y-2 text-sm text-zinc-400">

              <li className="hover:text-purple-400 transition cursor-pointer">
                Sentiment Analysis
              </li>

              <li className="hover:text-purple-400 transition cursor-pointer">
                Hype Detection
              </li>

              <li className="hover:text-purple-400 transition cursor-pointer">
                Risk Scanner
              </li>

              <li className="hover:text-purple-400 transition cursor-pointer">
                Price Overview
              </li>

            </ul>
          </div>


          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-zinc-200">
              Information
            </h4>

            <ul className="space-y-2 text-sm text-zinc-400">

              <li className="hover:text-purple-400 transition cursor-pointer">
                About
              </li>

              <li className="hover:text-purple-400 transition cursor-pointer">
                Data Sources
              </li>

              <li className="hover:text-purple-400 transition cursor-pointer">
                Disclaimer
              </li>

            </ul>
          </div>

        </div>


        {/* bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} StockPulse. All rights reserved.
          </p>

          <p className="text-xs text-zinc-500 text-center md:text-right max-w-md">
            StockPulse provides AI assisted market insights for educational
            purposes only and does not constitute financial advice.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer