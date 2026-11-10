/*
 * Sample data for the design preview. Every object matches the JSON the real
 * API routes return, so pages can switch to fetch() when moved to the main app.
 * Nothing here calls OpenAI, Gmail, Instantly or Stripe.
 */

export const campaigns = [
  {
    id: "camp-1",
    name: "Productivity & Notion creators",
    status: "active" as "active" | "paused",
    platforms: ["YouTube", "Instagram"],
    niches: ["Productivity & Systems", "B2B SaaS & Tech"],
    followerRange: "100K to 600K",
    minEngagement: "2.5%",
    weeklyTarget: 50,
    stats: { discovered: 64, qualified: 42, sent: 38, replies: 4 },
    lastRun: "2 hours ago",
  },
  {
    id: "camp-2",
    name: "Freelance finance & creator CPAs",
    status: "active" as "active" | "paused",
    platforms: ["Instagram", "TikTok"],
    niches: ["Fintech & Personal Finance", "Freelancer & Creator Economy"],
    followerRange: "100K to 450K",
    minEngagement: "3.0%",
    weeklyTarget: 25,
    stats: { discovered: 48, qualified: 31, sent: 25, replies: 2 },
    lastRun: "1 day ago",
  },
  {
    id: "camp-3",
    name: "Fitness & nutrition",
    status: "paused" as "active" | "paused",
    platforms: ["TikTok", "YouTube"],
    niches: ["Fitness & Longevity"],
    followerRange: "200K to 1M",
    minEngagement: "2.0%",
    weeklyTarget: 50,
    stats: { discovered: 30, qualified: 18, sent: 15, replies: 1 },
    lastRun: "3 days ago",
  },
];

export const niches = [
  "Productivity & Systems",
  "Fintech & Personal Finance",
  "B2B SaaS & Tech",
  "AI & Automation",
  "Freelancer & Creator Economy",
  "Fitness & Longevity",
  "Design & Architecture",
  "E-commerce & Growth",
];

export const platforms = [
  { id: "youtube", label: "YouTube", desc: "Long videos, high trust" },
  { id: "instagram", label: "Instagram", desc: "Reels and stories" },
  { id: "tiktok", label: "TikTok", desc: "Short and fast" },
  { id: "newsletter", label: "Newsletter", desc: "Readers who buy" },
];

export const templates = [
  {
    name: "Co-launch pitch",
    subject: "Quick question about {{creator_name}}'s audience & software",
    body: "Hey {{creator_name}},\n\nHuge fan of your recent work on {{platform}} covering {{niche}}.\n\nI run CoLaunch. We partner with high-trust creators like you to co-build software for your audience. We handle the engineering, design and operations, and you keep 50% of the revenue.\n\nWe read through your community's comments and found 3 tools your audience keeps asking for. Would you be open to seeing a 2-minute mockup next Tuesday?\n\nBest,\nHyejee\nCoLaunch",
  },
  {
    name: "Pain-point hook",
    subject: "Building a dedicated tool for your {{niche}} community?",
    body: "Hi {{creator_name}},\n\nLoved your recent video. The comments had over 40 people asking what software you use for your workflow.\n\nAt CoLaunch we fund and build custom tools for creators, at zero upfront cost to you.\n\nCould I send over a quick 3-slide concept of what this app would look like for your {{follower_count}} community?\n\nCheers,\nThe CoLaunch team",
  },
];

export const creators = [
  { id: "c-1", handle: "marcuschen_systems", displayName: "Marcus Chen", platform: "youtube" as const, bio: "Designing digital workflows and Notion systems for modern operators. 2x founder.", followers: 340000, engagement: 4.8, postingFreq: "3x a week", country: "US", verified: true, email: "collab@marcuschen.io", metrics: { followerCount: 340000, engagementRate: 4.8, postsPerMonth: 12, substantiveCommentsRatio: 0.92, hasDigitalProducts: true, hasMerchOrCourses: true, hasSponsorsOrTechAffinity: true } },
  { id: "c-2", handle: "sarahlindqvist_tax", displayName: "Sarah Lindqvist", platform: "instagram" as const, bio: "CPA for creators and freelancers. Bookkeeping, write-offs and wealth building.", followers: 185000, engagement: 5.2, postingFreq: "5x a week", country: "US", verified: false, email: "hello@lindqvisttax.com", metrics: { followerCount: 185000, engagementRate: 5.2, postsPerMonth: 20, substantiveCommentsRatio: 0.88, hasDigitalProducts: true, hasMerchOrCourses: true, hasSponsorsOrTechAffinity: false } },
  { id: "c-3", handle: "alexandratech", displayName: "Alexandra Rivera", platform: "youtube" as const, bio: "Full-stack developer and AI tool reviewer. Honest reviews for builders.", followers: 220000, engagement: 6.1, postingFreq: "2x a week", country: "CA", verified: true, email: "alex@riveradev.com", metrics: { followerCount: 220000, engagementRate: 6.1, postsPerMonth: 8, substantiveCommentsRatio: 0.95, hasDigitalProducts: false, hasMerchOrCourses: false, hasSponsorsOrTechAffinity: true } },
  { id: "c-4", handle: "davidvance_growth", displayName: "David Vance", platform: "youtube" as const, bio: "Agency scaling, client retention and pricing psychology for solo creative businesses.", followers: 420000, engagement: 4.4, postingFreq: "3x a week", country: "US", verified: true, email: "david@vancemedia.co", metrics: { followerCount: 420000, engagementRate: 4.4, postsPerMonth: 12, substantiveCommentsRatio: 0.9, hasDigitalProducts: true, hasMerchOrCourses: true, hasSponsorsOrTechAffinity: true } },
  { id: "c-5", handle: "ethan_fitnessops", displayName: "Ethan Bradley", platform: "tiktok" as const, bio: "Calisthenics and nutrition without strict diets. 60-second daily tips.", followers: 520000, engagement: 3.1, postingFreq: "Daily", country: "UK", verified: true, email: "mgmt@ethanbradleyfit.com", metrics: { followerCount: 520000, engagementRate: 3.1, postsPerMonth: 28, substantiveCommentsRatio: 0.65, hasDigitalProducts: true, hasMerchOrCourses: true, hasSponsorsOrTechAffinity: true } },
  { id: "c-6", handle: "generic_vlogger99", displayName: "Leo Miller", platform: "youtube" as const, bio: "Daily vlogs, travel diaries and gaming with friends.", followers: 85000, engagement: 1.4, postingFreq: "Weekly", country: "US", verified: false, email: "leo@gmail.com", metrics: { followerCount: 85000, engagementRate: 1.4, postsPerMonth: 4, substantiveCommentsRatio: 0.4, hasDigitalProducts: false, hasMerchOrCourses: false, hasSponsorsOrTechAffinity: false } },
  { id: "c-7", handle: "priyabuilds", displayName: "Priya Nair", platform: "youtube" as const, bio: "No-code systems and client workflows for small agencies.", followers: 155000, engagement: 5.6, postingFreq: "2x a week", country: "UK", verified: true, email: "priya@priyabuilds.co", metrics: { followerCount: 155000, engagementRate: 5.6, postsPerMonth: 8, substantiveCommentsRatio: 0.9, hasDigitalProducts: true, hasMerchOrCourses: true, hasSponsorsOrTechAffinity: false } },
  { id: "c-8", handle: "tomokafor_money", displayName: "Tom Okafor", platform: "instagram" as const, bio: "Money habits and invoicing for first-year freelancers.", followers: 290000, engagement: 4.1, postingFreq: "4x a week", country: "US", verified: false, email: "tom@okafor.money", metrics: { followerCount: 290000, engagementRate: 4.1, postsPerMonth: 16, substantiveCommentsRatio: 0.85, hasDigitalProducts: true, hasMerchOrCourses: false, hasSponsorsOrTechAffinity: true } },
];

/** Niche match against the campaign. The real scoring function has no niche component yet, so this carries no points. */
export const nicheFit: Record<string, { level: "Strong match" | "Partial match" | "No match"; niche: string }> = {
  "c-1": { level: "Strong match", niche: "Productivity & Systems" },
  "c-2": { level: "Strong match", niche: "Fintech & Personal Finance" },
  "c-3": { level: "Partial match", niche: "AI & Automation" },
  "c-4": { level: "Strong match", niche: "Freelancer & Creator Economy" },
  "c-5": { level: "Strong match", niche: "Fitness & Longevity" },
  "c-6": { level: "No match", niche: "Lifestyle vlogs" },
  "c-7": { level: "Strong match", niche: "Productivity & Systems" },
  "c-8": { level: "Strong match", niche: "Fintech & Personal Finance" },
};

export type OutreachStatus = "sent" | "opened" | "replied";

export const outreachLogs = [
  { id: "out-1", creatorName: "Marcus Chen", platform: "YouTube", score: 95, campaignName: "Productivity & Notion", step: 1, status: "replied" as OutreachStatus, followup: "Stopped, they replied", openCount: 3 },
  { id: "out-2", creatorName: "Sarah Lindqvist", platform: "Instagram", score: 96, campaignName: "Freelance finance", step: 1, status: "replied" as OutreachStatus, followup: "Stopped, they replied", openCount: 2 },
  { id: "out-6", creatorName: "Priya Nair", platform: "YouTube", score: 96, campaignName: "Productivity & Notion", step: 1, status: "replied" as OutreachStatus, followup: "Stopped, they replied", openCount: 2 },
  { id: "out-7", creatorName: "Tom Okafor", platform: "Instagram", score: 90, campaignName: "Freelance finance", step: 2, status: "replied" as OutreachStatus, followup: "Stopped, they replied", openCount: 3 },
  { id: "out-3", creatorName: "Alexandra Rivera", platform: "YouTube", score: 89, campaignName: "Productivity & Notion", step: 1, status: "opened" as OutreachStatus, followup: "Follow-up in 4 days", openCount: 4 },
  { id: "out-4", creatorName: "David Vance", platform: "YouTube", score: 93, campaignName: "Productivity & Notion", step: 2, status: "opened" as OutreachStatus, followup: "Follow-up sent", openCount: 2 },
  { id: "out-5", creatorName: "Ethan Bradley", platform: "TikTok", score: 84, campaignName: "Fitness & nutrition", step: 1, status: "sent" as OutreachStatus, followup: "Follow-up in 6 days", openCount: 0 },
];

export const reviewQueue = [
  {
    id: "rq-1",
    creatorId: "c-7",
    displayName: "Priya Nair",
    handle: "priyabuilds",
    platform: "YouTube",
    followers: 155000,
    engagement: 5.6,
    creatorScore: 96,
    email: "priya@priyabuilds.co",
    receivedAt: "2 hours ago",
    intent: "interested" as "interested" | "question",
    aiSummary: "Wants to turn her agency templates into an app. Free Thursday afternoon for a call.",
    keyQuestions: [] as string[],
    thread: [
      { sender: "Hyejee Bae", isCreator: false, timestamp: "Oct 8, 9:40 AM", body: "Hi Priya,\n\nYour video on client onboarding systems is excellent. We partner with creators to co-build software for their audience. We handle engineering and operations and you keep 50%.\n\nWould you be open to seeing 3 product ideas we put together for your audience?" },
      { sender: "Priya Nair", isCreator: true, timestamp: "Oct 9, 1:05 PM", body: "Hi Hyejee,\n\nPerfect timing. My viewers keep asking for my agency templates as an actual app, not a Notion page.\n\nHappy to see the ideas. Thursday afternoon works for a call.\n\nPriya" },
    ],
    topPosts: [
      { title: "The Client Onboarding System I Use for Every Agency", views: "121K views", date: "2 weeks ago" },
      { title: "No-Code Automations That Save Me 10 Hours a Week", views: "88K views", date: "1 month ago" },
    ],
    status: "pending" as "pending" | "approved" | "archived",
  },
  {
    id: "rq-2",
    creatorId: "c-8",
    displayName: "Tom Okafor",
    handle: "tomokafor_money",
    platform: "Instagram",
    followers: 290000,
    engagement: 4.1,
    creatorScore: 90,
    email: "tom@okafor.money",
    receivedAt: "5 hours ago",
    intent: "question" as "interested" | "question",
    aiSummary: "Interested, but wants two answers before going further.",
    keyQuestions: [
      "How does the revenue split work, and do I have to fund any engineering upfront?",
      "How much of my time does the launch phase take?",
    ],
    thread: [
      { sender: "Hyejee Bae", isCreator: false, timestamp: "Oct 8, 11:30 AM", body: "Hi Tom,\n\nLoved your series on invoicing for first-year freelancers. We fund and build software alongside creators at zero upfront cost.\n\nCould we send over 3 product ideas for your audience?" },
      { sender: "Tom Okafor", isCreator: true, timestamp: "Oct 9, 4:10 PM", body: "Hi CoLaunch team,\n\nThis sounds interesting! How does the revenue share work, and do I have to fund any of the engineering upfront? Also, how much of my time does the launch phase take?\n\nThanks,\nTom" },
    ],
    topPosts: [
      { title: "How to Invoice Your First Client (Without Feeling Awkward)", views: "112K views", date: "1 week ago" },
      { title: "The 3-Account System for Freelance Money", views: "76K views", date: "3 weeks ago" },
    ],
    status: "pending" as "pending" | "approved" | "archived",
  },
  {
    id: "rq-3",
    creatorId: "c-4",
    displayName: "David Vance",
    handle: "davidvance_growth",
    platform: "YouTube",
    followers: 420000,
    engagement: 4.4,
    creatorScore: 93,
    email: "david@vancemedia.co",
    receivedAt: "1 day ago",
    intent: "interested" as "interested" | "question",
    aiSummary: "Liked the comment research and asked to see the 3 product ideas.",
    keyQuestions: [] as string[],
    thread: [
      { sender: "Hyejee Bae", isCreator: false, timestamp: "Oct 7, 9:00 AM", body: "Hi David,\n\nNoticed over 60 comments under your pricing video asking for a contract and rate calculator. We want to co-launch this software with you.\n\nCan I send over the top 3 concepts?" },
      { sender: "David Vance", isCreator: true, timestamp: "Oct 8, 3:45 PM", body: "Hey Hyejee,\n\nYou caught my attention with the comment analysis. Send over the 3 concepts and let me take a look.\n\nCheers,\nDavid" },
    ],
    topPosts: [{ title: "How to Price Creative Retainers at $10k/month", views: "240K views", date: "2 weeks ago" }],
    status: "pending" as "pending" | "approved" | "archived",
  },
  {
    id: "rq-m",
    creatorId: "c-1",
    displayName: "Marcus Chen",
    handle: "marcuschen_systems",
    platform: "YouTube",
    followers: 340000,
    engagement: 4.8,
    creatorScore: 95,
    email: "collab@marcuschen.io",
    receivedAt: "2 hours ago",
    intent: "interested" as "interested" | "question",
    aiSummary: "Wants to build a workflow app instead of selling templates. Free Tuesday at 2pm EST for a call.",
    keyQuestions: [] as string[],
    thread: [
      { sender: "Hyejee Bae", isCreator: false, timestamp: "Oct 8, 10:15 AM", body: "Hey Marcus,\n\nHuge fan of your recent video on Notion systems. We partner with creators like you to co-build software for your audience. We handle engineering and operations and you keep 50%.\n\nWould you be open to seeing a 2-minute concept deck next Tuesday?" },
      { sender: "Marcus Chen", isCreator: true, timestamp: "Oct 9, 2:30 PM", body: "Hey Hyejee!\n\nYes, I've actually been thinking of building a dedicated workflow app for my audience rather than just selling templates.\n\nWould love to see the concepts you have in mind. Tuesday around 2pm EST works for a quick chat.\n\nBest,\nMarcus" },
    ],
    topPosts: [
      { title: "How I Built My Entire Life Operating System", views: "185K views", date: "3 weeks ago" },
      { title: "Stop Using 10 Apps: The Unified Freelance Stack", views: "142K views", date: "1 month ago" },
      { title: "Why Most Productivity Frameworks Fail You", views: "98K views", date: "2 months ago" },
    ],
    status: "approved" as "pending" | "approved" | "archived",
  },
  {
    id: "rq-s",
    creatorId: "c-2",
    displayName: "Sarah Lindqvist",
    handle: "sarahlindqvist_tax",
    platform: "Instagram",
    followers: 185000,
    engagement: 5.2,
    creatorScore: 96,
    email: "hello@lindqvisttax.com",
    receivedAt: "5 hours ago",
    intent: "question" as "interested" | "question",
    aiSummary: "Interested, but wants two answers before going further.",
    keyQuestions: [
      "How does the revenue split work, and do I have to fund any engineering upfront?",
      "How much of my time does the launch phase take?",
    ],
    thread: [
      { sender: "Hyejee Bae", isCreator: false, timestamp: "Oct 8, 11:30 AM", body: "Hi Sarah,\n\nLoved your recent breakdown on write-offs for freelancers. We fund and build custom tools alongside creators at zero upfront cost.\n\nCould we send over a 3-slide concept deck for your community?" },
      { sender: "Sarah Lindqvist", isCreator: true, timestamp: "Oct 9, 4:10 PM", body: "Hi CoLaunch team,\n\nThis sounds interesting! How does the revenue share work, and do I have to fund any of the engineering upfront? Also, how much of my time does the launch phase take?\n\nThanks,\nSarah" },
    ],
    topPosts: [
      { title: "5 Tax Write-Offs Every Freelancer Misses in Q4", views: "94K views", date: "1 week ago" },
      { title: "How to Form an S-Corp Without an Expensive Lawyer", views: "68K views", date: "3 weeks ago" },
    ],
    status: "approved" as "pending" | "approved" | "archived",
  },
];

/** Replies the AI sorted away from the review queue. With the 3 in review, this makes the 8 replies shown on Today. */
export const otherReplies = [
  { id: "or-1", group: "Not Interested", name: "Hannah Cole", snippet: "Thanks, but I'm not taking on new partnerships this year.", outcome: "Follow-ups stopped" },
  { id: "or-2", group: "Not Interested", name: "Jonas Weber", snippet: "We already work with a software partner.", outcome: "Follow-ups stopped" },
  { id: "or-3", group: "Unsubscribe", name: "Mia Torres", snippet: "Please take me off your list.", outcome: "Removed from all campaigns" },
  { id: "or-4", group: "Other", name: "Noah Kim", snippet: "Out of office until the 20th.", outcome: "Follow-up moved to the 21st" },
  { id: "or-5", group: "Other", name: "Elena Rossi", snippet: "My manager handles these. I've forwarded it on.", outcome: "Waiting on the manager" },
];

/** Where each approved creator is in the journey. */
export const approvedStage: Record<string, { label: string; cta: string; href: string }> = {
  "c-1": { label: "Became RateCraft OS, now in its presale", cta: "Open project", href: "/projects/ratecraft" },
  "c-2": { label: "Became TaxDeduct AI, now in its presale", cta: "Open project", href: "/projects/taxdeduct" },
  "c-4": { label: "3 product ideas ready", cta: "See ideas", href: "/ideation/c-4" },
  "c-7": { label: "Audience research ready", cta: "See research", href: "/research/c-7" },
  "c-8": { label: "Pitch drafted, ready for you", cta: "Open pitch", href: "/pitch/c-8" },
};

export const dossier = {
  creatorName: "Marcus Chen",
  platform: "YouTube",
  rawDossierSummary:
    "Marcus's audience is mostly freelancers and small studio owners who already pay for tools. They keep asking how to price client work and how to stop proposals from going quiet.",
  purchaseIntentScore: 87,
  demographics: {
    primaryAgeGroup: "25 to 38",
    genderRatio: "62% men, 38% women",
    topGeographies: "US 58%, UK 18%, CA 12%, AU 8%",
    coreProfessions: ["Freelance designers", "Consultants", "Notion builders", "Agency owners"],
    estimatedIncomeLevel: "$70K to $140K",
  },
  recurringPainPoints: [
    {
      painPoint: "They don't know what to charge",
      severity: "critical" as "critical" | "high",
      frequency: "Mentioned in 214 comments",
      commercialOpportunity: "Rate calculator",
      directQuotes: [
        "I quoted $800 for a job that took three weeks. How do you even work out a number?",
        "Every time a client asks my rate I freeze and just pick something.",
      ],
    },
    {
      painPoint: "Proposals take hours, then clients disappear",
      severity: "critical" as "critical" | "high",
      frequency: "Mentioned in 142 comments",
      commercialOpportunity: "Proposal builder",
      directQuotes: [
        "Spent four hours on a proposal and got ghosted again.",
        "Is there a tool that makes proposals look pro without a whole afternoon?",
      ],
    },
    {
      painPoint: "Scope creep eats the profit",
      severity: "high" as "critical" | "high",
      frequency: "Mentioned in 88 comments",
      commercialOpportunity: "Change-order tracking",
      directQuotes: ["The client keeps adding 'one small thing' and I never know how to bill it."],
    },
  ],
  presence: [
    { label: "Website", value: "marcuschen.io", note: "Blog and free Notion templates, about 22K visits a month" },
    { label: "Newsletter", value: "Systems Weekly", note: "48K readers, 46% open rate" },
  ],
  existingProducts: [
    { name: "Freelance OS Notion template", price: "$49", note: "1,200 sold in the first week" },
    { name: "Client Systems course", price: "$299", note: "Runs twice a year" },
  ],
  competitorsAnalyzed: [
    { name: "HoneyBook", category: "Client management", frictionReportedByAudience: "Too heavy for one person, and no help with pricing." },
    { name: "Bonsai", category: "Freelance suite", frictionReportedByAudience: "Good contracts, but the proposals all look the same." },
    { name: "Spreadsheets", category: "DIY", frictionReportedByAudience: "Breaks easily and looks unprofessional to clients." },
  ],
  monetizationGaps: [
    "Sells a $49 Notion template, with no recurring income",
    "Sponsorships make up most of the revenue and vary month to month",
  ],
  purchaseIntentSignals: [
    "37 comments directly asked if a tool like this exists",
    "The last template sold 1,200 copies in the first week",
    "Viewers name paid tools they already use",
  ],
};

export const opportunities = [
  {
    id: "op-1",
    opportunityRank: 1,
    title: "RateCraft OS",
    oneLiner: "A rate calculator and proposal builder for solo creatives.",
    opportunityScore: 92,
    mvpComplexity: "Medium" as "Low" | "Medium" | "High",
    targetPersona: "Freelance designers, engineers and consultants charging $3K to $15K a project.",
    coreProblem: "They guess their prices and lose hours writing proposals that go nowhere.",
    keyFeatures: ["Rate calculator with market data", "3-tier proposal builder", "Deposit collection through Stripe", "Client proposal tracking"],
    audienceEvidence: "214 comments about pricing in the last 90 days. 37 people asked if a tool like this exists.",
    pricingModel: "$29/month or $199 lifetime",
    competition: "HoneyBook and Bonsai handle proposals, but neither helps work out the price.",
    competitiveAdvantage: "Marcus's pricing method is built in, and no competitor helps with the number itself.",
  },
  {
    id: "op-2",
    opportunityRank: 2,
    title: "ClientScope Studio",
    oneLiner: "A client portal that stops scope creep.",
    opportunityScore: 81,
    mvpComplexity: "Medium" as "Low" | "Medium" | "High",
    targetPersona: "Small studios running five or more client projects at once.",
    coreProblem: "Extra requests pile up and never get billed.",
    keyFeatures: ["Shared client portal", "One-click change orders", "Scope tracking", "Approval history"],
    audienceEvidence: "88 comments about scope creep, mostly from people running small studios.",
    pricingModel: "$49/month",
    competition: "Notion client portals and Moxie. Both take real setup for each client.",
    competitiveAdvantage: "Simple enough to send a client without training them.",
  },
  {
    id: "op-3",
    opportunityRank: 3,
    title: "TaxDeduct AI",
    oneLiner: "Finds business write-offs for digital creators.",
    opportunityScore: 74,
    mvpComplexity: "High" as "Low" | "Medium" | "High",
    targetPersona: "Freelancers who do their own taxes.",
    coreProblem: "People miss deductions because tracking them is tedious.",
    keyFeatures: ["Bank connection", "Automatic expense sorting", "Quarterly estimates", "Export for your accountant"],
    audienceEvidence: "41 comments asking how to handle expenses and quarterly taxes.",
    pricingModel: "$19/month",
    competition: "QuickBooks Self-Employed and Keeper, both built around salaried side income.",
    competitiveAdvantage: "Built for creator income, which general tax apps handle poorly.",
  },
];

export const pitchDraft = {
  creatorName: "Marcus Chen",
  subject: "Marcus, 3 software ideas your audience is already asking for",
  bodyText:
    "Hey Marcus,\n\nThanks for the quick reply. We went through your last 20 videos and the comments underneath them. Three ideas kept coming up:\n\n1. RateCraft OS: a rate calculator and proposal builder for solo creatives. $29/month or $199 lifetime.\n2. ClientScope Studio: a client portal that stops scope creep. $49/month.\n3. TaxDeduct AI: finds business write-offs for digital creators. $19/month.\n\nThe mockups are attached. Our pick is RateCraft, since 214 of your viewers have asked about pricing in the last 90 days.\n\nWe fund and build it, and you keep 50%. Which one would you want to put your name on?\n\nBest,\nHyejee",
};

const baseProject = {
  id: "proj_ratecraft_01",
  slug: "ratecraft",
  title: "RateCraft OS",
  subtitle: "A rate calculator and proposal builder for solo creatives",
  creator: { displayName: "Marcus Chen", firstName: "Marcus", platform: "YouTube", followers: "340K" },
  sprintDay: 9,
  totalSprintDays: 14,
  validationGoal: { targetRevenue: 5000, currentRevenue: 4120, targetPresales: 50, currentPresales: 38, percent: 82.4 },
  validationResult: { actualRevenue: 5640, presales: 52, conversion: "5.2%", result: "PASS" },
  blockers: [
    { id: "b-1", title: "Apple Pay can't ship until you approve it", waitingOn: "You", since: "35 minutes" },
    { id: "b-2", title: "Stripe needs to verify the domain for Apple Pay", waitingOn: "CoLaunch team", since: "1 day" },
  ],
  metrics: {
    presaleRevenue: "$4,120",
    creatorSplitShare: "$2,060",
    totalCustomers: 38,
    waitlistSignups: 312,
    conversionRate: "4.6%",
    pageviews: 1840,
    trafficAttribution: [
      { source: "YouTube", visits: 1120, conversion: "5.1%", revenue: "$2,890", share: 70 },
      { source: "Instagram Stories", visits: 480, conversion: "3.8%", revenue: "$970", share: 24 },
      { source: "Newsletter", visits: 240, conversion: "3.2%", revenue: "$260", share: 6 },
    ],
  },
  concept: {
    oneLiner: "The rate calculator and proposal builder for solo creatives.",
    targetPersona: "Freelance designers, engineers and consultants charging $3K to $15K a project.",
    pricing: "$29/month or $199 lifetime Founder Pass",
    coreHypothesis: "Solo consultants will pay $199 upfront to stop undercharging.",
  },
  assets: [
    { name: "RateCraft hero mockup", type: "Image", size: "2.4 MB" },
    { name: "Audience comments report", type: "PDF", size: "840 KB" },
    { name: "50/50 partnership agreement", type: "Contract", size: "120 KB" },
  ],
  tasks: [
    { id: "t-1", title: "Create the 14-day social content pack", assigneeRole: "ai", status: "completed", dueDate: "Day 1" },
    { id: "t-2", title: "Publish the landing page", assigneeRole: "colaunch", status: "completed", dueDate: "Day 2" },
    { id: "t-3", title: "Connect bank account with Stripe", assigneeRole: "creator", status: "completed", dueDate: "Day 3" },
    { id: "t-4", title: "Post the Day 1 announcement story", assigneeRole: "creator", status: "completed", dueDate: "Day 4" },
    { id: "t-5", title: "Test new mobile checkout copy", assigneeRole: "ai", status: "in_progress", dueDate: "Day 9" },
    { id: "t-6", title: "Post YouTube poll on pricing problems", assigneeRole: "creator", status: "todo", dueDate: "Day 9" },
    { id: "t-7", title: "Write the Day 14 results summary", assigneeRole: "ai", status: "todo", dueDate: "Day 14" },
  ],
  aiActivity: [
    { id: "act-1", summary: "Add Apple Pay to the mobile checkout", details: "YouTube visitors convert at 5.1% and Instagram visitors at 3.8%. Most Instagram visitors are on phones, so one-tap payment should close the gap.", requiresApproval: true, isApproved: false, timestamp: "35 minutes ago" },
    { id: "act-2", summary: "Passed 80% of the $5,000 goal", details: "$4,120 confirmed through Stripe from 38 Founder Pass reservations.", requiresApproval: false, isApproved: false, timestamp: "3 hours ago" },
    { id: "act-3", summary: "Sent Marcus his Day 9 checklist", details: "Emailed a magic link with the YouTube poll copy ready to use.", requiresApproval: false, isApproved: false, timestamp: "6 hours ago" },
  ],
};

export type PreviewProject = typeof baseProject;

const taxDeduct: PreviewProject = {
  ...baseProject,
  id: "proj_taxdeduct_01",
  slug: "taxdeduct",
  title: "TaxDeduct AI",
  subtitle: "Finds business write-offs for digital creators",
  creator: { displayName: "Sarah Lindqvist", firstName: "Sarah", platform: "Instagram", followers: "185K" },
  sprintDay: 4,
  validationGoal: { targetRevenue: 5000, currentRevenue: 2680, targetPresales: 50, currentPresales: 24, percent: 53.6 },
};

export const projectList = [
  { slug: "ratecraft", title: "RateCraft OS", tagline: "A rate calculator and proposal builder for solo creatives", creatorName: "Marcus Chen", platform: "YouTube", phase: "validate" as const, revenue: 4120, goal: 5000, percent: 82.4, dayLabel: "Day 9 of 14", daysLeft: 5, customers: 38 },
  { slug: "taxdeduct", title: "TaxDeduct AI", tagline: "Finds business write-offs for digital creators", creatorName: "Sarah Lindqvist", platform: "Instagram", phase: "validate" as const, revenue: 2680, goal: 5000, percent: 53.6, dayLabel: "Day 4 of 14", daysLeft: 10, customers: 24 },
];

export function getProject(slug: string): PreviewProject {
  return slug === "taxdeduct" ? taxDeduct : baseProject;
}

export const validationPlan = {
  icp_definition: "Solo designers, developers and consultants charging $3K to $15K a project who quote by gut feel today.",
  core_offer: "Lifetime Founder Pass for $199, limited to 50 people, fully refunded if the goal isn't met.",
  target_price: 199,
  problem: "They guess their prices and lose hours writing proposals that go nowhere.",
  test_method: "Presale on a landing page, promoted only through the creator's own channels.",
  validation_period: "14 days",
  success_threshold: "$5,000 in presales within 14 days",
  sprint_schedule: [
    { dayRange: "Days 1 to 3", focus: "Announce", channelAction: "Pinned YouTube post and Instagram stories" },
    { dayRange: "Days 4 to 7", focus: "Show the problem", channelAction: "Walkthrough video on a real project quote" },
    { dayRange: "Days 8 to 11", focus: "Build momentum", channelAction: "Newsletter feature and a live Q&A" },
    { dayRange: "Days 12 to 14", focus: "Final push", channelAction: "Countdown stories and last call" },
  ],
  hypotheses: [
    "Solo consultants will pay $199 upfront",
    "YouTube viewers convert better than Instagram followers",
    "Pricing pain matters more to them than proposal design",
  ],
};

export const campaignAssets = {
  product: [
    { label: "Name", value: "RateCraft OS" },
    { label: "Branding", value: "Red and cream, with a simple wordmark" },
    { label: "Positioning", value: "The pricing tool for solo creatives who hate guessing" },
    { label: "Copy", value: "Stop guessing your rates. Price by value, not panic." },
    { label: "Pricing", value: "$199 Founder Pass, then $29 a month" },
  ],
  ready: ["Landing page", "Checkout and presales", "Waitlist", "Analytics", "Tracking links", "Survey: 5 questions after checkout", "Feedback form for backers"],
};

export const diagnostic = {
  overall_health_score: 78,
  drop_off_stage: "Checkout started, not finished",
  primary_blocker: "58 people started checkout and 38 finished. Most of the drop-off is on phones.",
  recommendations: [
    { type: "Landing page", summary: "Add Apple Pay", action: "One-tap payment on the mobile checkout.", projectedImpact: "About 6 more presales", prepared: true },
    { type: "Messaging", summary: "Move the refund promise up", action: "Show the guarantee next to the price button.", projectedImpact: "About 3 more presales", prepared: false },
    { type: "Creator content", summary: "One more Instagram story", action: "Share a real quote before and after RateCraft.", projectedImpact: "About 4 more presales", prepared: false },
  ],
};

export const prd = {
  version: "v1.0",
  executive_summary: "A focused first version: the calculator, a 3-tier proposal builder and Stripe deposits. Everything else waits until after beta.",
  sprint_milestones: [
    { sprint: 1, name: "Foundation", deliverables: ["Accounts and login", "Database", "Stripe setup"] },
    { sprint: 2, name: "Calculator", deliverables: ["Rate engine", "Market data", "Saved quotes"] },
    { sprint: 3, name: "Proposals", deliverables: ["3-tier builder", "Share link", "PDF export"] },
    { sprint: 4, name: "Beta", deliverables: ["Deposits", "Onboarding", "Invite backers"] },
  ],
  core_features: [
    { feature: "Rate calculator", priority: "Must have" },
    { feature: "3-tier proposals", priority: "Must have" },
    { feature: "Stripe deposits", priority: "Must have" },
    { feature: "Multi-currency", priority: "Later" },
  ],
  spec_summary: [
    { label: "Customer", value: "Solo creatives charging $3K to $15K a project" },
    { label: "Problem", value: "They guess their prices and lose hours on proposals" },
    { label: "User flow", value: "Enter a job, get a price, send a 3-tier proposal, collect a deposit" },
    { label: "Screens", value: "Calculator, proposal builder, client list, settings" },
  ],
  technical_summary: [
    { label: "Architecture", value: "Web app, Postgres database, Stripe webhooks" },
    { label: "Database", value: "Users, quotes, proposals, clients, payments" },
    { label: "Dependencies", value: "Stripe account approved before week 4" },
    { label: "Acceptance", value: "Quote to paid deposit in under 5 minutes, on phone and desktop" },
  ],
  mvp_in: ["Rate calculator", "3-tier proposal builder", "Stripe deposits", "Client proposal tracking"],
  mvp_out: ["Team accounts", "Multi-currency", "Third-party integrations"],
  markdown_content:
    "RateCraft OS: Product Spec v1.0\n\nCustomer\nSolo creatives charging $3K to $15K a project.\n\nProblem\nThey guess their prices and lose hours on proposals.\n\nFeatures\nRate calculator, 3-tier proposal builder, Stripe deposits, client proposal tracking.\n\nUser flows\nEnter a job, get a price, send a 3-tier proposal, collect a deposit.\n\nScreens\nCalculator, proposal builder, client list, settings.\n\nIntegrations\nStripe and transactional email.\n\nPayments\nStripe deposits and Founder Pass redemption.\n\nAuthentication\nEmail link sign-in.\n\nAnalytics\nActivation, proposals sent, deposits collected.",
  technical_markdown:
    "RateCraft OS: Technical Plan v1.0\n\nArchitecture\nWeb app, Postgres database, Stripe webhooks.\n\nDatabase\nUsers, quotes, proposals, clients, payments.\n\nEngineering tasks\n34 tasks across 4 weeks.\n\nDependencies\nStripe account approved before week 4.\n\nAcceptance criteria\nQuote to paid deposit in under 5 minutes, on phone and desktop.\n\nMilestones\nFoundation, Calculator, Proposals, Beta.",
};

export const buildProgress = {
  weekLabel: "Week 3 of 4",
  work: [
    { title: "Accounts and login", owner: "ai", status: "done" },
    { title: "Database and saved quotes", owner: "ai", status: "done" },
    { title: "Rate engine", owner: "ai", status: "done" },
    { title: "Proposal share links", owner: "ai", status: "in_progress" },
    { title: "PDF export", owner: "ai", status: "todo" },
    { title: "Architecture review", owner: "human", status: "done" },
    { title: "Stripe deposits and webhooks", owner: "human", status: "in_progress" },
    { title: "Fix for the iPhone slider bug", owner: "human", status: "in_progress" },
    { title: "Security review", owner: "human", status: "todo" },
  ],
  checks: [
    { label: "Automated tests", value: "212 of 218", note: "passing" },
    { label: "QA", value: "2 open", note: "Neither one blocks beta" },
    { label: "Staging", value: "Build 41", note: "Deployed 3 hours ago" },
  ],
};

export const betaFeedback = {
  stats: { invited: 38, active: 34, items: 49, averageRating: 4.8 },
  retestSummary: "Build 42 is on staging with the first fixes. The testers who reported each issue are retesting now.",
  clusters: [
    { category: "Confusion", severity: "medium", ticketCount: 23, clusterTitle: "First-run setup is unclear", sampleQuote: "Took me a while to find where to enter my costs.", suggestedTask: "Add a 3-step setup on first login", fixStatus: "Retesting on build 42", fixTone: "amber" as const },
    { category: "Feature", severity: "medium", ticketCount: 11, clusterTitle: "Quotes in GBP and EUR", sampleQuote: "Most of my European clients want quotes in Euros.", suggestedTask: "Add a currency setting per proposal", fixStatus: "Planned after launch", fixTone: "neutral" as const },
    { category: "Bug", severity: "high", ticketCount: 9, clusterTitle: "Slider jumps on iPhone", sampleQuote: "On my iPhone the slider jumps when I zoom into the proposal tiers.", suggestedTask: "Fix touch handling on the rate slider", fixStatus: "Retest passed", fixTone: "green" as const },
    { category: "Objection", severity: "medium", ticketCount: 6, clusterTitle: "Monthly price feels high at first", sampleQuote: "$29 a month is a lot before I've landed a client with it.", suggestedTask: "Add a worked example of one recovered quote to onboarding", fixStatus: "Retesting on build 42", fixTone: "amber" as const },
  ],
};

export const readiness = {
  readiness_score: 91,
  bug_resolution_rate: "96%",
  beta_satisfaction_rating: "4.8 / 5",
  core_journey_completion_rate: "87%",
  infrastructure_uptime: "99.98%",
  audit_summary: "27 of 28 bugs are fixed and nothing is blocking launch. The one open bug is cosmetic.",
};

export const launchSuite = {
  liveTelemetry: { activeVisitorsNow: 428, conversionRateLaunchWeek: "6.2%", revenueToday: "$2,840", totalLaunchRevenue: "$14,680" },
  liveOrders: [
    { id: "o1", buyerName: "Klaus Weber", planName: "Founder Pass", amountFormatted: "$199", timestampAgo: "Just now" },
    { id: "o2", buyerName: "Aaliyah Patel", planName: "Pro, monthly", amountFormatted: "$29", timestampAgo: "3 min ago" },
    { id: "o3", buyerName: "Ryan Miller", planName: "Founder Pass", amountFormatted: "$199", timestampAgo: "7 min ago" },
  ],
  strategy: [
    { label: "Launch date", value: "Tuesday, January 12" },
    { label: "Channels", value: "YouTube, Instagram, newsletter and community" },
    { label: "Offers", value: "First month free for the waitlist. Founder Pass holders already have lifetime access." },
    { label: "Messaging", value: "Never freeze when a client asks your rate" },
    { label: "Schedule", value: "Day 1 video and stories, Day 2 newsletter, Day 5 demo, Day 7 thank-you" },
  ],
  colaunchChecklist: [
    { id: "c1", label: "Production deployment", done: true },
    { id: "c2", label: "Billing live in Stripe", done: true },
    { id: "c3", label: "Onboarding", done: true },
    { id: "c4", label: "Analytics", done: true },
    { id: "c5", label: "Attribution links", done: true },
    { id: "c6", label: "Error tracking", done: true },
    { id: "c7", label: "Support inbox", done: true },
    { id: "c8", label: "FAQs published", done: false },
  ],
  creatorChecklist: [
    { id: "m1", label: "Approve the launch video script", done: true },
    { id: "m2", label: "Record the launch video", done: true },
    { id: "m3", label: "Schedule the newsletter", done: false },
    { id: "m4", label: "Save the 4 launch stories", done: false },
  ],
  stats: [
    { label: "On the site now", value: "428" },
    { label: "Signups", value: "1,284", note: "Since launch" },
    { label: "Activation", value: "62%", note: "Made a first quote" },
    { label: "Customers", value: "74" },
    { label: "Today", value: "$2,840" },
    { label: "Since launch", value: "$14,680" },
    { label: "Conversion", value: "6.2%" },
    { label: "Technical health", value: "1 issue", note: "Uptime 99.98%" },
  ],
  channels: [
    { channel: "Instagram", content: "Launch story, part 3", conversion: "8.2%", revenue: "$5,160", share: 35 },
    { channel: "YouTube", content: "Day 1 launch video", conversion: "6.4%", revenue: "$8,120", share: 55 },
    { channel: "Newsletter", content: "Launch email", conversion: "2.1%", revenue: "$1,400", share: 10 },
  ],
  manager: [
    {
      id: "instagram",
      kind: "Creator content",
      signals: ["Instagram: 8.2% paid conversion", "Newsletter: 2.1%"],
      action: "Recommend another Instagram Story tonight.",
      steps: [
        { name: "Content written", state: "done" as const },
        { name: "Creator task created", state: "done" as const },
        { name: "Tracking completion", state: "current" as const },
      ],
      draft: "Story 1: 74 of you joined RateCraft this week.\nStory 2: Here's what one of you just quoted with it. Up from $900 to $2,400.\nStory 3: Link in bio. First month free for this week only.",
    },
    {
      id: "checkout",
      kind: "Technical",
      signals: ["Checkout conversion dropped 31%", "Potential technical issue detected"],
      action: "Engineering task created.",
      steps: [
        { name: "Issue detected", state: "done" as const },
        { name: "Engineering task created", state: "done" as const },
        { name: "Human engineering on it", state: "current" as const },
      ],
      draft: null,
    },
  ],
  collateral: [
    { id: "video", title: "Day 1 launch video script", channel: "YouTube", body: "Hook: I priced my first client project at $400. It should have been $2,800.\n\nThen: show RateCraft working out a real quote on screen.\n\nCall to action: link is pinned in the top comment." },
    { id: "newsletter", title: "Launch newsletter", channel: "Newsletter", body: "Subject: It's live\n\nHey [First Name],\n\nRateCraft is open to everyone today. If you've ever frozen when a client asked your rate, this is for you." },
    { id: "stories", title: "4-part Instagram story", channel: "Instagram", body: "1. How much did you undercharge last year?\n2. Most freelancers leave $2,000 on every project.\n3. So I built this.\n4. Link in bio." },
    { id: "vip", title: "Message to early backers", channel: "Community", body: "Subject: You made this happen\n\nThanks for backing RateCraft before it existed. Your lifetime access is live now." },
    { id: "demo", title: "60-second product demo", channel: "YouTube", body: "Open on a blank quote. Type in a real job. Show the price appear, then send the 3-tier proposal in one click." },
    { id: "images", title: "Launch images and tracking links", channel: "All channels", body: "3 product images sized for stories and posts.\n\nYouTube: https://co-launch.app/p/ratecraft?ref=yt\nInstagram: https://co-launch.app/p/ratecraft?ref=ig\nNewsletter: https://co-launch.app/p/ratecraft?ref=newsletter" },
  ],
};

export const postLaunch = {
  reporting_period: "First 30 days",
  gmv_formatted: "$38,420",
  paying_customers_count: 214,
  net_revenue_formatted: "$19,210",
  creator_payout_formatted: "$19,210",
  ltv_cac: "10.4x",
  conversion_formatted: "6.4%",
  creator_performance: ["14 of 14 launch posts published", "The launch video drove the most sales", "Stories converted best per visit"],
  product_usage: ["62% made a first quote in week one", "3.4 proposals per active user", "71% still active after 30 days"],
  technical_issues: ["Checkout drop on Day 3, fixed in 4 hours", "27 of 28 beta bugs closed", "No downtime"],
  learnings: ["Stories sell better than the newsletter for this audience", "Showing a real quote beats listing features", "Customers want multi-currency next"],
  recommended_action: { id: "scale", reason: "Customers are staying and each channel returns at least 8x what it costs, so more spend should pay for itself." },
  executive_summary: "A strong first month. YouTube brings in most of the revenue and customers are staying. The next gains are in the most requested features.",
  channel_performance: [
    { channel: "YouTube", customers: 132, revenue: "$24,100", roi: "14x" },
    { channel: "Instagram", customers: 58, revenue: "$9,320", roi: "8x" },
    { channel: "Newsletter", customers: 24, revenue: "$5,000", roi: "11x" },
  ],
  top_feature_requests: [
    { feature: "Multi-currency quotes", request_count: 64, impact: "High" },
    { feature: "Team seats", request_count: 41, impact: "Medium" },
    { feature: "Contract templates", request_count: 29, impact: "Medium" },
  ],
};

export type PortalTask = {
  id: string;
  day: number;
  phaseLabel: string;
  title: string;
  objective: string;
  channel: "YouTube" | "Instagram" | "Newsletter" | "Community";
  time: string;
  script: string;
  isCompleted: boolean;
  poll?: { question: string; options: string[] };
  image?: { variant: number; caption: string };
  addedBy?: string;
};

export const portalTasks: PortalTask[] = [
  { id: "task_day1", day: 1, phaseLabel: "Launch", title: "Pin the announcement on YouTube", objective: "Tell your audience about RateCraft and open the first 50 Founder Passes.", channel: "YouTube" as const, time: "5 min", script: "For the past few months my team and I have been building software with CoLaunch: RateCraft OS, the rate calculator that means you never underprice a client again. We just opened 50 Founder Passes for this community. Lock in lifetime access: https://co-launch.app/p/ratecraft?ref=yt", isCompleted: true },
  { id: "task_day3", day: 3, phaseLabel: "The problem", title: "Instagram story: the 3 costliest proposal mistakes", objective: "Use real audience quotes about ghosted proposals.", channel: "Instagram" as const, time: "5 min", script: "Story 1: How many of you spent 4 hours on a proposal this week and got ghosted?\nStory 2: The problem isn't your portfolio. It's quoting hours instead of value.\nStory 3: Here's the tool I built to fix this. Tap the link to claim 1 of the 50 Founder Passes.\nLink: https://co-launch.app/p/ratecraft?ref=ig", isCompleted: true, image: { variant: 1, caption: "Story image: 3-tier proposal" } },
  { id: "task_day5", day: 5, phaseLabel: "Proof", title: "YouTube walkthrough: pricing a real project", objective: "Show the calculator on a real quote from a subscriber.", channel: "YouTube" as const, time: "45 min", script: "Hook: In this video I'm taking a real $3,500 branding quote from a subscriber and running it through RateCraft. Watch how we find $2,100 in unbilled value.\nMid-roll: RateCraft is in presale right now. Link is pinned in the top comment.", isCompleted: true },
  { id: "task_day8", day: 8, phaseLabel: "Momentum", title: "Newsletter: behind the scenes", objective: "Explain the partnership and the money-back guarantee.", channel: "Newsletter" as const, time: "10 min", script: "Subject: Why I stopped selling courses and built software instead\n\nHey [First Name],\n\nCourses teach theory, but software fixes the problem for good. We need 50 founding backers to start building. If we don't hit $5,000, every dollar is refunded. 38 people have already joined: https://co-launch.app/p/ratecraft?ref=newsletter", isCompleted: true },
  { id: "task_day9", day: 9, phaseLabel: "Momentum", title: "Post the YouTube poll on pricing", objective: "Find out which pricing problem your viewers feel most, and point them to the presale.", channel: "YouTube" as const, time: "2 min", script: "Post this as a community poll, and pin this comment under it:\n\nI'm building this with CoLaunch right now. 12 Founder Passes left: https://co-launch.app/p/ratecraft?ref=yt", isCompleted: false, poll: { question: "What's the hardest part of pricing client work?", options: ["Working out the number", "Saying it out loud", "Writing the proposal", "Getting them to pay"] } },
  { id: "task_day10", day: 10, phaseLabel: "Q&A", title: "Run a pricing Q&A with your community", objective: "Answer questions about exports, retainers and the roadmap.", channel: "Community" as const, time: "20 min", script: "Drop your hardest client quoting questions below. I'm testing the RateCraft calculator live today!\n\nTalking point: Founder Pass backers get a direct vote in what we build next.", isCompleted: false },
  { id: "task_day12", day: 12, phaseLabel: "Countdown", title: "48-hour countdown story", objective: "Remind people the presale is about to close.", channel: "Instagram" as const, time: "5 min", script: "Final 48 hours. The RateCraft presale closes Friday, and only 12 passes are left. Save $150 and lock in lifetime access: https://co-launch.app/p/ratecraft?ref=ig", isCompleted: false, image: { variant: 0, caption: "Story image: the calculator" } },
  { id: "task_day14", day: 14, phaseLabel: "Last call", title: "Last call: closes at midnight", objective: "Cross the $5,000 line and thank your backers.", channel: "Community" as const, time: "5 min", script: "Midnight tonight the Founder Pass closes for good. Huge thank you to everyone who backed RateCraft. Last chance: https://co-launch.app/p/ratecraft?ref=community", isCompleted: false },
];

export const launchPortal: { currentDay: number; totalDays: number; tasks: PortalTask[] } = {
  currentDay: 3,
  totalDays: 7,
  tasks: [
    { id: "launch_video", day: 1, phaseLabel: "Launch", title: "Publish the launch video", objective: "Open RateCraft to everyone.", channel: "YouTube", time: "10 min", script: "Hook: I priced my first client project at $400. It should have been $2,800.\n\nLink is pinned in the top comment: https://co-launch.app/p/ratecraft?ref=yt", isCompleted: true },
    { id: "launch_news", day: 2, phaseLabel: "Launch", title: "Send the launch newsletter", objective: "Reach the people who read every issue.", channel: "Newsletter", time: "5 min", script: "Subject: It's live\n\nRateCraft is open to everyone today. If you've ever frozen when a client asked your rate, this is for you: https://co-launch.app/p/ratecraft?ref=newsletter", isCompleted: true },
    { id: "launch_story", day: 3, phaseLabel: "Launch", title: "One more Instagram Story tonight", objective: "Instagram is converting best this week at 8.2%, so we wrote one more for you.", channel: "Instagram", time: "5 min", script: "Story 1: 74 of you joined RateCraft this week.\nStory 2: Here's what one of you just quoted with it. Up from $900 to $2,400.\nStory 3: Link in bio. First month free for this week only.\nLink: https://co-launch.app/p/ratecraft?ref=ig", isCompleted: false, image: { variant: 1, caption: "Story image: a real proposal" }, addedBy: "Added by your launch manager" },
    { id: "launch_demo", day: 5, phaseLabel: "Launch", title: "Share the 60-second demo", objective: "Show a real quote from start to finish.", channel: "YouTube", time: "5 min", script: "Open on a blank quote. Type in a real job. Show the price appear, then send the 3-tier proposal in one click.", isCompleted: false },
    { id: "launch_thanks", day: 7, phaseLabel: "Launch", title: "Thank your early backers", objective: "Close the week with the people who made it happen.", channel: "Community", time: "5 min", script: "Thanks for backing RateCraft before it existed. You voted on what we built, and it's live because of you.", isCompleted: false },
  ],
};

export const landing = {
  hero: {
    badge: "50 Founder Passes only",
    headline: "Stop guessing your rates. Price by value, not panic.",
    subheadline: "The calculator and proposal builder for solo creatives charging $3K to $15K a project. Never leave four figures on the table again.",
    ctaText: "Claim Founder Pass, $199",
    presaleGoal: 50,
    currentPresales: 38,
  },
  mockups: {
    title: "Replace the spreadsheet",
    subtitle: "Built for speed, confidence and getting the client to say yes.",
    images: [
      { caption: "Enter the scope, market and risk, and get a price you can defend.", tag: "Calculator" },
      { caption: "Turn it into a 3-tier proposal with a 50% deposit in one click.", tag: "Proposals" },
      { caption: "See every open proposal and deposit in one place.", tag: "Clients" },
    ],
  },
  problemSolution: {
    title: "What underpricing really costs",
    subtitle: "Taken straight from what Marcus's audience says.",
    pairs: [
      { problem: "You send a ballpark by email and the client goes quiet when they see the price.", solution: "3-tier proposals show the value before the price.", stat: "34% more proposals accepted" },
      { problem: "You bill by the hour, so getting faster means earning less.", solution: "Price the outcome and your effective rate goes up.", stat: "2.4x effective hourly rate" },
      { problem: "Scope creep eats your margin and you have no way to push back.", solution: "Change orders with automatic deposit adjustments.", stat: "Every extra gets billed" },
    ],
  },
  creatorEndorsement: {
    creatorName: "Marcus Chen",
    creatorHandle: "marcuschen_systems",
    roleTitle: "Systems consultant, 340K subscribers",
    quote: "Hundreds of designers ask me every week how to quote a job without losing it. I teamed up with CoLaunch to build the exact tool I use in my own agency.",
    whyBuilt: "Built by Marcus Chen and CoLaunch with direct community feedback.",
  },
  pricing: {
    tierName: "Lifetime Founder Access",
    priceFormatted: "$199",
    originalPriceFormatted: "$349/year",
    perks: [
      "Lifetime access to the RateCraft calculator",
      "3-tier proposal builder with PDF and link export",
      "Private beta group with Marcus",
      "A vote on every future feature",
      "A 1-on-1 onboarding session",
      "Full refund if the goal isn't reached",
    ],
    guaranteeText: "If we don't reach 50 founders in 14 days, every reservation is refunded to your card automatically.",
  },
  faq: [
    { question: "What exactly is a Founder Pass?", answer: "It's an early-backer reservation. You pay $199 once for lifetime access instead of the future $349 a year, and you get a say in what we build." },
    { question: "When do I get access?", answer: "The 4-week build starts right after the 14-day presale closes. Founder Pass holders get beta invites in week 3." },
    { question: "What if the project doesn't reach $5,000?", answer: "If we don't reach 50 reservations in 14 days, every $199 is refunded in full, automatically." },
    { question: "Does it work for retainers and fixed-price work?", answer: "Yes. It handles fixed projects, monthly retainers and value-share deals." },
    { question: "How is payment handled?", answer: "Payments go through Stripe. We never store your card details." },
  ],
};
