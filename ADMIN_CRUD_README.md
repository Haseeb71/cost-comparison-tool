# Admin CRUD Functionality Guide

This guide explains how to use the fully functional admin CRUD operations for managing categories, tools, and vendors in your AI tools comparison website.

## 🚀 Getting Started

### 1. Database Setup
First, ensure your Supabase database is set up with the required tables:

```bash
# Run the database setup scripts in order:
psql -h your-supabase-host -U postgres -d postgres -f scripts/001_create_core_tables.sql
psql -h your-supabase-host -U postgres -d postgres -f scripts/002_create_admin_tables.sql
psql -h your-supabase-host -U postgres -d postgres -f scripts/003_seed_sample_data.sql
```

### 2. Environment Variables
Make sure you have these environment variables set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Start the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 🔐 Admin Access

Navigate to `/admin/login` to access the admin panel. You'll need to:
1. Sign up/sign in with Supabase Auth
2. The system will automatically create an admin profile for you

## 📊 Admin Dashboard

Visit `/admin` to see:
- Total tools, categories, reviews, and affiliate clicks
- Quick navigation to different admin sections
- Recent activity overview

## 🏷️ Categories Management

**URL:** `/admin/categories`

### Features:
- ✅ **Create** new categories with name, slug, description, and icon
- ✅ **Read** all categories with tool counts
- ✅ **Update** existing category information
- ✅ **Delete** categories (with safety checks for tools)
- 🔍 **Search** categories by name
- 📱 **Responsive** design for mobile and desktop

### Usage:
1. Click "Add Category" to create new categories
2. Use the search bar to find specific categories
3. Click the edit icon to modify existing categories
4. Click the trash icon to delete categories (only if no tools are assigned)

## 🛠️ Tools Management

**URL:** `/admin/tools`

### Features:
- ✅ **Create** new AI tools with comprehensive details
- ✅ **Read** all tools with category and vendor information
- ✅ **Update** tool information and settings
- ✅ **Delete** tools (with safety checks for reviews)
- 🔍 **Search** tools by name, category, or vendor
- 📊 **Rich forms** for pricing, features, use cases, and more
- 🎯 **Smart defaults** and validation

### Tool Fields Include:
- Basic info (name, slug, descriptions)
- Categorization (category, vendor)
- Pricing (model, price, currency, period)
- Features (key features, use cases, integrations)
- Settings (API availability, featured status, publishing)
- SEO (meta title, description)
- Affiliate (URL, commission)

## 🏢 Vendors Management

**URL:** `/admin/vendors`

### Features:
- ✅ **Create** new vendor companies
- ✅ **Read** all vendors with company details
- ✅ **Update** vendor information
- ✅ **Delete** vendors (with safety checks for tools)
- 🔍 **Search** vendors by name
- 🌐 **Website links** and company information

### Vendor Fields Include:
- Company name and slug
- Description and website URL
- Logo URL
- Founded year and headquarters

## 🔧 API Endpoints

The admin CRUD operations use these API endpoints:

### Categories
- `GET /api/admin/categories` - List all categories
- `POST /api/admin/categories` - Create new category
- `PUT /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category

### Tools
- `GET /api/admin/tools` - List all tools
- `POST /api/admin/tools` - Create new tool
- `PUT /api/admin/tools/[id]` - Update tool
- `DELETE /api/admin/tools/[id]` - Delete tool

### Vendors
- `GET /api/admin/vendors` - List all vendors
- `POST /api/admin/vendors` - Create new vendor
- `PUT /api/admin/vendors/[id]` - Update vendor
- `DELETE /api/admin/vendors/[id]` - Delete vendor

## 🛡️ Security Features

- **Authentication required** for all admin operations
- **Row Level Security (RLS)** enabled on all tables
- **Input validation** and sanitization
- **Safety checks** before deletions (prevents orphaned data)
- **Error handling** with user-friendly messages

## 📱 User Experience Features

- **Loading states** during operations
- **Error messages** for failed operations
- **Success feedback** for completed operations
- **Confirmation dialogs** for destructive actions
- **Auto-slug generation** from names
- **Form validation** with required field indicators
- **Responsive design** for all screen sizes

## 🎯 Best Practices

1. **Categories First**: Create categories before adding tools
2. **Vendors Setup**: Add vendors before creating tools
3. **Slug Management**: Use descriptive, URL-friendly slugs
4. **Content Quality**: Provide detailed descriptions and features
5. **Regular Updates**: Keep tool information current

## 🐛 Troubleshooting

### Common Issues:

1. **"Unauthorized" errors**: Ensure you're logged in as an admin
2. **Database connection issues**: Check your Supabase credentials
3. **Form submission failures**: Verify all required fields are filled
4. **Delete operation blocked**: Check if the item has related data

### Getting Help:

- Check the browser console for error messages
- Verify your database schema matches the scripts
- Ensure all environment variables are set correctly

## 🚀 Next Steps

With the admin CRUD functionality working, you can now:

1. **Populate your database** with real AI tools and categories
2. **Customize the forms** to match your specific needs
3. **Add more admin features** like bulk operations or import/export
4. **Implement user roles** for different admin permissions
5. **Add audit logging** for admin actions

The system is now fully functional and ready for production use! 🎉
