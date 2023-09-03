import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';

export const Footer = () => {
    return (
        <ul className='flex mt-10 bottom-0 left-0 w-full bg-gray-800 text-white text-center py-4'>
            <li className='flex-1 text-center'>
                <Link href="/">
                        <HomeIcon />
                        <p>ホーム</p>
                </Link>
            </li>
            <li className='flex-1 text-center'>
                <Link href="/News">
                        <NotificationsIcon />
                        <p>お知らせ</p>
                </Link>
            </li>
            <li className='flex-1 text-center'>
                <Link href="/CreateRoute">
                        <FmdGoodIcon />
                        <p>ルート出品</p>
                </Link>
            </li>
            <li className='flex-1 text-center'>
                <Link href="/Mypage">
                        <PersonIcon />
                        <p>マイページ</p>
                </Link>
            </li>
        </ul>
    );
}
