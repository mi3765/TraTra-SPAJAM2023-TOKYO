"use client"
import { Card } from "@/components/Card"
import { useRouter } from "next/navigation"

export const CardList: React.FC = () => {
    // const router = useRouter();
    // const { data } = router.query;
    // const handleClickDetail = (e, href: MouseEvent<HTMLButtonElement>, number) => {
    //     router.push(Card/card.id);
    // }
    return (
        <div className="grid grid-cols-2 gap-2 m-2">
            {/* <ul>
                {cards.map(card) => (
                    <li key={card.id} onClick={() => handleClickDetail(e, card.id)}>{card.title}</li>
                )}
            </ul> */}
            <div className="text-center my-2">
                <Card />
            </div>
            <div className="text-center my-2">
                <Card />
            </div>
            <div className="text-center my-2">
                <Card />
            </div>
            <div className="text-center my-2">
                <Card />
            </div>
            <div className="text-center my-2">
                <Card />
            </div>
            <div className="text-center my-2">
                <Card />
            </div>
            <div className="text-center my-2">
                <Card />
            </div>
            <div className="text-center my-2">
                <Card />
            </div>
            <div className="text-center my-2">
                <Card />
            </div>

        </div>
    )
}
