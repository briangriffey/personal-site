import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Personal Website",
  description: "Learn about Brian's professional background, expertise areas, and current focus on AI-assisted development",
};

export default function About() {
  return (
    <main style={{
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto",
      lineHeight: "1.6",
    }}>
      <section>
        <h1 style={{
          marginBottom: "0.5rem",
          letterSpacing: "-0.02em"
        }}>About</h1>
        <p style={{
          marginBottom: "3rem"
        }}>
          Professional background, expertise, and current focus
        </p>

        <h2 style={{
          marginTop: "3rem",
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: "2px solid #e5e7eb"
        }}>Professional Background</h2>
        <p style={{ marginBottom: "1rem" }}>
          I'm Brian Griffey, a software engineer who has spent my career at the
          intersection of building products and solving complex technical challenges.
          My journey in technology has been driven by a deep curiosity about how systems
          work and a passion for creating tools that make development more efficient
          and enjoyable.
        </p>
        <p style={{ marginBottom: "1rem" }}>
          Throughout my career, I've worked across the full stack—from backend systems
          and APIs to frontend interfaces and user experiences. This breadth of experience
          has taught me that the most effective solutions come from understanding the entire
          system, not just individual components. I've built everything from small prototypes
          to production systems serving thousands of users, and each project has reinforced
          the importance of thoughtful architecture and clean, maintainable code.
        </p>
        <p style={{ marginBottom: "1rem" }}>
          More recently, my focus has shifted toward exploring how AI and machine learning
          can fundamentally transform the way we build software. I'm particularly interested
          in AI-assisted development workflows and the potential for tools like Claude Code
          to amplify developer productivity while maintaining high code quality. This website
          itself is a playground for these experiments—built entirely with Claude Code to
          explore multi-agent strategies and developer tooling patterns.
        </p>
      </section>

      <section style={{ marginTop: "4rem" }}>
        <h2 style={{
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: "2px solid #e5e7eb"
        }}>Expertise Areas</h2>
        <p style={{ marginBottom: "2rem" }}>
          My technical expertise has been shaped by years of building real-world systems and
          solving practical problems. Rather than chasing every new framework, I've focused
          on developing deep understanding in areas that consistently deliver value.
        </p>

        <h3 style={{
          marginTop: "2rem",
          fontSize: "1.3rem"
        }}>
          Full-Stack Development
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          I build complete applications from database to UI. This includes designing REST APIs,
          managing state and data flow, implementing authentication and authorization, and creating
          intuitive user interfaces. My experience spans JavaScript/TypeScript ecosystems (React,
          Node.js, Next.js) as well as other modern stacks, allowing me to choose the right tool
          for each project rather than being constrained to a single approach.
        </p>

        <h3 style={{
          marginTop: "2rem",
        }}>
          System Architecture & Design
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          I've learned that good architecture isn't about complexity—it's about making systems
          that are easy to understand, modify, and scale. I focus on designing clean interfaces
          between components, managing dependencies thoughtfully, and building systems that can
          evolve as requirements change. This includes everything from choosing the right data
          structures to planning deployment strategies.
        </p>

        <h3 style={{
          marginTop: "2rem",
        }}>
          AI-Assisted Development
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          As AI tools have evolved, I've become deeply invested in understanding how they can
          enhance the development process. I work extensively with Claude Code, exploring patterns
          for multi-agent workflows, automated testing strategies, and code generation techniques.
          The key is learning how to collaborate effectively with AI—knowing when to guide it,
          when to let it explore, and how to validate and refine its output.
        </p>

        <h3 style={{
          marginTop: "2rem",
        }}>
          Developer Experience & Tooling
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          I believe that good tools make good developers better. I've built internal tools,
          automated workflows, and development environments that reduce friction and increase
          productivity. This includes everything from setting up build pipelines and testing
          frameworks to creating custom CLI tools and development utilities that streamline
          repetitive tasks.
        </p>
      </section>

      <section style={{ marginTop: "4rem" }}>
        <h2 style={{
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: "2px solid #e5e7eb"
        }}>Current Focus: AI-Assisted Development</h2>
        <p style={{ marginBottom: "2rem" }}>
          Right now, I'm deeply immersed in exploring how AI can fundamentally change the way
          we build software. This isn't about replacing developers—it's about discovering new
          workflows that amplify human creativity and expertise while handling the repetitive,
          mechanical aspects of coding that slow us down.
        </p>

        <h3 style={{
          marginTop: "2rem",
        }}>
          The Claude Code Methodology
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          I work extensively with Claude Code, Anthropic's AI-powered development tool. What
          fascinates me most is the concept of multi-agent workflows—where specialized AI agents
          handle different aspects of development (planning, implementation, testing, review).
          This approach mirrors how human development teams work, with each agent bringing
          specific expertise to the task at hand.
        </p>
        <p style={{ marginBottom: "1rem" }}>
          The key insight I've gained is that effective AI-assisted development requires a
          different mindset. It's not about writing detailed specifications and letting the AI
          execute them blindly. Instead, it's an iterative dialogue—providing context, setting
          constraints, reviewing output, and guiding the AI toward better solutions. Think of
          it as pair programming with an incredibly fast partner who needs direction but can
          handle implementation details at scale.
        </p>

        <h3 style={{
          marginTop: "2rem",
        }}>
          Practical Application & Experimentation
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          This very website is a living experiment in AI-assisted development. I'm using it as
          a testbed to explore patterns that work well with Claude Code—modular architecture,
          clear separation of concerns, and documentation-driven development. Every feature is
          built using AI agents, and I'm documenting what works, what doesn't, and what patterns
          emerge as best practices.
        </p>
        <p style={{ marginBottom: "1rem" }}>
          I'm particularly interested in solving the "knowledge continuity" problem: how do we
          ensure that AI agents maintain context across sessions? How do we capture tribal
          knowledge and make it accessible to future agents? These are the questions that drive
          my current work, and this website serves as both the laboratory and the case study.
        </p>
        <p style={{ marginBottom: "1rem" }}>
          Beyond personal projects, I'm exploring how these methodologies can scale to team
          environments. What does code review look like when AI generates the initial implementation?
          How do we maintain code quality standards? What new types of testing and verification
          become necessary? These are exciting, open questions that I'm working to answer through
          hands-on experimentation and real-world application.
        </p>
      </section>

      <section style={{ marginTop: "4rem", marginBottom: "4rem" }}>
        <h2 style={{
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: "2px solid #e5e7eb"
        }}>Professional Values & Approach</h2>
        <p style={{ marginBottom: "2rem" }}>
          Beyond technical skills, I believe that how we approach our work matters as much as
          what we build. Over the years, I've developed a set of core values that guide my
          professional practice and shape how I collaborate with others.
        </p>

        <h3 style={{
          marginTop: "2rem",
        }}>
          Clarity Over Cleverness
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          The best code isn't the most clever—it's the code that the next developer (or your
          future self) can understand at 2 AM during an outage. I prioritize readability,
          clear naming, and straightforward solutions over clever tricks. Code is read far
          more often than it's written, and maintainability is a feature, not an afterthought.
        </p>

        <h3 style={{
          marginTop: "2rem",
        }}>
          Pragmatism Over Perfection
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          I believe in shipping working software and iterating based on real feedback. Perfect
          is the enemy of done, and the best way to validate assumptions is to get something
          functional in front of users quickly. This doesn't mean sacrificing quality—it means
          making deliberate trade-offs, understanding technical debt, and knowing when "good enough"
          is actually good enough. Sometimes the pragmatic choice is more valuable than the
          theoretically perfect solution.
        </p>

        <h3 style={{
          marginTop: "2rem",
        }}>
          Collaboration & Communication
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          The best code is code that other people can understand and build upon. I believe in
          clear documentation, meaningful variable names, and architecture that reveals its intent.
          I value open communication, asking questions early when requirements are unclear, and
          explaining technical tradeoffs in terms that non-technical stakeholders can understand.
          Software development is fundamentally a collaborative endeavor—even when working with AI agents.
        </p>

        <h3 style={{
          marginTop: "2rem",
        }}>
          Learning in Public
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          I believe in sharing knowledge and learning in public. This website is part of that
          philosophy—documenting my experiments with AI-assisted development, sharing insights
          about what works and what doesn't, and contributing to the broader conversation about
          how AI is changing software development. Technology moves fast, and I believe staying
          relevant means staying curious. I learn best by building—experimenting with new tools,
          trying out different patterns, and sharing what I discover along the way.
        </p>

        <h3 style={{
          marginTop: "2rem",
        }}>
          Quality as an Investment
        </h3>
        <p style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
          While I value moving quickly and iterating, I believe that rushing to ship broken code
          ultimately wastes more time than it saves. Good architecture and clean code aren't
          luxuries—they're investments that pay dividends over time. I focus on writing code
          that's easy to test, easy to modify, and easy for others to understand. This means
          investing in proper architecture, comprehensive testing, and clear documentation—
          even when deadlines are tight. The time saved by doing things right the first time
          far outweighs the cost of refactoring later.
        </p>
      </section>
    </main>
  );
}

