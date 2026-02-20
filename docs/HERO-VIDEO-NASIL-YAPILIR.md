# Hero arka plan videosu nasıl yapılır (Spline → Video)

Düşük performanslı cihazlarda 3D yerine hafif bir video göstermek için Spline sahnenizi videoya çevirip bu projede kullanabilirsiniz.

---

## Ücretsiz yöntem: Ekran kaydı (Spline export ücretliyse)

Spline’ın video export’u ücretliyse **ekran kaydı** ile bedava video alabilirsin. Spline’a para vermene gerek yok.

### 1. Sahneyi tam ekran oynat

- **Seçenek A:** Kendi siteni aç (keybrotherstech.com veya localhost). Geniş ekranda Spline açılır; hero alanı tam ekran yap veya sadece o bölgeyi kaydedeceksin.
- **Seçenek B:** Spline’da projeyi aç, **Preview / Play** ile sahneyi oynat, pencerede tam ekran (F11) yap.

### 2. Ekran kaydı al

| Cihaz / program | Nasıl |
|-----------------|--------|
| **Mac** | `Cmd + Shift + 5` → “Record selected portion” veya “Record entire screen” → Kayıt alanını seç → Kayda başla. 10–15 saniye oynat, durdur. Kayıt `Desktop`’a düşer. |
| **Windows** | `Win + G` (Xbox Game Bar) → Kamera ikonu → Kaydet. Veya ücretsiz [OBS Studio](https://obsproject.com/) kur, “Window Capture” veya “Display Capture” ile sadece tarayıcı penceresini seç, kaydet. |
| **OBS (her platform)** | Kaynak: “Window Capture” (tarayıcı) veya “Browser” (tek bir URL). 10–15 saniye kaydet, MP4 veya MKV çıkar. |

Sadece **hero / 3D alanını** kaydetmek istersen: Tarayıcıda sayfayı büyüt, kayıt alanını sadece robotun olduğu kısma göre ayarla; böylece gereksiz menü vs. videoya girmez.

### 3. Dosyayı projeye koy

- Kaydettiğin dosyayı **`assets/hero-bg.mp4`** adıyla projedeki **assets** klasörüne kopyala.
- Mac’te `.mov` çıkarsa: VLC veya HandBrake ile MP4’e çevir, ya da FFmpeg:  
  `ffmpeg -i kayit.mov -c:v libx264 -crf 23 -an assets/hero-bg.mp4`

### 4. (İsteğe bağlı) Boyutu düşür

Ekran kaydı genelde büyük olur. Sıkıştırmak için:

```bash
ffmpeg -i hero-bg.mp4 -vcodec libx264 -crf 28 -preset medium -an -vf "scale=1280:720" hero-bg-small.mp4
```

`hero-bg-small.mp4` dosyasını `assets/hero-bg.mp4` diye kullan.

Bu yöntemle **Spline’a para vermeden** hero videosunu elde edebilirsin.

---

## (Ücretli Spline export kullanırsan) Adım 1: Spline’da sahneyi açın

1. [spline.design](https://spline.design) adresine gidin ve giriş yapın.
2. Ana sayfadaki robot sahnesini oluşturduğunuz projeyi açın (veya aynı sahneyi kopyaladıysanız o projeyi).
3. Sahne tam ekran ve istediğiniz kamerayla görünsün (videoda nasıl görünmesini istiyorsanız öyle ayarlayın).

---

## Adım 2: Video / görüntü serisi dışa aktarma

1. Üst araç çubuğunda **Export** (Dışa Aktar) butonuna tıklayın.
2. Açılan panelde **Files** bölümünde şunlardan birini seçin:
   - **Video Recording** (doğrudan video çıktı)
   - veya **Image Sequence** (saniye başına kareler; sonra bunları videoya çevirirsiniz).
3. **Video Recording** seçtiyseniz:
   - **Frame rate:** 24 veya 30 FPS yeterli (60 FPS dosyayı büyütür).
   - **Süre:** Döngü için 10–15 saniye ayarlayın (Start / Stop ile kaydı başlatıp durdurun).
   - Format olarak **MP4** veya **WebM** seçip indirin.
4. **Image Sequence** seçtiyseniz:
   - Aynı şekilde 24 veya 30 FPS, 10–15 saniye.
   - ZIP olarak indirirsiniz; sonra aşağıdaki “Alternatif” ile videoya çevirirsiniz.

---

## Adım 3: Videoyu döngüye uygun hale getirin (isteğe bağlı)

Videonun başı ve sonu aynı kareye yakınsa döngü daha akıcı olur. Spline’da animasyonu buna göre ayarlayıp tekrar export edebilirsiniz. Zorunlu değil; farklı olsa da döngü çalışır.

---

## Adım 4: Dosyayı projeye koyun

1. İndirdiğiniz videoyu proje klasöründe **`assets`** içine kopyalayın.
2. Dosya adı: **`hero-bg.mp4`** (veya `.webm` kullanacaksanız `hero-bg.webm`).
   - Tam yol örnek: `keybrothersweb3/assets/hero-bg.mp4`

İsterseniz hem MP4 hem WebM koyabilirsiniz; sitede ikisi de tanımlı, tarayıcı uygun olanı seçer.

---

## Adım 5: Boyutu küçültün (önerilir)

Video çok büyükse (örn. 20 MB+) mobilde yavaş yüklenir. Şunları yapın:

- **Çözünürlük:** 1920×1080 veya 1280×720 yeterli.
- **Sıkıştırma:** [HandBrake](https://handbrake.fr/) veya [FFmpeg](https://ffmpeg.org/) ile H.264, orta kalite.
  - Örnek FFmpeg:  
    `ffmpeg -i hero-bg.mp4 -vcodec libx264 -crf 28 -preset medium -an hero-bg-small.mp4`  
    (`-an` sesi kaldırır; arka plan için yeterli.)
- Hedef: **1–3 MB** civarı iyi bir denge.

---

## Alternatif: Image Sequence’ten video (Spline sadece resim verirse)

1. Spline’dan **Image Sequence** olarak ZIP indirin.
2. ZIP’i açın (örn. `frame_0001.png` … `frame_0300.png`).
3. FFmpeg ile videoya çevirin (proje klasöründe, frame’lerin olduğu dizinde):
   ```bash
   ffmpeg -framerate 24 -i frame_%04d.png -c:v libx264 -crf 23 -pix_fmt yuv420p -an ../assets/hero-bg.mp4
   ```
4. Çıkan `hero-bg.mp4` dosyasını `assets` içine taşıyın (zaten oradaysa bırakın).

---

## Sonuç

- **Güçlü cihazlar:** Canlı Spline 3D sahne (mevcut davranış).
- **Düşük / eski cihazlar:** Spline yüklenmez; `hero-bg.mp4` (ve varsa `hero-bg.webm`) otomatik oynar, gradient üstünde metin okunabilir kalır.

Video dosyası yoksa veya yüklenemezse sadece gradient arka plan görünmeye devam eder; sayfa yine çalışır.
