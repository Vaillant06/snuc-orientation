import { useState, useRef } from 'react';
import Questionnaire from './Questionnaire.jsx';
import { getVideoUrl } from '../constants/VideoContent.js';

function VideoPlayer({
  videos, currentVideoId, onSelectVideo, isUnlocked, completedVideos,
  onQuizPassed, voicePreference, onVoiceChange, cloudName,
}) {
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const videoRef = useRef(null);
  const module = videos.find((v) => v.id === currentVideoId);

  if (!module) return null;

  function handleVideoEnd() {
    setVideoEnded(true);
  }
  function handleQuizPassed(retries) {
    onQuizPassed(module.id, retries);
  }

  function handleVideoError() {
    if (voicePreference === 'female' && videoRef.current && videoRef.current.src !== getVideoUrl(module.file.male, cloudName)) {
      videoRef.current.src = getVideoUrl(module.file.male, cloudName);
      videoRef.current.load();
      return;
    }
    setVideoError(true);
  }

  const otherVoice = voicePreference === 'male' ? 'female' : 'male';
  const videoSrc = getVideoUrl(module.file[voicePreference], cloudName);
  const completed = completedVideos.has(module.id);

  return (
    <>
      <div className={`sidebar p-3 ${sidebarOpen ? 'open' : ''}`}>
        <h5 className="fw-bold mb-3 px-2">Modules</h5>
        <div className="list-group list-group-flush">
          {videos.map((v) => {
            const unlocked = isUnlocked(v.id)
            const active = v.id === currentVideoId
            const completed = completedVideos.has(v.id)
            return (
              <div
                key={v.id}
                className={`list-group-item ${active ? 'active' : ''} ${!unlocked ? 'disabled' : ''}`}
                onClick={() => {
                  if (!unlocked) return;
                  onSelectVideo(v.id);
                  setSidebarOpen(false);
                }}
              >
                {!unlocked && <span className="me-2">🔒</span>}
                {completed && <span className="me-2 text-success"><i className="bi bi-check-circle-fill"></i></span>}
                <span className={!unlocked ? 'opacity-50' : ''}>{v.title}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className={`sidebar-backdrop ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      <div className="content-area p-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-secondary btn-sm sidebar-toggle"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label="Toggle modules"
            >
              <i className={`bi ${sidebarOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
            <h3 className="mb-0">{module.title}</h3>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-success fs-6">
              <i className="bi bi-mic me-1"></i>{voicePreference}
            </span>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onVoiceChange(otherVoice)}
            >
              <i className="bi bi-arrow-repeat me-1"></i>Switch to {otherVoice}
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-center my-4">
          {videoSrc ? (
            <video
              ref={videoRef}
              key={voicePreference + currentVideoId}
              src={videoSrc}
              className="rounded shadow-sm w-100"
              style={{ maxWidth: 700 }}
              controls
              onEnded={handleVideoEnd}
              onError={handleVideoError}
              onPlaying={() => setVideoError(false)}
            />
          ) : (
            <div className="alert alert-danger w-100 mb-0" style={{ maxWidth: 700 }}>
              <i className="bi bi-exclamation-triangle me-2"></i>
              Video configuration is unavailable. Please contact the administrator.
            </div>
          )}
        </div>

        {completed ? (
          <div className="text-center my-5">
            <i className="bi bi-check-circle-fill fs-1 d-block mb-2 text-success"></i>
            <p className="fs-5 text-success fw-semibold">
              You have already completed this module
            </p>
          </div>
        ) : videoError && videoSrc ? (
          <div className="text-center my-5">
            <i className="bi bi-exclamation-triangle fs-1 d-block mb-2 text-danger"></i>
            <p className="fs-5 text-danger">
              The video failed to load. Please check your internet connection and try again.
            </p>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => videoRef.current && videoRef.current.load()}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i>Retry
            </button>
          </div>
        ) : videoEnded ? (
          <Questionnaire
            questions={module.questions}
            moduleId={module.id}
            onPass={handleQuizPassed}
          />
        ) : (
          <div className="text-center text-muted my-5">
            <i className="bi bi-play-circle fs-1 d-block mb-2"></i>
            <p className="fs-5">
              Watch the full video to unlock the questionnaire
            </p>
          </div>
        )}

      </div>
    </>
  );
}

export default VideoPlayer;
