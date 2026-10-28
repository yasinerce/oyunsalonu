# HORI — Mobil yatay yerleşim ve güvenli başlangıç

Mobil dokunmatik cihazlarda dikey ekranda oyun ilerlemez. Yatay çevirme uyarısı ve tam ekran düğmesi gösterilir. Destekleyen tarayıcıda kullanıcı düğmeye bastıktan sonra tam ekran + landscape yön kilidi denenir; destek yoksa elle çevirme çalışır. Masaüstünde dikey pencere engellenmez.

Salon içinden açılışta Hazırım ekranı gelir; tuşa basılmadan oyun ve süre başlamaz. Başlatma, yeniden deneme ve yeni run işlemlerinde 3 saniyelik geri sayım vardır. Geri sayımda simülasyon ve gölge durur. Ekran döndürme, normal duraklatma ve salondan ayrılma geri sayımı da durdurur. Dönüşte aynı saniyeden devam eder.

Kısa yatay ekranda bilgiler tek üst şeritte, joystick sol altta ve dash sağ altta yer alır. Güç seçimi sağ köşeden içeri açılır. Öz ve güçler, görünür oyun alanında ve kontrollerin dışında doğar. Duraklatma ekranının açıklamaları ayrı kaydırılabilir sütundadır.

`node tests/hori-ui.cjs`, `node tests/hori-core.cjs` ve `node tests/hori-evolution.cjs` depo kökünden çalıştırılır. UI testleri DOM uyarlayıcısı ve canvas kullanır; gerçek cihaz testi değildir.
