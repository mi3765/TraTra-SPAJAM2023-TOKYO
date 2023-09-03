import Header from "@/components/Header"
import { Footer } from "@/components/Footer ";
// import { RouteCreationEdit } from "@/pages/map/RouteCreationEdit";
import { CardList } from "@/pages/CardList";

export default function Home() {
  return (
    <>
      <Header />
      <CardList />
      {/* <RouteCreationEdit/> */}
      <Footer />
    </>
  )
}
