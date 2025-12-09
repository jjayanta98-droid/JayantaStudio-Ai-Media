import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { ImageEditor } from './views/ImageEditor';
import { ImageEnhancer } from './views/ImageEnhancer';
import { TagGenerator } from './views/TagGenerator';
import { VideoTools } from './views/VideoTools';
import { ToolType } from './types';

const App: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType | 'dashboard'>('dashboard');

  const renderContent = () => {
    switch (currentTool) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentTool} />;
      case ToolType.IMAGE_EDITOR:
        return <ImageEditor />;
      case ToolType.IMAGE_ENHANCER:
        return <ImageEnhancer />;
      case ToolType.TAG_GENERATOR:
        return <TagGenerator />;
      case ToolType.VIDEO_NOISE_CLEAR:
      case ToolType.VIDEO_QUALITY_INCREASE:
      case ToolType.MP4_TO_MP3:
      case ToolType.YOUTUBE_DOWNLOADER:
      case ToolType.INSTAGRAM_DOWNLOADER:
        return <VideoTools type={currentTool} />;
      default:
        return <Dashboard onNavigate={setCurrentTool} />;
    }
  };

  return (
    <Layout currentTool={currentTool} onNavigate={setCurrentTool}>
      {renderContent()}
    </Layout>
  );
};

export default App;