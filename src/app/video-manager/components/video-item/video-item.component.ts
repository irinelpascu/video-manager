import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { VideoUI } from '../../store/models';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {

  FORMAT_QUALITY = {
    '2160p': 'best',
    '1440p': 'high',
    '1080p': 'high',
    '720p': 'medium',
    '480p': 'low',
    '360p': 'low',
    '240p': 'lowest',
  };

  @Input() video: VideoUI;
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onDelete(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.delete.emit();
  }
}
