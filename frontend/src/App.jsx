import { useState, useEffect, useCallback } from 'react'
import videoContent from './constants/VideoContent.js'
import VoiceSelector from './components/VoiceSelector.jsx'
import VideoPlayer from './components/VideoPlayer.jsx'
import './App.css'

const params = new URLSearchParams(window.location.search)
const paramEmail = params.get('email')

function App() {
const [email, setEmailState] = useState(() => paramEmail || localStorage.getItem('email') || '');
const [voicePreference, setVoiceState] = useState(() => localStorage.getItem('voicePreference') || '');
const [currentVideoId, setCurrentVideoId] = useState(() => Number(localStorage.getItem('currentVideoId')) || 1)
const [completedVideos, setCompletedVideos] = useState(() => new Set(JSON.parse(localStorage.getItem('completedVideos') || '[]')));
const [quizScores, setQuizScores] = useState(() => JSON.parse(localStorage.getItem('quizScores') || '{}'));
const [cloudinaryCloudName, setCloudinaryCloudName] = useState('');

  const isUnlocked = useCallback((videoId) => {
    if (videoId === 1) return true
    const prevId = videoId - 1
    return quizScores[prevId] === true
  }, [quizScores])

  async function loadProgress(userEmail) {
    try {
      const response = await fetch(`/api/progress/${encodeURIComponent(userEmail)}`);
      if (!response.ok) {
        throw new Error("Unable to fetch user progress");
      }
      const data = await response.json();
      setCompletedVideos(new Set(data.completedModules));
      setQuizScores(data.quizScores);
      setCurrentVideoId(data.currentModule);
    } catch (err) {
      console.error("Unable to fetch progress", err);
    }
  }

  const handleSetEmail = useCallback(async (val) => {
    setEmailState(val);
    localStorage.setItem('email', val);
    await loadProgress(val);
  }, []);

  useEffect(() => {
    localStorage.setItem('voicePreference', voicePreference);
  }, [voicePreference]);

  useEffect(() => {
    localStorage.setItem('currentVideoId', String(currentVideoId));
  }, [currentVideoId]);

  useEffect(() => {
    localStorage.setItem('completedVideos', JSON.stringify([...completedVideos]));
  }, [completedVideos]);

  useEffect(() => {
    localStorage.setItem('quizScores', JSON.stringify(quizScores));
  }, [quizScores]);

  useEffect(() => {
    if (!email || !voicePreference) return;
    fetch('/api/config')
      .then((res) => res.json())
      .then((config) => setCloudinaryCloudName(config.cloudinaryCloudName || ''))
      .catch(console.error);
  }, [email, voicePreference]);

  const handleVoiceChange = useCallback((voice) => setVoiceState(voice), []);

  const handleSelectVideo = useCallback((id) => {
    if (isUnlocked(id)) setCurrentVideoId(id);
  }, [isUnlocked]);

  const handleQuizPassed = useCallback((moduleId, retries) => {
    // Mark module as completed only after passing the quiz
    setCompletedVideos((prev) => {
      const next = new Set(prev);
      next.add(moduleId);
      return next;
    });

    // Unlock next module
    setQuizScores((prev) => ({
      ...prev,
      [moduleId]: true,
    }));

    // Save progress to backend
    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        moduleId,
        score: 100,
        retries,
        date: new Date().toISOString().split("T")[0],
      }),
    }).catch(console.error);

    const nextId = moduleId + 1;
    if (nextId <= videoContent.length) {
      setCurrentVideoId(nextId);
    }
  }, [email]);

  const handleReset = useCallback(() => {
    setCurrentVideoId(1);
    setCompletedVideos(new Set());
    setQuizScores({});
    localStorage.removeItem('completedVideos');
    localStorage.removeItem('quizScores');
    localStorage.removeItem('currentVideoId');
    localStorage.removeItem('email');
  }, []);

  if (!email || !voicePreference) {
    return (
      <VoiceSelector
        onSelectVoice={handleVoiceChange}
        onSetEmail={handleSetEmail}
      />
    );
  }

  return (
    <div className="app-container">
      <VideoPlayer
        key={currentVideoId}
        videos={videoContent}
        currentVideoId={currentVideoId}
        onSelectVideo={handleSelectVideo}
        isUnlocked={isUnlocked}
        completedVideos={completedVideos}
        onQuizPassed={handleQuizPassed}
        voicePreference={voicePreference}
        onVoiceChange={handleVoiceChange}
        onReset={handleReset}
        cloudName={cloudinaryCloudName}
      />
    </div>
  )
}

export default App
