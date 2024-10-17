export const revalidate = 0; //disable cached to fetch fresh data everytime
import { getFormByUserIDSelect } from "@/app/api/lib/db";
import FormDisplaySelect from "@/app/component/FormDisplaySelect";

export default async function Page({ searchParams }: { searchParams: any }) {
  const userId = searchParams.by; // Extract the user ID from the query parameters

  if (!userId) {
    return <div>No User ID found in the URL.</div>;
  }

  try {
    // Fetch data asynchronously in the server component
    const allFormsByUser = await getFormByUserIDSelect(userId);

    if (!allFormsByUser || allFormsByUser.forms.length === 0) {
      return <div>No forms found for this user.</div>;
    }

    // Pass the data to the client component
    return <FormDisplaySelect forms={allFormsByUser.forms} />;
  } catch (err) {
    console.error("Something went wrong while fetching the forms.", err);
    return (
      <div>
        Something went wrong while fetching the forms. Please try again later.
      </div>
    );
  }
}
