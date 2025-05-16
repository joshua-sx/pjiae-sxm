
import { useState } from 'react';
import { Plus, Download, History, Trash } from 'lucide-react';
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

// Mock document type
interface Document {
  id: string;
  name: string;
  uploadedBy: string;
  date: string;
  version: string;
  fileSize: string;
}

const Documents = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Employee Handbook 2023.pdf',
      uploadedBy: 'Sarah Johnson',
      date: '2023-05-15',
      version: '1.0',
      fileSize: '2.3 MB'
    },
    {
      id: '2',
      name: 'Performance Review Template.docx',
      uploadedBy: 'Michael Wong',
      date: '2023-04-22',
      version: '2.1',
      fileSize: '450 KB'
    },
    {
      id: '3',
      name: 'Company Policy Updates.pdf',
      uploadedBy: 'Sarah Johnson',
      date: '2023-03-10',
      version: '1.2',
      fileSize: '1.7 MB'
    }
  ]);
  
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setUploadDialogOpen(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUploadDialogOpen(true);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Create a new mock document
      const newDocument: Document = {
        id: (documents.length + 1).toString(),
        name: selectedFile.name,
        uploadedBy: 'Current User',
        date: new Date().toISOString().split('T')[0],
        version: '1.0',
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
      };

      setDocuments([...documents, newDocument]);
      setSelectedFile(null);
      setUploadDialogOpen(false);
      
      toast({
        title: 'Document uploaded',
        description: `${selectedFile.name} has been uploaded successfully.`,
        variant: 'success',
      });
    }
  };

  const handleDelete = (doc: Document) => {
    setSelectedDocument(doc);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDocument) {
      setDocuments(documents.filter(doc => doc.id !== selectedDocument.id));
      setDeleteDialogOpen(false);
      
      toast({
        title: 'Document deleted',
        description: `${selectedDocument.name} has been deleted.`,
      });
    }
  };

  const handleDownload = (doc: Document) => {
    // In a real app, this would trigger a download
    toast({
      title: 'Download started',
      description: `${doc.name} is being downloaded.`,
      variant: 'success',
    });
  };

  const handleViewHistory = (doc: Document) => {
    toast({
      title: 'Document history',
      description: `Viewing history for ${doc.name} (Feature in development)`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Document Center</h1>
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
        
        {/* Drag and drop area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-10 text-center ${
            dragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-gray-500">
              <FileText className="mx-auto h-12 w-12" />
              <p className="mt-2 text-sm">Drag and drop your files here, or</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Browse Files
            </Button>
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>
        </div>
        
        {/* Documents table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>File Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map(doc => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.uploadedBy}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>{doc.version}</TableCell>
                  <TableCell>{doc.fileSize}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDownload(doc)}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewHistory(doc)}
                      title="View History"
                    >
                      <History className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(doc)}
                      title="Delete"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {documents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No documents yet. Upload your first document.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Please confirm details for your document upload.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="filename">File Name</Label>
              <Input
                id="filename"
                value={selectedFile?.name || ''}
                readOnly
              />
            </div>
            <div>
              <Label>File Size</Label>
              <p className="text-sm text-gray-500">
                {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : ''}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!selectedFile}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this document? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="font-medium">{selectedDocument?.name}</p>
            <p className="text-sm text-gray-500">
              Uploaded by {selectedDocument?.uploadedBy} on {selectedDocument?.date}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Documents;
