import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Target,
  User,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
}

interface EducationItem {
  degree: string;
  status: string;
  institution: string;
  location: string;
  year: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface ContactLink {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  hint: string;
  dataOcid: string;
  href?: string;
  action?: () => void;
}

// ── Data ───────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Goals", href: "#goals" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const CORE_STRENGTHS = [
  {
    label: "Teamwork",
    desc: "Collaborates effectively across teams and projects",
  },
  {
    label: "Consistency",
    desc: "Shows up every day and builds momentum through habit",
  },
  {
    label: "Adaptability",
    desc: "Embraces challenges and pivots thoughtfully",
  },
  {
    label: "Strong willingness to improve",
    desc: "Actively seeks feedback and grows through every experience",
  },
];

const TECH_SKILLS = [
  { name: "C Programming", level: "Proficient" },
  { name: "Python", level: "Learning", note: "Currently Learning" },
  { name: "Programming Fundamentals", level: "Proficient" },
  { name: "Problem Solving", level: "Beginner", note: "Beginner Level" },
];

const GOALS = [
  "Build real-world software projects",
  "Strengthen core Computer Science fundamentals",
  "Improve problem-solving and coding skills",
  "Prepare for internships and software opportunities",
];

const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    status: "Pursuing",
    institution: "Indira College of Engineering and Management",
    location: "Pune, Maharashtra",
    year: "2024 – Present",
    icon: GraduationCap,
  },
  {
    degree: "Higher Secondary Certificate (12th Grade)",
    status: "Completed",
    institution: "Dayanand College of Arts and Science",
    location: "Solapur, Maharashtra",
    year: "2023 – 2024",
    icon: GraduationCap,
  },
  {
    degree: "Secondary School Certificate (10th Grade)",
    status: "Completed",
    institution: "Shri Siddheshwar Bal Mandir High School",
    location: "Solapur, Maharashtra",
    year: "2021 – 2022",
    icon: GraduationCap,
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Proficient: "text-primary border-primary/40 bg-primary/10",
  Learning: "text-muted-foreground border-border bg-muted/50",
  Beginner: "text-muted-foreground border-border bg-muted/30",
};

// ── Header ─────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => n.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      data-ocid="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled
          ? "bg-card/90 backdrop-blur-md border-b border-border shadow-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollTo("#hero")}
          className="font-display font-bold text-lg tracking-tight text-foreground hover:text-primary transition-colors-smooth focus-ring rounded"
          data-ocid="nav-logo"
        >
          AG<span className="text-primary">.</span>
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.href}
              onClick={() => scrollTo(item.href)}
              data-ocid={`nav-link-${item.label.toLowerCase()}`}
              className={`nav-link ${activeSection === item.href.replace("#", "") ? "nav-link-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => scrollTo("#contact")}
          className="hidden md:inline-flex"
        >
          <Button
            size="sm"
            data-ocid="nav-cta"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-medium"
          >
            Contact Me
          </Button>
        </button>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden text-foreground focus-ring rounded p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          data-ocid="nav-mobile-toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <nav
              className="container mx-auto px-6 py-4 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`text-left py-2.5 px-2 rounded text-sm font-medium transition-colors-smooth ${
                    activeSection === item.href.replace("#", "")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className="mt-2 w-full"
                data-ocid="nav-mobile-cta"
              >
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Contact Me
                </Button>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────
function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-abstract.dim_1400x700.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.70 0.22 230 / 0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.05 0 0))",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-section-label mb-6">Portfolio</p>
          <h1 className="text-hero text-foreground glow-text mb-6">
            Amrut
            <br />
            <span className="text-primary">Gubyad</span>
          </h1>
          <p className="text-xl md:text-2xl font-display font-medium text-muted-foreground mb-4 max-w-lg mx-auto">
            Aspiring Software Developer
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            Building a disciplined future in software, one step at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Button
                size="lg"
                data-ocid="hero-cta-contact"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow transition-smooth font-semibold px-8"
              >
                Contact Me
              </Button>
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Button
                size="lg"
                variant="outline"
                data-ocid="hero-cta-about"
                className="border-border hover:border-primary text-foreground hover:text-primary transition-smooth px-8"
              >
                Learn More
              </Button>
            </button>
          </div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={scrollToAbout}
        aria-label="Scroll to about section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors-smooth focus-ring rounded"
        data-ocid="hero-scroll-hint"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </button>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <User size={16} className="text-primary" />
            <p className="text-section-label">About Me</p>
          </div>
          <div className="section-divider" />
          <h2 className="text-heading text-foreground mb-8 max-w-2xl">
            A developer in the making, driven by discipline and direction.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
            <div className="flex flex-col gap-4">
              <p className="text-base">
                I am a first-year Computer Science student at{" "}
                <span className="text-foreground font-medium">
                  Indira College of Engineering and Management, Pune
                </span>
                .
              </p>
              <p className="text-base">
                My journey into software development is built on discipline,
                consistency, and a strong sense of direction. While my path is
                not traditional, it has shaped my approach to learning and
                problem-solving with focus and structure.
              </p>
            </div>
            <p className="text-base">
              I am currently strengthening my foundation in programming and
              problem solving, with a clear goal of growing into a{" "}
              <span className="text-foreground font-medium">
                skilled and reliable software developer
              </span>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────────
function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Wrench size={16} className="text-primary" />
            <p className="text-section-label">Skills</p>
          </div>
          <div className="section-divider" />
          <h2 className="text-heading text-foreground mb-12">
            What I bring to the table.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Core Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-primary inline-block" />
              Core Strengths
            </h3>
            <div
              className="flex flex-col gap-3"
              data-ocid="skills-strengths-list"
            >
              {CORE_STRENGTHS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="card-glass flex items-start gap-4"
                >
                  <span className="mt-0.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {s.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-primary inline-block" />
              Technical Skills
            </h3>
            <div
              className="flex flex-wrap gap-2.5"
              data-ocid="skills-tech-list"
            >
              {TECH_SKILLS.map((skill) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className={`skill-tag border text-xs ${LEVEL_COLORS[skill.level]}`}
                    data-ocid={`skill-tag-${skill.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {skill.name}
                    <Badge
                      variant="outline"
                      className="ml-2 text-[10px] py-0 px-1.5 font-normal border-current opacity-70"
                    >
                      {skill.note ?? skill.level}
                    </Badge>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Goals ──────────────────────────────────────────────────────────
function GoalsSection() {
  return (
    <section id="goals" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Target size={16} className="text-primary" />
            <p className="text-section-label">Goals</p>
          </div>
          <div className="section-divider" />
          <h2 className="text-heading text-foreground mb-12">
            Where I'm headed.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4" data-ocid="goals-list">
          {GOALS.map((goal, i) => (
            <motion.div
              key={goal}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass flex items-start gap-5 group"
            >
              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded border border-border group-hover:border-primary transition-smooth flex items-center justify-center">
                <span className="text-xs font-bold text-primary font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors-smooth">
                {goal}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Education ──────────────────────────────────────────────────────
function EducationSection() {
  return (
    <section id="education" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap size={16} className="text-primary" />
            <p className="text-section-label">Education</p>
          </div>
          <div className="section-divider" />
          <h2 className="text-heading text-foreground mb-12">
            Academic background.
          </h2>
        </motion.div>

        <div
          className="relative flex flex-col gap-0"
          data-ocid="education-list"
        >
          {/* Timeline line */}
          <div
            className="absolute left-[11px] top-3 bottom-3 w-px bg-border"
            aria-hidden="true"
          />

          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex gap-6 pb-8 last:pb-0"
            >
              {/* Dot */}
              <div className="relative flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                <span className="w-3 h-3 rounded-full border-2 border-primary bg-background z-10" />
              </div>

              <div className="card-glass flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-foreground font-display leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-primary font-medium mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs flex-shrink-0 border-border ${
                      edu.status === "Pursuing"
                        ? "border-primary/50 text-primary bg-primary/10"
                        : "text-muted-foreground"
                    }`}
                  >
                    {edu.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={11} className="text-primary" />
                    {edu.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-1 h-1 rounded-full bg-muted-foreground"
                      aria-hidden="true"
                    />
                    {edu.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────
function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "your-email@example.com";

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const LINKS: ContactLink[] = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      action: copyEmail,
      hint: copied ? "Copied!" : "Click to copy",
      dataOcid: "contact-email",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Add your LinkedIn",
      href: "#",
      hint: "Coming soon",
      dataOcid: "contact-linkedin",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Add your GitHub",
      href: "#",
      hint: "Coming soon",
      dataOcid: "contact-github",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Mail size={16} className="text-primary" />
            <p className="text-section-label">Contact</p>
          </div>
          <div className="section-divider mx-auto" />
          <h2 className="text-heading text-foreground mb-4">Let's connect.</h2>
          <p className="text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
            I'm open to learning opportunities, collaborations, and
            conversations about software development.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4" data-ocid="contact-links">
          {LINKS.map((link, i) => {
            const Icon = link.icon;
            const inner = (
              <div className="card-glass flex flex-col items-center gap-3 py-8 cursor-pointer group">
                <span className="w-10 h-10 rounded border border-border group-hover:border-primary transition-smooth flex items-center justify-center">
                  <Icon
                    size={18}
                    className="text-muted-foreground group-hover:text-primary transition-colors-smooth"
                  />
                </span>
                <div>
                  <p className="text-xs text-section-label mb-1">
                    {link.label}
                  </p>
                  <p className="text-sm text-foreground font-medium truncate max-w-[160px]">
                    {link.value}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{link.hint}</p>
              </div>
            );

            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                data-ocid={link.dataOcid}
              >
                {link.href ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={link.action}
                    className="w-full text-left focus-ring rounded-lg"
                  >
                    {inner}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>
          © {year}{" "}
          <span className="text-foreground font-medium">Amrut Gubyad</span>. All
          rights reserved.
        </p>
        <p>
          Built with love using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors-smooth focus-ring rounded"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <GoalsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
