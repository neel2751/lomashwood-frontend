import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ALLOWED_ALL_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];

type UploadContext = 
  | 'profile-picture'
  | 'design-inspiration'
  | 'project-photo'
  | 'consultation-document'
  | 'brochure-request'
  | 'business-document'
  | 'product-review-image'
  | 'other';

const uploadedFiles: Array<{
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  context: UploadContext;
  userId?: string;
  metadata?: Record<string, any>;
  uploadedAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const files = formData.getAll('files') as File[];
    const context = formData.get('context') as UploadContext || 'other';
    const userId = formData.get('userId') as string | null;
    const metadata = formData.get('metadata') as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No files provided',
        },
        { status: 400 }
      );
    }

    if (files.length > 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Maximum 10 files allowed per upload',
        },
        { status: 400 }
      );
    }

    const uploadedFileData = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const validation = validateFile(file, context);
      if (!validation.valid) {
        errors.push({
          file: file.name,
          error: validation.error,
        });
        continue;
      }

      try {
        const fileExtension = file.name.split('.').pop();
        const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;

        await file.arrayBuffer();
        const fileUrl = `/uploads/${context}/${uniqueFilename}`;

        let thumbnailUrl;
        if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
          thumbnailUrl = `/uploads/${context}/thumbnails/${uniqueFilename}`;
        }

        const uploadedFile = {
          id: `FILE-${Date.now()}-${i}`,
          filename: uniqueFilename,
          originalName: file.name,
          mimeType: file.type,
          size: file.size,
          url: fileUrl,
          thumbnailUrl,
          context,
          userId: userId || undefined,
          metadata: metadata ? JSON.parse(metadata) : undefined,
          uploadedAt: new Date().toISOString(),
        };

        uploadedFiles.push(uploadedFile);
        uploadedFileData.push(uploadedFile);

        console.log(`File uploaded: ${file.name} -> ${fileUrl}`);
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        errors.push({
          file: file.name,
          error: 'Failed to upload file',
        });
      }
    }

    if (uploadedFileData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'All files failed to upload',
          errors,
        },
        { status: 500 }
      );
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: `${uploadedFileData.length} file(s) uploaded successfully, ${errors.length} failed`,
          data: uploadedFileData,
          errors,
        },
        { status: 207 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `${uploadedFileData.length} file(s) uploaded successfully`,
        data: uploadedFileData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to upload files',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const context = searchParams.get('context') as UploadContext | null;
    const mimeType = searchParams.get('mimeType');
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    let filteredFiles = [...uploadedFiles];

    if (userId) {
      filteredFiles = filteredFiles.filter((file) => file.userId === userId);
    }

    if (context) {
      filteredFiles = filteredFiles.filter((file) => file.context === context);
    }

    if (mimeType) {
      filteredFiles = filteredFiles.filter((file) => 
        file.mimeType.includes(mimeType)
      );
    }

    if (fromDate) {
      filteredFiles = filteredFiles.filter(
        (file) => new Date(file.uploadedAt) >= new Date(fromDate)
      );
    }

    if (toDate) {
      filteredFiles = filteredFiles.filter(
        (file) => new Date(file.uploadedAt) <= new Date(toDate)
      );
    }

    filteredFiles.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    const total = filteredFiles.length;
    const limitNum = limit ? parseInt(limit) : total;
    const offsetNum = offset ? parseInt(offset) : 0;

    const paginatedFiles = filteredFiles.slice(
      offsetNum,
      offsetNum + limitNum
    );

    return NextResponse.json(
      {
        success: true,
        data: paginatedFiles,
        meta: {
          total,
          limit: limitNum,
          offset: offsetNum,
          hasMore: offsetNum + limitNum < total,
          totalSize: filteredFiles.reduce((sum, file) => sum + file.size, 0),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching uploaded files:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch uploaded files',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json(
        {
          success: false,
          error: 'File ID is required',
        },
        { status: 400 }
      );
    }

    const fileIndex = uploadedFiles.findIndex((file) => file.id === fileId);

    if (fileIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'File not found',
        },
        { status: 404 }
      );
    }

    const file = uploadedFiles[fileIndex];

    uploadedFiles.splice(fileIndex, 1);

    console.log(`File deleted: ${file.filename}`);

    return NextResponse.json(
      {
        success: true,
        message: 'File deleted successfully',
        data: {
          id: file.id,
          filename: file.filename,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete file',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

function validateFile(
  file: File,
  context: UploadContext
): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  let allowedTypes: string[] = ALLOWED_ALL_TYPES;

  switch (context) {
    case 'profile-picture':
    case 'design-inspiration':
    case 'project-photo':
    case 'product-review-image':
      allowedTypes = ALLOWED_IMAGE_TYPES;
      break;
    case 'consultation-document':
    case 'business-document':
      allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];
      break;
    case 'brochure-request':
      allowedTypes = ALLOWED_IMAGE_TYPES;
      break;
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed for context ${context}`,
    };
  }

  if (file.name.length > 255) {
    return {
      valid: false,
      error: 'Filename is too long (max 255 characters)',
    };
  }

  const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.php', '.asp', '.aspx', '.jsp'];
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  
  if (dangerousExtensions.includes(fileExtension)) {
    return {
      valid: false,
      error: 'File type is not allowed for security reasons',
    };
  }

  return { valid: true };
}