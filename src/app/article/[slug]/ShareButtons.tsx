"use client";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Share2, Copy, MessageCircle } from "lucide-react";

export default function ShareButtons({ article }: { article: any }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const title = article.title;

  function shareFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
  }
  function shareTwitter() {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
  }
  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, "_blank");
  }
  function copyLink() {
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  }

  return (
    <div className="flex gap-3 mb-2">
      <Button size="icon" variant="outline" onClick={shareFacebook} title="Share on Facebook" type="button">
        <Facebook className="w-5 h-5" />
      </Button>
      <Button size="icon" variant="outline" onClick={shareTwitter} title="Share on Twitter" type="button">
        <Twitter className="w-5 h-5" />
      </Button>
      <Button size="icon" variant="outline" onClick={shareWhatsApp} title="Share on WhatsApp" type="button">
        <MessageCircle className="w-5 h-5" />
      </Button>
      <Button size="icon" variant="outline" onClick={copyLink} title="Copy Link" type="button">
        <Copy className="w-5 h-5" />
      </Button>
    </div>
  );
} 