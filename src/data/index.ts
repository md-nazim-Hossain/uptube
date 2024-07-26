import { ISideProps, IYoutubeVideo } from "@/types";
import { TfiWorld } from "react-icons/tfi";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { IoGridSharp } from "react-icons/io5";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";

export const sidebarTopData: ISideProps[] = [
  {
    label: "Discover",
    Icon: "/assets/images/icons/home.svg",
    href: "/",
  },
  {
    label: "Shorts",
    Icon: "/assets/images/icons/shorts.svg",
    href: "/shorts/12",
  },
  {
    label: "Library",
    Icon: "/assets/images/icons/library.svg",
    href: "/library",
  },
];

export const studioSidebarData = [
  {
    label: "Dashboard",
    Icon: IoGridSharp,
    href: "/studio",
  },
  {
    label: "Content",
    Icon: MdOutlineVideoLibrary,
    href: "/studio/content/videos",
  },
  {
    label: "Comments",
    Icon: BiCommentDetail,
    href: "/studio/comments",
  },
  {
    label: "Customisation",
    Icon: FaWandMagicSparkles,
    href: "/studio/editing",
  },
];

export const getChannelHistory = (username: string): ISideProps[] => {
  return [
    {
      label: "Your Channel",
      Icon: "/assets/images/icons/channel.svg",
      href: `/channel/${username}?tab=stations`,
    },
    {
      label: "Watch History",
      Icon: "/assets/images/icons/history.svg",
      href: "/feed/history",
    },
    {
      label: "Your Videos",
      Icon: "/assets/images/icons/videos.svg",
      href: `/studio/content/videos`,
    },
    {
      label: "Likes",
      Icon: "/assets/images/icons/like.svg",
      href: `/feed/likes`,
    },
  ];
};

export const exploreData: ISideProps[] = [
  {
    label: "Trending",
    Icon: "/assets/images/icons/trending.svg",
    href: "/feed/trending",
  },
  {
    label: "Music",
    Icon: "/assets/images/icons/music.svg",
    href: "/feed/music",
  },
];

export const youtubeVideos: IYoutubeVideo[] = [
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    songName: "Rick Astley - Never Gonna Give You Up",
  },
  {
    url: "https://www.youtube.com/watch?v=3tmd-ClpJxA",
    songName: "PSY - GANGNAM STYLE",
  },
  {
    url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    songName: "Luis Fonsi - Despacito ft. Daddy Yankee",
  },
  {
    url: "https://www.youtube.com/watch?v=7PCkvCPvDXk",
    songName: "Charlie bit my finger - again !",
  },

  {
    url: "https://www.youtube.com/watch?v=kffacxfA7G4",
    songName: "Justin Bieber - Baby ft. Ludacris",
  },
  {
    url: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
    songName: "Mark Ronson - Uptown Funk ft. Bruno Mars",
  },
  {
    url: "https://www.youtube.com/watch?v=SLMJpHihykI",
    songName: "Shakira - Waka Waka (This Time for Africa)",
  },
  {
    url: "https://www.youtube.com/watch?v=8UFIYGkROII",
    songName: "Eminem - Love The Way You Lie ft. Rihanna",
  },
  {
    url: "https://www.youtube.com/watch?v=lXMskKTw3Bc",
    songName: "Adele - Rolling in the Deep",
  },
  {
    url: "https://www.youtube.com/watch?v=pB-5XG-DbAA",
    songName: "John Legend - All of Me",
  },
  {
    url: "https://www.youtube.com/watch?v=pRpeEdMmmQ0",
    songName: "Avicii - Wake Me Up",
  },
  {
    url: "https://www.youtube.com/watch?v=0zG_lckuzbo",
    songName: "OneRepublic - Counting Stars",
  },
  {
    url: "https://www.youtube.com/watch?v=nfWlot6h_JM",
    songName: "Justin Bieber - Sorry",
  },
];

export const SocialIcons = [
  {
    Icon: TfiWorld,
    url: "https://nazim-rose.vercel.app/",
  },
  {
    Icon: FiFacebook,
    url: "https://www.facebook.com/profile.php?id=100009564501696",
  },
  {
    Icon: FaXTwitter,
    url: "https://twitter.com/MdNazim85808251",
  },
  {
    Icon: FaInstagram,
    url: "https://www.instagram.com/md_nazim_hossain_/",
  },
];

export const footerSocialIcons = [
  {
    Icon: FaFacebook,
    url: "https://www.facebook.com",
  },
  {
    Icon: FaTwitter,
    url: "https://twitter.com",
  },
];
