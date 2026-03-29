import { useSelector, useDispatch } from 'react-redux';

// Custom hooks for accessing Redux state
export const useAdminState = () => {
  return useSelector((state) => state.admin);
};

export const usePackageState = () => {
  return useSelector((state) => state.packages);
};

export const usePostState = () => {
  return useSelector((state) => state.posts);
};

export const useContactState = () => {
  return useSelector((state) => state.contacts);
};

export const useAppDispatch = () => {
  return useDispatch();
};

// Combined hook for all states
export const useAppState = () => {
  const admin = useAdminState();
  const packages = usePackageState();
  const posts = usePostState();
  const contacts = useContactState();
  const dispatch = useAppDispatch();

  return {
    admin,
    packages,
    posts,
    contacts,
    dispatch,
  };
};
