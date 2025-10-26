import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
    standalone: false,
  styleUrl: './app.css'
  
})
export class App implements OnInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  hearts = Array.from({ length: 10 }, () => ({
    left: 10 + Math.random() * 80,
    top: 5 + Math.random() * 90
  }));

  stars = Array.from({ length: 10 }, () => ({
    left: 5 + Math.random() * 90,
    top: 5 + Math.random() * 90
  }));

  images = [
    { url: 'assets/imagenes/20230331_180002.jpg', message: 'Cada sonrisa tuya ilumina mi alma ❤️', date: '01/01/2025' },
    { url: 'assets/imagenes/20230403_161612.jpg', message: 'Eres mi paz en medio del caos 🌸', date: '14/02/2025' },
    { url: 'assets/imagenes/20230430_172922.jpg', message: 'Tu amor es el refugio más bonito que he encontrado 💫', date: '20/03/2025' },
    { url: 'assets/imagenes/20240214_181710.jpg', message: 'Contigo los días grises se llenan de color 💕', date: '10/05/2025' },
    { url: 'assets/imagenes/20230827_191845.jpg', message: 'Eres mi lugar favorito para quedarme 🥰', date: '30/06/2025' },
    { url: 'assets/imagenes/20230423_192141.jpg', message: 'Te amo sin prisa pero sin pausa 💖', date: '15/07/2025' },

  { url: 'assets/imagenes/20231223_211738.jpg', message: 'Desde que llegaste, mi vida se volvió un poema lleno de amor y sonrisas ✨', date: '23/12/2025' },
  { url: 'assets/imagenes/IMG-20241103-WA0012.jpg', message: 'Tú eres la historia más bonita que el destino escribió para mí 💞', date: '01/10/2025' },
  { url: 'assets/imagenes/20230924_214911.jpg', message: 'Amarte es mi manera favorita de vivir la vida 🌷', date: '24/09/2025' },
  ];

  currentIndex = 0;

  galleryHearts = Array.from({ length: 8 }, () => ({
    left: 10 + Math.random() * 80,
    top: 5 + Math.random() * 90
  }));

  ngOnInit() {
    setInterval(() => this.next(), 10000);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  playAudio() {
    const audio = this.audioPlayer.nativeElement;
    audio.play().then(() => {
      console.log('🎶 Música activada por clic del usuario');
    }).catch(err => console.warn('⚠️ No se pudo reproducir el audio:', err));
  }

  onImageError(url: string) {
    console.error('❌ No se pudo cargar la imagen:', url);
  }

  onImageLoad(url: string) {
    console.log('✅ Imagen cargada correctamente:', url);
  }

  // SECCIÓN DE MENSAJES / DEDICATORIAS
loveMessages = [
  'Tu amor es la melodía que alegra mis días 💕',
  'Si te pienso, sonrío. Si te miro, me enamoro más 💫',
  'Tú eres mi casualidad más hermosa 🌷',
  'El destino supo lo que hacía cuando te puso en mi camino 💖',
  'A tu lado, cada segundo se convierte en eternidad 🌹',
  'Amarte no fue una elección, fue una certeza ✨',
  'Tu voz tiene la calma que mi alma busca cada día 💞',
  'Eres el "para siempre" que nunca pensé encontrar 💘',
  'Tus abrazos son mi lugar favorito en el mundo 🥰',
];

messageHearts = Array.from({ length: 15 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100
}));


currentMessageIndex = 0;

messages = [
  { text: 'Desde que llegaste, todo en mi mundo tiene más color y sentido 💖', date: '01/08/2025' },
  { text: 'Amarte es tan fácil como respirar, porque estás en todo lo que soy 🌸', date: '15/08/2025' },
  { text: 'Eres mi pensamiento favorito al despertar y el último antes de dormir 💫', date: '01/09/2025' },
  { text: 'Cada palabra tuya me hace sentir que estoy justo donde debo estar 💕', date: '20/09/2025' },
  { text: 'Contigo, incluso el silencio tiene un sonido hermoso ✨', date: '04/10/2025' },
  { text: 'No quiero existir en un mundo donde no estes 😘', date: '04/10/2025' },
  { text: 'Sabina escribió que podemos tardar 19 dias y 500 noches en olvidar a alguien a quien realmente amamos. Pero con la relatividad del tiempo, pronto comprendi que ni en 500 noches lograre desprenderme de la calidez de su recuedos. 😘', date: '04/10/2025' }
];

floatingHearts = Array.from({ length: 15 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100
}));

nextMessage() {
  this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
}

prevMessage() {
  this.currentMessageIndex =
    (this.currentMessageIndex - 1 + this.messages.length) % this.messages.length;
}


 finalBackgroundHearts = Array.from({ length: 12 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100
  }));

  // Burst hearts generadas por click
  burstHearts: Array<{ id: number; left: number; top: number; size: number; rotate: number }> = [];
  private nextBurstId = 1;

  @ViewChild('clickSound', { static: false }) clickSound!: ElementRef<HTMLAudioElement>;

  // Llama esto cuando el usuario presione "Te amo"
  triggerBurst() {
    // reproducir sonido (si existe)
    try {
      const audio = this.clickSound?.nativeElement;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => {
          // si falla la reproducción, lo ignoramos (browsers/policy)
          console.warn('No se pudo reproducir sonido de pop:', e);
        });
      }
    } catch (e) {
      console.warn('Audio click error', e);
    }

    // crear N corazones (aleatorio entre 8 y 14)
    const count = 10 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const id = this.nextBurstId++;
      const left = 45 + (Math.random() - 0.5) * 30; // centrado ±
      const top = 50 + (Math.random() - 0.5) * 20;  // ligeramente centrado vertical
      const size = 14 + Math.floor(Math.random() * 18); // 14 - 32 px
      const rotate = -25 + Math.random() * 50; // rotación aleatoria
      this.burstHearts.push({ id, left, top, size, rotate });

      // eliminar el corazón después de la animación (2s)
      setTimeout(() => {
        const idx = this.burstHearts.findIndex(h => h.id === id);
        if (idx > -1) this.burstHearts.splice(idx, 1);
      }, 2000 + Math.floor(Math.random() * 600)); // un poco de stagger
    }
  }

  bookHearts = Array.from({ length: 20 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100
  }));

  downloadBook() {
    const link = document.createElement('a');
    link.href = 'assets/pdf/Un Amor Para Siempre.pdf';
    link.download = 'Un Amor Para Siempre.pdf';
    link.click();
  }

}
