# SIÇRA
Jump Jump tarzındaki basılı tut / bırak mekaniğinden esinlenen, özgün çizimlerle hazırlanmış izometrik platform oyunu. Harici paket, görsel veya ağ isteği gerektirmez.

## Oynanış
- Ekranın boş alanına veya alttaki güç alanına basılı tut; bırakarak atla.
- Yön sıradaki platforma otomatik döner; yalnızca mesafeyi ayarlarsın.
- Masaüstünde Boşluk veya Enter tuşu da aynı şekilde tutulup bırakılır.
- Her platform 1 puan. Merkezden iniş 2–10 ek puan verir; merkez serisi bozulursa çarpan sıfırlanır.
- İlk girişte 3 atlayışlık güvenli öğretici açılır. İşaretli güç bandı ve iniş çizgisi sadece öğreticide görünür. Öğreticide kaçırınca aynı platformdan tekrar denersin.
- Gerçek oyunda boşluğa düşmek turu bitirir. Zamanla daha dar platformlar ve daha uzun boşluklar gelir.
- P / Esc duraklatır. Ekrandaki ses düğmesi isteğe bağlı sentezlenmiş sesleri açar.

Rekor, ses ayarı ve öğretici bilgisi mevcut tarayıcıda saklanır. Sekme gizlenince oyun duraklar. Çift dokunma ve iptal edilen dokunma fazladan atlayış oluşturmaz. Ekran dönüşü, tutulan gücü atlayış yapmadan iptal eder.

`index.html` doğrudan açılabilir veya statik sunucuda çalıştırılabilir. Oyun salonundaki iframe için güvenli kaynak kontrolüyle hub:pause, hub:resume ve hub:menu mesajları desteklenir.

## Doğrulama
Depo kökünde `node tests/sicra.cjs`: üretilen platformlara 80 ardışık iniş, seri/puan hesabı, öğretici tamamlama, güvenli tekrar, düşme, güç sınırı, dokunma iptali, çoklu dokunma, sekme kaybı, salon duraklatma/devam, yerel kayıt ve farklı boyutlarda 20 çizim. Canvas çizimleri ve DOM uyarlayıcısıyla yapılan kontroller gerçek mobil tarayıcı testinin yerine geçmez.

## Enerji Hattı güncellemesi
Görsel kimlik yeniden çizildi: koyu petrol mavisi zemin, grafit ve metal detaylı piyon, altıgen yüzen enerji adaları, enerji izleri ve altın/turkuaz arayüz. Piyon, silindir ve küp çizimleri kaldırıldı. Hedefler gerçek çarpışma alanıyla birlikte küçüldü: normal turda yarıçap başlangıçta 36–40, ileride en az 24; öğreticide 40. Altıgenin dışındaki köşeler artık iniş sayılmaz.

Dokuzuncu adadan itibaren her dört adada bir hedef yan eksende salınır. Sıçrayış hedefi bırakma anında sabitlenir; ada havadayken de hareket eder. Üzerine inilen ada sabitlenir; oyuncu durduğu yerde taşınmaz veya kaymaz. Öğreticide hareketli ada yoktur. Hareketli adanın ilk görünümünde açıklama gösterilir. Önceki rekor ve öğretici kayıtları korunur.

Karakter ve hareket güncellemesi: aynı küçük ekran ölçeğinde, tek parça metalik koni. Uçuş, mesafeye göre hesaplanan ilk dikey hız ve sabit yerçekimiyle parabolik ilerler. İnişte sönümlenen hafif esneme, yönlü salınım, temas halkası ve az miktarda toz vardır. Gölge yüksekliğe göre yayılır ve zeminden platforma geçer. Boşlukta yatay momentum ve aşağı hız korunur; kenara takılan koni kısa bir devrilmeden sonra düşer. Platform kenarı düşen gövdenin önünde çizilir. Duraklatma animasyon saatlerini de durdurur. Küçük karakter ölçeği ve geniş kamera korunur.

## Şekiller ve katı yüzey çarpışması
Kare blok, daire, ince dikdörtgen plaka, altıgen ve dar silindir sütun sırayla üretilir. Her şeklin çizimi ve çarpışma alanı ortak geometriyi kullanır. Kalınlıkları da farklıdır. İnce plakaların kısa ekseni atlayış yönüne yerleştirilir; sütunlar daha küçük dairesel iniş alanı sunar. Merkez bonusu toleransı platformun dar eksenine göre hesaplanır.

Koni kenara yetişemeyince artık yan duvara ilerlemez. Düşüş 4 ms alt adımlarla çözülür; koninin o yükseklikteki yarıçapı ile platformun katı yan yüzeyi test edilir. Temasta gövde dışarıda tutulur, normal yönündeki hız geri seker, temas izi gösterilir. Kenara takılma sırasında taban kontrollü biçimde dışarı kayar. Ön yüz temaslarında koni önde, arka yüz temaslarında blok arkasında çizilir. 5 şekil × 4 geliş yönü × 2 kare süresiyle 40 çarpışma senaryosu katı hacme girmeme ve dışarı sekme açısından kontrol edilir.
