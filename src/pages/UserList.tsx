
import React, { useState, useCallback } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus } from 'lucide-react';
import { useUsersQuery } from '@/hooks/useUsersQuery';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorAlert } from '@/components/ui/error-alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/styled-table";

const UserList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: users, isLoading, isError, error, refetch } = useUsersQuery();
  
  const filteredUsers = useCallback(() => {
    if (!users) return [];
    
    return users.filter(user => {
      const searchString = `${user.name} ${user.email} ${user.department} ${user.position}`.toLowerCase();
      return searchString.includes(searchQuery.toLowerCase());
    });
  }, [users, searchQuery]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="page-wrapper">
          <PageHeader title="User List" subtitle="Manage and view all system users" />
          <LoadingState count={10} variant="table" />
        </div>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
        <div className="page-wrapper">
          <PageHeader title="User List" subtitle="Manage and view all system users" />
          <ErrorAlert 
            title="Failed to load users" 
            description="Unable to retrieve user data at this time." 
            error={error}
            onRetry={refetch}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="page-wrapper">
        <div className="flex items-center justify-between">
          <PageHeader title="User List" subtitle="Manage and view all system users" actions={<Button><UserPlus className="mr-2 h-4 w-4" />Add New User</Button>} />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users by name, email or department..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers().map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.position}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/employee/${user.id}`}>View</a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredUsers().length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No users found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UserList;
