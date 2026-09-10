import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const STUDENT_DATA = {
  id: 'STU-2024-001',
  name: 'Alice Johnson',
  dob: '2008-05-15',
  phone: '0701234567',
  address: '123 Main St',
  parent: 'Mrs. Johnson',
  parentPhone: '0701234500',
  class: 'Form 1A',
  year: '2024/2025',
  fees: [
    { id: 1, amount: 50000, status: 'paid', date: '2024-01-15' },
    { id: 2, amount: 50000, status: 'pending', date: '2024-02-01' },
  ],
};

export default function StudentDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Student Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.name}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>Logout</Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your profile details (read-only)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Student ID</p>
                <p className="font-semibold text-lg">{STUDENT_DATA.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-semibold text-lg">{STUDENT_DATA.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-semibold">{STUDENT_DATA.dob}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{STUDENT_DATA.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-semibold">{STUDENT_DATA.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Parent/Guardian</p>
                <p className="font-semibold">{STUDENT_DATA.parent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Parent Phone</p>
                <p className="font-semibold">{STUDENT_DATA.parentPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Class Information */}
        <Card>
          <CardHeader>
            <CardTitle>Class Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Assigned Class</p>
                <p className="font-semibold text-lg">{STUDENT_DATA.class}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Academic Year</p>
                <p className="font-semibold text-lg">{STUDENT_DATA.year}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Payment Status</CardTitle>
            <CardDescription>Your school fee payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {STUDENT_DATA.fees.map((fee) => (
                <div key={fee.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">Ksh {fee.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{fee.date}</p>
                  </div>
                  <Badge variant={fee.status === 'paid' ? 'default' : 'secondary'}>
                    {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
