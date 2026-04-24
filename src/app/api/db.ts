import bcrypt from 'bcrypt';

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

declare global {
  var dbUsers: Map<UserId, UserContent> | undefined;
  var dbVideos: Map<VideoId, VideoDataContent> | undefined;
}

globalThis.dbUsers = new Map<UserId, UserContent>([
  [
    'admin',
    {
      id: 'user-1',
      nickname: 'admin',
      // пароль: 123
      password: bcrypt.hashSync('123', 10),
    },
  ],
]);

export const users = globalThis.dbUsers;

//-------------video

type VideoDataContent = {
  id: VideoId;
  userId: string;
  categoryId: string;
};

type VideoId = string;

export const videos =
  globalThis.dbVideos ||
  (globalThis.dbVideos = new Map<VideoId, VideoDataContent>([
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
  ]));
