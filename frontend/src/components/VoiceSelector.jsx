import { useState } from 'react';

const params = new URLSearchParams(window.location.search);
const paramEmail = params.get('email');

function VoiceSelector({ onSelectVoice, onSetEmail }) {
  const [localEmail, setLocalEmail] = useState(paramEmail || '');
  const [emailError, setEmailError] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const [hasParamEmail] = useState(!!paramEmail);
  const [voice, setVoice] = useState('');

  function handleEmailChange(e) {
    setLocalEmail(e.target.value);
    setEmailError('');
  }

  function handleSelectVoice(v) {
    setVoice(v);
    setVoiceError('');
  }

  function handleProceed() {
    if (!voice) {
      setVoiceError('Please select a voice preference');
      return
    }
    if (!hasParamEmail && !localEmail.endsWith('@snuchennai.edu.in')) {
      setEmailError('Please enter a valid @snuchennai.edu.in email address');
      return
    }
    onSetEmail(localEmail);
    onSelectVoice(voice);
  }

  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center bg-snuc">
      <div className="card shadow border-0 p-4 login-card">
        <div className="card-body text-center">
          <h3 className="mb-1">Welcome to</h3>
          <h4 className="text-primary fw-bold mb-4">SNUC Orientation</h4>

          {!hasParamEmail && (
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Institution Email</label>
              <input
                type="email"
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                placeholder="user@snuchennai.edu.in"
                value={localEmail}
                onChange={handleEmailChange}
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>
          )}

          <p className="fw-semibold mb-3">Select your preferred voice:</p>
          <div className="d-flex gap-3 justify-content-center">
            <button
              className={`btn ${voice === 'male' ? 'btn-primary' : 'btn-outline-primary'} flex-fill`}
              onClick={() => handleSelectVoice('male')}
            >
              <i className="bi bi-mic me-2"></i>Male
            </button>
            <button
              className={`btn ${voice === 'female' ? 'btn-primary' : 'btn-outline-primary'} flex-fill`}
              onClick={() => handleSelectVoice('female')}
            >
              <i className="bi bi-mic me-2"></i>Female
            </button>
          </div>

          <button
            className="btn btn-success mt-4 w-100"
            onClick={handleProceed}
          >
            Proceed <i className="bi bi-box-arrow-right ms-1"></i>
          </button>

          {voiceError && (
            <div className="text-danger mt-2 small">{voiceError}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VoiceSelector;
