import FacebookIcon from "@/features/shared/icons/facebook";
import GithubIcon from "@/features/shared/icons/github";
import InstagramIcon from "@/features/shared/icons/instagram";
import TwitterXIcon from "@/features/shared/icons/x";
import Link from "next/link";

const sns = [
  {
    name: "github",
    icon: <GithubIcon width={20} />,
    link: "https://github.com/pcwadarong/Uni-Form",
  },
  {
    name: "facebook",
    icon: <FacebookIcon width={19} />,
    link: "https://www.facebook.com/",
  },
  {
    name: "instagram",
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/",
  },
  {
    name: "x",
    icon: <TwitterXIcon />,
    link: "https://twitter.com/",
  },
];

export default function Footer() {
  return (
    <footer className="-mt-36 flex flex-col items-center justify-center gap-4 pt-10 text-gray-400 ">
      <ul className="flex items-center gap-4">
        {sns.map((item) => (
          <li key={item.name}>
            <Link href={item.link}>{item.icon}</Link>
          </li>
        ))}
      </ul>
      <p className="caption">© 2024. Uni Form Co. all rights reserved.</p>
    </footer>
  );
}
