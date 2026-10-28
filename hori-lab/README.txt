HORI — DASH LAB / PROTOTİP 08

index.html dosyasını açın. Kurulum ve internet gerektirmez.
Dosyalar aynı klasörde kalmalıdır. Android projesi değildir.

OYUN DÖNGÜSÜ
Öz topla → akışını koru → hücumu kes veya kaç → 10 özü sunağa teslim et.
Koşu sonsuzdur. İlk yakalanma kabuğu kırar; kabuksuz yakalanmak bitirir.

KONTROLLER
WASD / oklar / joystick: hareket.
ATIL / kısa Boşluk: dash.
Dash/Boşluk basılıyken Z: Işık, X: Yem, C: Arınma.
Mobil: basılı tut, çapraz açılan güce sürükle ve bırak.
Seçim gücü hazırlar. Sonraki kısa dash gücü tüketir.
P / Esc: duraklat. Güç seçimi sırasında dünya yavaşlar.
Odak kaybında veya salona dönüşte koşu duraklar.
Salondan Oyna tek adımda başlatır; ikinci açılış menüsü yoktur.

KESİŞ — DASH İLE KARŞI HAMLE
Yalnızca hücumdaki gölgenin gövdesinin içinden, dash'in ilk 0,20
saniyesinde geçerek kesiş yapabilirsin. Alanın kenarına girmek yetmez.
Takip veya hazırlık sırasında içinden geçmek kesiş ödülü vermez.
Başarı: 60 x çarpan puan, +2 öz, 0,95 sn sersemletme, kalan dash
beklemesi en fazla 0,55 sn. Saldırı zinciri iptal olur.
Teslimatta öz zaten doludur; kesiş yine puan ve kaçış aralığı sağlar.
Yakın ıskalama ayrı olarak +15 puan verir.

AKIŞ — ROTA VE TEMPO
Öz toplamak veya kesiş yapmak 4 saniyelik seriyi yeniler.
İlk üç hamle x1; 4–6 x1,5; 7–9 x2; 10–12 x2,5; 13+ x3.
Bir öz 10 x çarpan, teslimat 150 x çarpan puandır; tam sayıya yuvarlanır.
Süreyi kaçırmak, hasar almak veya teslimatı kaçırmak seriyi sıfırlar.
Çarpan öz sayısını artırmaz. Teslimat seriyi artırmaz, süresini yeniler.

TESLİMAT — BASKI ALTINDA KARAR
10 özde sunak belirir. Gölge yaklaşık 0,9 sn durur, sonra yeniden avlar.
9 saniyede sunağa ulaş; halkanın içinde yavaşlayarak 0,45 sn kal.
Dash ile uçarak halkanın içinden geçmek teslimat sayılmaz.
Başarıda öz boşalır, puan yazılır ve kısa kaçış aralığı açılır.
Her üç başarılı teslimatta, kırılmış kabuk onarılır.
Süre biterse 5 öz kalır; kaçış sürer. Hasarda taşınan yük iptal olur
ve 3 öz kaybedilir. Teslimat sırasında yeni ışıklar toplanmaz.
Ekran dışındaki sunağı turkuaz yön işareti gösterir.

IŞIKLA EVRİM VE GÖLGE
İlerleme koşuda fiziksel olarak toplanan toplam ışık sayısına bağlıdır.
Çantadaki öz miktarı, teslimat sayısı ve geçen süre saldırı açmaz.
Kesişin verdiği +2 öz teslimata yarar; ışık toplamı yerine geçmez.
Öz kaybı/teslimat evreyi geri düşürmez. Yeni koşu evre 1'den başlar.

0 ışık: İZ — ön kesme ve yakın süpürme.
10 ışık: BASKI — değişken ikinci hamle ve baskı hücumu.
20 ışık: YANKI — gölgeden dışarı büyüyen şok halkası.
35 ışık: YARIK — öngörülen rotana gecikmeli kesik; hücumlarda zehir izi.
55 ışık: KISKAÇ — iki çapraz hattan gecikmeli gelen gölge bıçakları.
80 ışık: ÖRGÜ — üç hamleye kadar, farklı türler içeren karma zincirler.
110 ışık: AV — daha sık hamle fırsatı; tüm saldırı havuzu açık.
Evre ve bir sonraki ışık eşiği HUD'da görünür. Son evrede koşu sürer.
Yeni saldırı açılınca mevcut zincir bozulmaz; sıradaki yeni zincirde denenir.

Sarı hazırlıkta hedef ayarlanır; kırmızıda geometri sabitlenir.
Halka merkezinin tamamını vurmaz; ince dalga dışarı doğru büyür.
Dalga yaklaşırken dash ile içinden geç veya ulaşamayacağı mesafeye çık.
Yarık, kırmızı hattın kısa gecikme sonrası etkinleşmesidir; kenarından
geç, rotanı değiştir veya etkinleştiği an dash ile aş.
Kıskaçta iki bıçak farklı gecikmelerle işaretli hatlarda ilerler.
Birincisini atlatmak ikincisinin de bittiği anlamına gelmez.
Alan saldırılarında gerçek gölge de bulunur; hücum anında gövdesini
kesişle kesmek sahadaki alan saldırılarını ve kalan zinciri temizler.

Hamle seçimi mesafeyi, hareket kararlılığını, son görülen dash'i ve
son saldırıları kullanır. Ardışık aynı hamle seçilmez. Son komboların
tekrarı engellenmeye çalışılır; doğrudan önceki kombo tekrarlanmaz.
Bir zincirde en fazla bir alan saldırısı bulunur; alanlar sınırsız birikmez.
Devam hamlesinin ayrı uyarısı vardır; sonraki yön ilk hamlede açıklanmaz.
Yeni toplanan ışık, devam eden zincire fazladan hamle eklemez.
Gölge takipte rotanı keser; tekrarlanan kaçış yönlerini hesaba katar.
Işık, yem ve kesiş saldırıyı keser; eski zincir sonradan devam etmez.

GÜÇLER
Işık: dash sonunda yakın gölgeyi 2,2 sn sersemletir.
Yem: dash başlangıcında hareketli kopya bırakır.
Arınma: yavaşlamayı temizler ve dash yolundaki zehir izlerini siler.
Normal koşu boş çantayla başlar; ilk güç yaklaşık 12 sn sonra çıkar.
Yerde en fazla 1, çantada en fazla 2 farklı güç; tür başına 1 kullanım.
Sonraki güçler seyrektir; teslimat ayrıca güç üretmez.
Serbest deneme her güçten 1 adet ve yakalanma koruması verir.

SKOR VE DOĞRULAMA
Yeni puan sistemi için rekor anahtarı hori.dashlab.v7.best kullanılır.
Eski sürümün kaydı silinmez; farklı kuralların skorları karıştırılmaz.
Sonuç ekranı süre, öz, teslimat, güç, kesiş ve en iyi seriyi gösterir.
Çekirdek davranış testleri ve 24 tohumlu koşu simülasyonu çalıştırıldı.
Bu güncellemede evreler, yeni saldırılar ve kombolar otomatik test edildi.
Altı saldırı masaüstü/dikey/yatay canvas boyutlarında çalıştırıldı.
Bu güncellemenin tarayıcı kontrolü otomatik onay denetimiyle engellendi;
gerçek telefondaki parmak hissi ve uzun süreli zorluk dengesi oyuncu testi ister.
