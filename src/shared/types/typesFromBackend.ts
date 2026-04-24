export type VideoDto = {
  videoId: string;
  categoryId: string;
  title: string;
  authorName: string;
  authorUrl: string;
};

export type GetOneVideoDto = { ok: boolean; data: VideoDto | null };

export type GetAllVideosDto = {
  ok: boolean;
  data: VideoDto[];
  categories: string[];
};

export type AuthUserDto = {
  id: string;
  nickname: string;
};
