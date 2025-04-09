import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imo } = req.query;
  const API_KEY = "c566262f77c548958a488e9f8fd66d1b"; // استبدل بمفتاح API الخاص بك

  try {
    const response = await fetch(
      `https://api.vesselfinder.com/vessels?userkey=${API_KEY}&imo=${imo}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }
    console.log(response);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
