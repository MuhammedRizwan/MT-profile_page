import Profile from "@/components/profile";

export default function Home() {
  return (
    <div
      data-testid="main-container"
      className="min-h-screen bg-black bg-[url('...')] bg-repeat bg-[size:10px_10px] flex items-center justify-center"
    >
      <Profile />
    </div>
  );
}
