import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MGL Scorecard",
    short_name: "MGL Scorecard",
    description: "A scorecard app for MGL",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/MGL_app_icon_192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/MGL_app_icon_512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
