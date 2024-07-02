import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const sns = [
  { name: 'github', icon: <GitHubIcon />, link: 'https://github.com/pcwadarong/Uni-Form' },
  { name: 'facebook', icon: <FacebookIcon />, link: 'https://www.facebook.com/' },
  { name: 'instagram', icon: <InstagramIcon />, link: 'https://www.instagram.com/' },
  { name: 'x', icon: <XIcon />, link: 'https://twitter.com/' },
];

export default function Footer() {
  return (
    <footer className='h-28 flex flex-col justify-center items-center gap-4 relative -mt-28'>
      <ul className="flex gap-4">
        {sns.map((item) => (
          <li>
            <Link key={item.name} href={item.link}>
              {item.icon}
            </Link>
          </li>
        ))}
      </ul>
      <p className='caption'>© 2024. Uni Form Co. all rights reserved.</p>
    </footer>
  );
}
