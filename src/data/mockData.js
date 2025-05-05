import firstImage from "../assets/1.jpg";
import secondImage from "../assets/2.jpg";

const mockUsers = [
  {
    id: 1,
    first_name: "Eissa",
    last_name: "Ahmed",
    email: "eissa@example.com",
    is_admin: true,
    bio: "Beauty enthusiast and admin.",
  },
  {
    id: 2,
    first_name: "Sara",
    last_name: "Mohamed",
    email: "sara@example.com",
    is_admin: false,
    bio: "Loves skincare products.",
  },
  {
    id: 3,
    first_name: "Farah",
    last_name: "Hassan",
    email: "farah@example.com",
    is_admin: true,
    bio: "Skincare expert and admin.",
  },
];

const mockPosts = [
  {
    id: 1,
    user_id: 1,
    first_name: "Eissa",
    last_name: "Ahmed",
    content: "Loving this new moisturizer! Keeps my skin hydrated all day. 💖",
    image: firstImage,
    status: "approved",
    created_at: "2025-05-01T10:00:00",
    likes: 10,
    dislikes: 2,
    comments: [
      {
        id: 1,
        post_id: 1,
        user_id: 2,
        first_name: "Sara",
        last_name: "Mohamed",
        content: "What's the brand? Looks amazing!",
        created_at: "2025-05-01T10:15:00",
      },
    ],
  },
  {
    id: 2,
    user_id: 2,
    first_name: "Sara",
    last_name: "Mohamed",
    content: "This lip gloss is a game-changer! Super glossy and long-lasting. ✨",
    image: secondImage,
    status: "approved",
    created_at: "2025-05-02T12:00:00",
    likes: 15,
    dislikes: 0,
    comments: [],
  },
  {
    id: 3,
    user_id: 1,
    first_name: "Eissa",
    last_name: "Ahmed",
    content: "Waiting for approval on this new foundation review!",
    image: null,
    status: "pending",
    created_at: "2025-05-03T09:00:00",
    likes: 0,
    dislikes: 0,
    comments: [],
  },
];

const mockMessages = [
  {
    id: 1,
    sender_id: 1,
    first_name: "Eissa",
    last_name: "Ahmed",
    content: "Hey everyone! Any new product recommendations? 😊",
    created_at: "2025-05-01T11:00:00",
  },
  {
    id: 2,
    sender_id: 2,
    first_name: "Sara",
    last_name: "Mohamed",
    content: "Try the new serum from GlowUp! It’s amazing! ✨",
    created_at: "2025-05-01T11:05:00",
  },
];

export const getMockUser = (email, password) => {
  const user = mockUsers.find((u) => u.email === email && password === "password123");
  return user ? { user } : { error: "Invalid email or password" };
};

export const registerMockUser = (userData) => {
  const existingUser = mockUsers.find((u) => u.email === userData.email);
  if (existingUser) {
    return { error: "Email already exists" };
  }
  const newUser = {
    id: mockUsers.length + 1,
    ...userData,
    bio: null,
  };
  mockUsers.push(newUser);
  return { user: newUser };
};

export const getMockPosts = () => mockPosts.filter((post) => post.status === "approved");

export const getMockPostById = (id) => {
  const post = mockPosts.find((post) => post.id === parseInt(id));
  return post || { error: "Post not found" };
};

export const getMockPendingPosts = () => mockPosts.filter((post) => post.status === "pending");

export const createMockPost = (postData) => {
  const newPost = {
    id: mockPosts.length + 1,
    ...postData,
    status: postData.is_admin ? "approved" : "pending", // Auto-approve for admins
    created_at: new Date().toISOString(),
    likes: 0,
    dislikes: 0,
    comments: [],
  };
  mockPosts.push(newPost);
  return { success: true };
};

export const approveMockPost = (postId) => {
  const post = mockPosts.find((post) => post.id === parseInt(postId));
  if (post) {
    post.status = "approved";
    return { success: true };
  }
  return { error: "Post not found" };
};

export const rejectMockPost = (postId) => {
  const post = mockPosts.find((post) => post.id === parseInt(postId));
  if (post) {
    post.status = "rejected";
    return { success: true };
  }
  return { error: "Post not found" };
};

export const addMockComment = (commentData) => {
  const post = mockPosts.find((post) => post.id === commentData.post_id);
  if (post) {
    const newComment = {
      id: post.comments.length + 1,
      ...commentData,
      created_at: new Date().toISOString(),
    };
    post.comments.push(newComment);
    return { success: true };
  }
  return { error: "Post not found" };
};

export const addMockLike = (likeData) => {
  const post = mockPosts.find((post) => post.id === likeData.post_id);
  if (post) {
    if (likeData.is_like) {
      post.likes += 1;
    } else {
      post.dislikes += 1;
    }
    return { success: true };
  }
  return { error: "Post not found" };
};

export const getMockMessages = () => mockMessages;

export const addMockMessage = (messageData) => {
  const newMessage = {
    id: mockMessages.length + 1,
    ...messageData,
    created_at: new Date().toISOString(),
  };
  mockMessages.push(newMessage);
  return { success: true };
};