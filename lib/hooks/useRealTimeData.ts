import useSWR from 'swr';

export interface PublicComment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  projectId?: string;
  email?: string;
  isApproved?: boolean;
  isPublished?: boolean;
}

// Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Real-time portfolio data hook
export function usePortfolioData() {
  const { data, error, mutate } = useSWR('/api/portfolio-data', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true, // Refresh when user returns to tab
    revalidateOnReconnect: true, // Refresh when internet reconnects
    dedupingInterval: 5000, // Prevent duplicate requests within 5 seconds
  });

  return {
    data: data || {
      projects: [],
      skills: [],
      technologies: [],
      certifications: [],
      education: [],
      workExperiences: [],
      gallery: [],
      blogs: [],
    },
    loading: !error && !data,
    error,
    refresh: mutate,
  };
}

// Real-time projects hook
export function useProjects() {
  const { data, error, mutate } = useSWR('/api/projects', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    projects: data || [],
    loading: !error && !data,
    error,
    refresh: mutate,
  };
}

// Real-time project hook (single project)
export function useProject(id: string) {
  const { data, error, mutate } = useSWR(
    id ? `/api/projects/${id}` : null,
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds for active project
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    project: data,
    loading: !error && !data,
    error,
    refresh: mutate,
  };
}

// Real-time comments hook
export function useComments(projectId: string) {
  const { data, error, mutate } = useSWR<PublicComment[]>(
    projectId ? `/api/comments/project/${projectId}` : null,
    fetcher,
    {
      refreshInterval: 5000, // Refresh comments every 5 seconds
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
    }
  );

  return {
    comments: data || [],
    loading: !error && !data,
    error,
    refresh: mutate,
  };
}

// Real-time admin comments hook
export function useAdminComments(token: string | null) {
  const { data, error, mutate } = useSWR<PublicComment[]>(
    token ? ['/api/comments', token] : null,
    ([url, authToken]: [string, string]) =>
      fetch(url, {
        headers: { Authorization: `Bearer ${authToken}` },
      }).then((res) => res.json()),
    {
      refreshInterval: 5000, // Refresh every 5 seconds in admin
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    comments: data || [],
    loading: !error && !data,
    error,
    refresh: mutate,
  };
}

// Real-time settings hook
export function useSettings() {
  const { data, error, mutate } = useSWR('/api/settings', fetcher, {
    refreshInterval: 60000, // Refresh every minute
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    settings: data,
    loading: !error && !data,
    error,
    refresh: mutate,
  };
}
