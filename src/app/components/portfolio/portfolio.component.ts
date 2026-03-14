import { Component } from '@angular/core';

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  currentVideoIndex = 0;
  animationKey = 0;

  videos: Video[] = [
    {
      id: 1,
      title: 'Short 1',
      description: 'Exploring the power structures that shape our world',
      url: '/videos/Podcast Edit 4.mov'
    },
    {
      id: 2,
      title: 'Short 2',
      description: 'High-energy Andrew Tate motivational content',
      url: '/videos/Andrew Tate Edit.mov'
    },
    {
      id: 3,
      title: 'Short 3',
      description: 'French Olympic gymnastics surprising outcome',
      url: '/videos/French Gymnast Edit.mov'
    },
    {
      id: 4,
      title: 'Short 4',
      description: 'AI-driven social media platform disruption',
      url: '/videos/Anti Facebook AI Platform Short Subtitles.mov'
    },
    {
      id: 5,
      title: 'Short 5',
      description: 'Celebrity fitness transformation journey',
      url: '/videos/5 Celebrities Transformation.mov'
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
}
