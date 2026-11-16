

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const deleteJob = async (jobId: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
  })

  return res.json()
}
