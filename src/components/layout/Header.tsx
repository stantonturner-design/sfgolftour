import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
{ to: "/leaderboard", label: "Leaderboard" },
{ to: "/events", label: "Events" },
{ to: "/players", label: "Players" },
{ to: "/news", label: "News" },
{ to: "/rules", label: "Rules" }];


const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <span className="font-display text-sm font-bold text-primary-foreground">SF</span>
          </div>
          <span className="text-lg font-bold text-foreground font-sans">
            San Francisco Golf Tour
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) =>
          <NavLink
            key={item.to}
            to={item.to}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeClassName="text-foreground bg-muted">
            
              {item.label}
            </NavLink>
          )}
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}>
          
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen &&
      <nav className="border-t bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) =>
          <NavLink
            key={item.to}
            to={item.to}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeClassName="text-foreground bg-muted"
            onClick={() => setMobileOpen(false)}>
            
                {item.label}
              </NavLink>
          )}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </nav>
      }
    </header>);

};

export default Header;