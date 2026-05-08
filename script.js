(() => {
      const nameFromUrl = new URLSearchParams(location.search).get("name");
      const princessName = (nameFromUrl || "郭卓").trim().slice(0, 8);
      const title = document.getElementById("title");
      const app = document.getElementById("app");
      const opening = document.getElementById("opening");
      const party = document.getElementById("party");
      const giftButton = document.getElementById("giftButton");
      const confettiLayer = document.getElementById("confettiLayer");
      const card = document.getElementById("birthdayCard");
      const message = document.getElementById("message");
      const drawButton = document.getElementById("drawButton");
      const drawAgainButton = document.getElementById("drawAgainButton");
      const fortunePage = document.getElementById("fortunePage");
      const fortuneBackdrop = document.getElementById("fortuneBackdrop");
      const fortuneSheet = document.getElementById("fortuneSheet");
      const fortuneClose = document.getElementById("fortuneClose");
      const fortuneKicker = document.getElementById("fortuneKicker");
      const fortuneMark = document.getElementById("fortuneMark");
      const fortuneTitle = document.getElementById("fortuneTitle");
      const fortunePoem = document.getElementById("fortunePoem");
      const fortuneKeyword = document.getElementById("fortuneKeyword");
      const fortuneLucky = document.getElementById("fortuneLucky");
      const fortuneDetail = document.getElementById("fortuneDetail");
      const featureButtons = document.querySelectorAll(".feature-button");
      const mediaModal = document.getElementById("mediaModal");
      const mediaSheet = document.getElementById("mediaSheet");
      const mediaKicker = document.getElementById("mediaKicker");
      const mediaTitle = document.getElementById("mediaTitle");
      const mediaContent = document.getElementById("mediaContent");
      const videoModal = document.getElementById("videoModal");
      const videoSheet = document.getElementById("videoSheet");
      const birthdayVideo = document.getElementById("birthdayVideo");
      const bgm = document.getElementById("bgm");
      const parallaxItems = document.querySelectorAll(".dot, .wave");
      const managedVideos = new Set();
      const bgmBlockers = new Set();
      const SURPRISE_MODAL_BLOCKER = "surprise-modal";
      const SURPRISE_VIDEO_SOURCES = ["surprise_mobile.mp4", "surprise_fast.mp4", "surprise_web.mp4"];
      const featureMeta = {
        moments: { label: "瞬间", symbol: "♡" },
        flags: { label: "flag就是用来打破的", symbol: "!" },
        progress: { label: "赋能姐进化史", symbol: "↔" },
        study: { label: "学霸笔记", symbol: "✎" },
        surprise: { label: "惊喜", symbol: "▶" }
      };

      const blessing = "今天的你要被快乐包围，被奶油云朵托住，被好运亲一口。愿你眼里一直有星星，心里一直有糖，所有愿望都闪闪发光！🎂✨💖🥳";
      const momentPhotos = [
        { type: "image", src: "moment_a.webp", fallback: "moment_a.jpg", caption: "第一次被投喂，感动了。" },
        { type: "image", src: "moment_b.webp", fallback: "moment_b.jpg", caption: "笑死我了在图书馆雷霆大睡。" },
        { type: "video", src: "moment_c_fast.mp4", fallback: "moment_c.mp4", caption: "阴没边了，严肃收藏。" }
      ];
      const progressPhotos = {
        before: "before.webp",
        beforeFallback: "before.jpg",
        after: "after.webp",
        afterFallback: "after.jpg"
      };
      const flagPhotos = [
        { src: "flag_a.webp", fallback: "flag_a.jpg", caption: "flag 01" },
        { src: "flag_b.webp", fallback: "flag_b.jpg", caption: "flag 02" }
      ];
      const studyPhotos = [
        { src: "study_1.webp", fallback: "study_1.jpg", caption: "学霸笔记 01" },
        { src: "study_2.webp", fallback: "study_2.jpg", caption: "学霸笔记 02" },
        { src: "study_3.webp", fallback: "study_3.jpg", caption: "学霸笔记 03" }
      ];
      const fortunes = [
        {
          title: "星星加冕签",
          mark: "上上",
          kicker: "生日限定签",
          poem: "今天的月亮把皇冠借给你，路过的人都负责递上甜甜的好运。",
          keyword: "被偏爱",
          lucky: "收到一句很真心的夸夸",
          detail: "这一签说：你不用努力变成谁眼里的满分，因为你本来就很闪。今天适合大胆许愿、认真收礼物，也适合把快乐摆在第一位。",
          bg: "linear-gradient(135deg, #fff084, #ff9ed1 58%, #9bd7ff)",
          accent: "#ff5aa9"
        },
        {
          title: "奶油云朵签",
          mark: "大吉",
          kicker: "甜度爆表签",
          poem: "有一朵云偷偷变成蛋糕，只为了让你的今天软乎乎、甜滋滋。",
          keyword: "松弛快乐",
          lucky: "吃到第一口就超满足的甜品",
          detail: "这一签说：慢一点也很好，赖床、发呆、拍照、被照顾，都算今天的正经事。你的能量会在舒服的节奏里重新亮起来。",
          bg: "linear-gradient(135deg, #91f0d4, #fff6a3 54%, #ffb0cf)",
          accent: "#42c9aa"
        },
        {
          title: "彩虹冲浪签",
          mark: "上吉",
          kicker: "多巴胺签",
          poem: "彩虹今天不挂天上，它跳进你的口袋，随时准备给生活加一格亮度。",
          keyword: "灵感开花",
          lucky: "拍到一张很好看的照片",
          detail: "这一签说：适合尝试一点新鲜的小事。换个发型、换条路线、听一首没听过的歌，都可能把开心按钮轻轻按亮。",
          bg: "linear-gradient(135deg, #8fe0ff, #c9a5ff 50%, #ff9fcb)",
          accent: "#7b66ff"
        },
        {
          title: "好运贴贴签",
          mark: "特吉",
          kicker: "心想事成签",
          poem: "好运不是路过，它今天坐在你旁边，认真等你点名。",
          keyword: "顺顺利利",
          lucky: "遇到一个刚刚好的巧合",
          detail: "这一签说：你心里惦记的事，会被温柔地推一把。不要急着证明什么，先接住那些正在靠近你的善意和机会。",
          bg: "linear-gradient(135deg, #ffdc62, #8cf1ca 52%, #9ecbff)",
          accent: "#ffad1f"
        },
        {
          title: "粉色心动签",
          mark: "小满",
          kicker: "浪漫补给签",
          poem: "粉色泡泡咕嘟咕嘟冒出来，每一个都写着：今天要被温柔对待。",
          keyword: "可爱发生",
          lucky: "收到让嘴角上扬的消息",
          detail: "这一签说：你的可爱会被看见，你的情绪也值得被认真接住。今天可以更坦率一点，喜欢就靠近，开心就笑出声。",
          bg: "linear-gradient(135deg, #ff8abc, #ffc07a 55%, #fff084)",
          accent: "#ff6e94"
        },
        {
          title: "月光充电签",
          mark: "吉",
          kicker: "能量恢复签",
          poem: "月光给你留了一盏小夜灯，提醒你：被世界爱着的人，也要好好爱自己呀。",
          keyword: "温柔回血",
          lucky: "睡一个很舒服的觉",
          detail: "这一签说：今天不必把所有事都做到极致。把自己放回第一顺位，喝水、休息、拥抱、撒娇，都是很棒的生日仪式。",
          bg: "linear-gradient(135deg, #b995ff, #90cfff 50%, #fff6a3)",
          accent: "#8a6cff"
        }
      ];
      const confettiColors = ["#ff5aa9", "#ffe45e", "#8cf0d2", "#78c8ff", "#cba0ff", "#ff986d", "#ffffff"];
      const emojiPool = ["🎈", "✨", "🎂", "💖", "🌟"];
      let hasOpened = false;
      let typeTimer = 0;
      let fortuneIndex = -1;
      let tickingParallax = false;

      title.textContent = `${princessName}小公主，生日快乐！`;

      function normalizeFeatureButtons() {
        featureButtons.forEach((button) => {
          const meta = featureMeta[button.dataset.modal];
          if (!meta) return;
          button.dataset.label = meta.label;
          button.dataset.symbol = meta.symbol;
          button.setAttribute("aria-label", meta.label);

          let symbol = button.querySelector(".button-symbol");
          if (!symbol) {
            symbol = document.createElement("span");
            symbol.className = "button-symbol";
            button.replaceChildren(symbol);
          }
          symbol.textContent = meta.symbol;
        });
      }

      normalizeFeatureButtons();

      function createMediaCoordinator(audio) {
        let unlocked = false;

        const hasPlayingVideo = () => {
          for (const video of managedVideos) {
            if (!video.paused && !video.ended) return true;
          }
          return false;
        };

        const playAudioIfAllowed = () => {
          if (!audio || !unlocked || bgmBlockers.size > 0 || hasPlayingVideo()) return;
          audio.volume = .38;
          const playPromise = audio.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {});
          }
        };

        const pauseOtherVideos = (activeVideo) => {
          managedVideos.forEach((video) => {
            if (video !== activeVideo && !video.paused) video.pause();
          });
        };

        return {
          unlock() {
            unlocked = true;
            playAudioIfAllowed();
          },
          block(blocker) {
            bgmBlockers.add(blocker);
            if (audio) audio.pause();
          },
          release(blocker) {
            bgmBlockers.delete(blocker);
            playAudioIfAllowed();
          },
          registerVideo(video) {
            if (!video || video.dataset.mediaManaged === "true") return;
            video.dataset.mediaManaged = "true";
            managedVideos.add(video);
            video.addEventListener("play", () => {
              this.block(video);
              pauseOtherVideos(video);
            });
            video.addEventListener("pause", () => this.release(video));
            video.addEventListener("ended", () => this.release(video));
          },
          unregisterVideo(video) {
            if (!video) return;
            video.pause();
            this.release(video);
            managedVideos.delete(video);
          }
        };
      }

      const mediaCoordinator = createMediaCoordinator(bgm);
      const unlockBgm = () => mediaCoordinator.unlock();
      const blockBgm = (blocker) => mediaCoordinator.block(blocker);
      const releaseBgm = (blocker) => mediaCoordinator.release(blocker);
      const registerManagedVideo = (video) => mediaCoordinator.registerVideo(video);
      const unregisterManagedVideo = (video) => mediaCoordinator.unregisterVideo(video);

      registerManagedVideo(birthdayVideo);
      birthdayVideo.addEventListener("error", () => {
        if (!videoModal.classList.contains("is-visible")) return;
        const nextIndex = Number(birthdayVideo.dataset.sourceIndex || 0) + 1;
        if (nextIndex >= SURPRISE_VIDEO_SOURCES.length) return;
        birthdayVideo.dataset.sourceIndex = String(nextIndex);
        birthdayVideo.src = SURPRISE_VIDEO_SOURCES[nextIndex];
        birthdayVideo.load();
      });

      function makePlaceholder(label, colorA, colorB) {
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 760">
            <defs>
              <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                <stop stop-color="${colorA}"/>
                <stop offset="1" stop-color="${colorB}"/>
              </linearGradient>
            </defs>
            <rect width="900" height="760" rx="42" fill="url(#g)"/>
            <circle cx="150" cy="130" r="74" fill="#fff" opacity=".35"/>
            <circle cx="762" cy="598" r="104" fill="#fff" opacity=".28"/>
            <path d="M146 428q74-72 148 0t148 0t148 0t148 0" fill="none" stroke="#fff" stroke-width="24" stroke-linecap="round" opacity=".42"/>
            <text x="450" y="374" text-anchor="middle" font-family="Arial, sans-serif" font-size="68" font-weight="800" fill="#fff">${label}</text>
          </svg>`;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
      }

      function popSound() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * .14, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);

        for (let i = 0; i < data.length; i += 1) {
          data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        }

        const noise = ctx.createBufferSource();
        const noiseGain = ctx.createGain();
        noise.buffer = noiseBuffer;
        osc.type = "triangle";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(54, now + .16);
        gain.gain.setValueAtTime(.001, now);
        gain.gain.exponentialRampToValueAtTime(.28, now + .012);
        gain.gain.exponentialRampToValueAtTime(.001, now + .18);
        noiseGain.gain.setValueAtTime(.18, now);
        noiseGain.gain.exponentialRampToValueAtTime(.001, now + .12);

        osc.connect(gain).connect(ctx.destination);
        noise.connect(noiseGain).connect(ctx.destination);
        osc.start(now);
        noise.start(now);
        osc.stop(now + .2);
        noise.stop(now + .14);
        window.setTimeout(() => ctx.close(), 360);
      }

      function launchConfetti() {
        const count = Math.min(78, Math.max(48, Math.floor(window.innerWidth / 7)));
        const fragment = document.createDocumentFragment();
        confettiLayer.replaceChildren();

        for (let i = 0; i < count; i += 1) {
          const piece = document.createElement("i");
          const angle = Math.random() * Math.PI * 2;
          const distance = window.innerWidth * (.36 + Math.random() * .66);
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance + window.innerHeight * (.16 + Math.random() * .34);
          const width = 7 + Math.random() * 9;
          const height = 8 + Math.random() * 17;

          piece.className = "confetti";
          piece.style.setProperty("--tx", `${tx}px`);
          piece.style.setProperty("--ty", `${ty}px`);
          piece.style.setProperty("--rot", `${Math.random() * 900 - 450}deg`);
          piece.style.setProperty("--scale", `${.7 + Math.random() * .9}`);
          piece.style.setProperty("--dur", `${980 + Math.random() * 900}ms`);
          piece.style.setProperty("--delay", `${Math.random() * 120}ms`);
          piece.style.setProperty("--w", `${width}px`);
          piece.style.setProperty("--h", `${height}px`);
          piece.style.setProperty("--r", Math.random() > .45 ? "50%" : "3px");
          piece.style.setProperty("--c", confettiColors[i % confettiColors.length]);
          fragment.appendChild(piece);
        }

        confettiLayer.appendChild(fragment);
        window.setTimeout(() => confettiLayer.replaceChildren(), 2400);
      }

      function celebrateFullScreen(power = 1) {
        const count = Math.min(140, Math.max(64, Math.floor(96 * power)));
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < count; i += 1) {
          const piece = document.createElement("i");
          piece.className = "confetti";
          piece.style.left = `${Math.random() * 100}%`;
          piece.style.top = `-8%`;
          piece.style.setProperty("--tx", `${(Math.random() - .5) * window.innerWidth}px`);
          piece.style.setProperty("--ty", `${window.innerHeight * (.72 + Math.random() * .58)}px`);
          piece.style.setProperty("--rot", `${Math.random() * 980 - 490}deg`);
          piece.style.setProperty("--scale", `${.72 + Math.random() * .88}`);
          piece.style.setProperty("--dur", `${1180 + Math.random() * 980}ms`);
          piece.style.setProperty("--delay", `${Math.random() * 160}ms`);
          piece.style.setProperty("--w", `${6 + Math.random() * 10}px`);
          piece.style.setProperty("--h", `${8 + Math.random() * 16}px`);
          piece.style.setProperty("--r", Math.random() > .5 ? "50%" : "3px");
          piece.style.setProperty("--c", confettiColors[i % confettiColors.length]);
          fragment.appendChild(piece);
        }

        confettiLayer.appendChild(fragment);
        window.setTimeout(() => confettiLayer.replaceChildren(), 2800);
      }

      function spawnFloatingEmoji() {
        if (!party.classList.contains("is-visible")) return;
        const emoji = document.createElement("span");
        emoji.className = "float-emoji";
        emoji.textContent = emojiPool[Math.floor(Math.random() * emojiPool.length)];
        emoji.style.left = `${8 + Math.random() * 84}%`;
        emoji.style.top = `${18 + Math.random() * 68}%`;
        emoji.style.setProperty("--emoji-dx", `${Math.random() * 56 - 28}px`);
        document.body.appendChild(emoji);
        window.setTimeout(() => emoji.remove(), 3600);
      }

      function typeBlessing() {
        window.clearTimeout(typeTimer);
        message.replaceChildren();

        const chars = Array.from(blessing);
        chars.forEach((char, index) => {
          typeTimer = window.setTimeout(() => {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = char;
            span.style.animationDelay = `${Math.min(index * 8, 80)}ms`;
            message.appendChild(span);
          }, index * 62);
        });
      }

      function openGift() {
        if (hasOpened) return;
        hasOpened = true;
        giftButton.classList.add("is-burst");
        popSound();
        launchConfetti();

        window.setTimeout(() => {
          window.requestAnimationFrame(() => {
            app.classList.add("is-open");
          });
        }, 520);

        window.setTimeout(() => {
          window.requestAnimationFrame(() => {
            opening.classList.add("is-hidden");
            document.body.classList.remove("opening-lock");
            window.requestAnimationFrame(() => {
              party.classList.add("is-visible");
              window.scrollTo(0, 0);
              window.setTimeout(typeBlessing, 160);
            });
          });
        }, 940);
      }

      function updateTilt(x, y) {
        card.style.setProperty("--tilt-x", `${x}deg`);
        card.style.setProperty("--tilt-y", `${y}deg`);
      }

      function handlePointerTilt(event) {
        if (!party.classList.contains("is-visible")) return;
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - .5;
        const py = (event.clientY - rect.top) / rect.height - .5;
        updateTilt((-py * 8).toFixed(2), (px * 10).toFixed(2));
      }

      function handleAmbientParallax(event) {
        if (!party.classList.contains("is-visible")) return;
        const px = (event.clientX / window.innerWidth - .5) * 2;
        const py = (event.clientY / window.innerHeight - .5) * 2;
        parallaxItems.forEach((item, index) => {
          const depth = (index % 5 + 1) * 2.8;
          item.style.setProperty("--mouse-x", `${px * depth}px`);
          item.style.setProperty("--mouse-y", `${py * depth}px`);
        });
      }

      function bindMotionTilt() {
        const onOrientation = (event) => {
          if (!party.classList.contains("is-visible")) return;
          const beta = Math.max(-18, Math.min(18, event.beta || 0));
          const gamma = Math.max(-18, Math.min(18, event.gamma || 0));
          updateTilt((-beta / 5).toFixed(2), (gamma / 4).toFixed(2));
        };

        if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
          DeviceOrientationEvent.requestPermission().then((state) => {
            if (state === "granted") {
              window.addEventListener("deviceorientation", onOrientation, { passive: true });
            }
          }).catch(() => {});
        } else {
          window.addEventListener("deviceorientation", onOrientation, { passive: true });
        }
      }

      function drawFortune() {
        let next = Math.floor(Math.random() * fortunes.length);
        if (fortunes.length > 1 && next === fortuneIndex) {
          next = (next + 1) % fortunes.length;
        }
        fortuneIndex = next;
        const fortune = fortunes[fortuneIndex];

        fortuneKicker.textContent = fortune.kicker;
        fortuneMark.textContent = fortune.mark;
        fortuneTitle.textContent = fortune.title;
        fortunePoem.textContent = fortune.poem;
        fortuneKeyword.textContent = fortune.keyword;
        fortuneLucky.textContent = fortune.lucky;
        fortuneDetail.textContent = fortune.detail;
        fortuneSheet.style.setProperty("--fortune-bg", fortune.bg);
        fortuneSheet.style.setProperty("--fortune-accent", fortune.accent);
        fortunePage.classList.add("is-visible");
        fortunePage.setAttribute("aria-hidden", "false");
        restartSheetAnimation(fortuneSheet);
      }

      function sprinkleFromButton(sourceButton = drawButton) {
        const rect = sourceButton.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        for (let i = 0; i < 12; i += 1) {
          const dot = document.createElement("span");
          dot.className = "sparkle";
          dot.style.left = `${cx + (Math.random() * 80 - 40)}px`;
          dot.style.top = `${cy + (Math.random() * 20 - 10)}px`;
          dot.style.setProperty("--sx", `${Math.random() * 84 - 42}px`);
          dot.style.background = confettiColors[i % confettiColors.length];
          document.body.appendChild(dot);
          window.setTimeout(() => dot.remove(), 760);
        }
      }

      function closeFortune() {
        fortunePage.classList.remove("is-visible");
        fortunePage.setAttribute("aria-hidden", "true");
      }

      function restartSheetAnimation(sheet) {
        sheet.style.transform = "translateY(18px) scale(.96)";
        sheet.style.opacity = "0";
        window.requestAnimationFrame(() => {
          sheet.style.transform = "";
          sheet.style.opacity = "";
        });
      }

      function renderMoments() {
        mediaSheet.style.setProperty("--modal-bg", "linear-gradient(135deg, #ff8abc, #ffc07a 58%, #fff084)");
        mediaKicker.textContent = "轻量相册";
        mediaTitle.textContent = "瞬间";

        let current = 0;
        const carousel = document.createElement("div");
        const stage = document.createElement("div");
        const prev = document.createElement("button");
        const next = document.createElement("button");
        const counter = document.createElement("span");
        const caption = document.createElement("p");

        carousel.className = "moment-carousel";
        stage.className = "moment-stage";
        prev.className = "moment-arrow prev";
        next.className = "moment-arrow next";
        counter.className = "moment-counter";
        caption.className = "moment-caption";
        prev.type = "button";
        next.type = "button";
        prev.setAttribute("aria-label", "上一张");
        next.setAttribute("aria-label", "下一张");
        prev.textContent = "‹";
        next.textContent = "›";

        const showPhoto = (index) => {
          current = (index + momentPhotos.length) % momentPhotos.length;
          const photo = momentPhotos[current];
          const fallback = makePlaceholder(`瞬间 ${String(current + 1).padStart(2, "0")}`, ["#ff8abc", "#8fe0ff", "#91f0d4"][current], ["#ffc07a", "#b995ff", "#fff084"][current]);
          const oldMedia = stage.querySelector("img, video");
          if (oldMedia && oldMedia.tagName === "VIDEO") unregisterManagedVideo(oldMedia);
          if (oldMedia) oldMedia.remove();

          let media;
          if (photo.type === "video") {
            media = document.createElement("video");
            media.src = photo.src;
            media.controls = true;
            media.preload = "metadata";
            media.playsInline = true;
            media.addEventListener("error", () => {
              if (!photo.fallback || media.dataset.fallbackLoaded === "true") return;
              media.dataset.fallbackLoaded = "true";
              media.src = photo.fallback;
              media.load();
            });
            registerManagedVideo(media);
          } else {
            media = document.createElement("img");
            media.src = photo.src;
            media.alt = photo.caption;
            media.loading = "lazy";
            media.onerror = () => {
              media.onerror = null;
              media.src = photo.fallback || fallback;
            };
          }
          stage.prepend(media);
          caption.textContent = photo.caption;
          counter.textContent = `${current + 1} / ${momentPhotos.length}`;
          media.style.animation = "none";
          void media.offsetWidth;
          media.style.animation = "";
        };

        prev.addEventListener("click", () => showPhoto(current - 1));
        next.addEventListener("click", () => showPhoto(current + 1));
        stage.append(prev, next, counter);
        carousel.append(stage, caption);
        mediaContent.replaceChildren(carousel);
        showPhoto(0);
      }

      function renderFlags() {
        mediaSheet.style.setProperty("--modal-bg", "linear-gradient(135deg, #fff084, #ff8abc 52%, #8cf0d2)");
        mediaKicker.textContent = "Flag Breaker";
        mediaTitle.textContent = "《不爱打瓦的小女孩》";

        let current = 0;
        const carousel = document.createElement("div");
        const stage = document.createElement("div");
        const prev = document.createElement("button");
        const next = document.createElement("button");
        const counter = document.createElement("span");
        const caption = document.createElement("p");

        carousel.className = "moment-carousel flag-carousel";
        stage.className = "moment-stage";
        prev.className = "moment-arrow prev";
        next.className = "moment-arrow next";
        counter.className = "moment-counter";
        caption.className = "moment-caption";
        prev.type = "button";
        next.type = "button";
        prev.setAttribute("aria-label", "上一张");
        next.setAttribute("aria-label", "下一张");
        prev.textContent = "‹";
        next.textContent = "›";

        const showFlag = (index) => {
          current = (index + flagPhotos.length) % flagPhotos.length;
          const safeIndex = current;
          const photo = flagPhotos[current];
          const image = document.createElement("img");
          const oldImage = stage.querySelector("img");
          if (oldImage) oldImage.remove();

          image.src = photo.src;
          image.alt = photo.caption;
          image.loading = "lazy";
          image.onerror = () => {
            image.onerror = null;
            image.src = photo.fallback || makePlaceholder(`FLAG ${String(safeIndex + 1).padStart(2, "0")}`, ["#fff084", "#ff8abc", "#8cf0d2", "#78c8ff"][safeIndex], ["#ff8abc", "#8cf0d2", "#b995ff", "#ffc07a"][safeIndex]);
          };
          stage.prepend(image);
          stage.scrollTop = 0;
          caption.textContent = photo.caption;
          counter.textContent = `${current + 1} / ${flagPhotos.length}`;
          image.style.animation = "none";
          void image.offsetWidth;
          image.style.animation = "";
        };

        prev.addEventListener("click", () => showFlag(current - 1));
        next.addEventListener("click", () => showFlag(current + 1));
        stage.append(prev, next, counter);
        carousel.append(stage, caption);
        mediaContent.replaceChildren(carousel);
        showFlag(0);
      }

      function renderStudy() {
        mediaSheet.style.setProperty("--modal-bg", "linear-gradient(135deg, #8cf0d2, #78c8ff 52%, #fff084)");
        mediaKicker.textContent = "Study Notes";
        mediaTitle.textContent = "《爱学习的小女孩》";

        let current = 0;
        const carousel = document.createElement("div");
        const stage = document.createElement("div");
        const prev = document.createElement("button");
        const next = document.createElement("button");
        const counter = document.createElement("span");
        const caption = document.createElement("p");

        carousel.className = "moment-carousel flag-carousel";
        stage.className = "moment-stage";
        prev.className = "moment-arrow prev";
        next.className = "moment-arrow next";
        counter.className = "moment-counter";
        caption.className = "moment-caption";
        prev.type = "button";
        next.type = "button";
        prev.setAttribute("aria-label", "上一张");
        next.setAttribute("aria-label", "下一张");
        prev.textContent = "‹";
        next.textContent = "›";

        const showStudy = (index) => {
          current = (index + studyPhotos.length) % studyPhotos.length;
          const safeIndex = current;
          const photo = studyPhotos[current];
          const image = document.createElement("img");
          const oldImage = stage.querySelector("img");
          if (oldImage) oldImage.remove();

          image.src = photo.src;
          image.alt = photo.caption;
          image.loading = "lazy";
          image.onerror = () => {
            image.onerror = null;
            image.src = photo.fallback || makePlaceholder(`STUDY ${String(safeIndex + 1).padStart(2, "0")}`, ["#8cf0d2", "#78c8ff", "#fff084"][safeIndex], ["#78c8ff", "#b995ff", "#ff8abc"][safeIndex]);
          };
          stage.prepend(image);
          stage.scrollTop = 0;
          caption.textContent = photo.caption;
          counter.textContent = `${current + 1} / ${studyPhotos.length}`;
          image.style.animation = "none";
          void image.offsetWidth;
          image.style.animation = "";
        };

        prev.addEventListener("click", () => showStudy(current - 1));
        next.addEventListener("click", () => showStudy(current + 1));
        stage.append(prev, next, counter);
        carousel.append(stage, caption);
        mediaContent.replaceChildren(carousel);
        showStudy(0);
      }

      function renderProgress() {
        mediaSheet.style.setProperty("--modal-bg", "linear-gradient(135deg, #8cf1ca, #78c8ff 58%, #b995ff)");
        mediaKicker.textContent = "Before & After";
        mediaTitle.textContent = "赋能姐进化史";

        const panel = document.createElement("div");
        const slider = document.createElement("div");
        const afterLayer = document.createElement("div");
        const beforeLayer = document.createElement("div");
        const afterImg = document.createElement("img");
        const beforeImg = document.createElement("img");
        const afterLabel = document.createElement("span");
        const beforeLabel = document.createElement("span");
        const handle = document.createElement("span");
        const range = document.createElement("input");
        const note = document.createElement("p");

        panel.className = "progress-panel";
        slider.className = "progress-slider";
        afterLayer.className = "progress-layer progress-after-layer";
        beforeLayer.className = "progress-layer progress-before-layer";
        beforeLabel.className = "progress-label before";
        afterLabel.className = "progress-label after";
        handle.className = "progress-handle";
        range.className = "progress-range";
        note.className = "progress-note";

        beforeImg.src = progressPhotos.before;
        beforeImg.alt = "萌新期 Before";
        beforeImg.addEventListener("error", () => {
          beforeImg.src = progressPhotos.beforeFallback || makePlaceholder("Before", "#d8b58a", "#8cf1ca");
        }, { once: true });

        afterImg.src = progressPhotos.after;
        afterImg.alt = "大魔王期 After";
        afterImg.addEventListener("error", () => {
          afterImg.src = progressPhotos.afterFallback || makePlaceholder("After", "#ff8abc", "#78c8ff");
        }, { once: true });

        beforeLabel.textContent = "Before";
        afterLabel.textContent = "After";
        range.type = "range";
        range.min = "0";
        range.max = "100";
        range.value = "50";
        range.setAttribute("aria-label", "拖动查看进化前后对比");
        note.textContent = "是谁偷偷进化我不说。";

        const applySplit = (value) => {
          const clamped = Math.max(0, Math.min(100, Number(value)));
          const ratio = clamped / 100;
          const safeRatio = Math.max(.01, ratio);
          const push = (ratio - .5) * 26;
          const beforeOpacity = Math.max(0, Math.min(1, (clamped - 10) / 22));
          const afterOpacity = Math.max(0, Math.min(1, (90 - clamped) / 22));
          const beforeShift = clamped < 34 ? -Math.round((34 - clamped) * 1.15) : Math.round((clamped - 50) * .18);
          const afterShift = clamped > 66 ? Math.round((clamped - 66) * 1.15) : Math.round((clamped - 50) * .18);
          slider.style.setProperty("--split", `${clamped}%`);
          slider.style.setProperty("--split-ratio", ratio.toFixed(4));
          slider.style.setProperty("--safe-split-ratio", safeRatio.toFixed(4));
          slider.style.setProperty("--before-push", `${push.toFixed(2)}px`);
          slider.style.setProperty("--after-push", `${(-push).toFixed(2)}px`);
          slider.style.setProperty("--before-label-opacity", beforeOpacity.toFixed(3));
          slider.style.setProperty("--after-label-opacity", afterOpacity.toFixed(3));
          slider.style.setProperty("--before-label-shift", `${beforeShift}px`);
          slider.style.setProperty("--after-label-shift", `${afterShift}px`);
          range.value = String(clamped);
        };

        range.addEventListener("input", () => applySplit(range.value));
        afterLayer.append(afterImg, afterLabel);
        beforeLayer.append(beforeImg, beforeLabel);
        slider.append(afterLayer, beforeLayer, handle, range);
        panel.append(slider, note);
        mediaContent.replaceChildren(panel);
        applySplit(50);
      }

      function openMedia(type, sourceButton) {
        sourceButton.classList.remove("is-rippling");
        void sourceButton.offsetWidth;
        sourceButton.classList.add("is-rippling");
        window.setTimeout(() => sourceButton.classList.remove("is-rippling"), 680);
        if (type === "surprise") blockBgm(SURPRISE_MODAL_BLOCKER);
        const activeMomentVideo = mediaContent.querySelector("video");
        if (activeMomentVideo) unregisterManagedVideo(activeMomentVideo);
        closeFortune();
        if (type === "moments") {
          renderMoments();
        } else if (type === "progress") {
          renderProgress();
        } else if (type === "flags") {
          renderFlags();
        } else if (type === "study") {
          renderStudy();
        } else {
          openVideo(sourceButton);
          return;
        }

        mediaModal.classList.add("is-visible");
        mediaModal.setAttribute("aria-hidden", "false");
        restartSheetAnimation(mediaSheet);
        sprinkleFromButton(sourceButton);
      }

      function closeMedia() {
        const video = mediaContent.querySelector("video");
        if (video) unregisterManagedVideo(video);
        mediaModal.classList.remove("is-visible");
        mediaModal.setAttribute("aria-hidden", "true");
      }

      function openVideo(sourceButton) {
        blockBgm(SURPRISE_MODAL_BLOCKER);
        closeMedia();
        closeFortune();
        videoModal.classList.add("is-visible");
        videoModal.setAttribute("aria-hidden", "false");
        if (!birthdayVideo.getAttribute("src")) {
          birthdayVideo.dataset.sourceIndex = "0";
          birthdayVideo.src = SURPRISE_VIDEO_SOURCES[0];
        }
        birthdayVideo.load();
        restartSheetAnimation(videoSheet);
        celebrateFullScreen(1);
        sprinkleFromButton(sourceButton);
      }

      function closeVideo() {
        birthdayVideo.pause();
        birthdayVideo.removeAttribute("src");
        birthdayVideo.load();
        birthdayVideo.dataset.sourceIndex = "0";
        releaseBgm(SURPRISE_MODAL_BLOCKER);
        videoModal.classList.remove("is-visible");
        videoModal.setAttribute("aria-hidden", "true");
      }

      function updateParallax() {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        parallaxItems.forEach((item, index) => {
          const speed = index % 2 === 0 ? .05 : .085;
          item.style.setProperty("--parallax-y", `${y * speed}px`);
        });
        tickingParallax = false;
      }

      function requestParallax() {
        if (tickingParallax) return;
        tickingParallax = true;
        window.requestAnimationFrame(updateParallax);
      }

      ["pointerdown", "touchstart", "keydown"].forEach((eventName) => {
        window.addEventListener(eventName, unlockBgm, { once: true, passive: eventName !== "keydown" });
      });

      giftButton.addEventListener("click", () => {
        unlockBgm();
        openGift();
        bindMotionTilt();
      }, { once: true });

      drawButton.addEventListener("click", () => {
        drawFortune();
        sprinkleFromButton(drawButton);
        celebrateFullScreen(.72);
      });

      drawAgainButton.addEventListener("click", () => {
        drawFortune();
        sprinkleFromButton(drawAgainButton);
        celebrateFullScreen(.52);
      });

      fortuneClose.addEventListener("click", closeFortune);
      fortuneBackdrop.addEventListener("click", closeFortune);
      fortuneMark.addEventListener("click", () => {
        fortuneMark.classList.remove("is-rippling");
        void fortuneMark.offsetWidth;
        fortuneMark.classList.add("is-rippling");
        sprinkleFromButton(fortuneMark);
        window.setTimeout(() => fortuneMark.classList.remove("is-rippling"), 720);
      });
      mediaModal.addEventListener("click", (event) => {
        if (event.target.matches("[data-close-modal]")) closeMedia();
      });
      videoModal.addEventListener("click", (event) => {
        if (event.target.matches("[data-close-video]")) closeVideo();
      });
      featureButtons.forEach((button) => {
        button.addEventListener("click", () => {
          openMedia(button.dataset.modal, button);
        });
      });

      window.addEventListener("pointermove", (event) => {
        handlePointerTilt(event);
        handleAmbientParallax(event);
      }, { passive: true });
      window.addEventListener("pointerleave", () => updateTilt(0, 0), { passive: true });
      window.addEventListener("scroll", requestParallax, { passive: true });
      window.setInterval(spawnFloatingEmoji, 2600);
      updateParallax();
    })();
