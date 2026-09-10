import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const STUDENTS = [
  { id: 'STU-2024-001', name: 'Alice Johnson', class: 'Form 1A' },
  { id: 'STU-2024-002', name: 'Bob Smith', class: 'Form 2B' },
  { id: 'STU-2024-003', name: 'Carol Davis', class: 'Form 3C' },
];

const PAYMENTS = [
  { id: 1, student: 'Alice Johnson', amount: 50000, status: 'paid', date: '2024-01-15' },
  { id: 2, student: 'Alice Johnson', amount: 50000, status: 'pending', date: '2024-02-01' },
  { id: 3, student: 'Bob Smith', amount: 50000, status: 'paid', date: '2024-01-20' },
];

export default function BursarDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [payments, setPayments] = useState(PAYMENTS);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [amount, setAmount] = useState('');

  const handleRecordPayment = () => {
    if (!selectedStudent || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    const student = STUDENTS.find(s => s.id === selectedStudent);
    const newPayment = {
      id: payments.length + 1,
      student: student?.name || '',
      amount: parseInt(amount),
      status: 'paid',
      date: new Date().toISOString().split('T')[0],
    };

    setPayments([...payments, newPayment]);
    setSelectedStudent('');
    setAmount('');
    toast.success('Payment recorded successfully');
  };

  const totalCollected = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Bursar Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.name}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>Logout</Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Ksh {totalCollected.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">Ksh {totalPending.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{STUDENTS.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Record Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Record Fee Payment</CardTitle>
            <CardDescription>Register a new fee payment</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button>New Payment</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record Fee Payment</DialogTitle>
                  <DialogDescription>Enter payment details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Student</label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full border rounded-md p-2"
                    >
                      <option value="">Select student</option>
                      {STUDENTS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.id})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Amount (Ksh)</label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <Button onClick={handleRecordPayment} className="w-full">Record Payment</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>All recorded fee payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{payment.student}</p>
                    <p className="text-sm text-gray-600">Ksh {payment.amount.toLocaleString()} • {payment.date}</p>
                  </div>
                  <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
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
