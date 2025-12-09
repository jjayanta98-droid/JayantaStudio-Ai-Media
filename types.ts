export enum ToolType {
  IMAGE_EDITOR = 'image_editor',
  IMAGE_ENHANCER = 'image_enhancer',
  MP4_TO_MP3 = 'mp4_to_mp3',
  VIDEO_NOISE_CLEAR = 'video_noise_clear',
  VIDEO_QUALITY_INCREASE = 'video_quality_increase',
  YOUTUBE_DOWNLOADER = 'youtube_downloader',
  INSTAGRAM_DOWNLOADER = 'instagram_downloader',
  TAG_GENERATOR = 'tag_generator',
}

export interface ToolConfig {
  id: ToolType;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface TagResult {
  tags: string[];
  trendingScore: number;
  searchVolume: string;
}

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  result: string | null;
  error: string | null;
}