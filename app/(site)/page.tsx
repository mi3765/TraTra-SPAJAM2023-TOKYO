import Header from "@/components/Header"
import { Detail } from "@/pages/detail/Detail.jsx"
import { Footer } from "@/components/Footer ";
// import { RouteCreationEdit } from "@/pages/map/RouteCreationEdit";
import { CardList } from "@/pages/CardList";

export default function Home() {
  return (
    <>
      <Header />
      <CardList />
      <Detail />
      {/* <RouteCreationEdit/> */}
      <Footer />
    </>
  )
}
