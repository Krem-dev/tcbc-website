export const BLOG_QUERY = `
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    image,
    author,
    category,
    publishedAt
  }
`;

export const BLOG_BY_SLUG_QUERY = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    image,
    author,
    category,
    publishedAt
  }
`;

export const SERMONS_QUERY = `
  *[_type == "sermon"] | order(date desc) {
    _id,
    title,
    slug,
    speaker,
    excerpt,
    series,
    videoUrl,
    date,
    description
  }
`;

export const SERMON_BY_SLUG_QUERY = `
  *[_type == "sermon" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    speaker,
    excerpt,
    series,
    videoUrl,
    date,
    description
  }
`;

export const EVENTS_QUERY = `
  *[_type == "event"] | order(startDate asc) {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    category,
    image,
    isFeatured
  }
`;

export const EVENTS_BY_DATE_QUERY = `
  *[_type == "event" && startDate >= $startDate && startDate <= $endDate] | order(startDate asc) {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    category,
    image,
    isFeatured
  }
`;

export const MINISTRIES_QUERY = `
  *[_type == "ministry"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    highlights,
    ctaLabel,
    ctaHref,
    icon,
    order
  }
`;

export const PRAYER_REQUESTS_QUERY = `
  *[_type == "prayerRequest"] | order(submittedAt desc) {
    _id,
    name,
    email,
    phone,
    category,
    request,
    isConfidential,
    status,
    submittedAt
  }
`;

export const PRAYER_REQUESTS_BY_STATUS_QUERY = `
  *[_type == "prayerRequest" && status == $status] | order(submittedAt desc) {
    _id,
    name,
    email,
    phone,
    category,
    request,
    isConfidential,
    status,
    submittedAt
  }
`;
