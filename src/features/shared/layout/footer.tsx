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

/**
 * 전역 푸터 컴포넌트
 * SNS 링크 및 저작권 정보를 표시
 */
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
