import MainFooter from "../components/footer";
import NavHeader from "../components/nav-header";

export default function EventsLayout({ children }) {
  return (
    <>
      <NavHeader/>
      {children}
      <MainFooter/>
    </>
  );
}

