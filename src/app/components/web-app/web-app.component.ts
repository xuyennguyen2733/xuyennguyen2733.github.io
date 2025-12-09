import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

interface Project {
  title: string;
  imagePath?: string;
  link?: string;
  summary: string;
}

@Component({
  selector: 'app-web-app',
  templateUrl: './web-app.component.html',
  styleUrl: './web-app.component.scss',
})
export class WebAppComponent implements AfterViewInit {
  @ViewChild('cardContentRef', { static: false }) cardContentRef!: ElementRef;
  resizeObserver!: ResizeObserver;
  title: string = 'Web App';
  rowHeight: string = '3:1';

  projects: Project[] = [
    {
      title: 'Signable - Capstone Project',
      imagePath: 'images/web-preview/signable.webp',
      // link: 'https://signable-ffg0eegcfngdgubn.westus2-01.azurewebsites.net/',
      summary:
        '(Currently unavailable) This web app integrates machine learning solutions and 3D illustrations to teach the American Sign Language alphabet.',
    },
    {
      title: 'Chinese Typing Practice',
      imagePath: 'images/web-preview/typing-practice-preview.webp',
      link: 'https://xuyennguyen2733.github.io/TypingPractice/',
      summary:
        'Inspired by Typer Shark! Deluxe, this tool helps users practice typing Chinese characters using the Bopomofo keyboard layout, commonly used in Taiwan.',
    },
    {
      title: 'Class Schedule Maker',
      imagePath: 'images/web-preview/class-scheduler.webp',
      link: 'https://xuyennguyen2733.github.io/ClassSchedule/',
      summary:
        'This web app allows users to log there class information (such as class name, location, time, etc.) onto a weekly calendar.',
    },
    // {
    //   title: 'Signaway - Learn Sign Language',
    //   summary:
    //     '(Comming soon!) Stemming from the idea of Signable, this app goes beyond the ASL alphabet by teaching users basic hand shapes and guiding them through signing words and phrases.',
    // },
  ];

  constructor(
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.calculateRowHeight();
    this.resizeObserver = new ResizeObserver(() => {
      this.calculateRowHeight();
    });
    this.resizeObserver.observe(this.cardContentRef.nativeElement);
  }

  initializeResizeObserver() {
    if (this.cardContentRef && this.cardContentRef.nativeElement) {
      this.resizeObserver = new ResizeObserver(() => {
        this.calculateRowHeight();
      });

      this.resizeObserver.observe(this.cardContentRef.nativeElement);
    } else {
      console.error('cardContentRef is not available.');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.calculateRowHeight();
  }

  calculateRowHeight() {
    const matCard = this.elRef.nativeElement.querySelector('.container-card');
    const matCardHeader = this.elRef.nativeElement.querySelector(
      '.container-card > mat-card-header',
    );
    const containerWidth = matCard.offsetWidth;
    const containerHeight = matCard.offsetHeight - matCardHeader.offsetHeight;

    this.rowHeight = (containerWidth / containerHeight).toFixed(2) + ':1';

    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
