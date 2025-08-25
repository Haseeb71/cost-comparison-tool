-- Seed sample data for AI tools comparison website

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon) VALUES
('AI Writing Tools', 'ai-writing-tools', 'Tools for content creation, copywriting, and text generation', '✍️'),
('AI Image Generators', 'ai-image-generators', 'Tools for creating and editing images with AI', '🎨'),
('AI Chatbots', 'ai-chatbots', 'Conversational AI and customer service bots', '💬'),
('AI Code Assistants', 'ai-code-assistants', 'Tools to help with coding and development', '💻'),
('AI Analytics', 'ai-analytics', 'Data analysis and business intelligence tools', '📊'),
('AI Video Tools', 'ai-video-tools', 'Video creation, editing, and enhancement tools', '🎥')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample vendors
INSERT INTO vendors (name, slug, description, website_url, founded_year, headquarters) VALUES
('OpenAI', 'openai', 'Leading AI research company behind GPT and DALL-E', 'https://openai.com', 2015, 'San Francisco, CA'),
('Anthropic', 'anthropic', 'AI safety company focused on building helpful, harmless AI', 'https://anthropic.com', 2021, 'San Francisco, CA'),
('Google', 'google', 'Technology giant with extensive AI research and products', 'https://google.com', 1998, 'Mountain View, CA'),
('Microsoft', 'microsoft', 'Technology company integrating AI across their product suite', 'https://microsoft.com', 1975, 'Redmond, WA'),
('Stability AI', 'stability-ai', 'Open-source AI company behind Stable Diffusion', 'https://stability.ai', 2020, 'London, UK')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample tools
INSERT INTO tools (
  name, slug, description, short_description, category_id, vendor_id,
  pricing_model, starting_price, pricing_currency, pricing_period,
  features, use_cases, rating, review_count, is_featured
) VALUES
(
  'ChatGPT',
  'chatgpt',
  'Advanced conversational AI that can help with writing, analysis, coding, and creative tasks.',
  'Powerful AI assistant for conversations and content creation',
  (SELECT id FROM categories WHERE slug = 'ai-chatbots'),
  (SELECT id FROM vendors WHERE slug = 'openai'),
  'freemium',
  20.00,
  'USD',
  'monthly',
  '["Natural language processing", "Code generation", "Creative writing", "Data analysis", "Multi-language support"]',
  '["Customer support", "Content creation", "Education", "Programming help", "Research assistance"]',
  4.5,
  15420,
  true
),
(
  'DALL-E 3',
  'dall-e-3',
  'State-of-the-art AI image generator that creates high-quality images from text descriptions.',
  'Advanced AI image generation from text prompts',
  (SELECT id FROM categories WHERE slug = 'ai-image-generators'),
  (SELECT id FROM vendors WHERE slug = 'openai'),
  'paid',
  15.00,
  'USD',
  'monthly',
  '["High-resolution images", "Style control", "Safety filters", "Commercial usage rights"]',
  '["Marketing materials", "Social media content", "Art creation", "Product mockups", "Illustrations"]',
  4.3,
  8750,
  true
),
(
  'GitHub Copilot',
  'github-copilot',
  'AI-powered code completion tool that helps developers write code faster and more efficiently.',
  'AI pair programmer for faster coding',
  (SELECT id FROM categories WHERE slug = 'ai-code-assistants'),
  (SELECT id FROM vendors WHERE slug = 'microsoft'),
  'paid',
  10.00,
  'USD',
  'monthly',
  '["Code completion", "Multi-language support", "IDE integration", "Context awareness", "Code suggestions"]',
  '["Software development", "Code review", "Learning programming", "Debugging", "API integration"]',
  4.2,
  12300,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample pricing plans
INSERT INTO pricing_plans (tool_id, name, price, currency, billing_period, features, is_popular) VALUES
(
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  'Free',
  0.00,
  'USD',
  'monthly',
  '["Limited usage", "GPT-3.5 access", "Basic features"]',
  false
),
(
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  'ChatGPT Plus',
  20.00,
  'USD',
  'monthly',
  '["Unlimited usage", "GPT-4 access", "Priority access", "Faster responses"]',
  true
),
(
  (SELECT id FROM tools WHERE slug = 'github-copilot'),
  'Individual',
  10.00,
  'USD',
  'monthly',
  '["Code suggestions", "Multi-language support", "IDE integration"]',
  true
),
(
  (SELECT id FROM tools WHERE slug = 'github-copilot'),
  'Business',
  19.00,
  'USD',
  'monthly',
  '["All Individual features", "Organization management", "Policy controls", "Audit logs"]',
  false
);

-- Insert sample reviews
INSERT INTO reviews (tool_id, user_name, rating, title, content, pros, cons, is_published) VALUES
(
  (SELECT id FROM tools WHERE slug = 'chatgpt'),
  'Sarah Johnson',
  5,
  'Game-changer for content creation',
  'ChatGPT has revolutionized how I approach writing and research. The quality of responses is consistently impressive.',
  '["Excellent writing quality", "Fast responses", "Versatile use cases", "Great for brainstorming"]',
  '["Can be expensive for heavy usage", "Sometimes provides outdated information"]',
  true
),
(
  (SELECT id FROM tools WHERE slug = 'dall-e-3'),
  'Mike Chen',
  4,
  'Impressive image quality',
  'DALL-E 3 creates stunning images that often exceed my expectations. Great for marketing materials.',
  '["High-quality outputs", "Easy to use", "Good style control"]',
  '["Limited free credits", "Can be slow during peak times"]',
  true
),
(
  (SELECT id FROM tools WHERE slug = 'github-copilot'),
  'Alex Rodriguez',
  4,
  'Helpful coding companion',
  'GitHub Copilot has significantly improved my coding speed and helped me learn new patterns.',
  '["Great code suggestions", "Supports many languages", "Good IDE integration"]',
  '["Sometimes suggests inefficient code", "Requires internet connection"]',
  true
);
