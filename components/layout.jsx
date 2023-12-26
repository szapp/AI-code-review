import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Exo_2 } from 'next/font/google';
import { FaGithub } from "react-icons/fa";
import { IoMdSunny, IoMdMoon } from "react-icons/io";

const main = Exo_2({
  subsets: ['latin'],
  variable: '--font-main',
})

export default function Layout({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect( () => {
    if (window.localStorage.theme === 'dark' || (!('theme' in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  });

  const toggleDark = (e) => {
    if (e)
      e.preventDefault();

    if (window.localStorage.theme === 'dark' || (!('theme' in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(false);
      window.localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      window.localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={`${main.className} relative`}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="prefetch" href="/manifest.json" />
        <meta name="theme-color" content={isDark ? "#000000" : "#ffffff"} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-title" content="AI Code Review" />
        <meta name="application-name" content="AI Code Review" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" sizes="192x192" href="/images/icon-192x192_app.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/images/icon-512x512_app.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/images/splash/icon_1136x640.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/images/splash/icon_640x1136.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="/images/splash/icon_2688x1242.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/images/splash/icon_1792x828.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/images/splash/icon_1125x2436.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/images/splash/icon_828x1792.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="/images/splash/icon_2436x1125.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/images/splash/icon_1242x2208.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="/images/splash/icon_2208x1242.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/images/splash/icon_1334x750.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/images/splash/icon_750x1334.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/images/splash/icon_2732x2048.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/images/splash/icon_2048x2732.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/images/splash/icon_2388x1668.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/images/splash/icon_1668x2388.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/images/splash/icon_2224x1668.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/images/splash/icon_1242x2688.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/images/splash/icon_1668x2224.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/images/splash/icon_1536x2048.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/images/splash/icon_2048x1536.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Let AI fix your code using a LLM" />
        <meta name="og:title" content="AI code review" />
        <meta property="og:image" content="/images/opengraph-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <meta name="google" content="nositelinkssearchbox" key="nositelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
        <meta name="google" content="noimageindex" key="noimageindex" />
      </Head>
      <div className="absolute top-2 right-2 sm:top-3 sm:right-4 items-right flex flex-row gap-3 justify-end text-2xl leading-none select-none">
        <a href="#" onClick={toggleDark} className="relative bg-neutral-400 dark:bg-neutral-700 rounded-full w-14 h-7 text-sm whitespace-nowrap"><IoMdSunny className="absolute top-1 left-1 w-5 h-5 bg-white dark:bg-transparent text-blue-500 dark:text-inherit rounded-full p-1" /><IoMdMoon className="absolute top-1 right-1 w-5 h-5 dark:bg-black dark:text-blue-500 rounded-full p-1" /></a>
        <a href="https://github.com/szapp/AI-code-review"><FaGithub className="block w-7 h-7" /></a>
      </div>
      {children}
    </div>
  );
}
