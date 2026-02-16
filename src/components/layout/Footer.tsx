import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-bold">San Francisco Golf Tour</h3>
            <p className="mt-2 text-sm opacity-80">
              Competitive amateur golf in the heart of San Francisco.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider opacity-70">
              Quick Links
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              <Link to="/events" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                Event Schedule
              </Link>
              <Link to="/leaderboard" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                Leaderboard
              </Link>
              <Link to="/news" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                News
              </Link>
              <Link to="/rules" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                Tour Rules
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider opacity-70">
              Get Involved
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              <Link to="/signup" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                Join the Tour
              </Link>
              <Link to="/login" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                Member Login
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-secondary-foreground/20 pt-6 text-center text-xs opacity-60">
          © {new Date().getFullYear()} San Francisco Golf Tour. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
