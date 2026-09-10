import { useState } from 'react';
import Login from '@/components/Login';
import AdminDashboard from '@/components/AdminDashboard';
import BursarDashboard from '@/components/BursarDashboard';
import DeanDashboard from '@/components/DeanDashboard';
import StudentDashboard from '@/components/StudentDashboard';

export default function Index() {
  const [user, setUser] = useState<any>(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard user={user} onLogout={() => setUser(null)} />;
    case 'bursar':
      return <BursarDashboard user={user} onLogout={() => setUser(null)} />;
    case 'dean':
      return <DeanDashboard user={user} onLogout={() => setUser(null)} />;
    case 'student':
      return <StudentDashboard user={user} onLogout={() => setUser(null)} />;
    default:
      return <div>Unknown role</div>;
  }
}
