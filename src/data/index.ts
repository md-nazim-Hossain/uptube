import { ISideProps, IYoutubeVideo } from "@/types";
import { TfiWorld } from "react-icons/tfi";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";

export const sidebarTopData: ISideProps[] = [
  {
    label: "Discover",
    Icon: "/assets/images/icons/home.svg",
    href: "/",
  },
  {
    label: "Shorts",
    Icon: "/assets/images/icons/shorts.svg",
    href: "/",
  },
  {
    label: "Library",
    Icon: "/assets/images/icons/library.svg",
    href: "/",
  },
];

export const channelHistoryData: ISideProps[] = [
  {
    label: "Your Channel",
    Icon: "/assets/images/icons/channel.svg",
    href: "/",
  },
  {
    label: "History",
    Icon: "/assets/images/icons/history.svg",
    href: "/",
  },
  {
    label: "Your Videos",
    Icon: "/assets/images/icons/videos.svg",
    href: "/",
  },
  {
    label: "Likes",
    Icon: "/assets/images/icons/like.svg",
    href: "/",
  },
];

export const exploreData: ISideProps[] = [
  {
    label: "Trending",
    Icon: "/assets/images/icons/trending.svg",
    href: "/",
  },
  {
    label: "Music",
    Icon: "/assets/images/icons/music.svg",
    href: "/",
  },
  {
    label: "Video",
    Icon: "/assets/images/icons/videos.svg",
    href: "/",
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
