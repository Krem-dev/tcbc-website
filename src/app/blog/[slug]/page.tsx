"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  slug: string;
  content: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Finding Faith in Difficult Times",
    author: "John Smith",
    date: "January 2, 2026",
    category: "Faith",
    excerpt: "Discover how to strengthen your faith when facing life's greatest challenges.",
    image: "/bib-4.jpg",
    slug: "finding-faith-difficult-times",
    content: `Finding faith in difficult times is one of the greatest challenges we face as believers. When life throws us curveballs and circumstances seem overwhelming, it's easy to question our faith and wonder if God is truly there.

However, throughout Scripture, we see countless examples of faithful people who faced tremendous difficulties yet maintained their trust in God. From Job's suffering to Paul's persecutions, the Bible shows us that faith isn't about avoiding hardship—it's about trusting God through it.

## The Foundation of Faith

Faith begins with understanding who God is. He is sovereign, loving, and faithful. When we anchor our faith in these truths, we can face any storm knowing that God is in control and working for our good.

## Practical Steps to Strengthen Your Faith

1. **Read God's Word Daily** - Scripture is our foundation. Regular Bible reading reminds us of God's promises and character.

2. **Prayer and Meditation** - Spend time in prayer, bringing your concerns to God and listening for His voice.

3. **Community Support** - Surround yourself with other believers who can encourage and pray with you.

4. **Trust God's Timing** - Remember that God's timeline is different from ours, and His plans are always good.

5. **Serve Others** - Helping others can shift our perspective and remind us of God's love working through us.

## The Promise of God's Presence

In Matthew 28:20, Jesus promises His disciples, "And surely I am with you always, to the very end of the age." This same promise applies to us today. No matter what difficult times we face, God is with us.

When we choose to trust in God's presence and goodness, even in the darkest moments, we discover a faith that is unshakeable. Our difficulties become opportunities to experience God's faithfulness in new and profound ways.

Remember, faith is not the absence of doubt—it's choosing to trust God despite our doubts. As you face your own challenges, lean into your faith, seek God's presence, and watch how He strengthens you through every trial.`,
  },
  {
    id: 2,
    title: "The Power of Community Worship",
    author: "Sarah Johnson",
    date: "December 28, 2025",
    category: "Community",
    excerpt: "Explore how worshipping together strengthens our bonds and deepens our connection.",
    image: "/bible-1.jpg",
    slug: "power-community-worship",
    content: `Worship is one of the most powerful spiritual practices we can engage in, and when we worship together as a community, something extraordinary happens. The power of community worship goes far beyond individual spiritual experience—it creates a bond that strengthens our faith and deepens our connection to God and one another.

## Why Community Worship Matters

When we gather together to worship, we're not just singing songs or listening to sermons. We're participating in something sacred. We're joining our voices with others, lifting our hearts together, and experiencing God's presence in a collective way that's uniquely powerful.

## The Benefits of Worshipping Together

**Spiritual Encouragement** - When we see others worshipping with passion and devotion, it inspires and encourages our own faith journey.

**Accountability and Support** - Being part of a worshipping community provides accountability and support for living out our faith.

**Shared Experience** - Worshipping together creates shared memories and experiences that bond us as a community.

**Experiencing God's Presence** - There's something special about encountering God's presence alongside others. It's more powerful than worshipping alone.

## Building a Stronger Community Through Worship

Community worship isn't just about the Sunday service. It's about creating a culture where worship becomes a lifestyle. When we prioritize worshipping together, we:

- Strengthen our relationships with one another
- Deepen our commitment to God
- Create a safe space for spiritual growth
- Model faith for the next generation
- Experience God's love in tangible ways

## The Transformation That Happens

As we worship together consistently, we begin to see transformation in our lives and in our community. We become more compassionate, more forgiving, more loving. We develop a sense of belonging and purpose that extends beyond the walls of our church.

Community worship has the power to heal broken relationships, restore hope, and unite us around a common purpose: glorifying God and serving others.

If you haven't experienced the power of community worship, we invite you to join us. Come as you are, bring your whole self, and discover how worshipping together can transform your faith and your life.`,
  },
  {
    id: 3,
    title: "Biblical Principles for Daily Living",
    author: "Michael Chen",
    date: "December 20, 2025",
    category: "Bible Study",
    excerpt: "Learn how to apply biblical wisdom to your everyday decisions and challenges.",
    image: "/bible-2.jpg",
    slug: "biblical-principles-daily-living",
    content: `The Bible isn't just an ancient text meant for scholarly study—it's a living, breathing guide for how we should live our lives today. Biblical principles are timeless truths that apply to our modern challenges and decisions. When we understand and apply these principles, we can navigate life with wisdom, purpose, and confidence.

## Core Biblical Principles for Daily Living

**Love Your Neighbor as Yourself** - This foundational principle teaches us to treat others with the same care and respect we show ourselves. It impacts how we interact with family, friends, colleagues, and even strangers.

**Seek First the Kingdom of God** - When we prioritize our relationship with God above all else, everything else falls into proper perspective. Our decisions, priorities, and values align with God's will.

**Trust in God's Provision** - Rather than living in fear and anxiety, we can trust that God will provide for our needs. This principle frees us from worry and allows us to focus on what truly matters.

**Practice Forgiveness** - Holding onto grudges only hurts us. Biblical forgiveness—both receiving it and extending it—is essential for healing and healthy relationships.

**Walk in Integrity** - Living with honesty and moral uprightness builds trust and reflects our faith to others.

## Applying Biblical Principles in Modern Life

**In the Workplace** - Apply principles of honesty, hard work, and respect for authority. Treat your work as service to God.

**In Relationships** - Practice love, patience, forgiveness, and communication. Let biblical principles guide how you interact with loved ones.

**In Financial Decisions** - Seek wisdom, practice generosity, and avoid greed. Remember that everything belongs to God.

**In Difficult Situations** - Turn to Scripture for guidance. Trust God's wisdom over your own understanding.

## The Transformation That Comes From Living Biblically

When we commit to applying biblical principles in our daily lives, we experience:

- Greater peace and contentment
- Stronger relationships
- Clearer decision-making
- A sense of purpose and direction
- Deeper faith and spiritual growth

The Bible offers us a blueprint for living well. As you face decisions and challenges this week, ask yourself: "What does Scripture say about this? How can I apply biblical principles here?" You'll be amazed at how God's Word guides and transforms your life.`,
  },
  {
    id: 4,
    title: "Serving Others with Purpose",
    author: "Emma Williams",
    date: "December 15, 2025",
    category: "Service",
    excerpt: "Understand the true meaning of service and how giving back reflects our faith.",
    image: "/30th Nov_24.jpg",
    slug: "serving-others-purpose",
    content: `Service is at the heart of the Christian faith. Jesus himself modeled a life of service, and He calls us to do the same. But true service goes beyond just doing good deeds—it's about serving with purpose, intention, and love.

## What Does It Mean to Serve with Purpose?

Serving with purpose means understanding that our service isn't just about helping others—it's about reflecting God's love and advancing His kingdom. When we serve with purpose, we're not looking for recognition or reward. We're serving because we love God and we love people.

## Finding Your Purpose in Service

Everyone has unique gifts and talents that God has given them. Your purpose in service is found at the intersection of:

- **Your Gifts** - What are you naturally good at?
- **Your Passion** - What breaks your heart? What causes do you care deeply about?
- **Your Community's Needs** - Where can you make the most impact?

When these three things align, you've found your purpose in service.

## The Impact of Purposeful Service

When we serve with purpose, we:

- Make a real difference in people's lives
- Experience the joy and fulfillment that comes from helping others
- Strengthen our community
- Model Christ's love to those around us
- Grow spiritually through serving

## Overcoming Barriers to Service

Many of us want to serve but feel held back by:

- **Lack of Time** - Start small. Even one hour a month makes a difference.
- **Feeling Inadequate** - God doesn't call the equipped; He equips the called.
- **Not Knowing Where to Start** - Talk to your church leaders about opportunities that match your gifts.
- **Fear of Failure** - Remember that your effort and heart matter more than perfection.

## The Transformation That Happens

As you commit to serving others with purpose, you'll experience transformation in your own life. You'll develop greater compassion, humility, and gratitude. You'll see God working through you to change lives. You'll discover a sense of purpose and meaning that can't be found anywhere else.

Service isn't a burden—it's a privilege. It's how we live out our faith and show the world what God's love looks like in action. What's one way you can serve with purpose this week?`,
  },
  {
    id: 5,
    title: "Growing in Spiritual Maturity",
    author: "David Martinez",
    date: "December 10, 2025",
    category: "Growth",
    excerpt: "A guide to spiritual growth and maturity through your faith journey.",
    image: "/service1.jpg",
    slug: "growing-spiritual-maturity",
    content: `Spiritual maturity isn't something that happens overnight. It's a journey—a process of growth that unfolds over time as we deepen our relationship with God and allow His Spirit to transform us from the inside out.

## Understanding Spiritual Maturity

Spiritual maturity isn't about knowing all the answers or being perfect. It's about:

- Growing closer to God
- Becoming more like Christ
- Developing wisdom and discernment
- Living out your faith authentically
- Helping others grow spiritually

## The Stages of Spiritual Growth

**Spiritual Infancy** - You've just begun your faith journey. You're learning the basics and discovering who God is.

**Spiritual Childhood** - You're growing in knowledge and understanding. You're learning to apply biblical principles to your life.

**Spiritual Adolescence** - You're developing your own faith. You're asking questions and wrestling with deeper spiritual truths.

**Spiritual Adulthood** - You've developed a mature faith. You're able to mentor others and navigate complex spiritual issues with wisdom.

## Practices That Foster Spiritual Growth

**Regular Bible Study** - Engage deeply with Scripture. Don't just read it; study it, meditate on it, and apply it.

**Prayer and Meditation** - Develop a consistent prayer life. Listen to God, not just talk to Him.

**Community and Accountability** - Surround yourself with other believers who challenge and encourage you.

**Service and Ministry** - Put your faith into action. Serve others and use your gifts to advance God's kingdom.

**Reflection and Self-Examination** - Regularly reflect on your spiritual journey. Where are you growing? Where do you need to grow?

## Overcoming Obstacles to Growth

**Complacency** - Don't settle for where you are. Always be growing.

**Comparison** - Don't compare your spiritual journey to others. Focus on your own growth.

**Busyness** - Make time for spiritual disciplines. They're not optional; they're essential.

**Doubt and Discouragement** - These are normal parts of the journey. Don't let them stop you.

## The Fruit of Spiritual Maturity

As you grow spiritually, you'll experience:

- Greater peace and contentment
- Deeper joy and fulfillment
- More effective ministry and service
- Stronger relationships
- Greater impact on those around you

Spiritual maturity is a lifelong journey. There's always more to learn, more to grow, more to discover about God and yourself. Embrace the journey, trust the process, and watch how God transforms you into the person He's called you to be.`,
  },
  {
    id: 6,
    title: "Prayer: The Foundation of Faith",
    author: "Lisa Anderson",
    date: "December 5, 2025",
    category: "Prayer",
    excerpt: "Explore the transformative power of prayer and develop a meaningful prayer life.",
    image: "/service2.jpg",
    slug: "prayer-foundation-faith",
    content: `Prayer is one of the most powerful spiritual practices available to us. It's our direct line to God—a way to communicate with our Creator, bring our concerns to Him, and experience His presence and guidance. Yet many of us struggle with prayer or don't fully understand its transformative power.

## What Is Prayer?

Prayer is simply talking to God. It's not complicated or formal. It's honest, authentic communication with the One who loves us most. Prayer can be:

- Praise and worship
- Thanksgiving and gratitude
- Confession and repentance
- Petition and intercession
- Listening and meditation

## The Power of Prayer

Prayer has the power to:

- Change our circumstances
- Transform our hearts and minds
- Heal broken relationships
- Provide peace in the midst of chaos
- Connect us with God in profound ways
- Intercede for others and see God work through us

## Developing a Meaningful Prayer Life

**Start Simple** - You don't need fancy words or perfect prayers. Just talk to God like you would a trusted friend.

**Be Honest** - Bring your real feelings, doubts, and struggles to God. He can handle your honesty.

**Listen** - Prayer isn't just about talking; it's about listening. Create space to hear God's voice.

**Pray Scripture** - Use the Bible as a guide for prayer. Pray God's promises back to Him.

**Pray Consistently** - Make prayer a daily habit. Set aside time each day to pray.

**Pray for Others** - Intercede for family, friends, and those in need. Prayer is a powerful way to love others.

## Overcoming Prayer Obstacles

**Distraction** - Find a quiet place and time to pray. Minimize distractions.

**Doubt** - Remember that God hears and answers prayer, even when we don't see immediate results.

**Feeling Unworthy** - You don't have to be perfect to pray. God welcomes you as you are.

**Not Knowing What to Say** - Start with gratitude, confession, and simple requests. The words will come.

## The Transformation Prayer Brings

As you develop a consistent prayer life, you'll experience:

- Greater intimacy with God
- More peace and less anxiety
- Clearer direction and guidance
- Stronger faith
- Greater effectiveness in ministry and relationships
- A deeper sense of purpose

Prayer is the foundation of faith. It's how we maintain our relationship with God and experience His power in our lives. If you haven't developed a consistent prayer life, now is the time to start. Begin today, and watch how prayer transforms your faith and your life.`,
  },
];

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="font-satoshi text-4xl font-bold text-[#48007e] mb-4">
            Article Not Found
          </h1>
          <p className="font-aeonik text-gray-600 mb-8">
            Sorry, we couldn't find the article you're looking for.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#48007e] font-semibold hover:text-[#7c01cd] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <section className="relative h-96 bg-center bg-cover overflow-hidden" style={{ backgroundImage: `url('${article.image}')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#48007e]/80 via-[#48007e]/70 to-[#7c01cd]/75"></div>
        
        <div className="relative h-full flex flex-col justify-end px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto w-full">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 font-aeonik"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <h1 className="font-satoshi text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90 font-aeonik">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30">
                {article.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none text-left">
            <div className="space-y-6 font-aeonik text-gray-700 leading-relaxed text-left">
              {article.content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h2 key={idx} className="font-satoshi text-3xl font-bold text-[#48007e] mt-12 mb-6 pt-6 border-t border-gray-200">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("-")) {
                  const items = paragraph.split("\n").map((item) => item.replace("- ", ""));
                  return (
                    <ul key={idx} className="space-y-3 my-6 ml-0">
                      {items.map((item, i) => {
                        // Parse bold text in list items
                        const parts = item.split(/\*\*(.*?)\*\*/);
                        return (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-[#7c01cd] font-bold mt-1 flex-shrink-0">•</span>
                            <span>
                              {parts.map((part, j) => 
                                j % 2 === 1 ? <strong key={j} className="text-[#48007e] font-bold">{part}</strong> : part
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                // Parse bold text in paragraphs
                const parts = paragraph.split(/\*\*(.*?)\*\*/);
                return (
                  <p key={idx} className="text-lg leading-8 text-gray-700">
                    {parts.map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-[#48007e] font-bold">{part}</strong> : part
                    )}
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-satoshi text-4xl font-bold text-[#48007e] mb-4 text-center">
              Related Articles
            </h2>
            <p className="font-aeonik text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Continue your journey with more articles in the {article.category} category
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/blog/${relatedArticle.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-[#48007e]/30 to-[#7c01cd]/30 flex items-center justify-center overflow-hidden">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#48007e] rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                          <span className="text-white font-bold text-2xl">
                            {relatedArticle.id}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <span className="inline-block w-fit px-3 py-1 bg-[#7c01cd]/15 text-[#48007e] text-xs font-semibold rounded-full mb-3">
                        {relatedArticle.category}
                      </span>
                      <h3 className="font-satoshi text-lg font-bold text-[#48007e] group-hover:text-[#7c01cd] transition-colors mb-3">
                        {relatedArticle.title}
                      </h3>
                      <p className="font-aeonik text-gray-600 text-sm flex-grow">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="inline-flex items-center text-[#48007e] font-semibold text-sm group-hover:text-[#7c01cd] transition-colors">
                          Read Article
                          <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
