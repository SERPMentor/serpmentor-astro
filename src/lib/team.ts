/** Team + testimonial data for the About page. */

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "MD Saiful Islam",
    role: "Founder & lead SEO strategist",
    image: "https://serpmentor.com/wp-content/uploads/2025/01/saiful-SERP-Mentor-3.webp",
    linkedin: "https://www.linkedin.com/in/serpmentor/",
  },
  {
    name: "Sharif Mohammad Ashik",
    role: "Director",
    image: "https://serpmentor.com/wp-content/uploads/2025/11/ASHIK.jpeg",
    linkedin: "https://www.linkedin.com/in/sharifashik/",
  },
  {
    name: "Mohammad A Mahmud",
    role: "Director",
    image: "https://serpmentor.com/wp-content/uploads/2025/11/Mohammad-A-Mahmud-.png",
    linkedin: "https://www.linkedin.com/in/mohammad-trueseo/",
  },
  {
    name: "HM Towhidul Islam",
    role: "Senior SEO expert",
    image: "https://serpmentor.com/wp-content/uploads/2025/01/Himel-SERP-Mentor-1.webp",
  },
  {
    name: "Tanbir Habib Riyad",
    role: "SEO trainer & mentor",
    image: "https://serpmentor.com/wp-content/uploads/2025/01/RIYAD-SERP-MENTOR-2.webp",
    linkedin: "https://www.linkedin.com/in/tanvir-habib-riyad-393599277/",
  },
  {
    name: "Mahdi Hassan",
    role: "Web developer",
    image: "https://serpmentor.com/wp-content/uploads/2025/01/4-6776edb226810.webp",
    linkedin: "https://www.linkedin.com/in/mahdi-hassan-sabbir/",
  },
  {
    name: "Milon Khan",
    role: "SEO expert",
    image: "https://serpmentor.com/wp-content/uploads/2025/01/5-6776edb345bca.webp",
    linkedin: "https://www.linkedin.com/in/milon-ahmed-khan/",
  },
  {
    name: "Borhan Uddin Alif",
    role: "Content writer",
    image: "https://serpmentor.com/wp-content/uploads/2025/01/2-6784e760829a8.webp",
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
      "It was a delight to work with Saiful and his team. Their expertise and understanding of the SEO industry is incredible. They explained the complicated side of SEO and worked tirelessly on my company's website. Rapid responses and real expertise — hard to find. I'd recommend them to anyone looking for an SEO consultant.",
    name: "James Carter",
    title: "Business owner",
  },
  {
    quote:
      "I strongly recommend SERP Mentor. They significantly improved our website's presence and search rankings — the increased traffic and performance speak for themselves. Excellent communication and targeted methods made the whole process run smoothly. A great partner for any business trying to grow online.",
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
