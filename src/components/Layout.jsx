import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <div className="mt-16">
        {props.children}
      </div>
    </div>
  );
}