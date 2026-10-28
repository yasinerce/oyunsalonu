OYUN SALONU — TAŞINABİLİR PAKET

ZIP'i bir klasöre çıkarın ve index.html dosyasını açın.
Kurulum, npm, derleme veya CDN gerekmez. Klasör yapısını koruyun.
Bir web sitesine eklemek için bu klasörün bütün içeriğini yükleyin.

MENÜ: Sağ / sol ok ile seçim, Enter ile oyun ekranı.
OYUN: Kontroller oyun içindeki başlangıç ekranında ve ? düğmesinde.
ESC veya Oyunlar: Menüye dönüş. Sayfa açık kaldığı sürece tur korunur.
Yeniden başlat düğmesi aktif oyunu sıfırlar; rekorları silmez.
Favoriler, rekorlar ve görünüm tercihleri tarayıcıda saklanır.
Yerel dosyalarda kayıt desteği tarayıcıya göre değişebilir.
POTA'nın çevrimiçi çok oyunculu modu internet bağlantısı gerektirir.
Diğer oyunlar ve menü harici kaynak istemez. POTA PWA kurulumu
yalnızca HTTPS veya localhost üzerinde kullanılabilir.

catalog.js: Oyun isimleri, açıklamalar, renkler, görseller ve rekor anahtarları.
app.js: Menü, kütüphane, favoriler ve oyun ekranı.
style.css: Duyarlı arayüz. assets/: SVG çizimler.
games/: Beş oyunun bağımsız kaynakları. hub-bridge.js: Menü bağlantısı.
Oyunlar ayrıca games/oyun-adı/index.html üzerinden tek başına açılabilir.

Konsol menülerinden ilham alan bağımsız tasarım. Sony/PlayStation
logoları veya resmi görsel varlıkları kullanılmaz.
POTA üçüncü taraf lisansları games/pota/vendor ve fonts içindedir.

ORTAK OYUN TEMASI
game-theme.css: Beş oyunun ortak arayüz katmanı ve renk değişkenleri.
game-theme.js: Canvas renkleri ve ortak görünüm tercihleri.
Oyunlar tek başına açıldığında da aynı görünümü kullanır.

HORI — DASH PROTOTİPİ 02
Ana menüde HORI kartından açılır. Kaynaklar hori-lab/ altındadır.
Kademeli joystick hızı, kısa hızlanma/frenleme, yumuşak dash eğrisi,
sürekli gölge takibi ve kamera geçişleri kullanılır. Uzun basıp sürükle
ile güç seçilir. Salona dönüşte koşu duraklar; tekrar girişte korunur.
Hori kendi arayüzünü ve aynı paleti kullanır; ayrı bir Android build değildir.

HORI 03: Salondan tek adımda başlar. Dash basılıyken Z/X/C ile güç
seçimi; rota kesen ve çengel hücumu yapan gölge; görünür alan içinde
ışık üretimi. Hori ayrıntıları için hori-lab/README.txt dosyasına bakın.

HORI 04: Doğrudan takip, sarı nişan, kırmızı yön kilidi ve düz saldırı.
Güçler seyrektir: yerde 1, çantada 2 farklı güç. Normal run boş çantayla başlar.

HORI 05: Mesafe/dash durumuna bağlı saldırı seçimi; yakın koni süpürmesi,
önden kesme ve iki aşamalı baskı. Son kırmızı uyarıdan sonra yön kilitlidir.
