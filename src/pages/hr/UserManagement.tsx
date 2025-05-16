
import { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from '@/lib/permissions';
import { useAuth } from '@/contexts/AuthContext';

// Mock user type
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
}

const UserManagement = () => {
  const { hasPermission } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@pjiae.com',
      role: UserRole.EMPLOYEE,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Lisa Johnson',
      email: 'lisa.johnson@pjiae.com',
      role: UserRole.SUPERVISOR,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Michael Davis',
      email: 'michael.davis@pjiae.com',
      role: UserRole.DIRECTOR,
      status: 'Active'
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah.williams@pjiae.com',
      role: UserRole.HR_OFFICER,
      status: 'Active'
    },
    {
      id: '5',
      name: 'Robert Taylor',
      email: 'robert.taylor@pjiae.com',
      role: UserRole.IT_ADMIN,
      status: 'Inactive'
    }
  ]);
  
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: UserRole.EMPLOYEE,
    status: 'Active'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: UserRole.EMPLOYEE,
      status: 'Active'
    });
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setFormMode('add');
    resetForm();
    setUserFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setFormMode('edit');
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setUserFormOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmitUserForm = () => {
    // Validate form
    if (!formData.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Name is required',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      toast({
        title: 'Validation Error',
        description: 'Valid email is required',
        variant: 'destructive',
      });
      return;
    }

    if (formMode === 'add') {
      const newUser: User = {
        id: (users.length + 1).toString(),
        ...formData
      };
      
      setUsers([...users, newUser]);
      toast({
        title: 'User added',
        description: `${newUser.name} has been added successfully.`,
        variant: 'success',
      });
    } else if (formMode === 'edit' && selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } : user
      ));
      
      toast({
        title: 'User updated',
        description: `${formData.name}'s information has been updated.`,
        variant: 'success',
      });
    }
    
    setUserFormOpen(false);
    resetForm();
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setDeleteDialogOpen(false);
      
      toast({
        title: 'User deleted',
        description: `${selectedUser.name} has been removed from the system.`,
        variant: 'success',
      });
    }
  };

  // If user doesn't have permission to manage users, redirect or show error
  if (!hasPermission('canManageUsers')) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p className="mt-2">You don't have permission to access this page.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button onClick={handleAddUser}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        
        {/* Users table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditUser(user)}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteUser(user)}
                      title="Delete"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit User Dialog */}
      <Dialog open={userFormOpen} onOpenChange={setUserFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formMode === 'add' ? 'Add New User' : 'Edit User'}</DialogTitle>
            <DialogDescription>
              {formMode === 'add' 
                ? 'Enter details to add a new user to the system.' 
                : 'Update user information and role.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john.smith@pjiae.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({...formData, role: value as UserRole})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.HR_OFFICER}>HR Officer</SelectItem>
                  <SelectItem value={UserRole.DIRECTOR}>Director</SelectItem>
                  <SelectItem value={UserRole.SUPERVISOR}>Supervisor</SelectItem>
                  <SelectItem value={UserRole.EMPLOYEE}>Employee</SelectItem>
                  <SelectItem value={UserRole.IT_ADMIN}>IT Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value as 'Active' | 'Inactive'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitUserForm}>
              {formMode === 'add' ? 'Add User' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedUser && (
              <>
                <p className="font-medium">{selectedUser.name}</p>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
                <p className="text-sm text-gray-500">Role: {selectedUser.role}</p>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default UserManagement;
