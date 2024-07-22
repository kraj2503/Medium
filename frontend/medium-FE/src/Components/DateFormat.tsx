export const DateFormat = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0"); // Ensure 2 digits
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

//   // Example usage:
//   const blog = { createdAt: '2024-07-22T00:00:00.000Z' };
//   const formattedDate = formatDate(blog.createdAt);
//   console.log(formattedDate); // Output: 22-July-2024
