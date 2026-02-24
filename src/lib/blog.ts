export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  readTime: string
  excerpt: string
  category: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-10-ai-products",
    title: "Why I'm Building an AI Product Suite",
    date: "January 15, 2026",
    author: "Shrish Manglik",
    readTime: "5 min read",
    category: "Build Log",
    excerpt:
      "The solo founder movement is real. Here's why I'm betting everything on AI-assisted development to build a suite of AI-powered products.",
    content: `
      <p>There's a moment every founder hits where the spreadsheet stops making sense and the gut takes over. For me, that moment came at 2 AM on a Tuesday, staring at a blank terminal, realizing that the gap between <strong>"I have an idea"</strong> and <strong>"I shipped a product"</strong> had collapsed to almost nothing. The tools had changed. The economics had changed. The only thing that hadn't changed was the ambition — and mine had just gotten unreasonable.</p>

      <h2>The Solo Founder Movement Is Not a Trend — It's a Structural Shift</h2>
      <p>Five years ago, building a polished SaaS product meant hiring a team, raising a seed round, and burning six months on an MVP. Today, I sit in a room with Claude Code on one screen and Google AI Studio on another, and I build production-grade software faster than most teams can finish a sprint planning meeting. This isn't bravado. It's math. <a href="/services" class="text-accent-mid hover:underline">AI-assisted development</a> doesn't just speed up coding — it compresses the entire product lifecycle. Architecture decisions that used to take a week of whiteboard sessions now take an afternoon of rapid prototyping. Bug fixes that derailed entire sprints get resolved in minutes. The bottleneck has shifted from <strong>engineering capacity</strong> to <strong>founder clarity</strong> — knowing exactly what to build and why.</p>

      <h2>Why Speed Is the Only Moat That Matters Right Now</h2>
      <p>Every AI product idea you have, someone else has too. Probably dozens of someones. The difference between the one that wins and the ones that become forgotten GitHub repos is speed to market and speed to iterate. I'm not building a product suite because it's a fun challenge. I'm doing it because the window for establishing an AI product portfolio in this space is measured in months, not years. <a href="/products" class="text-accent-mid hover:underline">Our product suite</a> — a collection of AI-powered tools spanning finance, fashion, astrology, and education — only works if it exists before the market consolidates. First-mover advantage in AI tooling is real, but it's not about being first to have the idea. It's about being first to <strong>ship something people can actually use</strong>.</p>

      <blockquote>The best product is the one that exists. The second best is the one shipping tomorrow. Everything else is a pitch deck.</blockquote>

      <h2>The Product Suite Vision</h2>
      <p>Our product suite isn't a random collection of tools. Every product solves a specific, painful problem that I've personally experienced or watched others struggle with. FinSight AI delivers financial intelligence that helps investors and analysts make smarter decisions. Thread Intelligence brings AI-powered design to the fashion industry. AstroAI makes personalized astrology accessible through machine learning. ChemAI transforms chemistry education with interactive AI tutoring. Each tool is designed around a single philosophy: <strong>solve a real problem in a specific domain better than generic AI tools ever could</strong>. Our AI products are purpose-built for their industries, with deep domain expertise baked into every interaction.</p>

      <h2>What Happens Next</h2>
      <p>As I build out the suite, I'm documenting everything. Every architecture decision, every late-night pivot, every moment where Claude Code saves me three hours or costs me one. This blog is the build log. If you're a solo founder wondering whether it's actually possible to build real products alone with AI — follow along. I'm about to find out in public, and I promise not to sugarcoat the answer. The clock starts now.</p>
    `,
  },
  {
    slug: "how-one-person-builds-software",
    title:
      "How One Person Builds Software That Rivals Teams",
    date: "January 24, 2026",
    author: "Shrish Manglik",
    readTime: "7 min read",
    category: "Strategy",
    excerpt:
      "Traditional software teams have 10-50 engineers. I have Claude Code, a vision, and an unreasonable deadline. Here's how our AI products get built.",
    content: `
      <p>Let me tell you what a "traditional" software team looks like for a product suite of this scope. You'd have a product manager writing specs. A design team creating Figma mockups. A frontend team arguing about state management. A backend team debating database schemas. A DevOps engineer setting up CI/CD. A QA team writing test cases. Somewhere between 10 and 50 people, burning through $200K-$500K per month, shipping maybe one product every quarter. I have none of that. What I have is <strong>Claude Code</strong>, a clear architectural vision, and the willingness to make opinionated decisions without a committee. And honestly? The software is better for it.</p>

      <h2>The Claude Code Workflow</h2>
      <p>Here's how a typical build session works. I start with a product brief — two or three paragraphs describing exactly what the tool does, who it's for, and what makes it different. Then I open Claude Code and we start building. Not prototyping. Not wireframing. <strong>Building.</strong> I describe the architecture I want — Next.js app router, TypeScript everywhere, Tailwind for styling, shadcn/ui components as the base layer. Claude Code scaffolds the project, sets up the routing, creates the component hierarchy, and writes the initial implementation. My job is to be the architect and the taste-maker. I review every piece of code, redirect when the approach drifts from the vision, and handle the integration decisions that require understanding the full product context. It's not "AI writes the code and I watch." It's a genuine collaboration where I contribute the product thinking and architectural direction, and Claude Code contributes the raw implementation velocity.</p>

      <h2>Architecture Decisions: Opinionated by Design</h2>
      <p>One of the biggest advantages of being a <a href="/about" class="text-accent-mid hover:underline">solo builder</a> is that architecture decisions happen in seconds, not weeks. There are no meetings about whether to use REST or GraphQL. No debates about monorepo vs. polyrepo. No committees evaluating state management libraries. I make a decision, commit to it, and move on. For <a href="/products" class="text-accent-mid hover:underline">our product suite</a>, those decisions are: <strong>Next.js 15 with App Router</strong> for everything web-facing. <strong>TypeScript in strict mode</strong> because life is too short for runtime type errors. <strong>Tailwind CSS</strong> because utility-first is faster than writing custom CSS. <strong>On-device AI models via WebAssembly and WebGPU</strong> for the offline tools. <strong>Edge functions</strong> for anything that needs a server. These aren't necessarily the "best" choices in some abstract sense. They're the best choices for a solo founder who needs to ship multiple products rapidly while maintaining quality that users will actually pay for.</p>

      <h2>The Product Factory Model</h2>
      <p>I think of this as a product factory, not a startup. A startup builds one thing and hopes it works. A product factory builds a pipeline — shared infrastructure, shared design language, shared deployment, shared billing — and then stamps out products on top of that foundation. Every product shares the same authentication system, the same UI component library, the same deployment pipeline, and the same landing page structure. When I build FinSight AI, the work I do on the shared data visualization components benefits Thread Intelligence. When I optimize the AI model pipeline for AstroAI, that optimization carries over to ChemAI and every other product. <strong>The tenth product takes a fraction of the time the first one did</strong>, not because I'm cutting corners, but because the foundation is already rock-solid.</p>

      <h2>Build in Public or Don't Bother</h2>
      <p>Everything about our product suite is built in public. Not because transparency is trendy — though it is — but because building in public is the most efficient marketing strategy a solo founder has. Every blog post, every progress update, every screenshot of a late-night coding session is simultaneously content marketing, community building, and accountability. When I commit to building a product suite publicly, I can't quietly shelve the ones that are hard. The audience holds me accountable, and that accountability is worth more than any project management tool. If you're a solo founder reading this and still building in stealth: stop. The world has more ideas than it needs. What it doesn't have enough of is people who ship in the open and show their work. That's the real competitive advantage — not secrecy, but <strong>speed and transparency</strong>.</p>
    `,
  },
  {
    slug: "privacy-first-ai",
    title:
      "Privacy-First AI: Why Your Data Should Never Leave Your Device",
    date: "February 3, 2026",
    author: "Shrish Manglik",
    readTime: "6 min read",
    category: "Philosophy",
    excerpt:
      "Most AI tools send your data to the cloud. We think that's wrong. Here's why half of our AI products run entirely offline.",
    content: `
      <p>Open any mainstream AI tool right now. Type a question, upload an image, paste a document. Do you know where that data goes? Onto someone else's server, in someone else's data center, governed by someone else's privacy policy that they can change at any time. Your private journal entries, your unreleased designs, your confidential business documents — all of it traveling across the internet to be processed by models running on hardware you don't control. Most people don't think about this. They should. <strong>The convenience of cloud AI comes at a cost, and that cost is your data sovereignty.</strong></p>

      <h2>The Privacy Nightmare Hiding in Plain Sight</h2>
      <p>Here's what happens when you use a typical AI chatbot. Your message is sent over HTTPS to a server — usually in the US, regardless of where you live. It's processed by a model that may or may not retain your input for training. It passes through logging systems, monitoring tools, and load balancers, each of which might store a copy. The response comes back, and you feel like you had a private conversation. You didn't. You had a conversation that at minimum three or four systems recorded, that the company's employees can access for "quality assurance," and that might be used to train the next version of the model. Some companies are better about this than others, but the fundamental architecture is the same: <strong>your data leaves your device, and you lose control of it</strong>. Period. For casual questions, maybe that's fine. But people are using AI for increasingly sensitive tasks — therapy journaling, legal document review, medical symptom analysis, proprietary code generation. The gap between what people are comfortable sharing and what they're actually sharing is growing wider every day.</p>

      <h2>How Our Tools Work Differently</h2>
      <p>Half of <a href="/products" class="text-accent-mid hover:underline">our AI products</a> run entirely on your device. Not "processes locally and syncs to the cloud." Not "stores data locally but sends it for processing." <strong>Entirely on your device.</strong> Our offline-capable tools use on-device language models that run in your browser via WebAssembly and WebGPU. The model weights are downloaded once and cached locally. When you interact with the tool, the computation happens on your CPU and GPU. The response is generated without a single network request. Your data never exists anywhere except your own hardware. Our local AI processing handles speech-to-text using Whisper models running locally — your audio never leaves your machine. On-device AI powers image and design tasks without uploading your creative work to anyone else's server. This isn't a marketing gimmick. Open your browser's developer tools, go to the Network tab, and <a href="/free-audit" class="text-accent-mid hover:underline">verify it yourself</a>. Zero outbound requests during processing.</p>

      <blockquote>Privacy isn't a feature you add. It's an architecture you commit to from day one. You can't bolt privacy onto a system designed to surveil.</blockquote>

      <h2>The Technical Trade-offs — And Why They're Worth It</h2>
      <p>Let's be honest about the trade-offs. On-device models are smaller than their cloud counterparts. A model running in your browser is not going to match the raw capability of GPT-4 or Claude running on a server farm with hundreds of GPUs. Responses can be slower, especially on older hardware. The range of tasks these models can handle well is narrower. I'm not going to pretend otherwise — that would be dishonest. But here's the thing: <strong>for 80% of daily AI use cases, on-device models are more than good enough</strong>. You don't need a 400-billion-parameter model to draft an email, summarize meeting notes, brainstorm ideas, or convert speech to text. You need a fast, private, reliable tool that works even when your internet is down. Our product suite gives you both options. When you need maximum capability and you're comfortable with cloud processing, use the cloud mode with full transparency about what gets sent. When privacy matters — and it matters more often than most people realize — use offline mode and keep everything local.</p>

      <h2>This Is Just the Beginning</h2>
      <p>On-device AI is getting better at a staggering rate. Models that required a data center two years ago now run on a laptop. Models that required a laptop last year now run on a phone. Within a few years, the performance gap between local and cloud AI will shrink to the point where choosing privacy won't feel like a compromise at all. Our product suite is built for that future. Every architectural decision we make assumes that on-device models will keep getting better, faster, and more capable. We're not building cloud tools with a local fallback. We're building <strong>local-first tools with an optional cloud boost</strong>. That distinction matters. It means privacy isn't an afterthought or a premium feature — it's the default. And I believe that's exactly how AI tools should work.</p>
    `,
  },
  {
    slug: "how-to-evaluate-ai-consultant",
    title: "How to Evaluate an AI Consultant (A Founder's Honest Checklist)",
    date: "February 12, 2026",
    author: "Shrish Manglik",
    readTime: "8 min read",
    category: "Strategy",
    excerpt:
      "Most AI consultants sell strategy decks, not systems. Here's the 10-point checklist I'd use if I were hiring someone like me.",
    content: `
      <p>The AI consulting market is flooded with firms that will happily take your money and deliver a 50-slide strategy deck. Six months later, you have a beautiful presentation gathering dust in a shared drive and zero automated processes. I know this because I've talked to dozens of founders who've been through exactly this experience before they found us. Here's the checklist I'd use to evaluate <strong>any</strong> AI consultant — including myself.</p>

      <h2>1. Ask to See Production Systems, Not Demos</h2>
      <p>Anyone can build a demo. Demos work perfectly because they're designed for perfect conditions — clean data, predictable inputs, no edge cases. What matters is whether the system works when your intern uploads a scanned invoice that's slightly rotated, or when a client submits a contract in a format you've never seen before. Ask your potential consultant: <strong>"Can you show me a system running in production today?"</strong> If the answer involves caveats, excuses, or "we're still in pilot phase with most clients" — that's a red flag.</p>

      <h2>2. Who Actually Does the Work?</h2>
      <p>This is the question that separates boutique consultancies from agency-model firms. At most agencies, the impressive people you meet during the sales process are not the people who build your system. The senior AI architect who wowed you in the pitch meeting hands your project to a team of juniors or offshore developers they've never met. Ask directly: <strong>"Will the person I'm talking to right now be the person writing code for my project?"</strong> At MDS, the answer is always yes — because there is no junior team. <a href="/about">I architect and build every system personally</a>.</p>

      <h2>3. Check for Privacy Awareness</h2>
      <p>If your consultant's first suggestion is "let's upload all your data to OpenAI's API" without discussing data residency, privacy implications, or on-premise alternatives — they're not thinking about your business. They're thinking about their convenience. A good AI consultant should be able to articulate: where your data flows, who can access it, what happens if the AI provider changes their terms, and what on-premise or <a href="/blog/privacy-first-ai">privacy-first alternatives</a> exist.</p>

      <h2>4. Demand Specific ROI Projections</h2>
      <p>Vague promises like "AI will transform your operations" mean nothing. Push for specifics: <strong>How many hours per week will this save? What's the expected accuracy rate? What's the payback period?</strong> A consultant who can't give you numbers either hasn't done the analysis or doesn't want to be held accountable. Our <a href="/free-audit">free AI assessment</a> delivers specific projections — because we believe you deserve to know what you're investing in before you spend a dollar.</p>

      <h2>5. Ask About Failure</h2>
      <p>Every consultant has had projects that didn't go as planned. The good ones will tell you about it honestly and explain what they learned. The bad ones will claim a perfect track record. Ask: <strong>"What's the hardest project you've worked on, and what went wrong?"</strong> The quality of that answer tells you everything about how they'll handle problems on your project — because problems always come up.</p>

      <h2>6. Look for Fixed-Scope Pricing</h2>
      <p>Hourly billing in consulting creates a perverse incentive: the longer the project takes, the more the consultant earns. Fixed-scope pricing aligns incentives — the consultant is motivated to deliver efficiently because the price is locked regardless of how many hours it takes. Ask: <strong>"Is this a fixed price or hourly?"</strong> and <strong>"What happens if the project takes longer than expected?"</strong> At MDS, we use <a href="/services">fixed-scope pricing</a> for exactly this reason.</p>

      <h2>The Bottom Line</h2>
      <p>Good AI consultants are rare. Most are either pure strategists (great ideas, no code) or pure engineers (great code, no business context). What you need is someone who understands both — who can identify the highest-ROI automation opportunity and then actually build the system to capture it. Use this checklist, ask uncomfortable questions, and don't settle for slide decks when you need production systems.</p>
    `,
  },
  {
    slug: "real-cost-of-ai-implementation",
    title: "The Real Cost of AI Implementation: What Nobody Tells You",
    date: "February 20, 2026",
    author: "Shrish Manglik",
    readTime: "6 min read",
    category: "Strategy",
    excerpt:
      "AI implementation costs are wildly misunderstood. Here's a transparent breakdown of what businesses actually spend — and where the hidden costs lurk.",
    content: `
      <p>Every week, a founder asks me: "How much does AI really cost?" And every week, I give the same honest answer: <strong>it depends</strong> — but not in the vague, hand-wavy way most consultants mean it. It depends on specific, quantifiable factors that I can walk you through right now. Here's the transparent breakdown that the AI industry doesn't want you to see.</p>

      <h2>The Three Layers of AI Cost</h2>
      <p>AI implementation costs break down into three layers, and most businesses only think about the first one:</p>
      <p><strong>Layer 1: Build Cost</strong> — This is what the consultant or developer charges to design and build the system. For a focused automation (like invoice processing), expect starting at $5K. For department-wide transformation, starting at $10K. For a custom AI product built from scratch, starting at $25K. These numbers are real — <a href="/services">we publish our starting prices</a> because we believe in transparency.</p>
      <p><strong>Layer 2: Ongoing Infrastructure</strong> — This is what people forget. AI models need to run somewhere. If you're using cloud APIs (like Claude or GPT-4), expect $50-$500/month in API costs depending on volume. If you're running on-premise, factor in server costs. If you're using a hybrid approach, it's somewhere in between. We always model this out during our <a href="/free-audit">free assessment</a> so there are no surprises.</p>
      <p><strong>Layer 3: Hidden Costs</strong> — This is what nobody tells you. Data cleaning and preparation can add 20-40% to project timelines. Integration with legacy systems always takes longer than expected. Change management — getting your team to actually use the new system — requires dedicated effort. These aren't optional costs; they're inevitable costs that bad consultants conveniently leave out of their proposals.</p>

      <h2>Why "Cheap" AI Projects Cost More</h2>
      <p>The most expensive AI project is the one that fails. I've talked to companies that spent $5K on a freelancer, got a prototype that broke in production, then spent $25K fixing it — paying $30K total for something that should have cost $20K to build correctly the first time. <strong>Cheap AI is expensive AI with a delayed invoice.</strong> When you see proposals dramatically lower than market rate, ask yourself: what are they cutting? Usually it's architecture (they'll build something that works now but can't scale), testing (it'll work on clean data but break on real-world inputs), or documentation (you'll have no idea how to maintain it when they leave).</p>

      <h2>The ROI Math That Actually Matters</h2>
      <p>The question isn't "how much does AI cost?" — it's "how fast does AI pay for itself?" Consider a typical scenario: a business spends $8K on a focused AI sprint to automate document processing. If the system saves 10+ hours per week of manual work, the payback period can be under 2 months. <strong>That's the kind of math that makes AI investment obvious</strong> — when you pick the right problem. Use our <a href="/roi-calculator">ROI calculator</a> to estimate the math for your specific situation, or check out our <a href="/case-studies">capability demonstrations</a> to see the kinds of systems we build.</p>

      <h2>How to Budget for AI</h2>
      <p>My advice to businesses evaluating AI investment: Start with one specific, measurable problem. Calculate how much that problem costs you per year in labor, errors, and opportunity cost. If the answer is more than 2x what a Sprint costs (starting at $5K), the math almost certainly works. Don't try to automate everything at once. Win with one project, prove the ROI, then expand. That's how the smartest companies approach AI adoption — and it's exactly how our engagement tiers are designed.</p>
    `,
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
