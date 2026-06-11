"use client";

import { useEffect } from "react";
import { loadKakaoSdk, openKakaoChannelChat } from "@/lib/kakao";

type KakaoChannelButtonProps = {
  className?: string;
  label?: string;
};

/**
 * Floating / inline button that opens the KakaoTalk Channel 1:1 chat.
 * This is the site's only inquiry entry point alongside `tel:` links —
 * no web form, no DB, no email.
 */
export function KakaoChannelButton({
  className,
  label = "카카오톡 문의",
}: KakaoChannelButtonProps) {
  const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? "";
  const channelPublicId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_PUBLIC_ID ?? "";

  useEffect(() => {
    if (jsKey) {
      loadKakaoSdk(jsKey);
    }
  }, [jsKey]);

  const handleClick = () => {
    if (!channelPublicId) return;
    openKakaoChannelChat(channelPublicId);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  );
}
