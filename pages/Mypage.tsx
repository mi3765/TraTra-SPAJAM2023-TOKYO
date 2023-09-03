import Header from "@/components/Header";
import PurchasedRoute from "./PurchasedRoute";

const Mypage = () => {
    return (
        <div>
            <Header />
            <div className="flex flex-col items-center my-4">
                <h1>UserName</h1>
                <div className="flex gap-4">
                    <h3>Uriage</h3>
                    <h3>Uriage</h3>
                </div>
                {/* TODO: 買ったルートを表示する */}
                <PurchasedRoute/>
            </div>
        </div>
    )
};

export default Mypage;