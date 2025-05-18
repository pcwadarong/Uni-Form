import Link from "next/link";
import Image from "next/image";

const sns = [
  {
    name: "github",
    icon: <Image src={"/github.svg"} alt="github" width="22" height="22" />,
    link: "https://github.com/pcwadarong/Uni-Form",
  },
  {
    name: "facebook",
    icon: <Image src={"/facebook.svg"} alt="github" width="21" height="21" />,
    link: "https://www.facebook.com/",
  },
  {
    name: "instagram",
    icon: <Image src={"/instagram.svg"} alt="github" width="23" height="23" />,
    link: "https://www.instagram.com/",
  },
  {
    name: "x",
    icon: <Image src={"/x.svg"} alt="github" width="23" height="23" />,
    link: "https://twitter.com/",
  },
];

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center gap-4 pt-14 -mb-14 text-gray-400">
      <ul className="flex gap-4 items-center">
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
