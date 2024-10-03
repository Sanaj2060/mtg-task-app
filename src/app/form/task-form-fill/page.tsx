import { getFormByID } from "@/app/api/lib/db";
import DisplayDynamicForm from "@/app/component/DisplayDynamicForm";
import type { FormQuestions, FormData } from "@/app/types/form";

export default async function Page({ searchParams }: { searchParams: any }) {
  const formid = searchParams.formid;

  if (!formid) {
    return <>No Form ID found in the URL.</>;
  }

  try {
    // Fetch the form by ID, which may return null
    const formbyid = await getFormByID(formid);

    if (!formbyid) {
      return <div>No form found for the given ID.</div>;
    }

    // Transform or validate formdata to ensure it has the correct structure
    let formdata: FormQuestions | null = null;

    if (formbyid.formdata && (formbyid.formdata as FormQuestions).questions) {
      formdata = formbyid.formdata as FormQuestions;
    }

    // Create the FormData object, converting createdon to string
    const formDataToPass: FormData = {
      ...formbyid,
      createdon: formbyid.createdon.toISOString(), // Convert Date to string
      formdata: formdata // Pass the validated formdata
    };

    // Pass the validated data to the dynamic form component
    return <DisplayDynamicForm formData={formDataToPass} />;
  } catch (err) {
    console.error("Something went wrong while fetching the form.", err);
    return <div>Something went wrong while fetching the form. Please try again later.</div>;
  }
}
