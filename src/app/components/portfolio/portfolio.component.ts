import { Component, inject, AfterViewInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var YT: any;

interface Video {
  id: number;
  title: string;
  description: string;
  youtubeId: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  private elementRef = inject(ElementRef);
  private ngZone = inject(NgZone);

  currentVideoIndex = 0;
  animationKey = 0;
  private player: any = null;
  private observer: IntersectionObserver | null = null;
  private isInView = false;
  private apiReady = false;

  videos: Video[] = [
    {
      id: 1,
      title: 'Who Rules The World',
      description: 'Exploring the power structures that shape our world',
      youtubeId: '_MMZ2oY7taQ'
    },
    {
      id: 2,
      title: 'Andrew Tate Edit',
      description: 'High-energy Andrew Tate motivational content',
      youtubeId: 'ZdDbJKPKURs'
    },
    {
      id: 3,
      title: 'French Gymnast Edit',
      description: 'French Olympic gymnastics surprising outcome',
      youtubeId: 'WU0vbygZa-A'
    },
    {
      id: 4,
      title: 'Anti Facebook AI Platform',
      description: 'AI-driven social media platform disruption',
      youtubeId: 'uWz3P16VYZg'
    },
    {
      id: 5,
      title: 'Celebrity Transformations',
      description: 'Celebrity fitness transformation journey',
      youtubeId: 'IFIonD7DMgw'
    },
    {
      id: 6,
      title: 'Warriors Short',
      description: 'Breaking down the Warriors downfall',
      youtubeId: 'B7m-4REgCWM'
    }
  ];

  nextVideo() {
    if (this.videos.length > 0) {
      this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
      this.animationKey++;
      this.reinitPlayer();
    }
  }

  previousVideo() {
    if (this.videos.length > 0) {
      this.currentVideoIndex = (this.currentVideoIndex - 1 + this.videos.length) % this.videos.length;
      this.animationKey++;
      this.reinitPlayer();
    }
  }

  goToVideo(index: number) {
    this.currentVideoIndex = index;
    this.animationKey++;
    this.reinitPlayer();
  }

  playVideo() {
    // Optional: Add analytics tracking here
  }

  getPreviousIndex(): number {
    return (this.currentVideoIndex - 1 + this.videos.length) % this.videos.length;
  }

  getNextIndex(): number {
    return (this.currentVideoIndex + 1) % this.videos.length;
  }

  onVideoEnded() {
    this.nextVideo();
  }

  getYoutubeEmbedUrl(youtubeId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&rel=0&playsinline=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngAfterViewInit() {
    this.loadYouTubeAPI();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.player) {
      this.player.destroy();
    }
  }

  private loadYouTubeAPI() {
    if (typeof YT !== 'undefined' && YT.Player) {
      this.apiReady = true;
      this.initPlayer();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      this.ngZone.run(() => {
        this.apiReady = true;
        this.initPlayer();
      });
    };
  }

  private initPlayer() {
    const iframe = this.elementRef.nativeElement.querySelector('.center .video-player');
    if (iframe && this.apiReady) {
      this.player = new YT.Player(iframe, {
        events: {
          onReady: (event: any) => {
            if (this.isInView) {
              event.target.playVideo();
            }
          },
          onStateChange: (event: any) => {
            if (event.data === YT.PlayerState.ENDED) {
              this.ngZone.run(() => this.nextVideo());
            }
          }
        }
      });
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isInView = entry.isIntersecting;
          if (entry.isIntersecting && this.player && this.player.playVideo) {
            this.player.playVideo();
          } else if (!entry.isIntersecting && this.player && this.player.pauseVideo) {
            this.player.pauseVideo();
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = this.elementRef.nativeElement.querySelector('.portfolio-section');
    if (section) {
      this.observer.observe(section);
    }
  }

  reinitPlayer() {
    setTimeout(() => {
      if (this.player) {
        this.player.destroy();
        this.player = null;
      }
      this.initPlayer();
    }, 100);
  }
}
