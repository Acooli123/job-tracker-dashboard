export default function Home() {
  return (
    <div
  className="h-screen w-full fixed bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage:
      "url('https://cdn.dribbble.com/userupload/15224257/file/original-768b4689e07e9b0e6fb0fa4b631cccf0.jpg?resize=400x0')",
  }}
>
  <div className="bg-black/50 w-full h-full flex flex-col justify-center items-center">
    <h1 className="text-5xl font-bold text-white">
      Job Tracker Dashboard
    </h1>

    <p className="text-gray-200 mt-4">
      Track all your job applications easily.
    </p>
  </div>
</div>
  );
}