export const samplePersona = {
  name: 'Aisha Verma',
  city: 'Bangalore',
  profession: 'Product Designer',
  instagram: '@aishavibes',
  linkedin: 'aisha-verma',
};

export const exposureNodes = [
  {
    id: 'instagram',
    label: 'Instagram',
    icon: 'Instagram',
    risk: 'high',
    color: '#FF4444',
    details: [
      { label: 'Location Exposure', value: 'City tagged in 23 posts', severity: 'high' },
      { label: 'Tagged Places', value: 'Koramangala, Indiranagar cafés', severity: 'high' },
      { label: 'Friend Network', value: '847 public followers visible', severity: 'medium' },
      { label: 'Routine Patterns', value: 'Posts every morning 8–9 AM', severity: 'high' },
    ],
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'Linkedin',
    risk: 'high',
    color: '#FF4444',
    details: [
      { label: 'Company', value: 'Works at DesignCraft Studios', severity: 'high' },
      { label: 'College', value: 'NID Ahmedabad, Batch of 2019', severity: 'medium' },
      { label: 'Employment History', value: '3 previous companies listed', severity: 'medium' },
      { label: 'Connections', value: '500+ connections public', severity: 'low' },
    ],
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    icon: 'Twitter',
    risk: 'medium',
    color: '#FF8C00',
    details: [
      { label: 'Opinions', value: 'Political views expressed openly', severity: 'medium' },
      { label: 'Interactions', value: 'Regular replies to local accounts', severity: 'low' },
      { label: 'Location Hints', value: 'Tweets mention Bangalore traffic', severity: 'medium' },
      { label: 'Active Hours', value: 'Most active 10 PM – 1 AM', severity: 'medium' },
    ],
  },
  {
    id: 'reddit',
    label: 'Reddit',
    icon: 'MessageSquare',
    risk: 'medium',
    color: '#FF8C00',
    details: [
      { label: 'Subreddits', value: 'r/bangalore, r/IndianDesigners', severity: 'medium' },
      { label: 'Post History', value: 'Asked about PG in Koramangala', severity: 'high' },
      { label: 'Interests', value: 'Design tools, mental health', severity: 'low' },
      { label: 'Writing Style', value: 'Identifiable vocabulary patterns', severity: 'medium' },
    ],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Groups',
    icon: 'MessageCircle',
    risk: 'medium',
    color: '#FF8C00',
    details: [
      { label: 'Group Names', value: '"NID Alumni 2019", "Koramangala Foodies"', severity: 'medium' },
      { label: 'Phone Exposure', value: 'Number visible to all group members', severity: 'high' },
      { label: 'Profile Photo', value: 'Visible to non-contacts', severity: 'medium' },
      { label: 'Status Updates', value: 'Location-tagged statuses', severity: 'medium' },
    ],
  },
  {
    id: 'food',
    label: 'Food Delivery Apps',
    icon: 'UtensilsCrossed',
    risk: 'high',
    color: '#FF4444',
    details: [
      { label: 'Delivery Zones', value: 'Home and office addresses inferred', severity: 'high' },
      { label: 'Late-Night Habits', value: 'Orders between 11 PM – 2 AM', severity: 'medium' },
      { label: 'Reviews', value: 'Public reviews with full name', severity: 'high' },
      { label: 'Favorite Places', value: 'Repeated orders from 3 restaurants', severity: 'medium' },
    ],
  },
  {
    id: 'upi',
    label: 'UPI Apps',
    icon: 'CreditCard',
    risk: 'medium',
    color: '#FF8C00',
    details: [
      { label: 'Transaction Names', value: 'Full name in payment receipts', severity: 'high' },
      { label: 'UPI ID', value: 'Contains real name pattern', severity: 'medium' },
      { label: 'Payment Frequency', value: 'Regular payments to same vendors', severity: 'low' },
      { label: 'Linked Number', value: 'Phone number exposed via UPI', severity: 'high' },
    ],
  },
  {
    id: 'google',
    label: 'Google Search',
    icon: 'Search',
    risk: 'high',
    color: '#FF4444',
    details: [
      { label: 'Search Results', value: 'Name returns 12+ relevant pages', severity: 'high' },
      { label: 'Cached Pages', value: 'Old blog with personal info found', severity: 'high' },
      { label: 'Image Search', value: 'Profile photos across platforms linked', severity: 'high' },
      { label: 'Public Documents', value: 'College project PDF with full name', severity: 'medium' },
    ],
  },
];

export const timelineData = [
  {
    day: 1,
    title: 'Social Discovery',
    description: 'Found Instagram profile and extracted city and workplace from bio and tagged posts.',
    icon: 'Instagram',
    severity: 'medium',
  },
  {
    day: 2,
    title: 'Identity Confirmation',
    description: 'Found LinkedIn profile and confirmed full identity, employment history, and college.',
    icon: 'Linkedin',
    severity: 'high',
  },
  {
    day: 3,
    title: 'Cross-Platform Linking',
    description: 'Reverse image search revealed Twitter and Reddit accounts using the same profile photo.',
    icon: 'Search',
    severity: 'high',
  },
  {
    day: 4,
    title: 'Location Mapping',
    description: 'Tagged locations on Instagram exposed commute patterns between home and office areas.',
    icon: 'MapPin',
    severity: 'high',
  },
  {
    day: 5,
    title: 'Social Circle Exposed',
    description: 'Mutual friends and tagged photos exposed social circle, neighborhood, and frequent hangouts.',
    icon: 'Users',
    severity: 'high',
  },
  {
    day: 6,
    title: 'Behavioral Patterns',
    description: 'Food delivery app reviews and check-ins exposed recurring locations and late-night habits.',
    icon: 'UtensilsCrossed',
    severity: 'medium',
  },
  {
    day: 7,
    title: 'Full Profile Reconstructed',
    description: 'Complete behavioral profile reconstructed: identity, location, routine, social circle, and habits.',
    icon: 'AlertTriangle',
    severity: 'critical',
  },
];

export const riskScores = {
  overall: 78,
  categories: [
    {
      name: 'Location Exposure',
      score: 85,
      level: 'high',
      description: 'Multiple platforms reveal your city, neighborhood, and frequent locations through tagged posts and check-ins.',
    },
    {
      name: 'Identity Exposure',
      score: 72,
      level: 'high',
      description: 'Your full name, workplace, and education are easily discoverable through LinkedIn and Google searches.',
    },
    {
      name: 'Routine Exposure',
      score: 68,
      level: 'medium',
      description: 'Posting habits, delivery orders, and commute patterns reveal your daily schedule.',
    },
    {
      name: 'Network Exposure',
      score: 55,
      level: 'medium',
      description: 'Public friend lists and tagged photos expose your social circle and relationships.',
    },
  ],
};

export const protectionChecklist = [
  {
    id: 'instagram-private',
    label: 'Make Instagram account private',
    impact: 15,
    category: 'Social Media',
    description: 'Prevents strangers from viewing your posts, stories, and tagged photos.',
  },
  {
    id: 'remove-location',
    label: 'Remove location from social media bios',
    impact: 10,
    category: 'Location',
    description: 'Stops immediate geographic identification from profile pages.',
  },
  {
    id: 'disable-geotag',
    label: 'Disable photo geotagging',
    impact: 12,
    category: 'Location',
    description: 'Prevents embedded GPS coordinates in photos you share online.',
  },
  {
    id: 'audit-tagged',
    label: 'Audit and remove sensitive tagged photos',
    impact: 8,
    category: 'Social Media',
    description: 'Review photos others have tagged you in that reveal locations or habits.',
  },
  {
    id: 'hide-friends',
    label: 'Hide friend lists on all platforms',
    impact: 7,
    category: 'Network',
    description: 'Prevents mapping of your social circle and close relationships.',
  },
  {
    id: 'separate-email',
    label: 'Use a separate email for public accounts',
    impact: 10,
    category: 'Identity',
    description: 'Stops cross-platform account linking through shared email addresses.',
  },
  {
    id: 'remove-phone',
    label: 'Remove public phone numbers from profiles',
    impact: 12,
    category: 'Identity',
    description: 'Prevents phone number-based search and identification across platforms.',
  },
];
