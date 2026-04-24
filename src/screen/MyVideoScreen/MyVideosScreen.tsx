import { GetAllVideosDto } from '@/shared/types/typesFromBackend';
import { VideosList } from '@/widgets/VideosList';

type MyVideosScreenProps = {
  data: GetAllVideosDto['data'];
};

export const MyVideosScreen = ({ data }: MyVideosScreenProps) => {
  return <VideosList data={data} />;
};
