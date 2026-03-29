import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postService } from '../../services';

// Async thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getAllPosts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPublicPosts = createAsyncThunk(
  'posts/fetchPublic',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getPublicPosts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await postService.getPostById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPostsByRating = createAsyncThunk(
  'posts/fetchByRating',
  async (stars, { rejectWithValue }) => {
    try {
      const response = await postService.getPostsByRating(stars);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postService.createPost(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, postData }, { rejectWithValue }) => {
    try {
      const response = await postService.updatePost(id, postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await postService.deletePost(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  posts: [],
  publicPosts: [],
  currentPost: null,
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch public posts
      .addCase(fetchPublicPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublicPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicPosts = action.payload.posts;
      })
      .addCase(fetchPublicPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload.post;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch posts by rating
      .addCase(fetchPostsByRating.fulfilled, (state, action) => {
        state.publicPosts = action.payload.posts;
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload.post);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update post
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.posts.findIndex(post => post.id === action.payload.post.id);
        if (index !== -1) {
          state.posts[index] = action.payload.post;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentPost } = postSlice.actions;
export default postSlice.reducer;
