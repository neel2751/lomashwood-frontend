import api from '@/lib/api';
interface UploadProgressEvent {
  loaded: number;
  total?: number;
  bytes?: number;
}
export const uploadService = {

  uploadFile: async (
    file: File,
    options?: {
      folder?: string;
      maxSize?: number;
      allowedTypes?: string[];
      onProgress?: (progress: number) => void;
    }
  ): Promise<{
    url: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    id?: string;
  }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (options?.folder) {
      formData.append('folder', options.folder);
    }

    const response = await api.post<{
      url: string;
      fileName: string;
      fileSize: number;
      mimeType: string;
      id?: string;
    }>('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: UploadProgressEvent) => {
        if (options?.onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          options.onProgress(progress);
        }
      },
    });

    return response.data;
  },

  uploadMultipleFiles: async (
    files: File[],
    options?: {
      folder?: string;
      maxSize?: number;
      allowedTypes?: string[];
      onProgress?: (progress: number) => void;
    }
  ): Promise<
    Array<{
      url: string;
      fileName: string;
      fileSize: number;
      mimeType: string;
      id?: string;
    }>
  > => {
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('files', file);
    });

    if (options?.folder) {
      formData.append('folder', options.folder);
    }

    const response = await api.post<{
      data: Array<{
        url: string;
        fileName: string;
        fileSize: number;
        mimeType: string;
        id?: string;
      }>;
    }>('/api/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: UploadProgressEvent) => {
        if (options?.onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          options.onProgress(progress);
        }
      },
    });

    return response.data.data;
  },

  uploadImage: async (
    file: File,
    options?: {
      folder?: string;
      resize?: {
        width?: number;
        height?: number;
        fit?: 'cover' | 'contain' | 'fill';
      };
      quality?: number;
      format?: 'jpeg' | 'png' | 'webp';
      onProgress?: (progress: number) => void;
    }
  ): Promise<{
    url: string;
    fileName: string;
    fileSize: number;
    width: number;
    height: number;
    thumbnailUrl?: string;
    id?: string;
  }> => {
    const formData = new FormData();
    formData.append('image', file);

    if (options?.folder) {
      formData.append('folder', options.folder);
    }
    if (options?.resize) {
      formData.append('resize', JSON.stringify(options.resize));
    }
    if (options?.quality) {
      formData.append('quality', options.quality.toString());
    }
    if (options?.format) {
      formData.append('format', options.format);
    }

    const response = await api.post<{
      url: string;
      fileName: string;
      fileSize: number;
      width: number;
      height: number;
      thumbnailUrl?: string;
      id?: string;
    }>('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: UploadProgressEvent) => {
        if (options?.onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          options.onProgress(progress);
        }
      },
    });

    return response.data;
  },

  uploadAvatar: async (
    file: File,
    options?: {
      onProgress?: (progress: number) => void;
    }
  ): Promise<{
    url: string;
    thumbnailUrl: string;
  }> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post<{
      url: string;
      thumbnailUrl: string;
    }>('/api/upload/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: UploadProgressEvent) => {
        if (options?.onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          options.onProgress(progress);
        }
      },
    });

    return response.data;
  },

  uploadDocument: async (
    file: File,
    options?: {
      folder?: string;
      onProgress?: (progress: number) => void;
    }
  ): Promise<{
    url: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    pageCount?: number;
    id?: string;
  }> => {
    const formData = new FormData();
    formData.append('document', file);

    if (options?.folder) {
      formData.append('folder', options.folder);
    }

    const response = await api.post<{
      url: string;
      fileName: string;
      fileSize: number;
      mimeType: string;
      pageCount?: number;
      id?: string;
    }>('/api/upload/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: UploadProgressEvent) => {
        if (options?.onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          options.onProgress(progress);
        }
      },
    });

    return response.data;
  },

  uploadVideo: async (
    file: File,
    options?: {
      folder?: string;
      generateThumbnail?: boolean;
      onProgress?: (progress: number) => void;
    }
  ): Promise<{
    url: string;
    fileName: string;
    fileSize: number;
    duration?: number;
    thumbnailUrl?: string;
    id?: string;
  }> => {
    const formData = new FormData();
    formData.append('video', file);

    if (options?.folder) {
      formData.append('folder', options.folder);
    }
    if (options?.generateThumbnail) {
      formData.append('generateThumbnail', 'true');
    }

    const response = await api.post<{
      url: string;
      fileName: string;
      fileSize: number;
      duration?: number;
      thumbnailUrl?: string;
      id?: string;
    }>('/api/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: UploadProgressEvent) => {
        if (options?.onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          options.onProgress(progress);
        }
      },
    });

    return response.data;
  },

  uploadFromUrl: async (data: {
    url: string;
    folder?: string;
    fileName?: string;
  }): Promise<{
    url: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    id?: string;
  }> => {
    const response = await api.post<{
      url: string;
      fileName: string;
      fileSize: number;
      mimeType: string;
      id?: string;
    }>('/api/upload/from-url', data);

    return response.data;
  },

  uploadBase64Image: async (data: {
    base64: string;
    fileName?: string;
    folder?: string;
  }): Promise<{
    url: string;
    fileName: string;
    fileSize: number;
    id?: string;
  }> => {
    const response = await api.post<{
      url: string;
      fileName: string;
      fileSize: number;
      id?: string;
    }>('/api/upload/base64', data);

    return response.data;
  },

  deleteFile: async (fileId: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      `/api/upload/${fileId}`
    );
    return response.data;
  },

  deleteMultipleFiles: async (fileIds: string[]): Promise<{
    success: boolean;
    message: string;
    deleted: number;
  }> => {
    const response = await api.delete<{
      success: boolean;
      message: string;
      deleted: number;
    }>('/api/upload/multiple', {
      data: { fileIds },
    });
    return response.data;
  },

  getFileInfo: async (fileId: string): Promise<{
    id: string;
    url: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: string;
    metadata?: Record<string, any>;
  }> => {
    const response = await api.get(`/api/upload/${fileId}`);
    return response.data.data;
  },

  getUserFiles: async (params?: {
    folder?: string;
    type?: 'image' | 'document' | 'video' | 'all';
    page?: number;
    limit?: number;
    sortBy?: 'date' | 'name' | 'size';
    order?: 'asc' | 'desc';
  }): Promise<{
    data: Array<{
      id: string;
      url: string;
      fileName: string;
      fileSize: number;
      mimeType: string;
      uploadedAt: string;
      thumbnailUrl?: string;
    }>;
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> => {
    const response = await api.get('/api/upload/user-files', { params });
    return response.data;
  },

  getUploadQuota: async (): Promise<{
    used: number;
    total: number;
    available: number;
    percentage: number;
  }> => {
    const response = await api.get('/api/upload/quota');
    return response.data;
  },

  validateFile: async (data: {
    fileName: string;
    fileSize: number;
    mimeType: string;
  }): Promise<{
    valid: boolean;
    errors?: string[];
    warnings?: string[];
  }> => {
    const response = await api.post('/api/upload/validate', data);
    return response.data;
  },

  getSignedUploadUrl: async (data: {
    fileName: string;
    fileType: string;
    fileSize: number;
    folder?: string;
  }): Promise<{
    uploadUrl: string;
    fileId: string;
    expiresAt: string;
  }> => {
    const response = await api.post('/api/upload/signed-url', data);
    return response.data;
  },

  completeDirectUpload: async (fileId: string): Promise<{
    url: string;
    success: boolean;
  }> => {
    const response = await api.post<{ url: string; success: boolean }>(
      `/api/upload/${fileId}/complete`
    );
    return response.data;
  },

  createFolder: async (data: {
    name: string;
    parentFolder?: string;
  }): Promise<{
    id: string;
    name: string;
    path: string;
  }> => {
    const response = await api.post<{
      id: string;
      name: string;
      path: string;
    }>('/api/upload/folder', data);
    return response.data;
  },

  getFolders: async (parentFolder?: string): Promise<
    Array<{
      id: string;
      name: string;
      path: string;
      fileCount: number;
      createdAt: string;
    }>
  > => {
    const response = await api.get('/api/upload/folders', {
      params: { parentFolder },
    });
    return response.data.data;
  },

  deleteFolder: async (
    folderId: string,
    deleteFiles?: boolean
  ): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      `/api/upload/folder/${folderId}`,
      {
        params: { deleteFiles },
      }
    );
    return response.data;
  },

  moveFile: async (data: {
    fileId: string;
    targetFolder: string;
  }): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.post<{ success: boolean; message: string }>(
      '/api/upload/move',
      data
    );
    return response.data;
  },

  renameFile: async (data: {
    fileId: string;
    newName: string;
  }): Promise<{
    success: boolean;
    message: string;
    url: string;
  }> => {
    const response = await api.post<{
      success: boolean;
      message: string;
      url: string;
    }>('/api/upload/rename', data);
    return response.data;
  },

  copyFile: async (data: {
    fileId: string;
    targetFolder?: string;
    newName?: string;
  }): Promise<{
    id: string;
    url: string;
    message: string;
  }> => {
    const response = await api.post<{
      id: string;
      url: string;
      message: string;
    }>('/api/upload/copy', data);
    return response.data;
  },

  getDownloadUrl: async (
    fileId: string,
    expiresIn?: number
  ): Promise<{
    downloadUrl: string;
    expiresAt: string;
  }> => {
    const response = await api.get<{
      downloadUrl: string;
      expiresAt: string;
    }>(`/api/upload/${fileId}/download`, {
      params: { expiresIn },
    });
    return response.data;
  },

  shareFile: async (data: {
    fileId: string;
    expiresIn?: number;
    password?: string;
    allowDownload?: boolean;
  }): Promise<{
    shareUrl: string;
    shareId: string;
    expiresAt?: string;
  }> => {
    const response = await api.post<{
      shareUrl: string;
      shareId: string;
      expiresAt?: string;
    }>('/api/upload/share', data);
    return response.data;
  },

  revokeFileShare: async (shareId: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      `/api/upload/share/${shareId}`
    );
    return response.data;
  },
};