/**
 * i18n Service for NASA Tracker
 * Handles dynamically loading translations and falling back to English safely.
 */

const I18N = {
    currentLang: localStorage.getItem('lang') || 'en',
    
    translations: {
        en: {
            nav_home: 'Home',
            nav_news: 'News',
            nav_launches: 'Launches',
            nav_discoveries: 'Discoveries',
            nav_live: 'Live Feed',
            nav_astronauts: 'Astronauts',
            nav_mars: 'Mars Rover',
            nav_iss: 'ISS Tracker',
            placeholder_search: 'Search the cosmos...',
            hero_label: 'Astronomy Picture of the Day',
            hero_cta: 'Explore Latest News',
            section_live: 'Live Missions & Telemetry',
            section_news: 'Latest NASA News',
            section_launches: 'NASA Missions',
            section_discoveries: 'Scientific Discoveries',
            card_read_more: 'Full Article',
            card_view_data: 'View Data',
            live_iss_title: 'International Space Station',
            live_iss_desc: "Real-time tracking of humanity's orbital laboratory.",
            live_telemetry: 'LIVE TELEMETRY',
            live_streaming: 'STREAMING LIVE',
            live_artemis_title: 'Artemis II',
            live_artemis_desc: 'Manned lunar flyby mission tracking.',
            raw_feed_btn: 'RAW CAMERA FEED',
            nav_satellites: 'Satellites',
            section_satellites: 'NASA Satellites in Orbit',
            card_satellite_ig: 'Satellite Page (Instagram)',
            nav_random: 'Random Article',
            section_astronauts: 'Astronauts Currently in Space',
            section_mars: 'Mars Exploration: Latest Rover Photos',
            section_iss: 'ISS Live Tracker: Orbital Telemetry',

            footer_text: 'Powered by NASA and The Space Devs APIs.',
            section_other_projects: 'Explore Further',
            other_projects_desc: 'Discover other amazing projects from our space lab.',
            orrery_title: 'Simulator: Interactive Solar System Orrery',
            orrery_desc: 'Navigate our Solar System, control time, view interactive orbital data of moons and gas giants with physics-based precision.',
            orrery_btn: 'Open Orrery'
        },
        pt: {
            nav_home: 'Início',
            nav_news: 'Notícias',
            nav_launches: 'Missões',
            nav_discoveries: 'Descobertas',
            nav_live: 'Ao Vivo',
            nav_astronauts: 'Astronautas',
            nav_mars: 'Marte',
            nav_iss: 'Rastrear ISS',
            placeholder_search: 'Pesquisar no cosmos...',
            hero_label: 'Foto Astronômica do Dia',
            hero_cta: 'Explorar Notícias',
            section_live: 'Missões em Tempo Real e Telemetria',
            section_news: 'Últimas Notícias da NASA',
            section_launches: 'Missões da NASA',
            section_discoveries: 'Descobertas Científicas',
            card_read_more: 'Ler Artigo',
            card_view_data: 'Ver Dados',
            live_iss_title: 'Estação Espacial Internacional',
            live_iss_desc: 'Rastreamento em tempo real do laboratório orbital da humanidade.',
            live_telemetry: 'TELEMETRIA AO VIVO',
            live_streaming: 'TRANSMITINDO AO VIVO',
            live_artemis_title: 'Artemis II',
            live_artemis_desc: 'Rastreamento da missão tripulada de sobrevoo lunar.',
            raw_feed_btn: 'CÂMERA BRUTA (RAW FEED)',
            nav_satellites: 'Satélites',
            section_satellites: 'Satélites da NASA em Órbita',
            card_satellite_ig: 'Página do Satélite (Instagram)',
            section_astronauts: 'Astronautas Atualmente no Espaço',
            section_mars: 'Exploração de Marte: Fotos Recentes',
            section_iss: 'Rastreador ISS: Telemetria Orbital',
            nav_random: 'Artigo Aleatório',

            footer_text: 'Alimentado por APIs da NASA e The Space Devs.',
            section_other_projects: 'Explore Também',
            other_projects_desc: 'Conheça outros projetos incríveis do nosso laboratório espacial.',
            orrery_title: 'Simulador: Sistema Solar Orrery Interativo',
            orrery_desc: 'Navegue pelo nosso Sistema Solar, controle o tempo, visualize dados de luas orbitando gigantes gasosos de forma interativa e com precisão baseada em física.',
            orrery_btn: 'Abrir Orrery'
        },
        es: { nav_home: "Inicio", nav_news: "Noticias", nav_launches: "Lanzamientos", nav_discoveries: "Descubrimientos", nav_live: "En Vivo", placeholder_search: "Buscar en el cosmos...", hero_label: "Imagen Astronómica del Día", hero_cta: "Explorar Noticias", section_live: "Misiones en Vivo y Telemetría", section_news: "Últimas Noticias de la NASA", section_launches: "Misiones de la NASA", section_discoveries: "Descubrimientos Científicos", card_read_more: "Leer Artículo", card_view_data: "Ver Datos", live_iss_title: "Estación Espacial Internacional", live_iss_desc: "Rastreo en tiempo real del laboratorio orbital de la humanidad.", live_telemetry: "TELEMETRÍA EN VIVO", live_streaming: "TRANSMISIÓN EN VIVO", live_artemis_title: "Artemis II", live_artemis_desc: "Rastreo de la misión de sobrevuelo lunar tripulada.", raw_feed_btn: "CÁMARA EN BRUTO", nav_satellites: "Satélites", section_satellites: "Satélites de la NASA en Órbita", card_satellite_ig: "Página del Satélite (Instagram)", nav_random: "Artículo Aleatorio", footer_text: "Desarrollado con las API de la NASA y The Space Devs." },
        fr: { nav_home: "Accueil", nav_news: "Actualités", nav_launches: "Lancements", nav_discoveries: "Découvertes", nav_live: "En Direct", placeholder_search: "Chercher dans le cosmos...", hero_label: "Image Astronomique du Jour", hero_cta: "Explorer les Actualités", section_live: "Missions en Direct et Télémétrie", section_news: "Dernières Actualités de la NASA", section_launches: "Missions de la NASA", section_discoveries: "Découvertes Scientifiques", card_read_more: "Lire l'Article", card_view_data: "Voir les Données", live_iss_title: "Station Spatiale Internationale", live_iss_desc: "Suivi en temps réel du laboratoire orbital de l'humanité.", live_telemetry: "TÉLÉMÉTRIE EN DIRECT", live_streaming: "DIFFUSION EN DIRECT", live_artemis_title: "Artemis II", live_artemis_desc: "Suivi de la mission habitée de survol lunaire.", raw_feed_btn: "FLUX CAMÉRA BRUT", nav_satellites: "Satellites", section_satellites: "Satellites de la NASA en Orbite", card_satellite_ig: "Page du Satellite (Instagram)", nav_random: "Article Aléatoire", footer_text: "Propulsé par les API de la NASA et The Space Devs." },
        de: { nav_home: "Startseite", nav_news: "Nachrichten", nav_launches: "Starts", nav_discoveries: "Entdeckungen", nav_live: "Live-Stream", placeholder_search: "Das Universum durchsuchen...", hero_label: "Astronomisches Bild des Tages", hero_cta: "Neueste Nachrichten entdecken", section_live: "Live-Missionen & Telemetrie", section_news: "Neueste NASA-Nachrichten", section_launches: "NASA-Missionen", section_discoveries: "Wissenschaftliche Entdeckungen", card_read_more: "Ganzen Artikel lesen", card_view_data: "Daten anzeigen", live_iss_title: "Internationale Raumstation", live_iss_desc: "Echtzeit-Verfolgung des orbitalen Labors der Menschheit.", live_telemetry: "LIVE-TELEMETRIE", live_streaming: "LIVE-ÜBERTRAGUNG", live_artemis_title: "Artemis II", live_artemis_desc: "Verfolgung der bemannten Mondvorbeiflug-Mission.", raw_feed_btn: "ROHER KAMERA-FEED", nav_satellites: "Satelliten", section_satellites: "NASA-Satelliten im Orbit", card_satellite_ig: "Satellitenseite (Instagram)", nav_random: "Zufälliger Artikel", footer_text: "Bereitgestellt von NASA und The Space Devs APIs." },
        it: { nav_home: "Home", nav_news: "Notizie", nav_launches: "Lanci", nav_discoveries: "Scoperte", nav_live: "Diretta", placeholder_search: "Cerca nel cosmo...", hero_label: "Immagine Astronomica del Giorno", hero_cta: "Esplora le Ultime Notizie", section_live: "Missioni in Diretta e Telemetria", section_news: "Ultime Notizie NASA", section_launches: "Missioni NASA", section_discoveries: "Scoperte Scientifiche", card_read_more: "Leggi Articolo", card_view_data: "Visualizza Dati", live_iss_title: "Stazione Spaziale Internazionale", live_iss_desc: "Tracciamento in tempo reale del laboratorio orbitale dell'umanità.", live_telemetry: "TELEMETRIA IN DIRETTA", live_streaming: "TRASMISSIONE IN DIRETTA", live_artemis_title: "Artemis II", live_artemis_desc: "Tracciamento della missione di sorvolo lunare con equipaggio.", raw_feed_btn: "FLUSSO FOTOCAMERA RAW", nav_satellites: "Satelliti", section_satellites: "Satelliti NASA in Orbita", card_satellite_ig: "Pagina del Satellite (Instagram)", nav_random: "Articolo Casuale", footer_text: "Alimentato dalle API di NASA e The Space Devs." },
        ja: { nav_home: "ホーム", nav_news: "ニュース", nav_launches: "打ち上げ", nav_discoveries: "発見", nav_live: "ライブ配信", placeholder_search: "宇宙を検索...", hero_label: "今日の天文写真", hero_cta: "最新ニュースを探索", section_live: "ライブミッションとテレメトリー", section_news: "最新のNASAニュース", section_launches: "NASAミッション", section_discoveries: "科学的発見", card_read_more: "記事を読む", card_view_data: "データを表示", live_iss_title: "国際宇宙ステーション", live_iss_desc: "人類の軌道実験室をリアルタイムで追跡。", live_telemetry: "ライブテレメトリー", live_streaming: "ライブストリーミング", live_artemis_title: "アルテミス II", live_artemis_desc: "有人月周回ミッションの追跡。", raw_feed_btn: "生カメラフィード", nav_satellites: "衛星", section_satellites: "軌道上のNASA衛星", card_satellite_ig: "衛星ページ（Instagram）", nav_random: "ランダムな記事", footer_text: "NASAおよびThe Space Devs APIを使用しています。" },
        ko: { nav_home: "홈", nav_news: "뉴스", nav_launches: "발사", nav_discoveries: "발견", nav_live: "라이브 피드", placeholder_search: "우주 검색...", hero_label: "오늘의 천문 사진", hero_cta: "최신 뉴스 탐색", section_live: "라이브 임무 및 원격 측정", section_news: "최신 NASA 뉴스", section_launches: "NASA 임무", section_discoveries: "과학적 발견", card_read_more: "기사 읽기", card_view_data: "데이터 보기", live_iss_title: "국제 우주 정거장", live_iss_desc: "인류의 궤도 실험실 실시간 추적.", live_telemetry: "라이브 원격 측정", live_streaming: "라이브 스트리밍", live_artemis_title: "아르테미스 II", live_artemis_desc: "유인 달 비행 임무 추적.", raw_feed_btn: "원시 카메라 피드", nav_satellites: "위성", section_satellites: "궤도에 있는 NASA 위성", card_satellite_ig: "위성 페이지 (Instagram)", nav_random: "랜덤 기사", footer_text: "NASA 및 The Space Devs API 제공." },
        zh: { nav_home: "首页", nav_news: "新闻", nav_launches: "发射", nav_discoveries: "发现", nav_live: "直播", placeholder_search: "搜索宇宙...", hero_label: "每日天文一图", hero_cta: "探索最新新闻", section_live: "实时任务与遥测", section_news: "最新NASA新闻", section_launches: "NASA任务", section_discoveries: "科学发现", card_read_more: "阅读全文", card_view_data: "查看数据", live_iss_title: "国际空间站", live_iss_desc: "实时追踪人类的轨道实验室。", live_telemetry: "实时遥测", live_streaming: "直播中", live_artemis_title: "阿耳忒弥斯 II", live_artemis_desc: "载人绕月飞行任务追踪。", raw_feed_btn: "原始摄像机画面", nav_satellites: "卫星", section_satellites: "在轨NASA卫星", card_satellite_ig: "卫星主页（Instagram）", nav_random: "随机文章", footer_text: "由 NASA 和 The Space Devs API 提供支持。" },
        ru: { nav_home: "Главная", nav_news: "Новости", nav_launches: "Запуски", nav_discoveries: "Открытия", nav_live: "Прямой эфир", placeholder_search: "Поиск по космосу...", hero_label: "Астрономическая картина дня", hero_cta: "Последние новости", section_live: "Текущие миссии и телеметрия", section_news: "Последние новости НАСА", section_launches: "Миссии НАСА", section_discoveries: "Научные открытия", card_read_more: "Читать статью", card_view_data: "Посмотреть данные", live_iss_title: "Международная космическая станция", live_iss_desc: "Отслеживание орбитальной лаборатории в реальном времени.", live_telemetry: "ЖИВАЯ ТЕЛЕМЕТРИЯ", live_streaming: "ПРЯМАЯ ТРАНСЛЯЦИЯ", live_artemis_title: "Артемида II", live_artemis_desc: "Отслеживание пилотируемого облета Луны.", raw_feed_btn: "СЫРАЯ КАМЕРА", nav_satellites: "Спутники", section_satellites: "Спутники НАСА на орбите", card_satellite_ig: "Страница спутника (Instagram)", nav_random: "Случайная статья", footer_text: "Работает на API НАСА и The Space Devs." },
        ar: { nav_home: "الرئيسية", nav_news: "الأخبار", nav_launches: "الرحلات", nav_discoveries: "استكشافات", nav_live: "بث مباشر", placeholder_search: "البحث في الكون...", hero_label: "الصورة الفلكية لليوم", hero_cta: "استكشاف أحدث الأخبار", section_live: "المهام الحية والقياس عن بعد", section_news: "أحدث أخبار ناسا", section_launches: "مهام ناسا", section_discoveries: "الاكتشافات العلمية", card_read_more: "قراءة المقال", card_view_data: "عرض البيانات", live_iss_title: "محطة الفضاء الدولية", live_iss_desc: "تتبع مختبر المدار البشري في الوقت الفعلي.", live_telemetry: "القياس عن بعد المباشر", live_streaming: "بث مباشر", live_artemis_title: "أرتميس II", live_artemis_desc: "تتبع مهمة الطيران حول القمر المأهولة.", raw_feed_btn: "كاميرا خام", nav_satellites: "الأقمار الصناعية", section_satellites: "أقمار ناسا في المدار", card_satellite_ig: "صفحة القمر الصناعي (إنستغرام)", nav_random: "مقال عشوائي", footer_text: "بدعم من واجهات برمجة تطبيقات NASA و The Space Devs." },
        hi: { nav_home: "होम", nav_news: "समाचार", nav_launches: "लॉन्च", nav_discoveries: "खोजें", nav_live: "लाइव फ़ीड", placeholder_search: "ब्रह्मांड में खोजें...", hero_label: "खगोल विज्ञान के आज के चित्र", hero_cta: "नवीनतम समाचार देखें", section_live: "लाइव मिशन और टेलीमेट्री", section_news: "नवीनतम नासा समाचार", section_launches: "नासा मिशन", section_discoveries: "वैज्ञानिक खोजें", card_read_more: "पूरा लेख पढ़ें", card_view_data: "डेटा देखें", live_iss_title: "अंतर्राष्ट्रीय अंतरिक्ष स्टेशन", live_iss_desc: "मानवता के कक्षीय प्रयोगशाला की वास्तविक समय की ट्रैकिंग।", live_telemetry: "लाइव टेलीमेट्री", live_streaming: "लाइव स्ट्रीमिंग", live_artemis_title: "आर्टेमिस II", live_artemis_desc: "मानवयुक्त चंद्र उड़ान मिशन ट्रैकिंग।", raw_feed_btn: "कच्चा कैमरा फ़ीड", nav_satellites: "उपग्रह", section_satellites: "कक्षा में नासा उपग्रह", card_satellite_ig: "उपग्रह पेज (Instagram)", nav_random: "यादृच्छिक लेख", footer_text: "NASA और The Space Devs API द्वारा संचालित।" },
        tr: { nav_home: "Ana Sayfa", nav_news: "Haberler", nav_launches: "Fırlatmalar", nav_discoveries: "Keşifler", nav_live: "Canlı Yayın", placeholder_search: "Kozmosu arayın...", hero_label: "Günün Astronomi Fotoğrafı", hero_cta: "En Son Haberleri Keşfet", section_live: "Canlı Görevler ve Telemetri", section_news: "En Son NASA Haberleri", section_launches: "NASA Görevleri", section_discoveries: "Bilimsel Keşifler", card_read_more: "Makaleyi Oku", card_view_data: "Verileri Görüntüle", live_iss_title: "Uluslararası Uzay İstasyonu", live_iss_desc: "İnsanlığın yörünge laboratuvarının gerçek zamanlı takibi.", live_telemetry: "CANLI TELEMETRİ", live_streaming: "CANLI YAYIN", live_artemis_title: "Artemis II", live_artemis_desc: "Mürettebatlı ay uçuş görevi takibi.", raw_feed_btn: "HAM KAMERA YAYINI", nav_satellites: "Uydular", section_satellites: "Yörüngedeki NASA Uyduları", card_satellite_ig: "Uydu Sayfası (Instagram)", nav_random: "Rastgele Makale", footer_text: "NASA ve The Space Devs API'leri tarafından desteklenmektedir." },
        nl: { nav_home: "Home", nav_news: "Nieuws", nav_launches: "Lanceringen", nav_discoveries: "Ontdekkingen", nav_live: "Live Feed", placeholder_search: "Zoek in de kosmos...", hero_label: "Astronomiefoto van de Dag", hero_cta: "Ontdek Laatste Nieuws", section_live: "Live Missies & Telemetrie", section_news: "Laatste NASA Nieuws", section_launches: "NASA Missies", section_discoveries: "Wetenschappelijke Ontdekkingen", card_read_more: "Lees Artikel", card_view_data: "Bekijk Data", live_iss_title: "Internationaal Ruimtestation", live_iss_desc: "Real-time tracking van het orbitale laboratorium van de mensheid.", live_telemetry: "LIVE TELEMETRIE", live_streaming: "LIVE UITZENDING", live_artemis_title: "Artemis II", live_artemis_desc: "Bemande missie rond de maan volgen.", raw_feed_btn: "RUWE CAMERA FEED", nav_satellites: "Satellieten", section_satellites: "NASA Satellieten in een baan om de aarde", card_satellite_ig: "Satellietpagina (Instagram)", nav_random: "Willekeurig Artikel", footer_text: "Aangedreven door NASA en The Space Devs API's." }
    },

    /**
     * Set language and update UI
     */
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        this.updateUI();
    },

    /**
     * Translate all elements with data-i18n attribute gracefully
     */
    updateUI() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        // 1. Try exact match (e.g. 'es-MX')
        // 2. Try prefix match (e.g. 'es')
        // 3. Fallback to Empty Object (which falls through securely)
        const baseLang = this.currentLang.split('-')[0];
        const dict = this.translations[this.currentLang] || this.translations[baseLang] || {};
        const fallbackDict = this.translations['en'];
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = dict[key] || fallbackDict[key];
            
            if (text) {
                if (el.tagName === 'INPUT') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Update active state of legacy lang toggle buttons if they still exist elsewhere
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
        });
    }
};
