import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.displayName,
    short_name: COMPANY.shortName,
    description: COMPANY.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f15",
    theme_color: "#0b0f15",
    icons: [
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
