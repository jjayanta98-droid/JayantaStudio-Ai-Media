import { ToolType, ToolConfig } from './types';
import React from 'react';

// Icons as simple SVG strings or components could be used, but we'll use emojis/unicode for simplicity in this specific file if needed, 
// or rely on a specialized Icon component. For this app, we will use SVGs in the components directly or a mapping here.

export const TOOLS: ToolConfig[] = [
  {
    id: ToolType.IMAGE_EDITOR,
    title: 'AI Image Editor',
    description: 'Edit images using Gemini 2.5 Flash Image. Add filters, remove objects, or reimagine scenes.',
    icon: '🎨',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: ToolType.IMAGE_ENHANCER,
    title: 'AI Image Enhancer',
    description: 'Upscale low-quality images to 4K resolution and remove noise instantly.',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: ToolType.TAG_GENERATOR,
    title: 'SEO Tag Generator',
    description: 'Generate high-value, trending tags for YouTube and Instagram using real-time analysis.',
    icon: '🏷️',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: ToolType.VIDEO_QUALITY_INCREASE,
    title: 'Video Upscaler',
    description: 'Enhance video resolution and clarity using advanced restoration algorithms.',
    icon: '✨',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: ToolType.VIDEO_NOISE_CLEAR,
    title: 'Pro Noise Remover',
    description: 'Remove background noise and grain from professional footage.',
    icon: '🔇',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: ToolType.MP4_TO_MP3,
    title: 'MP4 to MP3',
    description: 'Extract high-fidelity audio tracks from your video files instantly.',
    icon: '🎵',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: ToolType.YOUTUBE_DOWNLOADER,
    title: 'YouTube Downloader',
    description: 'Download videos from YouTube in various formats.',
    icon: '📺',
    color: 'from-red-500 to-red-600',
  },
  {
    id: ToolType.INSTAGRAM_DOWNLOADER,
    title: 'Insta Saver',
    description: 'Save Reels and Videos from Instagram directly to your device.',
    icon: '📸',
    color: 'from-fuchsia-500 to-pink-600',
  },
];