# Oyun Salonu — GitHub Pages paketi

Ana menü ve 6 oyun: HORI, POTA, Yörünge, Kule Dengesi, Tek Atış, SIÇRA.
HTML/CSS/JavaScript dosyalarıdır. npm, terminal veya build işlemi gerekmez.

## Yayınlama
1. ZIP'i bilgisayarında bir klasöre çıkar.
2. GitHub'da New repository ile `oyun-salonu` adlı Public bir depo oluştur.
3. Add file → Upload files seçeneğini aç.
4. Çıkardığın klasörün İÇİNDEKİ bütün dosya ve klasörleri yükle; ZIP dosyasını yükleme.
5. `index.html`, `app.js`, `catalog.js`, `style.css`, `assets`, `games` ve `hori-lab` depo kökünde görünmeli.
6. Commit changes ile kaydet.
7. Settings → Pages → Build and deployment altında Source: Deploy from a branch seç.
8. Branch: main, Folder: /(root) seç ve Save düğmesine bas.
9. Yayın tamamlanınca Pages sayfasındaki Visit site bağlantısına tıkla. Yayın birkaç dakika sürebilir.

Örnek adres: https://KULLANICI_ADIN.github.io/oyun-salonu/

## Güncelleme
Değişen dosyaları aynı yollarla deponun üzerine yükleyip commit et. Pages yeni sürümü yayınlar.

## Kontroller
- Sayfa 404 verirse `index.html` dosyasının depo kökünde olduğuna ve doğru yayın dalı/klasörünün seçildiğine bak.
- Oyun kartları veya görseller yoksa bütün klasörleri yüklediğini kontrol et.
- Deployment hata verirse Actions sekmesinde Pages build and deployment çalışmasını aç.
- Rekorlar bu tarayıcıda saklanır; eski site adresindeki kayıtlar GitHub adresine otomatik taşınmaz.
- POTA'nın çevrimiçi eşleşmesi mevcut PeerJS bağlantısını kullanır; GitHub Pages ayrı bir oyun sunucusu sağlamaz.

Kaynak: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## HORI mobil güncellemesi
Hori mobilde yatay oynanır. Hazırım düğmesine basılmadan oyun başlamaz. Başlatma ve yeniden denemede 3 saniyelik geri sayım vardır; dikey çevirme ve duraklatma geri sayımı da durdurur. Üst bilgiler tek şeritte, joystick ve dash alt köşelerdedir. Bu güncelleme için tüm dosyaları mevcut deponun üzerine aynı yollarla yükleyip commit edin.
