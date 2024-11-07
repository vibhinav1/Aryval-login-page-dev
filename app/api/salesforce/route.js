import axios from "axios";

export async function GET(request) {
  const accessToken = process.env.NEXT_PUBLIC_SALESFORCE_ACCESS_TOKEN;
  const instanceUrl = process.env.NEXT_PUBLIC_SALESFORCE_INSTANCE_URL;

  try {
    const response = await axios.get(
      `${instanceUrl}/services/data/v62.0/query?q=SELECT+Id,Name,StartDate,EndDate+FROM+Campaign+WHERE+Status='Published'+AND+Event_Type__c!='Family Interview'`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch data from Salesforce" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
