export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  images?: string[];
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  status: BlogStatus;
  publishedAt?: Date;
  readTime: number; // in minutes
  views: number;
  likes: number;
  commentCount: number;
  isFeatured: boolean;
  seo?: SEOMetadata;
  relatedPosts?: string[]; // post IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogAuthor {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  email?: string;
  social?: AuthorSocial;
  postCount?: number;
}

export interface AuthorSocial {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  postCount: number;
  parentId?: string;
  order?: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export enum BlogStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  SCHEDULED = "scheduled",
  ARCHIVED = "archived",
}

export interface SEOMetadata {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface BlogComment {
  id: string;
  postId: string;
  userId?: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  content: string;
  parentId?: string; // for nested comments
  replies?: BlogComment[];
  likes: number;
  isApproved: boolean;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostLike {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
}

export interface BlogPostView {
  id: string;
  postId: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  viewedAt: Date;
}

export interface BlogSearchParams {
  query?: string;
  categoryId?: string;
  categorySlug?: string;
  tags?: string[];
  authorId?: string;
  status?: BlogStatus;
  isFeatured?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  sort?: BlogSortOption;
  page?: number;
  limit?: number;
}

export enum BlogSortOption {
  LATEST = "latest",
  OLDEST = "oldest",
  MOST_VIEWED = "most_viewed",
  MOST_LIKED = "most_liked",
  MOST_COMMENTED = "most_commented",
  TITLE_ASC = "title_asc",
  TITLE_DESC = "title_desc",
}

export interface BlogFilter {
  categories?: string[];
  tags?: string[];
  authors?: string[];
  status?: BlogStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minReadTime?: number;
  maxReadTime?: number;
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  averageReadTime: number;
  popularPosts: BlogPost[];
  recentPosts: BlogPost[];
  topCategories: BlogCategory[];
  topTags: BlogTag[];
}

export interface BlogArchive {
  year: number;
  months: {
    month: number;
    monthName: string;
    postCount: number;
    posts?: BlogPostListItem[];
  }[];
}

export interface CreateBlogPostData {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  images?: string[];
  categoryId: string;
  tags: string[];
  status: BlogStatus;
  publishedAt?: Date;
  isFeatured?: boolean;
  seo?: SEOMetadata;
}

export interface UpdateBlogPostData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  images?: string[];
  categoryId?: string;
  tags?: string[];
  status?: BlogStatus;
  publishedAt?: Date;
  isFeatured?: boolean;
  seo?: SEOMetadata;
}

export interface CreateCommentData {
  postId: string;
  content: string;
  userName: string;
  userEmail: string;
  parentId?: string;
}

export interface UpdateCommentData {
  content: string;
}

export interface CreateCategoryData {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  parentId?: string;
  order?: number;
}

export interface UpdateCategoryData {
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  parentId?: string;
  order?: number;
}

export interface BlogPostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: Pick<BlogAuthor, "id" | "name" | "avatar">;
  category: Pick<BlogCategory, "id" | "name" | "slug">;
  tags: string[];
  publishedAt?: Date;
  readTime: number;
  views: number;
  likes: number;
  commentCount: number;
  isFeatured: boolean;
}

export interface BlogPostCardData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: Pick<BlogAuthor, "name" | "avatar">;
  category: Pick<BlogCategory, "name" | "slug">;
  publishedAt?: Date;
  readTime: number;
  views: number;
}

export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  category: Pick<BlogCategory, "name" | "slug">;
  publishedAt?: Date;
  readTime: number;
}

export interface BlogBreadcrumb {
  label: string;
  href: string;
  current?: boolean;
}

export interface BlogPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface BlogSidebar {
  popularPosts: BlogPostCardData[];
  recentPosts: BlogPostCardData[];
  categories: BlogCategory[];
  tags: BlogTag[];
  archive: BlogArchive;
}

export interface BlogNewsletter {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

export interface SubscribeNewsletterData {
  email: string;
  name?: string;
}

export type BlogPostPreview = Pick<
  BlogPost,
  "id" | "title" | "slug" | "excerpt" | "featuredImage" | "publishedAt" | "readTime"
>;

export type BlogCategoryWithPosts = BlogCategory & {
  posts: BlogPostListItem[];
};

export type BlogAuthorWithPosts = BlogAuthor & {
  posts: BlogPostListItem[];
};