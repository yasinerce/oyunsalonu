# HORI 07 — Mekanik değerlendirmesi

Önceki sürümde gölgeyi geliştirmek, oyuncunun yapabildiklerini aynı ölçüde geliştirmiyordu. Dash'in baskın kullanımı uzaklaşmaktı. Rastgele ışıklar eşit değerdeydi. On özün ardından altı saniye duran gölge, döngünün doruğunda tehdidi kaldırıyordu. Güçler bu eksikleri tek başına karşılamıyordu.

## Yeni kararlar

- **Dash'i saklamak:** Güvenli kaçış için hazır tutabilir veya hücumdaki gölgeyi kesmek için risk alabilirsin. Kesiş gövde teması ve dash zamanlaması ister. Başarısı yeni bir hareket aralığı açar.
- **Rotayı seçmek:** Her ışık aynı temel özü verir; dört saniyelik akış puanı değiştirir. Güvenli geniş rota ile çarpanı koruyan kısa rota arasında tercih oluşur.
- **Yükü taşımak:** Sunak görünürken gölge kısa duraklamadan sonra yeniden takip eder. Sunağa varmak yetmez; kısa süre yavaşlamak gerekir. Yem, kesiş ve Işık bu pencereyi açabilir.
- **Koşuyu sürdürmek:** Üç teslimat kabuğu onarır. Hayatta kalmakla hedef tamamlamak arasında olumlu bir bağ kurulur.

## Adalet ve okunabilirlik

Kırmızı hedef sabittir. Hızlı geçişlerde çarpışma yalnızca son konumlara bakmaz. Kesiş geniş koninin kenarından tetiklenmez. Sersemletme eski saldırı zincirini temizler. Teslimat sırasında yük on özü aşmaz. Yeni skorlar ayrı rekor anahtarında tutulur; eski kayıt silinmez.

## Sonraki dengelemede ölçülecekler

İlk hasara kadar süre; kullanılan dash'lerin kaçış/kesiş dağılımı; hücum başına başarılı kesiş; teslimat tamamlama oranı; ölüm anındaki hazır güçler; seri kaybının beklemeden mi hasardan mı geldiği. Bunlar gerçek oyuncu oturumlarında gözlemlenmeli. Otomatik bot sonuçları insan zorluğu veya oyunun eğlenceli olduğu sonucunu vermez.

Bu sürümün amacı hareket, risk ve ödülü aynı döngüye bağlamak. Yeni saldırı türleri, arena engelleri veya kalıcı yükseltmeler eklemeden önce bu döngünün oyuncu testinde çalışması gerekir.


# HORI 08 — Işığa bağlı evrim

Zaman yerine fiziksel ışık sayısı evreyi belirler. Kesiş özü, çantadaki yük ve teslimat farklı kavramlardır: öz yükü boşalabilir, ışık toplamı koşu boyunca birikir. 0 / 10 / 20 / 35 / 55 / 80 / 110 eşikleri HUD'da görünür.

Yeni tehditler farklı karşılıklar ister: genişleyen halka zamanlama; gecikmeli yarık rota değişimi; çapraz bıçaklar iki ayrı geliş zamanını izleme. Geometri kırmızı kilitte sabittir. Gölgenin gövdesine kesiş, alanları ve kalan komboyu iptal eder.

Kombo bir kez başlarken planlanır; yeni evre devam eden komboyu uzatmaz. En fazla üç hamle ve zincir başına bir alan saldırısı vardır. Mesafe, son dash ve hareket kararlılığı seçim ağırlıklarını etkiler; saldırı ve kombo geçmişi tekrarları azaltır. Aynı son kombo arka arkaya seçilmez.

Sabit evre eşikleri, altı saldırının erişilebilirliği, kırmızı geometri, uyarıda hasarsızlık, halka/yarık/bıçak temasları ve sersemletmede temizlik test edildi. 18 adet üç dakikalık son evre simülasyonu altı türü de çalıştırdı. Bu sonuç, gerçek oyuncu zorluğunu veya görsel okunabilirliği doğrulamaz.
