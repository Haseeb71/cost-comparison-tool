import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, AlertTriangle } from "lucide-react"

export default function SetupRequiredPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-yellow-500 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Database Setup Required</CardTitle>
          <CardDescription>
            The admin system requires database tables to be created before it can function properly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Follow these steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to your Supabase project dashboard</li>
              <li>Navigate to <strong>SQL Editor</strong> in the left sidebar</li>
              <li>Copy the SQL script from <code className="bg-background px-2 py-1 rounded">scripts/setup_database.sql</code></li>
              <li>Paste and run the script in the SQL Editor</li>
              <li>Return here and refresh the page</li>
            </ol>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Step-by-Step SQL Commands</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Run these commands one by one in your Supabase SQL Editor:
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">1. Create the table:</p>
                <code className="block bg-background p-2 rounded text-xs overflow-x-auto">
                  CREATE TABLE IF NOT EXISTS admin_profiles (id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, email TEXT NOT NULL, full_name TEXT, role TEXT DEFAULT 'admin', is_active BOOLEAN DEFAULT TRUE, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
                </code>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">2. Enable RLS:</p>
                <code className="block bg-background p-2 rounded text-xs overflow-x-auto">
                  ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
                </code>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">3. Create policies:</p>
                <code className="block bg-background p-2 rounded text-xs overflow-x-auto">
                  CREATE POLICY "Admins can view all profiles" ON admin_profiles FOR SELECT USING (auth.uid() IS NOT NULL); CREATE POLICY "Admins can insert own profile" ON admin_profiles FOR INSERT WITH CHECK (auth.uid() = id);
                </code>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/admin">Try Again</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
