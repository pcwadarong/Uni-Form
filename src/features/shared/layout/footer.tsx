import SVGIcon from "@/features/shared/icons/icons";
import Link from "next/link";

const sns = [
  {
    name: "github",
    icon: <SVGIcon name="GithubIcon" size={20} />,
    link: "https://github.com/pcwadarong/Uni-Form",
  },
  {
    name: "facebook",
    icon: <SVGIcon name="FacebookIcon" size={19} />,
    link: "https://www.facebook.com/",
  },
  {
    name: "instagram",
    icon: <SVGIcon name="InstagramIcon" />,
    link: "https://www.instagram.com/",
  },
  {
    name: "x",
    icon: <SVGIcon name="TwitterXIcon" />,
    link: "https://twitter.com/",
  },
];

export default function Footer() {
  return (
    <footer className="-mt-36 flex flex-col items-center justify-center gap-4 pt-10 text-gray-400 ">
      <nav aria-label="소셜 미디어 링크">
        <ul className="flex items-center gap-4">
          {sns.map((item) => (
            <li key={item.name}>
              <Link href={item.link} aria-label={`${item.name}로 이동`}>
                {item.icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="caption">© 2024. Uni Form Co. all rights reserved.</p>
    </footer>
  );
}
