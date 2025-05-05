import {
  getMockUser,
  registerMockUser,
  getMockPosts,
  getMockPostById,
  getMockPendingPosts,
  createMockPost,
  approveMockPost,
  rejectMockPost,
  addMockComment,
  addMockLike,
  getMockMessages,
  addMockMessage,
} from './data/mockData';

// Simulate API calls with mock data
export const API_ENDPOINTS = {
  LOGIN: async (data) => getMockUser(data.email, data.password),
  REGISTER: async (data) => registerMockUser(data),
  POSTS: async () => getMockPosts(),
  POST_BY_ID: async (id) => getMockPostById(id),
  PENDING_POSTS: async () => getMockPendingPosts(),
  CREATE_POST: async (data) => createMockPost(data),
  APPROVE_POST: async (postId) => approveMockPost(postId),
  REJECT_POST: async (postId) => rejectMockPost(postId),
  COMMENTS: async (data) => addMockComment(data),
  LIKES: async (data) => addMockLike(data),
  MESSAGES: async () => getMockMessages(),
  SEND_MESSAGE: async (data) => addMockMessage(data),
};