import api from "@/lib/api";
import type {
  BlogPost,
  BlogCategory,
  BlogComment,
} from "@/types/blog.types";

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export const blogService = {
  async getBlogPosts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    tag?: string;
    search?: string;
    sort?: "latest" | "popular" | "oldest";
  }): Promise<BlogPostsResponse> {
    const response = await api.get("/blog/posts", { params });
    return response.data;
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const response = await api.get(`/blog/posts/${slug}`);
    return response.data;
  },

  async getBlogPostById(id: string): Promise<BlogPost> {
    const response = await api.get(`/blog/posts/id/${id}`);
    return response.data;
  },

  async getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
    const response = await api.get("/blog/posts/featured", {
      params: { limit },
    });
    return response.data;
  },

  async getPopularPosts(limit = 5): Promise<BlogPost[]> {
    const response = await api.get("/blog/posts/popular", {
      params: { limit },
    });
    return response.data;
  },

  async getRelatedPosts(postId: string, limit = 3): Promise<BlogPost[]> {
    const response = await api.get(`/blog/posts/${postId}/related`, {
      params: { limit },
    });
    return response.data;
  },

  async getCategories(): Promise<BlogCategory[]> {
    const response = await api.get("/blog/categories");
    return response.data;
  },

  async getPostsByCategory(
    categorySlug: string,
    params?: {
      page?: number;
      limit?: number;
      sort?: "latest" | "popular" | "oldest";
    }
  ): Promise<BlogPostsResponse> {
    const response = await api.get(`/blog/categories/${categorySlug}/posts`, {
      params,
    });
    return response.data;
  },

  async getTags(): Promise<string[]> {
    const response = await api.get("/blog/tags");
    return response.data;
  },

  async getPostsByTag(
    tag: string,
    params?: {
      page?: number;
      limit?: number;
    }
  ): Promise<BlogPostsResponse> {
    const response = await api.get(`/blog/tags/${tag}/posts`, { params });
    return response.data;
  },

  async searchPosts(
    query: string,
    params?: {
      page?: number;
      limit?: number;
    }
  ): Promise<BlogPostsResponse> {
    const response = await api.get("/blog/search", {
      params: { q: query, ...params },
    });
    return response.data;
  },

  async getPostComments(
    postId: string,
    params?: {
      page?: number;
      limit?: number;
    }
  ): Promise<{
    comments: BlogComment[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get(`/blog/posts/${postId}/comments`, {
      params,
    });
    return response.data;
  },

  async addComment(
    postId: string,
    data: {
      name: string;
      email: string;
      comment: string;
      parentId?: string;
    }
  ): Promise<BlogComment> {
    const response = await api.post(`/blog/posts/${postId}/comments`, data);
    return response.data;
  },

  async likePost(postId: string): Promise<{ likes: number }> {
    const response = await api.post(`/blog/posts/${postId}/like`);
    return response.data;
  },

  async trackView(postId: string): Promise<{ views: number }> {
    const response = await api.post(`/blog/posts/${postId}/view`);
    return response.data;
  },

  async subscribeNewsletter(email: string): Promise<{
    success: boolean;
    message: string;
  }> {
    const response = await api.post("/blog/newsletter/subscribe", { email });
    return response.data;
  },

  async getBlogStats(): Promise<{
    totalPosts: number;
    totalCategories: number;
    totalComments: number;
    totalViews: number;
  }> {
    const response = await api.get("/blog/stats");
    return response.data;
  },

  async sharePost(
    postId: string,
    platform: "facebook" | "twitter" | "linkedin" | "email"
  ): Promise<{ success: boolean; shareUrl?: string }> {
    const response = await api.post(`/blog/posts/${postId}/share`, {
      platform,
    });
    return response.data;
  },

  async bookmarkPost(postId: string): Promise<{ bookmarked: boolean }> {
    const response = await api.post(`/blog/posts/${postId}/bookmark`);
    return response.data;
  },

  async removeBookmark(postId: string): Promise<{ bookmarked: boolean }> {
    const response = await api.delete(`/blog/posts/${postId}/bookmark`);
    return response.data;
  },

  async getUserBookmarks(params?: {
    page?: number;
    limit?: number;
  }): Promise<BlogPostsResponse> {
    const response = await api.get("/blog/bookmarks", { params });
    return response.data;
  },
};