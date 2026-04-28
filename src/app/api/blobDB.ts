import { head, put } from '@vercel/blob';

type UserId = string;

type UserContent = {
  id: UserId;
  nickname: string;
  password: string;
};

export type UserInfoFromToken = {
  id: UserContent['id'];
  nickname: string;
  iat: number;
};

// -------

type VideoId = string;

type VideoDataContent = {
  userId: string;
  id: VideoId;
  categoryId: string;
};

const USER_BLOB_KEY = 'db/users.json';
const VIDEOS_BLOB_KEY = 'db/videos.json';

export async function getUsers(): Promise<Map<UserId, UserContent>> {
  try {
    const blob = await head(USER_BLOB_KEY);

    const response = await fetch(blob.url);
    const data = await response.json();
    return new Map(data);
  } catch (error) {
    const empty = new Map<UserId, UserContent>();
    await saveUsers(empty); // создаёт db/users.json
    return empty;
  }
}

export async function saveUsers(
  users: Map<UserId, UserContent>,
): Promise<void> {
  const data = Array.from(users.entries());

  await put(USER_BLOB_KEY, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getVideos(): Promise<Map<VideoId, VideoDataContent>> {
  try {
    const blob = await head(VIDEOS_BLOB_KEY);

    const response = await fetch(blob.url);
    const data = await response.json();

    return new Map(data);
  } catch {
    const defaultVideos = initializeVideos();
    await saveVideos(defaultVideos);
    return defaultVideos;
  }
}

export async function saveVideos(
  videos: Map<VideoId, VideoDataContent>,
): Promise<void> {
  const data = Array.from(videos.entries());

  await put(VIDEOS_BLOB_KEY, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

function initializeVideos() {
  return new Map<VideoId, VideoDataContent>([
    ['x81hJX2L7ac', { userId: '0', id: 'x81hJX2L7ac', categoryId: 'music' }],
    [
      'whge6XLIQB0',
      { userId: '0', id: 'whge6XLIQB0', categoryId: 'motorcycling' },
    ],
    ['G50xpMoV2rk', { userId: '0', id: 'G50xpMoV2rk', categoryId: 'engines' }],
    [
      'i9nBNM8lNUY',
      { userId: '0', id: 'i9nBNM8lNUY', categoryId: 'psychology' },
    ],
    ['houbO8sANCc', { userId: '0', id: 'houbO8sANCc', categoryId: 'history' }],
  ]);
}
