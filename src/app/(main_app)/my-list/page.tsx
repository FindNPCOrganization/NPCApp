import { fetchUserFavorites as backendFetchUserFavorites } from "@/util/fetchUserFavorites";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { ShareListCopyButton } from "@/components/ui/share-list-copy-button";
import { fetchRAGDataForAPartner as backendFetchRAGDataForAPartner } from "@/util/fetchRAGDataForAPartner";
import MyListTable from "./my-list-table";

export const metadata = {
  title: "My List | PartnerFind",
};

export default async function MyListPage() {
  const { userId }: { userId: string | null } = auth(); // get clerk user ID

  async function fetchUserFavorites(userId: string) {
    "use server";
    try {
      const partners = await backendFetchUserFavorites(userId);
      return partners;
    } catch (error: any) {
      console.error("Error when getting all partners", error);
      throw error; // Rethrow the error after logging it
    }
  }

  async function fetchRAGDataForAPartner(partnerName: string) {
    "use server";

    try {
      const ragData = await backendFetchRAGDataForAPartner(partnerName);
      return ragData;
    } catch (error: any) {
      console.error("Error when getting RAG data for a partner", error);
      throw error; // Rethrow the error after logging it
    }
  }

  // Get the host dynamically
  const headersList = headers();
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Construct the full URL
  const fullUrl = `${protocol}://${host}/my-list/${userId}`; // use logged in user's user id

  return (
    <div className="space-y-4">
      <MyListTable
        fetchUserFavorites={fetchUserFavorites}
        fetchRAGDataForAPartner={fetchRAGDataForAPartner}
        userID={userId}
      />
      <div className="container px-4 md:pl-20">
        <ShareListCopyButton value={fullUrl} />
      </div>
      <div></div>
    </div>
  );
}
