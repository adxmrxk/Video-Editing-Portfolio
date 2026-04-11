import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
export class PortfolioComponent {
  private sanitizer = inject(DomSanitizer);
  currentVideoIndex = 0;
  animationKey = 0;

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
    }
  }

  previousVideo() {
    if (this.videos.length > 0) {
      this.currentVideoIndex = (this.currentVideoIndex - 1 + this.videos.length) % this.videos.length;
      this.animationKey++;
    }
  }

  goToVideo(index: number) {
    this.currentVideoIndex = index;
    this.animationKey++;
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
    const url = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&rel=0&playsinline=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
