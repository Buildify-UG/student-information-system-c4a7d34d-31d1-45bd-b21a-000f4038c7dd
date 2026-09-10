import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const DEMO_USERS = [
  { email: 'admin@school.com', password: 'admin', role: 'admin', name: 'Admin User' },
  { email: 'bursar@school.com', password: 'bursar', role: 'bursar', name: 'John Bursar' },
  { email: 'dean@school.com', password: 'dean', role: 'dean', name: 'Dr. Dean Smith' },
  { email: 'student@school.com', password: 'student', role: 'student', name: 'Alice Johnson' },
];

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const user = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      onLogin({ id: email, email, role: user.role, name: user.name });
      toast.success(`Welcome, ${user.name}!`);
    } else {
      toast.error('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Student Information System</CardTitle>
          <CardDescription>Demo Credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="border-t pt-4">
            <p className="text-xs font-semibold mb-3 text-gray-600">Demo Users:</p>
            <div className="space-y-2">
              {DEMO_USERS.map((user) => (
                <div key={user.email} className="text-xs bg-gray-50 p-2 rounded">
                  <p className="font-medium">{user.name} ({user.role})</p>
                  <p className="text-gray-600">{user.email} / {user.password}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
