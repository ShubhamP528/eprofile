/**
 * Extracts relevant keywords from text components of a profile
 * @param title - Profile title/name
 * @param subtitle - Professional title/subtitle
 * @param bio - Profile biography
 * @param services - List of services offered
 * @param extraText - Additional text like seoDescription
 * @returns An array of unique keywords
 */
export function extractKeywords(
  title: string = "",
  subtitle: string = "",
  bio: string = "",
  services: { title: string }[] = [],
  extraText: string = ""
): string[] {
  // Use a Set to store unique keywords/phrases
  const uniqueKeywords = new Set<string>();

  // 1. Add key phrases first (high value)
  if (title && title.length > 2 && title.length < 40) {
    uniqueKeywords.add(title.toLowerCase().trim());
  }
  
  if (subtitle && subtitle.length > 2 && subtitle.length < 40) {
    uniqueKeywords.add(subtitle.toLowerCase().trim());
  }

  // 2. Add service titles as phrases
  services.forEach(service => {
    if (service.title && service.title.length > 2 && service.title.length < 30) {
      uniqueKeywords.add(service.title.toLowerCase().trim());
    }
  });

  // 3. Process individual words from all text
  const combinedText = [
    title,
    subtitle,
    bio,
    ...services.map(s => s.title),
    extraText
  ].join(" ").toLowerCase();

  // Remove special characters and split into words
  const words = combinedText
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 2);

  // Common stop words to filter out (words that don't add unique value)
  const stopWords = new Set([
     "and", "the", "for", "with", "from", "that", "this", "your", "have", "been",
     "was", "were", "are", "you", "can", "will", "should", "would", "about", "more",
     "best", "view", "share", "connect", "digital", "business", "card", "profile",
     "professional", "efficiently", "network", "online", "visit", "welcome", "contact",
     "information", "details", "click", "here", "work", "experience", "expertise"
  ]);

  // Process individual words
  words.forEach(word => {
    if (!stopWords.has(word) && !/^\d+$/.test(word)) {
      uniqueKeywords.add(word);
    }
  });

  // 4. Fallback if still too few keywords
  if (uniqueKeywords.size < 3) {
    ["portfolio", "vcard", "contact"].forEach(k => uniqueKeywords.add(k));
  }

  // Convert back to array and limit to reasonable number of keywords
  return Array.from(uniqueKeywords).slice(0, 15);
}
