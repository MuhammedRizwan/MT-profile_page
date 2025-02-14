import Profile from "@/components/profile";

export default function Home() {
  return (
    <div className="min-h-screen bg-black bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTExIDExaDJ2MmgtdnoiLz48L3N2Zz4=')] bg-repeat bg-[size:10px_10px] flex items-center justify-center">
      <Profile/>
    </div>
  );
}
