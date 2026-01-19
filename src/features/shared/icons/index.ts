import BookmarkIcon from "./images/bookmark";
import BubbleChatIcon from "./images/bubble-chat";
import DarkIcon from "./images/dark";
import EmailIcon from "./images/email";
import FacebookIcon from "./images/facebook";
import FileEditIcon from "./images/file";
import FilterIcon from "./images/filter";
import FormIcon from "./images/form";
import GithubIcon from "./images/github";
import HamburgerIcon from "./images/hamburger";
import ImageIcon from "./images/image";
import InstagramIcon from "./images/instagram";
import SunIcon from "./images/light";
import BrandLogo from "./images/logo";
import PasswordIcon from "./images/password";
import ReportIcon from "./images/report";
import ShareIcon from "./images/share";
import UserIcon from "./images/user";
import TwitterXIcon from "./images/x";

export const IconMap = {
  BookmarkIcon,
  BubbleChatIcon,
  DarkIcon,
  EmailIcon,
  FacebookIcon,
  FileEditIcon,
  FilterIcon,
  FormIcon,
  GithubIcon,
  HamburgerIcon,
  ImageIcon,
  InstagramIcon,
  SunIcon,
  BrandLogo,
  PasswordIcon,
  ReportIcon,
  ShareIcon,
  UserIcon,
  TwitterXIcon,
} as const;

export type IconMapTypes = keyof typeof IconMap;

export const IconSizes = {
  xl: 36,
  lg: 24,
  md: 20,
  sm: 16,
  xs: 12,
} as const;

export type IconSizeTypes = keyof typeof IconSizes;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
  color?: string;
  size?: number | string;
}
