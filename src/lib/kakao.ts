// Kakao JS SDK loader + init helpers (Maps + Channel chat button).
// Loaded lazily on pages that need it — never load globally in the root layout.

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Channel: {
        createChatButton: (options: {
          container: string;
          channelPublicId: string;
        }) => void;
        chat: (options: { channelPublicId: string }) => void;
      };
      maps: unknown;
    };
  }
}

const KAKAO_SDK_SRC = "https://developers.kakao.com/sdk/js/kakao.js";

let loadPromise: Promise<void> | null = null;

/** Loads the Kakao JS SDK script once and calls Kakao.init with the given JS key. */
export function loadKakaoSdk(jsKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.Kakao?.isInitialized()) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = KAKAO_SDK_SRC;
    script.async = true;
    script.onload = () => {
      window.Kakao?.init(jsKey);
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Kakao SDK"));
    document.head.appendChild(script);
  });

  return loadPromise;
}

/** Opens the KakaoTalk Channel 1:1 chat for the given channel public ID. */
export function openKakaoChannelChat(channelPublicId: string): void {
  window.Kakao?.Channel.chat({ channelPublicId });
}
