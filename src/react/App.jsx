import { useState, useRef, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import "./App.css";

const MODEL_URL = "/dogcat-model/";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const webcamContainerRef = useRef(null);
  const modelRef = useRef(null);
  const webcamRef = useRef(null);
  const animationRef = useRef(null);

  const init = async () => {
    setIsLoading(true);

    try {
      const modelURL = MODEL_URL + "model.json";
      const metadataURL = MODEL_URL + "metadata.json";

      // 모델 로드
      modelRef.current = await tmImage.load(modelURL, metadataURL);
      // todo: 모델 로딩 마무리

      // todo: 웹캠 설정
      const flip = true;
      webcamRef.current = new tmImage.Webcam(200, 200, flip);
      await webcamRef.current.setup();
      await webcamRef.current.play();

      // todo: DOM에 웹캠 캔버스 추가
      if (webcamContainerRef.current) {
        webcamContainerRef.current.innerHTML = "";
        webcamContainerRef.current.appendChild(webcamRef.current.canvas);
      }

      // todo: 초기 상태 셋업
      setIsStarted(true);
      setIsLoading(false);

      // todo: 루프 시작
      animationRef.current = window.requestAnimationFrame(loop);
    } catch (error) {
      console.error("초기화 오류:", error);
      setIsLoading(false);
    }
  };

  const loop = () => {
    if (webcamRef.current) {
      webcamRef.current.update();
      predict();
    }
    animationRef.current = window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    if (modelRef.current && webcamRef.current) {
      const prediction = await modelRef.current.predict(
        webcamRef.current.canvas
      );
      setPredictions(prediction);
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      if (webcamRef.current) {
        webcamRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="app">
      <h1>Teachable Machine Image Model</h1>

      {!isStarted && (
        <button onClick={init} disabled={isLoading}>
          {isLoading ? "로딩 중..." : "Start"}
        </button>
      )}

      <div ref={webcamContainerRef} className="webcam-container" />

      <div className="label-container">
        {predictions.map((pred, index) => (
          <div key={index} className="prediction">
            {pred.className}: {(pred.probability * 100).toFixed(1)}%
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
