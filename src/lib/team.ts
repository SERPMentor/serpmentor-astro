/** Team + testimonial data for the About page. */

export interface TeamMember {
  name: string;
  role: string;
  /** one-line "what they actually do" — shown in the homepage team spotlight */
  focus?: string;
  image: string;
  linkedin?: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "MD Saiful Islam",
    role: "Founder & Head of SEO",
    focus: "Sets strategy on every project · leads SEO at a competitive finance publisher · 17 years in search",
    image: "https://cms.serpmentor.com/wp-content/uploads/2026/04/SAIFUL-AI-SEO-EXPERT.webp",
    linkedin: "https://www.linkedin.com/in/serpmentor/",
  },
  {
    name: "Sharif Mohammad Ashik",
    role: "Director of Operations",
    focus: "Runs delivery and client communication · keeps every engagement on scope and on time",
    image: "https://cms.serpmentor.com/wp-content/uploads/2025/11/ASHIK.jpeg",
    linkedin: "https://www.linkedin.com/in/sharifashik/",
  },
  {
    name: "Mohammad A Mahmud",
    role: "Director of Client Strategy",
    focus: "Owns the roadmap for e-commerce and SaaS accounts · turns audits into prioritised plans",
    image: "https://cms.serpmentor.com/wp-content/uploads/2025/11/Mohammad-A-Mahmud-.png",
    linkedin: "https://www.linkedin.com/in/mohammad-trueseo/",
  },
  {
    name: "HM Towhidul Islam",
    role: "Senior Technical SEO Lead",
    focus: "Crawl budget, indexation, structured data and Core Web Vitals on large sites",
    image: "https://cms.serpmentor.com/wp-content/uploads/2025/01/Himel-SERP-Mentor-1.webp",
    linkedin: "https://www.linkedin.com/in/hm-towhidul-islam-3a0856344/",
  },
  {
    name: "Tanbir Habib Riyad",
    role: "SEO Trainer & Content Strategist",
    focus: "Builds topic clusters and editorial calendars · trains client teams to run SEO in-house",
    image: "https://cms.serpmentor.com/wp-content/uploads/2025/01/RIYAD-SERP-MENTOR-2.webp",
    linkedin: "https://www.linkedin.com/in/tanvir-habib-riyad-393599277/",
  },
  {
    name: "Mahdi Hassan",
    role: "Web Developer & Site Speed",
    focus: "Ships SEO-first builds and fixes · performance, schema and migration work",
    image: "https://cms.serpmentor.com/wp-content/uploads/2025/01/4-6776edb226810.webp",
    linkedin: "https://www.linkedin.com/in/mahdi-hassan-sabbir/",
  },
  {
    name: "Milon Khan",
    role: "Link Building & Digital PR Lead",
    focus: "Editorial outreach, link-gap analysis and reputation-safe placements",
    image: "https://cms.serpmentor.com/wp-content/uploads/2025/01/5-6776edb345bca.webp",
    linkedin: "https://www.linkedin.com/in/milon-ahmed-khan/",
  },
  {
    name: "Borhan Uddin Alif",
    role: "Content Writer & Editor",
    focus: "Turns briefs into guides that read well for people and answer engines",
    image: "https://cms.serpmentor.com/wp-content/uploads/2025/01/2-6784e760829a8.webp",
    linkedin: "https://www.linkedin.com/in/borhan-uddin-alif-247b3a1b7/",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "It was a delight to work with Saiful and his team. Their expertise and understanding of the SEO industry is incredible. They explained the complicated side of SEO and worked tirelessly on my company's website. Rapid responses and real expertise, which is hard to find. I'd recommend them to anyone looking for an SEO consultant.",
    name: "James Carter",
    title: "Business owner",
  },
  {
    quote:
      "I strongly recommend SERP Mentor. They significantly improved our website's presence and search rankings, and the increased traffic and performance speak for themselves. Excellent communication and targeted methods made the whole process run smoothly. A great partner for any business trying to grow online.",
    name: "Robert John",
    title: "Marketing director",
  },
  {
    quote:
      "SERP Mentor has genuinely transformed our online visibility. Saiful's team brought actionable strategies that led to visible improvements within months. Their commitment to long-term SEO success is what makes them stand out. Highly recommend for sustainable growth.",
    name: "Maria Marry",
    title: "Founder, TechFlow",
  },
];

export const OFFICES = [
  { country: "Sweden", address: "Von Lingens Väg 31, 213 70 Malmö" },
  { country: "Bangladesh", address: "Jamuna Tower, West Shantibag, Demra, Dhaka" },
];
