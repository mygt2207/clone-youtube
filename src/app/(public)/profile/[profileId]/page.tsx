import type { Metadata } from "next";

type ProfileDetailsProps = {
  params: Promise<{
    profileId: string;
  }>;
};
export const metadata: Metadata = {
  title: "Youtube clone. Profile details.",
};

export default async function ProfileDetails({ params }: ProfileDetailsProps) {
  console.log("logger", "data", await params);
  const data = await params;

  return <div>profile Id: {data.profileId}</div>;
}
