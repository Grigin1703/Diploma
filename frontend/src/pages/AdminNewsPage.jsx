import EditNews from "@/components/Admin/pages/EditNews/EditNews";

export default function AdminNewsPage({ addNews }) {
  if (addNews) {
    return (
      <div className="editNews">
        <EditNews add />
      </div>
    );
  } else {
    return (
      <div className="editNews">
        <EditNews />
      </div>
    );
  }
}
