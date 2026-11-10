import { CreatorScoreBreakdown, PlatformType } from "@/types/database.types";

export interface CreatorRawMetrics {
  platform: PlatformType;
  followerCount: number;
  engagementRate: number; // e.g. 3.8 for 3.8%
  postsPerMonth: number;
  sampleCommentsCount?: number;
  substantiveCommentsRatio?: number; // 0.0 to 1.0
  hasDigitalProducts?: boolean;
  hasMerchOrCourses?: boolean;
  hasSponsorsOrTechAffinity?: boolean;
}

export interface CreatorScoringResult {
  totalScore: number; // 0 to 100
  qualificationStatus: "qualified" | "review_needed" | "disqualified";
  breakdown: CreatorScoreBreakdown;
  summaryReason: string;
}

/**
 * CoLaunch Creator Scoring Algorithm (0-100 Scale)
 * Evaluates candidate creators against high-leverage software co-launch potential:
 * - Followers Sweet Spot (100K - 1M): Max 20 pts
 * - Engagement Rate vs Niche Benchmark: Max 25 pts
 * - Posting Cadence & Consistency: Max 15 pts
 * - Audience Authenticity & Comment Quality: Max 20 pts
 * - Commercial Potential & Digital Affinity: Max 20 pts
 */
export function calculateCreatorScore(metrics: CreatorRawMetrics): CreatorScoringResult {
  // 1. Follower Sweet Spot (Max 20 pts)
  // Target: 100K - 1M followers.
  // 100K-300K is the absolute sweet spot (high trust, accessible, responsive).
  let followersScore = 0;
  const followers = metrics.followerCount;

  if (followers >= 100000 && followers <= 350000) {
    followersScore = 20;
  } else if (followers > 350000 && followers <= 650000) {
    followersScore = 18;
  } else if (followers > 650000 && followers <= 1000000) {
    followersScore = 15;
  } else if (followers >= 50000 && followers < 100000) {
    followersScore = 10; // Micro-creator with breakout potential
  } else if (followers > 1000000 && followers <= 2000000) {
    followersScore = 8; // Large creator, often harder to sign without agency rep
  } else {
    followersScore = 4;
  }

  // 2. Engagement Rate vs Platform Benchmark (Max 25 pts)
  // Benchmarks: YouTube avg ~2.5%, IG avg ~1.8%, TikTok avg ~3.5%
  let engagementScore = 0;
  const eng = metrics.engagementRate;

  if (eng >= 5.0) {
    engagementScore = 25;
  } else if (eng >= 3.8) {
    engagementScore = 22;
  } else if (eng >= 2.8) {
    engagementScore = 18;
  } else if (eng >= 1.8) {
    engagementScore = 12;
  } else if (eng >= 1.0) {
    engagementScore = 6;
  } else {
    engagementScore = 2;
  }

  // 3. Posting Consistency (Max 15 pts)
  // Target: Regular weekly presence (8-16 posts/month across YT/IG/TikTok)
  let consistencyScore = 0;
  const ppm = metrics.postsPerMonth;

  if (ppm >= 8 && ppm <= 30) {
    consistencyScore = 15;
  } else if (ppm >= 4 && ppm < 8) {
    consistencyScore = 11;
  } else if (ppm >= 1 && ppm < 4) {
    consistencyScore = 6;
  } else {
    consistencyScore = 2; // Inactive or over-saturating
  }

  // 4. Comment Authenticity & Community Depth (Max 20 pts)
  let authenticityScore = 12; // Baseline
  if (metrics.substantiveCommentsRatio !== undefined) {
    authenticityScore = Math.round(metrics.substantiveCommentsRatio * 20);
  } else {
    // Inferred based on engagement authenticity
    if (eng > 3.0) authenticityScore = 18;
    else if (eng > 2.0) authenticityScore = 15;
  }

  // 5. Commercial Potential & Monetization Fit (Max 20 pts)
  let commercialScore = 8; // Baseline for general creators
  if (metrics.hasDigitalProducts) commercialScore += 6;
  if (metrics.hasMerchOrCourses) commercialScore += 4;
  if (metrics.hasSponsorsOrTechAffinity) commercialScore += 2;
  commercialScore = Math.min(20, commercialScore);

  // Compute Total Composite Score
  const totalScore = Math.min(
    100,
    Math.max(
      0,
      followersScore +
        engagementScore +
        consistencyScore +
        authenticityScore +
        commercialScore
    )
  );

  // Qualification Gate: >= 70 advances to qualified pipeline
  let qualificationStatus: "qualified" | "review_needed" | "disqualified" =
    "disqualified";
  let summaryReason = "";

  if (totalScore >= 70) {
    qualificationStatus = "qualified";
    summaryReason = `Prime co-launch target (${totalScore}/100). High engagement (${eng}%) with healthy posting consistency and verified commercial affinity.`;
  } else if (totalScore >= 55) {
    qualificationStatus = "review_needed";
    summaryReason = `Borderline candidate (${totalScore}/100). Solid follower count but engagement or consistency requires manual team review.`;
  } else {
    qualificationStatus = "disqualified";
    summaryReason = `Below qualification threshold (${totalScore}/100). Insufficient engagement or outside optimal 100K–1M sweet spot.`;
  }

  return {
    totalScore,
    qualificationStatus,
    breakdown: {
      followersScore,
      engagementScore,
      consistencyScore,
      authenticityScore,
      commercialScore,
    },
    summaryReason,
  };
}
